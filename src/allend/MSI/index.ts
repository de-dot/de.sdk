import type { MapOptions } from '../../types'

import { EventEmitter } from 'events'
import IOF from 'iframe.io'
import Handles from './Handles'
import Controls from './Controls'
import Plugins, { type Plugin } from './Plugins'

const
SANDBOX_RULES = ['allow-scripts', 'allow-same-origin'],
REQUIRED_FEATURES = ['geolocation'],
REGISTERED_PLUGINS: Record<string, Plugin<any>> = {},

// How long to wait for the gateway to embed, connect and bind
LOAD_TIMEOUT = 30000,

/**
 * Events the gateway is allowed to send us. Anything else is dropped by the
 * transport before it reaches a listener.
 */
ALLOWED_INCOMING_EVENTS = [
  'error',
  'ready',
  'pick:location',
  'current:location',
  'current:location:error',
  'live:location:start',
  'live:location:update',
  'live:location:end',
  'route',
  'navigation:direction'
]

export interface MSIInterface {
  controls: Controls,
  handles: Handles,
  plugins: Plugins
}

export default class MSI extends EventEmitter {
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
   * Listen to embedded iframe load
   * 
   * @param e - DOM EventTarget object
   */
  private onload( e: Event ){
    const iframe = e.target as HTMLIFrameElement

    // Remove all previous listeners when iframe reloaded
    this.chn && this.chn.removeListeners()

    this.chn = new IOF({
      type: 'WINDOW',
      allowedIncomingEvents: ALLOWED_INCOMING_EVENTS,
      maxMessagesPerSecond: 100,
      connectionTimeout: 10000
    })
    this.chn.initiate( iframe.contentWindow as Window, this.baseURL )

    this.chn
    .once('connect', () => {
      this.chn?.emit('bind', { ...this.options, origin: window.origin }, ( error: string | boolean ) => {
        if( error )
          return this.emit('error', new Error( error as string ) )
      
        this.isConnected = true
      })
    })
    .on('error', ( error: Error | string ) => this.emit('error', typeof error == 'object' ? error : new Error( error ) ) )
    .on('ready', () => {
      this.emit('ready')
      this.emit('loaded', this.chn )
    })
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
   * Surface a failure that happened while embedding the gateway
   */
  private embedError( error: Error ){
    this.isConnected = false
    this.emit('error', error )
  }

  /**
   * Initiate embedding of gateway into current UI by 
   * check network and remote gateway availability.
   */
  load( timeout: number = LOAD_TIMEOUT ): Promise<MSIInterface> {
    return new Promise( ( resolve, reject ) => {
      /**
       * Without this the promise stays pending forever whenever the iframe
       * never loads or the host never completes `bind`.
       */
      const timer = setTimeout( () => {
        this.isConnected = false
        reject( new Error('MSI gateway load timeout') )
      }, timeout )

      const initializeAPI = ( chn: IOF ) => {
        clearTimeout( timer )

        const
        /**
         * Manual controls of the map remotely
         */
        controls = new Controls( chn, this.options ),
        /**
         * Initialize handles
         */
        handles = new Handles( chn, controls, this.options ),
        /**
         * Initialize plugins & mount preloaded ones
         */
        plugins = new Plugins( chn, handles, controls, this.options )
        plugins.mount( REGISTERED_PLUGINS )
        
        resolve({ controls, handles, plugins })
      }

      this
      .once('loaded', initializeAPI )
      .once('error', ( error: Error ) => {
        clearTimeout( timer )
        reject( error )
      } )

      window
      .fetch( this.baseURL, { mode: 'no-cors' })
      // Only a genuine reachability failure is a network problem
      .catch( () => { throw new Error('Internet network problem') } )
      /**
       * Kept in a separate step so a `render` failure (Eg. a missing container
       * element) reports itself rather than being relabelled a network error.
       */
      .then( () => this.render() )
      .catch( this.embedError.bind( this ) )
    } )
  }

  /**
   * @return - Boolean that tells whether the gateway is 
   * loaded and ready for interaction
   */
  isReady(){ return this.chn && this.isConnected }

  /**
   * Extend the kit's functionalities
   * 
   * @param name - Name of the plugin that will be later used to access the plugin object interface
   * @param fn - Function containing the logic of the plugin
   */
  plugin<T>( name: string, fn: Plugin<T> ){
    REGISTERED_PLUGINS[ name ] = fn
  }
}