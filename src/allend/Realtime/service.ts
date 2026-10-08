import type { OrderTrackingEvent, RallyEvent } from '@de./types'

import RealtimeSocket, { type RealtimeConnectOptions } from '../realtime-socket'

// ─── ServiceRealtime ──────────────────────────────────────────────────────────
//
// A platform's own server, connected to its workspace as a service: Buffé, or
// any platform built on De. It is not in an order room and joins nothing. De.
// puts a service connection straight into the workspace's Rally room and its
// services room, so it hears every dispatch event and every order update the
// workspace produces. That is the only way Rally events leave De.: riders'
// devices hear about offers from their platform, which relays them.
//
// Platforms used to open this socket by hand with socket.io-client, so each
// had to rediscover the handshake: `utype: 'service'`, the `de-api-service`
// header De. checks against its allow-list, a token read per attempt, and
// WebSocket only. Server-side only, because a browser cannot send the header.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class ServiceRealtime extends RealtimeSocket {
  protected get utype(): string { return 'service' }

  /**
   * A server keeps this connection for its whole life, so it reconnects for
   * ever with backoff, and over WebSocket alone: long-polling buys nothing
   * between two servers.
   */
  protected socketOptions(): Record<string, unknown> {
    return {
      transports:           ['websocket'],
      reconnection:         true,
      reconnectionDelay:    1_000,
      reconnectionDelayMax: 60_000,
      reconnectionAttempts: Infinity
    }
  }

  /**
   * @param serviceId  The name the platform is known by to De. — sent as the
   *                   connection id and as the `de-api-service` header.
   * @param options    `getToken` should return the platform's current access
   *                   token: a service rotates its token, and a reconnect
   *                   after an expiry is refused without a fresh one.
   */
  connect( serviceId: string, options: RealtimeConnectOptions = {} ): Promise<void> {
    return this.open( serviceId, {
      ...options,
      headers: { ...options.headers, 'de-api-service': serviceId }
    })
  }

  /** Rally: offers, assignments, expiries, releases, relays, zone changes. */
  onRallyEvent( fn: ( event: RallyEvent ) => void ){
    this.nsp?.on('RALLY_EVENT', fn )
    return this
  }

  /**
   * Every order in the workspace as it changes: what riders reported, what
   * De. decided — collected, delivered, cancelled, failed.
   */
  onOrderUpdate( fn: ( event: OrderTrackingEvent ) => void ){
    this.nsp?.on('ORDER_UPDATE', fn )
    return this
  }

  onConnect( fn: () => void ){
    this.nsp?.on('connect', fn )
    return this
  }

  onDisconnect( fn: ( reason: string ) => void ){
    this.nsp?.on('disconnect', fn )
    return this
  }

  /** A refused or failed attempt. Reconnection carries on regardless. */
  onConnectError( fn: ( error: Error ) => void ){
    this.nsp?.on('connect_error', fn )
    return this
  }
}
