import type { OrderTrackingEvent } from '@de./types'
import type { RTLocation, Message, Peer } from '../../types'

import RealtimeSocket, { type RealtimeConnectOptions } from '../realtime-socket'

// ─── Agent Realtime ───────────────────────────────────────────────────────────
//
// Socket channel for riders. Two jobs:
//
// 1. Order rooms — after `join(jrtoken)` (token from the platform's tracking
//    session, role=agent) the rider streams LOCATION-CHANGE / MESSAGE into
//    the room and receives ORDER_UPDATE events for the order.
//
// 2. Proactive-consolidation responses — CONSOLIDATION_ACK / NACK / POSITION
//    go over the socket, NOT the REST respond endpoints (those serve relay
//    and dispatch offers). See de.arch consolidation README: response channels.
//
// NOTE — dispatch/consolidation OFFERS do not arrive on this socket: De.
// emits RALLY_EVENT to service connections only, and the operating platform
// (e.g. its backend SSE) relays offers to the rider app. Respond to relayed
// offers via `agent.dispatch.respond(...)` / `agent.consolidation.respond(...)`.
//
// Distinct from `Realtime` (allend/Realtime), which is the client-role socket.

export type AgentRealtimeContext = {
  wid: string
  type: string
  xcode: string
}

export default class AgentRealtime extends RealtimeSocket {
  private agentId?: string

  protected get utype(): string { return 'agent' }

  /**
   * @param options  `getToken` supplies a fresh access token per attempt. A
   *                 rider's phone reconnects constantly and De.'s tokens are
   *                 short-lived, so without it the socket comes back refused —
   *                 or, worse, comes back connected and in none of its rooms.
   */
  connect( agentId: string, options?: RealtimeConnectOptions ): Promise<void> {
    this.agentId = agentId
    return this.open( agentId, options )
  }

  // ── Order room streams (after join) ─────────────────────────────────────

  sendLocation( location: RTLocation ){
    this.nsp?.emit('LOCATION-CHANGE', location )
    return this
  }

  sendMessage( message: Message ){
    this.nsp?.emit('MESSAGE', message )
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

  onConnected( fn: ( peer: Peer ) => void ){
    this.nsp?.on('CONNECTED', fn )
    return this
  }

  onDisconnected( fn: ( peer: Peer ) => void ){
    this.nsp?.on('DISCONNECTED', fn )
    return this
  }

  // ── Proactive consolidation channel (socket-only responses) ─────────────

  ackConsolidation( context: AgentRealtimeContext, offerId: string ){
    if( !this.agentId ) throw new Error('Not connected')
    this.nsp?.emit('CONSOLIDATION_ACK', { context, offerId, agentId: this.agentId } )
    return this
  }

  nackConsolidation( context: AgentRealtimeContext, offerId: string, nackReason?: string ){
    if( !this.agentId ) throw new Error('Not connected')
    this.nsp?.emit('CONSOLIDATION_NACK', { context, offerId, agentId: this.agentId, nackReason } )
    return this
  }

  /**
   * Stream the rider's position into the proactive consolidation engine —
   * feeds trajectory tracking (ARRIVED / DIVERGING / STATIONARY) for
   * committed handoffs. Distinct from order-room sendLocation().
   */
  positionUpdate( context: AgentRealtimeContext, location: RTLocation, status?: string ){
    if( !this.agentId ) throw new Error('Not connected')
    this.nsp?.emit('CONSOLIDATION_POSITION', { context, agentId: this.agentId, location, status } )
    return this
  }
}
