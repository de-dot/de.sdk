import type { OrderTrackingEvent } from '@de./types'
import type { RTLocation, Message, Peer } from '../../types'

import RealtimeSocket, { type RealtimeConnectOptions } from '../realtime-socket'

// ─── Realtime ─────────────────────────────────────────────────────────────────
//
// The non-agent side of an order room: the person waiting for the delivery,
// the merchant who dispatched it, or a platform's own client connection.
//
// The flow is two steps and they are not interchangeable:
//
//   connect( id, utype )   opens the socket. `id` is the uid the tracking
//                          session was minted for, and `utype` must match the
//                          `role` it was minted with.
//   join( jrtoken )        enters the order's room.
//
// De. checks the second against the first — the JRT's seal is `role:uid`, and
// JOIN compares it to the connection's own `utype:id`. Connecting as one
// person and presenting another's token is refused, and so is connecting as
// 'client' with a token minted for role 'customer', which is what this client
// used to do unconditionally.
//
// Distinct from `AgentRealtime` (allend/Agent/realtime), which is the rider's
// socket and carries the consolidation response channel as well.
//
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Who this connection is, in De.'s vocabulary.
 *
 * A client is the party that engaged the provider — a CSP, a merchant, a
 * branch. A customer is the person the delivery is handed to. They are not
 * the same party and De. does not put them in the same room, so a customer
 * app connecting as 'client' hears nothing addressed to customers and cannot
 * redeem a customer's tracking token.
 */
export type RealtimeUserType = 'client' | 'customer' | 'vendor'

export default class Realtime extends RealtimeSocket {
  private as: RealtimeUserType = 'client'

  protected get utype(): string { return this.as }

  /**
   * @param id       The uid the tracking session was issued for.
   * @param utype    Must equal the `role` that session was issued with.
   * @param options  `getToken` supplies a fresh access token per attempt —
   *                 without it a reconnect after the token's short life is
   *                 refused, and the app is left with an open socket that
   *                 delivers nothing.
   */
  connect( id: string, utype: RealtimeUserType = 'client', options?: RealtimeConnectOptions ): Promise<void> {
    this.as = utype
    return this.open( id, options )
  }

  // ── Order room streams (after join) ─────────────────────────────────────

  /**
   * The rider's position, as it moves.
   *
   * Rate-limited by De. to 10 per second per sender, so this is a stream and
   * not a trickle: render from it directly rather than re-fetching anything.
   */
  onLocation( fn: ( location: RTLocation ) => void ){
    this.nsp?.on('LOCATION-CHANGE', fn )
    return this
  }

  onRoute( fn: ( route: any ) => void ){
    this.nsp?.on('ROUTE-CHANGE', fn )
    return this
  }

  onOrderUpdate( fn: ( event: OrderTrackingEvent ) => void ){
    this.nsp?.on('ORDER_UPDATE', fn )
    return this
  }

  onMessage( fn: ( message: Message ) => void ){
    this.nsp?.on('MESSAGE', fn )
    return this
  }

  sendMessage( message: Message ){
    this.nsp?.emit('MESSAGE', message )
    return this
  }

  // ── Presence ────────────────────────────────────────────────────────────

  onJoined( fn: ( peer: Peer ) => void ){
    this.nsp?.on('JOINED', fn )
    return this
  }
  onLeft( fn: ( peer: Peer ) => void ){
    this.nsp?.on('LEFT', fn )
    return this
  }
  onConnected( fn: ( peer: Peer ) => void ){
    this.nsp?.on('CONNECTED', fn )
    return this
  }
  onDisconnected( fn: ( peer: Peer ) => void ){
    this.nsp?.on('DISCONNECTED', fn )
    return this
  }
}
