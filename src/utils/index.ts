import type { HTTPRequestOptions } from '../types'
import Stream from './stream'

// ─── Requests types ───────────────────────────────────────────────────────────

export type Http = { request<T>( opts: HTTPRequestOptions ): Promise<T> }
export type Res<T = any> = { error: boolean, status?: string, message?: string, data: T }

/**
 * The payload inside De.'s envelope.
 *
 * Every route answers `{ error, status, message, data }` and every client
 * returns the `data` — but declared the whole envelope as its return type. The
 * type therefore promised `result.data.reference` while the value was
 * `result.reference`, and a caller could not read a single field without
 * casting past its own types.
 *
 * Routes that answer with no payload resolve to `undefined`.
 */
export type Data<T> = T extends { data: infer D } ? D : undefined

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