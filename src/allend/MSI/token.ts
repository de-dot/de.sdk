import type { MapOptions } from '../../types'

/**
 * Resolve the access token to bind the gateway with.
 *
 * `getAccessToken` wins when supplied, and is deliberately called at every bind
 * rather than read once: a host that rotates tokens can hand back a fresh one
 * on reconnect without the caller having to drive `controls.refreshToken()`.
 *
 * @param options - Map options carrying either form of the token
 * @return - A non-empty access token
 */
export default function resolveAccessToken( options: MapOptions ): string {
  const token = options.getAccessToken?.() || options.accessToken

  if( !token )
    throw new Error('Invalid Access Token')

  return token
}
