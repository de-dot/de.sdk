import type { AccessOptions, UserSession } from '../types/access'
import type { HTTPRequestOptions } from '../types'
import { baseURL } from '../baseUrl'

type AccessType = 'API' | 'ASI'

const USER_ACCOUNT_SERVICE = 'De.API'

/**
 * Resolve a fetch implementation for the host runtime.
 *
 * Node 18+, every browser and React Native all expose a global `fetch`, so that
 * is the first and usual answer. `node-fetch` remains only as a fallback for
 * Node versions predating the global.
 *
 * The previous check tested `globalThis.window && globalThis.fetch`, which was
 * wrong for React Native: there is no `window` there but `fetch` is global, so
 * it fell through to importing node-fetch and broke. Testing for `fetch`
 * directly is what lets one Access layer serve node, browser and native.
 */
async function resolveFetch(): Promise<typeof globalThis.fetch> {
  if( typeof globalThis?.fetch === 'function' )
    return globalThis.fetch

  return ( await import('node-fetch') ).default as any
}

export default class AccessManager {
  private atype: AccessType
  private version: number
  private platform: AccessOptions['platform']
  private baseURL: string
  protected accessToken?: string
  protected remoteOrigin?: string
  protected session?: UserSession

  constructor( options: AccessOptions, atype: AccessType ){
    if( !options ) throw new Error('Undefined Access Configuration')
    if( !options.context ) throw new Error('Undefined Context Reference. Check https://doc.dedot.io/sdk/auth')
    if( !options.accessToken ) throw new Error('Undefined Access Token. Check https://doc.dedot.io/sdk/auth')
    
    this.atype = atype
    this.version = options.version || 1
    this.platform = options.platform || 'proxy'
    this.accessToken = options.accessToken
    this.remoteOrigin = options.remoteOrigin
    this.session = options.session
    this.baseURL = baseURL( this.atype === 'ASI' ? 'ASI' : 'API', options.env || 'dev', options.devHostname )
  }

  async request<Response>({ url, ...options }: HTTPRequestOptions ): Promise<Response> {
    const rawOptions: any = {
      method: 'GET',
      headers: {
        /**
         * Default User agent for SDK request calls
         * 
         * NOTE: Later replace by latest SDK version
         */
        origin: this.remoteOrigin,
        'de-user-agent': `De.${this.platform}/${this.version}.0`
      }
    }

    if( this.atype === 'ASI' )
      rawOptions.headers['de-auth-service'] = USER_ACCOUNT_SERVICE

    if( this.accessToken )
      rawOptions.headers.authorization = `Bearer ${this.accessToken}`

    /**
     * User-session credentials, sent alongside the bearer token rather than
     * instead of it. `isConnected` (AUX agent routes) reads only this pair;
     * `isAuthorized` reads only the bearer. Routes guarded by either one are
     * then reachable from a single client.
     */
    if( this.session ){
      rawOptions.headers['de-auth-token'] = this.session.token
      rawOptions.headers['de-auth-device'] = this.session.device
    }

    if( options.body ){
      rawOptions.headers['content-type'] = 'application/json'
      if( typeof options.body === 'object' )
        options.body = JSON.stringify( options.body )
    }

    if( typeof options.headers == 'object' )
      options.headers = {
        ...options.headers,
        ...rawOptions.headers
      }

    options = { ...rawOptions, ...options }

    url = `${this.baseURL}/v${this.version}/${url.replace(/^\//, '')}`

    const fetch = await resolveFetch()

    return await ( await fetch( url, options as any ) ).json() as Response
  }

  setToken( token: string ): void { this.accessToken = token }

  /** Attach or replace the signed-in user after construction. */
  setSession( session: UserSession ): void { this.session = session }

  /** Drop the user session — e.g. on sign-out. */
  clearSession(): void { this.session = undefined }
}