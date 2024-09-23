import type { MapOptions, TObject } from '../../types'

import { EventEmitter } from 'events'
import IOF from 'iframe.io'
import Handles from './Handles'
import Controls from './Controls'
import Plugins, { Plugin } from './Plugins'

const
SANDBOX_RULES = ['allow-scripts', 'allow-same-origin'],
REQUIRED_FEATURES = ['geolocation'],
REGISTERED_PLUGINS: TObject<Plugin> = {}

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
        this.emit('loaded', this.chn )
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
    return new Promise( ( resolve, reject ) => {
      const loaded = ( chn: IOF ) => {
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
      .once('loaded', loaded )
      .once('error', reject )

      window
      .fetch( this.baseURL, { mode: 'no-cors' })
      .then( this.render.bind( this ) )
      .catch( this.networkError.bind( this ) )
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
  plugin( name: string, fn: Plugin ){
    REGISTERED_PLUGINS[ name ] = fn
  }
}