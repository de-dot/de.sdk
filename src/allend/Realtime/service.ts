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
    this.closed = false
    const opened = this.open( serviceId, {
      ...options,
      headers: { ...options.headers, 'de-api-service': serviceId }
    })

    this.retryRefusals()
    return opened
  }

  private closed = false

  /**
   * A handshake De. refused is one socket.io never tries again: it reconnects
   * after a dropped transport, and gives up on a refusal. The refusal a server
   * meets is an expired token, after its host slept through the rotation: the
   * reconnect sent the stale one, De. said "Token Expired", and Buffé heard no
   * Rally event for two days, every offer to a rider lost, while its HTTP calls
   * (which mint a token each) went on working. Each attempt reads the token
   * afresh, so a refusal is retried with the same backoff as a drop.
   */
  private retryRefusals(){
    let wait = 1_000

    this.nsp?.on('connect', () => { wait = 1_000 })
    this.nsp?.on('connect_error', () => {
      // Still active: socket.io is reconnecting on its own
      if( this.nsp?.active ) return

      setTimeout( () => { !this.closed && !this.nsp?.connected && this.nsp?.connect() }, wait )
      wait = Math.min( wait * 2, 60_000 )
    })
  }

  disconnect(){
    this.closed = true
    return super.disconnect()
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

  /** A refused or failed attempt. Reconnection carries on regardless, a refusal included. */
  onConnectError( fn: ( error: Error ) => void ){
    this.nsp?.on('connect_error', fn )
    return this
  }
}
