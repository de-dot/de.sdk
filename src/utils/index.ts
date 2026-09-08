import type { HTTPRequestOptions } from '../types'
import Stream from './stream'

// ─── Requests types ───────────────────────────────────────────────────────────

export type Http = { request<T>( opts: HTTPRequestOptions ): Promise<T> }
export type Res<T = any> = { error: boolean, status?: string, message?: string, data: T }

/**
 * The payload inside De.'s envelope, for a caller who wants only that.
 *
 * Clients return the envelope — `{ error, status, message, data }` — because
 * `status` names a refusal precisely and throwing it away leaves the caller
 * reconstructing it from prose. This names the `data` half for the places that
 * want to talk about the payload type on its own.
 *
 * A route answering with no payload resolves to `undefined`, and a payload the
 * route may omit keeps the `| undefined` its schema gave it — the distinction
 * a conditional on `T extends { data: infer D }` loses, since an optional
 * property fails that test outright.
 */
export type Data<T> = 'data' extends keyof T ? T['data'] : undefined

/**
 * Serialize a querystring for a De. route.
 *
 * Array values are appended as repeated keys — `state=A&state=B` — which is
 * what Fastify's query parser turns back into an array. `String( value )` on
 * an array produces `A,B`, a single comma-joined string, and the route answers
 * `querystring/state must be array`: the schema is right, the request never
 * matched it. Every array parameter the SDK sent was malformed this way, the
 * same shape of fault as the coordinates object that once serialized to
 * `[object Object]`.
 *
 * @param params - Query parameters; null and undefined values are dropped
 * @return - `?a=1&b=2`, or an empty string when there is nothing to send
 */
export const qs = ( params?: Record<string, any> ): string => {
  if( !params ) return ''

  const q = new URLSearchParams()

  for( const [ key, value ] of Object.entries( params ) ){
    if( value === null || value === undefined ) continue

    Array.isArray( value )
      ? value.forEach( each => each !== null && each !== undefined && q.append( key, String( each ) ) )
      : q.append( key, String( value ) )
  }

  const query = q.toString()
  return query ? `?${query}` : ''
}

export default { Stream }