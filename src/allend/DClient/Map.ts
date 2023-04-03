
import type { LngLat, MapLayerStyle, MapOptions } from '../../types'
import { EventEmitter } from 'events'
import IOF from 'iframe.io'

const
SANDBOX_RULES = ['allow-scripts', 'allow-same-origin'],
REQUIRED_FEATURES = ['geolocation']

export default class Map extends EventEmitter {
  private isDev: boolean
  private baseURL: string
  private chn: typeof IOF
  private isConnected: boolean
  private options: MapOptions

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

    this.chn = new IOF({ type: 'window', debug: this.isDev })
    this.chn.initiate( iframe.contentWindow, this.baseURL )

    this.chn
    .once('connect', () => {
      this.chn.emit('bind', { ...this.options, origin: window.origin }, ( error: Error ) => {
        if( error )
          return this.emit('error', new Error( error.message ) )
      
        this.isConnected = true
        this.emit('ready')
      })
    })
    .on('error', ( error: Error | string ) => this.emit('error', typeof error == 'object' ? error : new Error( error ) ) )
    .on('event', ( _event: string, ...args: any[] ) => this.emit( _event, ...args ) )
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

  refreshToken( token: string ){
    if( !token ) return
    this.options.accessToken = token
  }

  setMapStyle( style: MapLayerStyle ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      // Set timeout
      const timeout = setTimeout( () => reject('Timeout'), 12000 )
      // Set style
      this.chn.emit('set:map:style', style, ( error: string | boolean ) => {
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
      this.chn.emit('get:current:location', ( error: string | boolean, location: GeolocationPosition ) => {
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
      this.chn.emit('pin:current:location', ( error: string | boolean, lngLat: LngLat | null ) => {
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
      this.chn.emit('resolve:place', name, ( error: string | boolean, data: any ) => {
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
      this.chn.emit('resolve:coordinates', coords, ( error: string | boolean, data: any ) => {
        if( error ) return reject( error )

        clearTimeout( timeout )
        resolve( data )
      } )
    } )
  }

}