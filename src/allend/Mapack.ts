
import type { GPSLocation, Coordinates, MapLayerStyle, MapOptions, LivePosition, Caption, WaypointIndex, MapWaypoint, Entity } from '../types'
import { EventEmitter } from 'events'
import IOF from 'iframe.io'
import Stream from '../utils/stream'

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
   * Manual controls of the map remotely
   */
  controls = {
    /**
     * Refresh access token to remove server
     * 
     * @param token - Latest access token
     */
    refreshToken: ( token: string ) => {
      if( !token ) return
      this.options.accessToken = token
    },

    /**
     * Update map style
     * 
     * @param style - Map style ID
     */
    setMapStyle: ( style: MapLayerStyle ): Promise<void> => {
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
    },

    /**
     * @return - User's current GPS location
     */
    getCurrentLocation: (): Promise<GPSLocation | null> => {
      return new Promise( ( resolve, reject ) => {
        // Set timeout
        const timeout = setTimeout( () => reject('Timeout'), 12000 )
        // Get current location
        this.chn?.emit('get:current:location', ( error: string | boolean, location: GPSLocation ) => {
          if( error ) return reject( error )

          clearTimeout( timeout )
          resolve( location )
        } )
      } )
    },
    /**
     * Pin user's current location on the current active map
     * 
     * @return - User's current GPS location coordinates or `null` when it failed
     */
    pinCurrentLocation: (): Promise<Coordinates | null> => {
      return new Promise( ( resolve, reject ) => {
        // Set timeout
        const timeout = setTimeout( () => reject('Timeout'), 12000 )
        // Pin user's current location on the map
        this.chn?.emit('pin:current:location', ( error: string | boolean, location: Coordinates | null ) => {
          if( error ) return reject( error )

          clearTimeout( timeout )
          resolve( location )
        } )
      } )
    },

    /**
     * Get a location coordinates of placed that matched this name
     * 
     * @param name - Place name to resolve
     * @return - Array list of coordinates
     */
    resolvePlace: ( name: string ): Promise<Coordinates | null> => {
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
    },
    /**
     * Get a location details of placed that matched this coordinates
     * 
     * @param coords - Coordinates
     * @return - Array list of geocoding data
     */
    resolveCoordinates: ( coords: Coordinates | string ): Promise<Coordinates | null> => {
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
    },
    
    /**
     * Set route origin
     * 
     * @param coords - Coordinates of the route origin
     * @param caption - Caption information ot the origin
     */
    setOrigin: ( coords: Coordinates, caption: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:route:origin', { coords, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Remove added route origin
     */
    removeOrigin: (): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('remove:route:origin', ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Set route destination
     * 
     * @param coords - Coordinates of the route destination
     * @param caption - Caption information ot the destination
     */
    setDestination: ( coords: Coordinates, caption: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:route:destination', { coords, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Remove added route destination
     */
    removeDestination: (): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('remove:route:destination', ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Set a route waypoint
     * 
     * @param coords - Coordinates of the route waypoint
     * @param index - (Optional) Define unique order index of the waypoint on the route
     * @param caption - (Optional) Caption information ot the waypoint
     */
    addWaypoint: ( coords: Coordinates, caption: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('add:route:waypoint', { coords, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Update a route waypoint specs
     * 
     * @param index - Order index of the waypoint to update
     * @param coords - Coordinates of the route waypoint
     * @param caption - (Optional) Caption information ot the waypoint
     */
    updateWaypoint: ( index: number, coords: Coordinates, caption?: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('update:route:waypoint', { index, coords, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Remove added route waypoint
     * 
     * @param index - Order index of the waypoint to be removed
     */
    removeWaypoint: ( index: number ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('remove:route:waypoint', index, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Set a caption details of a route point
     * 
     * @param index - Order index of targeted route waypoint
     * @param caption - Caption information to set
     */
    setWaypointCaption: ( index: WaypointIndex, caption?: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:waypoint:caption', { index, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Update the caption details of a route point
     * 
     * @param index - Order index of targeted route waypoint
     * @param caption - Caption information to update
     */
    updateWaypointCaption: ( index: WaypointIndex, caption?: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('update:waypoint:caption', { index, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },

    /**
     * Set all the route waypoints
     * 
     * @param itinerary - Array of coordinates and captions of the route waypoints
     */
    setRoute: ( itinerary: MapWaypoint[] ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:route', itinerary, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },

    /**
     * Refresh navigation direction data with fresh
     * coordinates.
     */
    upsertDirection: ( route: any ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('upsert:navigation:direction', route, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Initialize navigation direction on the map
     * 
     * @position - Current position of the subject
     */
    setInitialPosition: ( position: GPSLocation ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('initial:navigation:position', position, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Load & Start navigation direction on the map
     */
    startNavigation: (): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('navigation:load', ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Stop initiated navigation and remove from the map
     * 
     * @return - Instance of the navigator
     */
    stopNavigation: (): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('navigation:dismiss', ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    /**
     * Move from current location to the next location
     * 
     * @position - Current position of the subject
     * @return - Instance of the navigator
     */
    navigate: ( position: GPSLocation ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('navigation:navigate', position, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    }
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

    this.chn = new IOF({ type: 'WINDOW', debug: this.isDev })
    this.chn.initiate( iframe.contentWindow as Window, this.baseURL )

    this.chn
    .once('connect', () => {
      console.log('----------- mapack connect', { ...this.options, origin: window.origin })
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
    .on('current:location:live', ( location: GPSLocation  ) => stream.sync( location ) )
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
    
    await this.controls.setOrigin( location, _caption )
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
    
    await this.controls.setDestination( location, _caption )
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
        
      this.controls.upsertDirection({ direction, position })

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
   * @param route - Set the complete route of the service.
   * @return - Readable stream
   */
  navigation( route: any ){
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
          
          this.controls.navigate( position )
        })
        .onerror( error => console.error('[Stream Error] ', error ) )
        .onclose( () => {
          this.chn?.off('navigation:direction')
          this.controls.stopNavigation()
        })

        resolve( stream )
      }
      
      // Set route
      this.controls
          .setRoute( route )
          .then( async () => {
            // Initialize navigation point to current location
            const position = await this.controls.getCurrentLocation()
            if( !position ) return reject('Unable to get current location')

            await this.controls.startNavigation()
            await this.controls.setInitialPosition( position )
            
            initialize()
          } )
          .catch( reject )
    } )
  }
}