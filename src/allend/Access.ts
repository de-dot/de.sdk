import type { AccessOptions, UserSession } from '../types/access'
import type { HTTPRequestOptions } from '../types'
import { baseURL } from '../baseUrl'
import APIError from '../error'

/**
 * Which service the client addresses.
 *
 * De. is more than one server: de.arch answers the API, de.auth the ASI, and
 * de.workspace the control plane. They are separate hosts, so the client has
 * to say which one it means rather than assume the API.
 */
type AccessType = 'API' | 'ASI' | 'WSP'

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
  /**
   * The client's own `wid:TYPE:xcode`, base64-encoded.
   *
   * Not a transport header: de.arch resolves the workspace from the access
   * token, and its header contract has no context field. It is kept because a
   * client is scoped to one context for its lifetime, and a caller holding
   * several — a proxy serving many workspaces — needs to ask which is which.
   * `scope` decodes it.
   */
  readonly context: string
  protected accessToken?: string
  protected remoteOrigin?: string
  protected session?: UserSession
  private timeout?: number

  constructor( options: AccessOptions, atype: AccessType ){
    if( !options ) throw new Error('Undefined Access Configuration')
    if( !options.context ) throw new Error('Undefined Context Reference. Check https://doc.dedot.io/sdk/auth')
    if( !options.accessToken ) throw new Error('Undefined Access Token. Check https://doc.dedot.io/sdk/auth')
    
    this.context = options.context
    this.atype = atype
    this.version = options.version || 1
    this.platform = options.platform || 'proxy'
    this.accessToken = options.accessToken
    this.remoteOrigin = options.remoteOrigin
    this.session = options.session
    this.timeout = options.timeout
    this.baseURL = options.baseUrl?.replace( /\/+$/, '' )
                    || baseURL( this.atype, options.env || 'dev', options.devHostname )
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
      /**
       * Not De. answering — a gateway's HTML 502, a proxy timeout, an empty
       * 204. There is no envelope to hand back, so this is the one case that
       * raises, carrying the status and URL rather than a JSON syntax error.
       */
      throw new APIError(`${options.method} ${url} — ${response.statusText || 'no JSON body'}`, response.status )
    }

    /**
     * A refusal is returned, not raised.
     *
     * De.'s answer is the `{ error, status, message, data }` envelope whether
     * it succeeded or not, and `status` names the refusal precisely —
     * SENDER_CAP_REACHED, CONSOLIDATION::NOT_IN_PROGRESS. Throwing that away
     * and reconstructing it from an exception message is what callers were
     * reduced to; handing back the envelope lets them read it.
     *
     * A non-2xx carrying an envelope is still De. answering, so it comes back
     * the same way.
     *
     * What is NOT De. answering is raised. A wrong path gets Fastify's own
     * 404 body, which is JSON but not the envelope — `error` there is the
     * string 'Not Found', not a boolean. Returning that as though it were a
     * refusal is how a client addressing a route that does not exist would
     * look like a workspace being told no, which is precisely the bug that
     * hid `/LSP/invitation/agent` behind a plausible-looking failure.
     */
    if( typeof body?.error !== 'boolean' )
      throw new APIError(
        body?.message || `${options.method} ${url} — ${response.status} ${response.statusText || 'not a De. response'}`,
        response.status,
        body
      )

    return body as Response
  }

  /**
   * The context decoded into its parts.
   *
   * Every consumer was decoding the base64 and splitting on ':' by hand,
   * including validating that it produced three fields. Returns undefined
   * rather than throwing when the string is not a context, since a caller
   * asking is usually checking.
   */
  get scope(): { wid: string, type: string, xcode: string } | undefined {
    try {
      const decoded = typeof atob === 'function'
                        ? atob( this.context )
                        : Buffer.from( this.context, 'base64' ).toString('utf8'),
            [ wid, type, xcode ] = decoded.split(':')

      return wid && type && xcode ? { wid, type, xcode } : undefined
    }
    catch { return undefined }
  }

  setToken( token: string ): void { this.accessToken = token }

  /** Attach or replace the signed-in user after construction. */
  setSession( session: UserSession ): void { this.session = session }

  /** Drop the user session — e.g. on sign-out. */
  clearSession(): void { this.session = undefined }
}