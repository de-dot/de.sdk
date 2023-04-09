
import type { GPSLocation, LngLat, MapLayerStyle, MapOptions, Vehicle, LivePosition, Caption } from '../../types'
import { EventEmitter } from 'events'
import IOF from 'iframe.io'

const
SANDBOX_RULES = ['allow-scripts', 'allow-same-origin'],
REQUIRED_FEATURES = ['geolocation']

export type DataFn = ( data: string ) => void
export interface Stream<T> {
  sync: ( data: T ) => void
  on: ( _event: 'data', fn: DataFn ) => this
  setUpstream: ( stream: XStream ) => this
  pipe: ( stream: XStream ) => this
  error: ( error: Error ) => void
  onclose: ( fn: () => void ) => this
  close: () => void
}

export interface ControlVehicle {
  add: ( vehicle: Vehicle, callback?: () => void ) => void
  remove: ( id: string, callback?: () => void ) => void
  move: ( update: LivePosition, callback?: () => void ) => void
}

export class XStream implements Stream<any> {
  private _fns: DataFn[] = []
  private _exitFn = (() => {})
  private _downStream?: XStream
  private _upStream?: XStream

  sync( data: any ){
    this._fns.map( fn => fn( data ) )
  }

  on( _event: 'data', fn: DataFn ){
    this._fns.push( fn )
    return this
  }

  setUpstream( stream: XStream ){
    this._upStream = stream
    return this
  }

  pipe( stream: XStream ){
    stream.setUpstream( this )
    this._downStream = stream
    return this
  }

  error( error: Error ){
    //
  }

  close(){
    this._fns = []
    this._exitFn()

    this._downStream?.close() // Close down streams
    // this._upStream?.close() // Close up streams
  }

  onclose( fn: () => void ){ 
    this._exitFn = fn
    return this
  }
}

export default class Map extends EventEmitter {
  private isDev: boolean
  private baseURL: string
  protected isConnected: boolean
  protected options: MapOptions
  protected chn?: IOF

  constructor( options: MapOptions ){
    super()

    this.options = options
    if( !this.options.accessToken )
      throw new Error('Invalid Access Token')

    this.isDev = this.options.env == 'dev' || false
    this.baseURL = this.isDev ? 'http://localhost:4800' : 'https://msi.delidev.com'

    this.isConnected = false
  }

  private onload( e: Event ){
    const iframe = e.target as HTMLIFrameElement

    // Remove all previous listeners when iframe reloaded
    this.chn && this.chn.removeListeners()

    this.chn = new IOF({ type: 'WINDOW', debug: this.isDev })
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
  }

