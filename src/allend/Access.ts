import type { AccessOptions, UserSession } from '../types/access'
import type { HTTPRequestOptions } from '../types'
import { baseURL } from '../baseUrl'
import APIError from '../error'

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
  private timeout?: number

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
    this.timeout = options.timeout
    this.baseURL = options.baseUrl?.replace( /\/+$/, '' )
                    || baseURL( this.atype === 'ASI' ? 'ASI' : 'API', options.env || 'dev', options.devHostname )
  }

  async request<Response>({ url, timeout, ...options }: HTTPRequestOptions ): Promise<Response> {
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

    /**
     * Bound the request when a deadline is configured.
     *
     * `AbortSignal.timeout` is not in the pre-18 Node the node-fetch fallback
     * exists for, so this is guarded rather than assumed. A missing signal
     * leaves the previous unbounded behaviour, which is the right degradation:
     * the request still goes out.
     */
    const deadline = timeout ?? this.timeout
    if( deadline && typeof AbortSignal?.timeout === 'function' )
      ( options as any ).signal = AbortSignal.timeout( deadline )

    url = `${this.baseURL}/v${this.version}/${url.replace(/^\//, '')}`

    const fetch = await resolveFetch(),
          response = await fetch( url, options as any )

    /**
     * Everything De. answers is the `{ error, message, data }` envelope, so a
     * body that will not parse did not come from De. — a gateway 502 page, a
     * proxy timeout, an empty 204. Reporting that as a JSON syntax error hides
     * the only two facts worth having, which are the status and the URL.
     */
    let body: any
    try { body = await response.json() }
    catch {
      throw new APIError(`${options.method} ${url} — ${response.statusText || 'no JSON body'}`, response.status )
    }

    /**
     * Failures are raised here rather than in each client.
     *
     * The clients all threw on `error: true` anyway; doing it once is what
     * lets the status travel with the message, which is the part they could
     * not have supplied — by the time a client sees the envelope, the response
     * is gone. Their own guards stay as the fallback for a client built over
     * some other transport.
     */
    if( body?.error || !response.ok )
      throw new APIError( body?.message || `${options.method} ${url} failed`, response.status, body )

    return body as Response
  }

  setToken( token: string ): void { this.accessToken = token }

  /** Attach or replace the signed-in user after construction. */
  setSession( session: UserSession ): void { this.session = session }

  /** Drop the user session — e.g. on sign-out. */
  clearSession(): void { this.session = undefined }
}