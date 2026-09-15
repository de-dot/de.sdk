import { baseURL } from '../baseUrl'
import type { AuthRequestOptions } from '../types/auth'

/**
 * When to rotate, in minutes.
 *
 * De.'s own default token life is four minutes, so this beats it by fifteen
 * seconds. It is a default and not a constant because the server's life is
 * configurable — `API_ACCESS_TOKEN_EXPIRY` — and these two numbers are
 * otherwise free to drift apart in the direction that breaks: a deployment
 * that shortens the token to two minutes leaves every client rotating a
 * credential that expired ninety seconds ago, and every call in between is
 * answered 401 with nothing to say why.
 */
const ACCESS_TOKEN_EXPIRY = 3.75

// ─── Config ───────────────────────────────────────────────────────────────────
//
// Connector credentials → access token, with one of two credentials:
//
//   Server — the secret (`de_sk_…`). Never let it leave the server.
//     const auth = new Auth({ context, cid, secret, env })
//
//   App — the publishable key (`de_pk_…`), made to ship inside a bundle. Its
//   token acts for nobody and reaches only what a map needs.
//     const auth = new Auth({ context, publicKey, env, autorefresh: true })
//
//   const token = await auth.getToken()
//
// Anything an app needs beyond that goes through its own server, which holds
// the secret and hands the app a short-lived token it minted.

type AuthCommonConfig = {
	context: string
	remoteOrigin?: string
	env?: 'dev' | 'staging' | 'prod'
	version?: number
	/**
	 * Rotate the token ahead of expiry.
	 *
	 * Off by default, which is the trap: a long-lived process that forgets it
	 * works perfectly until the first expiry and then fails every call until
	 * it is restarted. Anything holding a token for longer than one request
	 * wants this on.
	 */
	autorefresh?: boolean
	/**
	 * Minutes between rotations. Defaults to 3.75 — set it below the De.
	 * deployment's `API_ACCESS_TOKEN_EXPIRY` when that is not the default 4.
	 */
	rotateAfterMins?: number
	onNewToken?: ( token: string ) => void
	/** Host to substitute for `localhost` in `dev` (Eg. a native emulator) */
	devHostname?: string
}

export type SecretAuthConfig = AuthCommonConfig & {
	cid: string
	/** `de_sk_…` — or `vs_…`, issued before the prefixes, which still works */
	secret: string
	/**
	 * Operator uid to embed in the minted token's scope.
	 *
	 * Routes behind `isAllowed` look the caller up in the `operators`
	 * collection by uid, so a token minted without one is rejected with
	 * "Require <uid> generated accessToken" no matter how valid the connector
	 * credentials are. Omit it for pure machine-to-machine access.
	 */
	uid?: string
	publicKey?: never
}

export type PublicAuthConfig = AuthCommonConfig & {
	/** `de_pk_…` — names its own connector, so there is no `cid` to send */
	publicKey: string
	cid?: never
	secret?: never
	uid?: never
}

export type AuthConfig = SecretAuthConfig | PublicAuthConfig

/**
 * Whether this code is running inside an app rather than on a server.
 *
 * A browser has a `document`; React Native says so on `navigator.product`.
 * Node, Bun, Deno and edge runtimes have neither.
 */
const inAppBundle = (): boolean =>
  typeof ( globalThis as any ).document !== 'undefined'
  || ( globalThis as any ).navigator?.product === 'ReactNative'

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
  private cid?: string
  private secret?: string
  private publicKey?: string
  private context: string
  private uid?: string
  private remoteOrigin?: string
  private refreshTimer?: NodeJS.Timeout
  private autorefresh?: boolean
  private rotateAfterMins: number
  private onNewToken?: (token: string) => void
  private baseURL: string
  private isRotating: boolean = false
  public accessToken?: string

  constructor( config: AuthConfig ){
    if( !config )         throw new Error('Undefined config. Check https://doc.dedot.io/sdk/auth')
    if( !config.context ) throw new Error('Undefined context. Check https://doc.dedot.io/sdk/auth')

    if( config.publicKey ){
      if( config.cid || config.secret )
        throw new Error('Pass either <publicKey>, or <cid> and <secret> — not both. Check https://doc.dedot.io/sdk/auth')
    }
    else {
      if( !config.cid )     throw new Error('Undefined cid. Check https://doc.dedot.io/sdk/auth')
      if( !config.secret )  throw new Error('Undefined secret. Check https://doc.dedot.io/sdk/auth')

      /**
       * A secret inside an app is a secret everyone who downloads the app
       * has. Refused here rather than documented, because the app that does
       * it works perfectly — nothing would ever say so.
       */
      if( inAppBundle() )
        throw new Error('A connector secret cannot be used inside an app. Use a publishable key (`publicKey`), or have your server mint the token. Check https://doc.dedot.io/sdk/auth')
    }

    this.context      = config.context
    this.uid          = config.uid
    this.cid          = config.cid
    this.secret       = config.secret
    this.publicKey    = config.publicKey
    this.remoteOrigin = config.remoteOrigin
    this.env          = config.env || 'dev'
    this.version      = config.version || 1
    this.baseURL      = baseURL('API', this.env, config.devHostname )
    this.autorefresh  = config.autorefresh || false
    this.rotateAfterMins = config.rotateAfterMins && config.rotateAfterMins > 0
                              ? config.rotateAfterMins
                              : ACCESS_TOKEN_EXPIRY
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

    /**
     * Method and URL only. This logged the whole request, and the body of
     * every one of these is a credential — the secret, or a bearer token —
     * printed into whatever collects a dev server's output.
     */
    this.debug('Auth request', options.method, `${this.baseURL}/v${this.version}/${url.replace(/^\//, '')}`)
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
    this.refreshTimer = setTimeout( () => this.rotateToken(), this.rotateAfterMins * 60 * 1000 )
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
      body: this.publicKey
              ? { context: this.context, publicKey: this.publicKey }
              : { context: this.context, cid: this.cid, secret: this.secret, remoteOrigin: this.remoteOrigin, ...( this.uid ? { uid: this.uid } : {} ) }
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

    /**
     * Rotation proves possession of the secret, which an app does not have.
     * A publishable key renews by minting afresh — same result, one call.
     */
    if( this.publicKey ){
      const token = await this.getToken()

      if( typeof this.onNewToken === 'function' )
        try { this.onNewToken( token ) }
        catch( callbackError ){ this.error('[Auth] Error in onNewToken callback:', callbackError) }

      return token
    }

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