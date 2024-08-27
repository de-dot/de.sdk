import type { GPSLocation, Coordinates, MapOptions, LivePosition, Caption, Entity, Itinerary } from '../../types'
import { EventEmitter } from 'events'
import IOF from 'iframe.io'
import Stream from '../../utils/stream'
import Controls from './controls'

const
SANDBOX_RULES = ['allow-scripts', 'allow-same-origin'],
REQUIRED_FEATURES = ['geolocation']

export interface ControlEntity {
  add: ( entity: Entity, callback?: () => void ) => void
  remove: ( id: string, callback?: () => void ) => void
  move: ( update: LivePosition, callback?: () => void ) => void
}
export type LRSControlsListener = ( controls: ControlEntity ) => void
export type LRSErrorListener = ( error?: Error | boolean ) => void

export default class Mapack extends EventEmitter {
  private isDev: boolean
  private baseURL: string
  private isConnected: boolean
  private options: MapOptions
  private chn?: IOF
  private controls?: Controls

  /**
   * Mapbox control Client
   * 
   * @param options - Initial options
   */
  constructor( options: MapOptions ){
    super()

    this.options = options
    if( !this.options.accessToken )
      throw new Error('Invalid Access Token')

    this.isDev = this.options.env == 'dev' || false
    this.baseURL = this.isDev ? 'http://localhost:4800' : 'https://msi.dedot.io'

    this.isConnected = false
  }

  /**
   * Listen to embedded iframe load
   * 
   * @param e - DOM EventTarget object
   */
  private onload( e: Event ){
    const iframe = e.target as HTMLIFrameElement

    // Remove all previous listeners when iframe reloaded
    this.chn && this.chn.removeListeners()

    this.chn = new IOF({ type: 'WINDOW' })
    this.chn.initiate( iframe.contentWindow as Window, this.baseURL )

    this.chn
    .once('connect', () => {
      this.chn?.emit('bind', { ...this.options, origin: window.origin }, ( error: string | boolean ) => {
        if( error )
          return this.emit('error', new Error( error as string ) )
      
        this.isConnected = true
        this.emit('ready')
      })
    })
    .on('error', ( error: Error | string ) => this.emit('error', typeof error == 'object' ? error : new Error( error ) ) )
    .on('ready', () => this.emit('ready') )
    // .on('event', ( _event: string, ...args: any[] ) => this.emit( _event, ...args ) )

    /**
     * Manual controls of the map remotely
     */
    this.controls = new Controls( this.chn, this.options )
  }

  /**
   * Embed the gateway into a web UI using
   * an iframe.
   */
  private render(){
    const container = document.getElementById( this.options.element )
    if( !container ) throw new Error(`HTML Element Container <#${this.options.element}> Not Found`)
    
    container.innerHTML = `<iframe id="de-sdk:map"
                                    src="${this.baseURL}"
                                    style="width:100%;height:100%;border:none;"
                                    title="De.MSI Gateway"
                                    importance="high"
                                    referrerpolicy="origin"
                                    allow="${REQUIRED_FEATURES.join()}"
                                    sandbox="${SANDBOX_RULES.join(' ')}"></iframe>`

    const element = document.getElementById('de-sdk:map')
    if( !element )
      throw new Error('Unexpected Error Occured. Check HTML Element selector')

    element.onload = this.onload.bind( this )
  }

  /**
   * Handle gateway embedding network error
   */
  private networkError(){
    this.isConnected = false
    this.emit('error', new Error('Internet network problem') )
  }

  /**
   * Initiate embedding of gateway into current UI by 
   * check network and remote gateway availability.
   */
  load(){
    window
    .fetch( this.baseURL, { mode: 'no-cors' })
    .then( this.render.bind( this ) )
    .catch( this.networkError.bind( this ) )
  }

  /**
   * @return - Boolean that tells whether the gateway is 
   * loaded and ready for interaction
   */
  isReady(){ return this.chn && this.isConnected }

