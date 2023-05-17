
import type { GPSLocation, LngLat, MapLayerStyle, MapOptions, Vehicle, LivePosition, Caption, WaypointIndex, Waypoint, MapWaypoint } from '../types'
import { EventEmitter } from 'events'
import IOF from 'iframe.io'
import { Stream } from './Utils'

const
SANDBOX_RULES = ['allow-scripts', 'allow-same-origin'],
REQUIRED_FEATURES = ['geolocation']

export interface ControlVehicle {
  add: ( vehicle: Vehicle, callback?: () => void ) => void
  remove: ( id: string, callback?: () => void ) => void
  move: ( update: LivePosition, callback?: () => void ) => void
}

export default class Mapack extends EventEmitter {
  private isDev: boolean
  private baseURL: string
  private isConnected: boolean
  private options: MapOptions
  private chn?: IOF

  constructor( options: MapOptions ){
    super()

    this.options = options
    if( !this.options.accessToken )
      throw new Error('Invalid Access Token')

    this.isDev = this.options.env == 'dev' || false
    this.baseURL = this.isDev ? 'http://localhost:4800' : 'https://msi.delidev.com'

    this.isConnected = false
  }
  
  controls = {
    refreshToken: ( token: string ) => {
      if( !token ) return
      this.options.accessToken = token
    },

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
    pinCurrentLocation: (): Promise<LngLat | null> => {
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
    },

    resolvePlace: ( name: string ): Promise<LngLat | null> => {
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
    resolveCoordinates: ( coords: LngLat | string ): Promise<LngLat | null> => {
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

    setOrigin: ( lngLat: LngLat, caption: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:route:origin', { lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    setDestination: ( lngLat: LngLat, caption: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:route:destination', { lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    addWaypoint: ( lngLat: LngLat, caption: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('add:route:waypoint', { lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    updateWaypoint: ( index: number, lngLat: LngLat, caption?: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('update:route:waypoint', { index, lngLat, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    removeWaypoint: ( index: number ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('remove:route:waypoint', index, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },

    setWaypointCaption: ( index: WaypointIndex, caption?: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:waypoint:caption', { index, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    updateWaypointCaption: ( index: WaypointIndex, caption?: Caption ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('update:waypoint:caption', { index, caption }, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },

    setRoute: ( itinerary: MapWaypoint[] ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('set:route', itinerary, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    upsertRoute: ( route: any ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('upsert:navigation:route', route, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    setInitialPosition: ( position: GPSLocation ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('initial:navigation:position', position, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    startNavigation: (): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('navigation:load', ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    stopNavigation: (): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('navigation:dismiss', ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    },
    navigate: ( position: GPSLocation ): Promise<void> => {
      return new Promise( ( resolve, reject ) => {
        this.chn?.emit('navigation:navigate', position, ( error: string | boolean ) => {
          if( error ) return reject( error )
          resolve()
        } )
      } )
    }
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

    const stream = new Stream

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

  periferals( list: Vehicle[] ){
    if( !this.chn ) return

    const self = this
    let _CLOSED = false
    
    this.chn?.emit('show:periferals', list )
    
    const
    stream = new Stream,
    controls: ControlVehicle = {
      add( vehicle, callback ){
        if( _CLOSED ) return

        // Maintain initial list of periferals: Prevent duplicated vehicle
        for( let x = 0; x < list.length; x++ )
          if( list[x].id === vehicle.id ){
            list.splice( x, 1 )
            self.chn?.emit('remove:periferal:vehicle', vehicle.id )
            break
          }
        
        // Add new vehicle
        list.push( vehicle )
        self.chn?.emit('add:periferal:vehicle', vehicle, () => {
          typeof callback == 'function' && callback()
          self.emit('periferals--stream', 'add', vehicle )
        } )
      },
      remove( id, callback ){
        if( _CLOSED ) return

        list = list.filter( each => { return each.id !== id } )
        self.chn?.emit('remove:periferal:vehicle', id, () => {
          typeof callback == 'function' && callback()
          self.emit('periferals--stream', 'remove', id )
        } )
      },
      move( update, callback ){
        if( _CLOSED ) return
        
        self.chn?.emit('move:periferal:vehicle', update, () => {
          typeof callback == 'function' && callback()
          self.emit('periferals--stream', 'move', update )
        } )
      }
    },
    live = ( fn: ( controls: ControlVehicle ) => void ) => {
      fn( controls )
      return stream
    },
    close = ( fn?: ( error?: Error | boolean ) => void ) => {
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
    .onclose( ( callback?: () => void ) => {
      this.off('periferals--stream', callback || (() => {}) )
      close()
    })
    
    return { live, pipe: stream.pipe, close }
  }

  async pickupPoint( location: LngLat, caption?: Caption ): Promise<void> {
    // Default pickup caption
    const _caption: Caption = { 
      label: 'Pickup point',
      ...(caption || {})
    }
    
    return await this.controls.setOrigin( location as LngLat, _caption )
  }

  async dropoffPoint( location: LngLat, caption?: Caption ): Promise<void> {
    // Default destination caption
    const _caption: Caption = {
      label: 'Destination point',
      ...(caption || {})
    }
    
    return await this.controls.setDestination( location as LngLat, _caption )
  }

  direction(){
    if( !this.chn ) return
    const stream = new Stream

    stream
    .on('data', ({ status, direction, position }: any ) => {
      if( !direction || !position )
        return stream.error( new Error('Invalid Data') )
        
      this.controls.upsertRoute({ direction, position })

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
          stream.isActive() && stream.close()
        } break
      }
    })
    .onerror( error => console.error('[Stream Error] ', error ) )

    return stream
  }

  navigation( itinerary: any ){
    return new Promise( ( resolve, reject ) => {
      if( !this.chn ) return

      const initialize = () => {
        const stream = new Stream

        // Sync with navigation route update
        this.chn?.on('navigation:direction', ({ status, direction, position }) => {
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
              stream.isActive() && stream.close()
            } break
          }
        } )

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
        } )

        resolve( stream )
      }
      
      // Set route itinerary
      this.controls
          .setRoute( itinerary )
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