  private render(){
    // Embed delivery gateway
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

  private networkError(){
    this.isConnected = false
    this.emit('error', new Error('Internet network problem') )
  }

  load(){
    window
    .fetch( this.baseURL, { mode: 'no-cors' })
    .then( this.render.bind( this ) )
    .catch( this.networkError.bind( this ) )
  }

  isReady(){ return this.chn && this.isConnected }

  myLocation( usertype?: 'client' | 'agent' ){
    if( !this.chn ) return
    this.chn?.emit('pin:current:location', usertype || 'client' )

    const stream = new XStream

    this.chn
    .on('current:location', ( location: GPSLocation ) => stream.sync( location ) )
    .on('current:location:live', ( location: GPSLocation ) => stream.sync( location ) )
    .on('current:location:error', ( message: string ) => stream.error( new Error( message ) ) )

    // Listen to stream closed
    stream.onclose( () => {
      if( !this.chn ) return

      this.chn
      .off('current:location')
      .off('current:location:live')
      .off('current:location:error')
    } )

    return stream
  }

  peerLocation( position: GPSLocation, caption?: Caption ){
    if( !this.chn ) return
    this.chn?.emit('pin:peer:location', { id: 'peer', position, caption } )
    
    const stream = new XStream
    
    // Listen to incoming new position data
    stream.on('data', ({ position, caption }: any ) => {
      if( !position )
        return stream.error( new Error('Invalid Data') )

      this.chn?.emit('pin:peer:location', { id: 'peer', position, caption } )
    })

    return stream
  }

  periferals( list: Vehicle[] ){
    if( !this.chn ) return

    const self = this
    this.chn?.emit('show:periferals', list )
    
    const
    stream = new XStream,
    vehicle: ControlVehicle = {
      add( data, callback ){
        // Maintain initial list of periferals: Prevent duplicated vehicle
        for( let x = 0; x < list.length; x++ )
          if( list[x].id === data.id ){
            list.splice( x, 1 )
            self.chn?.emit('remove:periferal:vehicle', data.id )
            break
          }
        
        // Add new vehicle
        list.push( data )
        self.chn?.emit('add:periferal:vehicle', data, () => {
          typeof callback == 'function' && callback()
          self.emit('periferals--stream')
        } )
      },
      remove( id, callback ){
        list = list.filter( each => { return each.id !== id } )
        self.chn?.emit('remove:periferal:vehicle', id, () => {
          typeof callback == 'function' && callback()
          self.emit('periferals--stream')
        } )
      },
      move( update, callback ){
        self.chn?.emit('move:periferal:vehicle', update, () => {
          typeof callback == 'function' && callback()
          self.emit('periferals--stream')
        } )
      }
    },
    live = ( fn: ( vehicle: ControlVehicle ) => void ) => fn( vehicle )
    
    this.on('periferals--stream', () => stream.sync( list ) )
    // Listen to stream closed
    stream.onclose( ( callback?: () => void ) => this.off('periferals--stream', callback || (() => {}) ) )
    
    return { live, pipe: stream.pipe }
  }

  private resolveLngLat( location: string ): Promise<LngLat | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get location coordinates from place name
      this.chn?.emit('resolve:place', location, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }

  pickupPoint( location: LngLat | string, caption?: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      const self = this
      
      function setOrigin( lngLat: LngLat, caption: Caption ){
        // Set route origin
        self.chn?.emit('set:route:origin', { lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      }

      // Resolve location place to coordination
      if( typeof location === 'string' )
        this.resolveLngLat( location )
            .then( lngLat => {
              if( !lngLat ) return reject('Place Not Found')
              setOrigin( lngLat, { label: location })
            })
            .catch( reject )

      else setOrigin( location, caption || {} )
    } )
  }

  dropoffPoint( location: LngLat | string, caption?: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      const self = this

      function setDestination( lngLat: LngLat, caption: Caption ){
        // Set route origin
        self.chn?.emit('set:route:destination', { lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      }

      // Resolve location place to coordination
      if( typeof location === 'string' )
        this.resolveLngLat( location )
            .then( lngLat => {
              if( !lngLat ) return reject('Place Not Found')
              setDestination( lngLat, { label: location })
            })
            .catch( reject )

      else setDestination( location, caption || {} )
    } )
  }

  waypoint( location: LngLat | string, caption?: Caption ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      const self = this

      function addWaypoint( lngLat: LngLat, caption: Caption ){
        // Set route origin
        self.chn?.emit('add:route:waypoint', { lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      }

      // Resolve location place to coordination
      if( typeof location === 'string' )
        this.resolveLngLat( location )
            .then( lngLat => {
              if( !lngLat ) return reject('Place Not Found')
              addWaypoint( lngLat, { label: location })
            })
            .catch( reject )

      else addWaypoint( location, caption || {} )
    } )
  }

  direction(){
    if( !this.chn ) return
    const stream = new XStream

    stream.on('data', ({ status, direction, position }: any ) => {
      if( !direction || !position )
        return stream.error( new Error('Invalid Data') )
      
      this.chn?.emit('set:direction:route', { direction, position } )

      switch( status ){
        case 'STARTED':
        case 'STALE':
        case 'LONG_STOP':
        case 'LOW_TRAFFIC':
        case 'MODERATE_TRAFFIC':
        case 'HIGH_TRAFFIC':
        case 'SPEED_WARNING':
        case 'ARRIVED':
        case 'ARRIVED': this.emit(`pe:${status.toLowerCase()}`); break
        case 'UNAVAILABLE': {
          this.emit(`pe:closed`)
          stream.close()
        } break
      }
    })

    return stream
  }

  navigation( route: any ){
    if( !this.chn ) return
    const stream = new XStream
    
    // Set navigation route
    this.chn?.emit('set:navigation:route', route )
    // Initialize navigation point to current location
    this.chn?.emit('get:current:location', ( error: string | boolean, { coords }: any | null ) => {
      if( error ) return

      const
      { latitude, longitude, heading } = coords,
      position: GPSLocation = { lng: longitude, lat: latitude, heading }

      this.chn?.emit('set:navigation:position', position )
    } )

    // Sync with navigation route update
    this.chn.on('navigation:direction', ({ status, direction, position }) => {
      stream.sync({ status, direction, position })

      switch( status ){
        case 'STARTED':
        case 'STALE':
        case 'LONG_STOP':
        case 'LOW_TRAFFIC':
        case 'MODERATE_TRAFFIC':
        case 'HIGH_TRAFFIC':
        case 'SPEED_WARNING':
        case 'ARRIVED':
        case 'ARRIVED': this.emit(`pe:${status.toLowerCase()}`); break
        case 'UNAVAILABLE': {
          this.emit(`pe:closed`)
          stream.close()
        } break
      }
    } )

    stream
    .onclose( () => this.chn?.off('navigation:direction') )
    // Listen location/position update
    .on('data', ({ position }: any ) => {
      if( !position )
        return stream.error( new Error('Invalid Data') )
      
      this.chn?.emit('navigation:navigate', position )
    })

    return stream
  }

  /**
   * 
   * setDirection( stream: RTStream{ setRoute, updateRoute, triggerStarted, triggerArrived } )
   * 
   * setNavigation( route?: Route ){
   *  return { pipe( fn: ( stream: RTStream{ setRoute, setPosition, updatePosition, triggerStarted, triggerArrived } )) }
   * }
   */
}

export class MapControls extends Map {

  constructor( options: MapOptions ){
    super( options)
  }

  refreshToken( token: string ){
    if( !token ) return
    this.options.accessToken = token
  }

  setMapStyle( style: MapLayerStyle ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Set style
      this.chn?.emit('set:map:style', style, ( error: string | boolean ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve()
      } )
    })
  }

  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get current location
      this.chn?.emit('get:current:location', ( error: string | boolean, location: GeolocationPosition ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( location )
      } )
    } )
  }

  pinCurrentLocation(): Promise<LngLat | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Pin user's current location on the map
      this.chn?.emit('pin:current:location', ( error: string | boolean, lngLat: LngLat | null ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( lngLat )
      } )
    } )
  }

  resolvePlace( name: string ): Promise<LngLat | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get location coordinates from place name
      this.chn?.emit('resolve:place', name, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }

  resolveCoordinates( coords: LngLat | string ): Promise<LngLat | null> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Get location place from coordinates
      this.chn?.emit('resolve:coordinates', coords, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }
}