  /**
   * Create new stream through which user's current location
   * details will be pushed to the API level.
   * 
   * @param usertype - (Default: `client`) Type of user at the current location
   * @return - Readable stream
   */
  myLocation( usertype?: 'client' | 'agent' ){
    if( !this.chn ) return
    this.chn?.emit('pin:current:location', usertype || 'client' )

    const stream = new Stream()

    this.chn
    .on('current:location', ( location: GPSLocation  ) => stream.sync( location ) )
    .on('live:location:start', ( location: GPSLocation  ) => stream.sync( location ) )
    .on('live:location:update', ( location: GPSLocation  ) => stream.sync( location ) )
    .on('live:location:end', ( location: GPSLocation  ) => stream.sync( location ) )
    .on('current:location:error', ( message: string ) => stream.error( new Error( message ) ) )

    // Listen to stream closed
    stream
    .onerror( error => console.error('[Stream Error] ', error ) )
    .onclose( () => {
      if( !this.chn ) return

      this.chn
      .off('current:location')
      .off('current:location:live')
      .off('current:location:error')
    } )

    return stream
  }

  /**
   * Create new stream through which the current location details
   * of user's peer (Eg. `agent`) will be pushed to the API level.
   * 
   * @param position - Peer's current GPS location
   * @param caption - (Optional) Caption information of the peer
   * @return - Readable stream
   */
  peerLocation( position: GPSLocation , caption?: Caption ){
    if( !this.chn ) return
    this.chn?.emit('pin:peer:location', { id: 'peer', position, caption } )
    
    const stream = new Stream
    
    // Listen to incoming new position data
    stream
    .on('data', ({ position, caption }: any ) => {
      if( !position )
        return stream.error( new Error('Invalid Data') )

      this.chn?.emit('pin:peer:location', { id: 'peer', position, caption } )
    })
    .onerror( error => console.error('[Stream Error] ', error ) )
    .onclose( () => this.chn?.emit('unpin:peer:location', 'peer') )

    return stream
  }

  /**
   * Open a live stream through which the current location details
   * and profile information of all periferals entities around 
   * this user (Eg. `bike`, `car`, ...) will be pushed to the 
   * API level.
   * 
   * @param list - List of detected periferals entities around this user.
   * @return - Live Readable Stream (LRS)
   */
  periferals( list: Entity[] ){
    if( !this.chn ) return

    const self = this
    let _CLOSED = false
    
    this.chn?.emit('show:periferals', list )
    
    const
    stream = new Stream,
    controls: ControlEntity = {
      /**
       * Add new entity to the periferals list
       * 
       * @param entity - GPS location and profile of the entity
       */
      add( entity ): Promise<void> {
        return new Promise( ( resolve, reject ) => {
          if( _CLOSED ) return

          // Maintain initial list of periferals: Prevent duplicated entity
          for( let x = 0; x < list.length; x++ )
            if( list[x].id === entity.id ){
              list.splice( x, 1 )
              self.chn?.emit('remove:periferal:entity', entity.id )
              break
            }
          
          // Track response timeout
          let TIMEOUT: any
          
          // Add new entity
          list.push( entity )
          self.chn?.emit('add:periferal:entity', entity, () => {
            clearTimeout( TIMEOUT )
            resolve()

            self.emit('periferals--stream', 'add', entity )
          } )

          setTimeout( () => reject('Add entity timeout'), 8000 )
        })
      },

      /**
       * Remove an entity (vehicle, premises) from the periferals list
       * 
       * @param id - ID of targeted entity
       */
      remove( id ): Promise<void> {
        return new Promise( ( resolve, reject ) => {
          if( _CLOSED ) return
          
          // Track response timeout
          let TIMEOUT: any

          list = list.filter( each => { return each.id !== id } )
          self.chn?.emit('remove:periferal:entity', id, () => {
            clearTimeout( TIMEOUT )
            resolve()

            self.emit('periferals--stream', 'remove', id )
          } )

          setTimeout( () => reject('Remove entity timeout'), 8000 )
        } )
      },
      
      /**
       * Change mobile entities position on the map
       * 
       * @param location - New GPS location of the entity
       */
      move( location ): Promise<void> {
        return new Promise( ( resolve, reject ) => {
          if( _CLOSED ) return
          
          // Track response timeout
          let TIMEOUT: any
          
          self.chn?.emit('move:periferal:entity', location, () => {
            clearTimeout( TIMEOUT )
            resolve()

            self.emit('periferals--stream', 'move', location )
          } )

          setTimeout( () => reject('Remove entity timeout'), 8000 )
        } )
      }
    }

    const
    /**
     * 
     */
    live = ( fn: LRSControlsListener ) => {
      fn( controls )
      return stream
    },
    close = ( fn?: LRSErrorListener ) => {
      if( _CLOSED ) return

      this.chn?.emit('remove:periferals', ( error: string | boolean ) => {
        if( typeof error == 'string' ) 
          return typeof fn == 'function' && fn( new Error( error ) )

        _CLOSED = true
        stream.isActive() && stream.close()

        typeof fn == 'function' && fn()
      })
    }
    
    this.on('periferals--stream', ( action, dataset ) => stream.sync({ action, dataset, list }) )
    // Listen to stream closed
    stream
    .onerror( error => console.error('[Stream Error] ', error ) )
    .onclose( ( fn?: () => void ) => {
      this.off('periferals--stream', fn || (() => {}) )
      close()
    })
    
    return { live, pipe: stream.pipe, close }
  }

