import type { OrderTrackingEvent } from '@de./types'
import type { RTLocation, Message, Peer } from '../../types'
import type { SocketAuthCredentials } from '../../types/auth'
import type { AccessOptions } from '../../types/access'

import io, { Socket } from 'socket.io-client'
import AccessManager from '../Access'
import { baseURL } from '../../baseUrl'

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

export default class Realtime extends AccessManager {
  private nsp?: Socket
  private iosHost: string

  constructor( access: AccessOptions ){
    super( access, 'API' )
    // Socket.io is served by the same de.arch API server, so an explicit
    // origin governs the socket as it governs the requests.
    this.iosHost = access.baseUrl?.replace( /\/+$/, '' )
                    || baseURL('API', access.env || 'dev', access.devHostname )
  }

  /**
   * @param id     The uid the tracking session was issued for.
   * @param utype  Must equal the `role` that session was issued with.
   */
  connect( id: string, utype: RealtimeUserType = 'client' ): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      const auth: SocketAuthCredentials = {
        utype,
        id,
        remoteOrigin: globalThis?.window ? globalThis.origin : this.remoteOrigin as string,
        accessToken: this.accessToken as string
      }

      this.nsp = io( this.iosHost, { auth } )
      this.nsp.on('connect', resolve )
      this.nsp.on('connect_error', reject )
    } )
  }

  disconnect(){
    this.nsp?.disconnect()
    return true
  }

  /**
   * Enter an order room with a Join Room Token from
   * `GET /v1/tracking/:reference?role=…`.
   */
  join( jrtoken: string ): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      this.nsp?.emit('JOIN', jrtoken, ( errmess?: string ) => {
        errmess ? reject( new Error( errmess ) ) : resolve( true )
      } )
    } )
  }

  /**
   * Ask for everything the room emitted while this socket was away.
   *
   * `since` is the timestamp the tracking session came back with, or the last
   * event this client actually saw. Reconnecting without it leaves a hole
   * exactly as long as the outage — the socket resumes, and the positions and
   * stage changes from the gap are simply never delivered.
   */
  replay( reference: string, since: number ){
    this.nsp?.emit('REPLAY', { room: `order:${reference}`, since } )
    return this
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
