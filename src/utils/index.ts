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

export const qs = ( params?: Record<string, any> ): string => {
  if( !params ) return ''
  const q = new URLSearchParams(
    Object.fromEntries(
      Object.entries( params )
            .filter( ( [, v] ) => v != null )
            .map( ( [k, v] ) => [k, String( v )] )
    )
  ).toString()
  return q ? `?${q}` : ''
}

export default { Stream }