  /**
   * Set service pickup point.
   * 
   * @param location - Location coordinates
   * @param caption - (Optional) Caption information of the pickup point
   */
  async pickupPoint( location: Coordinates, caption?: Caption ): Promise<void> {
    // Default pickup caption
    const _caption: Caption = { 
      label: 'Pickup point',
      ...(caption || {})
    }
    
    await this.controls?.setOrigin( location, _caption )
  }

  /**
   * Set service dropoff point.
   * 
   * @param location - Location coordinates
   * @param caption - (Optional) Caption information of the pickup point
   */
  async dropoffPoint( location: Coordinates, caption?: Caption ): Promise<void> {
    // Default destination caption
    const _caption: Caption = {
      label: 'Destination point',
      ...(caption || {})
    }
    
    await this.controls?.setDestination( location, _caption )
  }

  /**
   * Create new stream through which navigation details of
   * this user's peer will be display on the user's map also
   * pushed to the API level.
   * 
   * @return - Readable stream
   */
  peerDirection(){
    if( !this.chn ) return
    const stream = new Stream

    stream
    .on('data', ({ status, direction, position }: any ) => {
      if( !direction || !position )
        return stream.error( new Error('Invalid Data') )
        
      this.controls?.upsertDirection({ direction, position })

      switch( status ){
        case 'STALE':
        case 'STARTED':
        case 'LONG_STOP':
        case 'LOW_TRAFFIC':
        case 'HIGH_TRAFFIC':
        case 'MODERATE_TRAFFIC':
        case 'SPEED_WARNING':
        case 'NEARBY':
        case 'ARRIVED': this.emit(`pe:${status.toLowerCase()}`); break
        case 'UNAVAILABLE': {
          this.emit(`pe:closed`)
          stream.isActive() && stream.close()
        } break
      }
    })
    .onerror( error => console.error('[Stream Error] ', error ) )

    return stream
  }

  /**
   * Initiate user (Eg. agent) live navigation on the map 
   * and create a new stream through which the navigation details 
   * will be pushed to the API level.
   * 
   * @param itinerary - Route origin, waypoints, destination
   * @return - Readable stream
   */
  navigation( itinerary: Itinerary ){
    return new Promise( ( resolve, reject ) => {
      if( !this.chn ) return

      const initialize = () => {
        const stream = new Stream

        // Sync with navigation route update
        this.chn?.on('navigation:direction', ({ status, direction, position }) => {
          stream.sync({ status, direction, position })

          switch( status ){
            case 'STALE':
            case 'STARTED':
            case 'LONG_STOP':
            case 'LOW_TRAFFIC':
            case 'HIGH_TRAFFIC':
            case 'MODERATE_TRAFFIC':
            case 'SPEED_WARNING':
            case 'NEARBY':
            case 'ARRIVED': this.emit(`pe:${status.toLowerCase()}`); break
            case 'UNAVAILABLE': {
              this.emit(`pe:closed`)
              stream.isActive() && stream.close()
            } break
          }
        })

        stream
        // Listen location/position update
        .on('data', ({ position }: any ) => {
          if( !position )
            return stream.error( new Error('Invalid Data') )
          
          this.controls?.navigate( position )
        })
        .onerror( error => console.error('[Stream Error] ', error ) )
        .onclose( () => {
          this.chn?.off('navigation:direction')
          this.controls?.stopNavigation()
        })

        resolve( stream )
      }
      
      // Set route
      this.controls?.setRoute( itinerary )
                    .then( async () => {
                      // Initialize navigation point to current location
                      const position = itinerary.origin?.coords || await this.controls?.getCurrentLocation()
                      if( !position ) return reject('Unable to get current location')

                      initialize()

                      await this.controls?.startNavigation()
                      await this.controls?.setInitialPosition( position )
                    } )
                    .catch( reject )
    } )
  }
}