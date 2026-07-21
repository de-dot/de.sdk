import { baseURL } from '../baseUrl'
import type { AuthRequestOptions } from '../types/auth'

const ACCESS_TOKEN_EXPIRY = 3.75 // in 3 minutes 45 seconds

// ─── Config ───────────────────────────────────────────────────────────────────
//
// Server-side Auth — connector credentials (cid + secret) → access token.
// Use on the backend; never expose cid/secret to the client.
//
//   const auth = new Auth({ context, cid, secret, env })
//   const token = await auth.getToken()

export type AuthConfig = {
	context: string
	cid: string
	secret: string
	remoteOrigin?: string
	env?: 'dev' | 'staging' | 'prod'
	version?: number
	autorefresh?: boolean
	onNewToken?: ( token: string ) => void
	/** Host to substitute for `localhost` in `dev` (Eg. a native emulator) */
	devHostname?: string
}

type AuthResponse = {
  error: boolean
  message: string
  data: {
    token: string
  }
}

export default class Auth {
  private version: number
  private env: AuthConfig['env']
  private cid: string
  private secret: string
  private context: string
  private remoteOrigin?: string
  private refreshTimer?: NodeJS.Timeout
  private autorefresh?: boolean
  private onNewToken?: (token: string) => void
  private baseURL: string
  private isRotating: boolean = false
  public accessToken?: string

  constructor( config: AuthConfig ){
    if( !config )         throw new Error('Undefined config. Check https://doc.dedot.io/sdk/auth')
    if( !config.context ) throw new Error('Undefined context. Check https://doc.dedot.io/sdk/auth')
    if( !config.cid )     throw new Error('Undefined cid. Check https://doc.dedot.io/sdk/auth')
    if( !config.secret )  throw new Error('Undefined secret. Check https://doc.dedot.io/sdk/auth')

    this.context      = config.context
    this.cid          = config.cid
    this.secret       = config.secret
    this.remoteOrigin = config.remoteOrigin
    this.env          = config.env || 'dev'
    this.version      = config.version || 1
    this.baseURL      = baseURL('API', this.env, config.devHostname )
    this.autorefresh  = config.autorefresh || false
    this.onNewToken   = config.onNewToken
  }

  private async request<T>({ url, ...options }: AuthRequestOptions ): Promise<T> {
    const rawOptions: any = {
      method: 'GET',
      headers: {
        'origin': this.remoteOrigin,
        'de-user-agent': `De.remote/${this.version}.0`
      }
    }

    if( this.accessToken )
      rawOptions.headers.authorization = `Bearer ${this.accessToken}`

    if( options.body ){
      rawOptions.headers['content-type'] = 'application/json'
      if( typeof options.body === 'object' )
        options.body = JSON.stringify( options.body )
    }

    options = { ...rawOptions, ...options }

    this.debug('Auth request', `${this.baseURL}/v${this.version}/${url.replace(/^\//, '')}`, options )
    const response = await fetch(`${this.baseURL}/v${this.version}/${url.replace(/^\//, '')}`, options )
    
    return await response.json() as T
  }

  private debug( ...args: any[] ){
    this.env === 'dev' && console.debug('[Auth]', ...args )
  }
  private error( ...args: any[] ){
    console.error('[Auth]', ...args )
  }

  /**
   * Schedule next token rotation
   */
  private scheduleRotation(){
    if( !this.autorefresh ) return

    this.clearRotation()
    this.refreshTimer = setTimeout( () => this.rotateToken(), ACCESS_TOKEN_EXPIRY * 60 * 1000 )
  }

  /**
   * Clear rotation timer
   */
  private clearRotation(){
    if( !this.refreshTimer ) return

    clearTimeout( this.refreshTimer )
    this.refreshTimer = undefined
  }

  async getToken(): Promise<string>{
    const
    options: AuthRequestOptions = {
      url: '/access/token',
      method: 'POST',
      body: { context: this.context, cid: this.cid, secret: this.secret, remoteOrigin: this.remoteOrigin }
    },
    { error, message, data } = await this.request<AuthResponse>( options )
    if( error ) throw new Error( message )

    this.accessToken = data.token
    this.scheduleRotation() // Schedule auto-refresh
    
    return data.token
  }

  async rotateToken(): Promise<string> {
    // Prevent concurrent rotation attempts
    if( this.isRotating ){
      this.debug('Token rotation already in progress, skipping')
      return this.accessToken!
    }

    if( !this.accessToken )
      throw new Error('No access token found')

    this.isRotating = true

    try {
      const
      options: AuthRequestOptions = {
        url: '/access/token/rotate',
        method: 'PATCH',
        body: { secret: this.secret }
      },
      { error, message, data } = await this.request<AuthResponse>( options )
      if( error ) throw new Error( message )

      this.accessToken = data.token

      // Notify callback listener
      if( typeof this.onNewToken === 'function' )
        try { this.onNewToken( data.token ) }
        catch( callbackError ){ this.error('[Auth] Error in onNewToken callback:', callbackError) }

      // Schedule next rotation
      this.scheduleRotation()
      
      this.debug('Token rotated successfully')
      return data.token
    }
    catch( error: any ){
      this.debug('Refresh access token failed:', error.message)
      
      try {
        // Fallback: Get new token instead
        const newToken = await this.getToken()
        this.debug('Fallback to new token successful')
        
        // Notify callback listener about new token
        if( this.onNewToken )
          try { this.onNewToken( newToken ) }
          catch( callbackError ){ this.error('Error in onNewToken callback:', callbackError) }
        
        return newToken
      }
      catch( fallbackError: any ){
        this.error('Fallback to new token also failed:', fallbackError.message)
        throw fallbackError
      }
    }
    finally { this.isRotating = false }
  }

  /**
   * Stop auto-refresh and clean up resources
   */
  stopAutoRefresh(){
    this.debug('Stopping auto-refresh')
    
    this.clearRotation()
    this.autorefresh = false
  }

  /**
   * Start auto-refresh
   */
  startAutoRefresh(){
    this.debug('Starting auto-refresh')
    
    this.autorefresh = true
    this.scheduleRotation()
  }

  /**
   * Clean up all resources
   */
  destroy(){
    this.debug('Destroying Auth instance')
    this.stopAutoRefresh()

    this.accessToken = undefined
    this.onNewToken = undefined
  }
}