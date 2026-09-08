import type { SocketAuthCredentials } from '../types/auth'
import type { AccessOptions } from '../types/access'

import io, { Socket } from 'socket.io-client'
import AccessManager from './Access'
import { baseURL } from '../baseUrl'

// ─── RealtimeSocket ───────────────────────────────────────────────────────────
//
// What `Realtime` and `AgentRealtime` share: opening the connection, and
// getting back into the rooms afterwards.
//
// Both used to hand socket.io a plain object for `auth` and call `join` once,
// which works exactly until the first reconnect — and on a phone the first
// reconnect is a lift doorway. Two things break there, both silently:
//
//   · The token. socket.io captures the auth literal once and replays it on
//     every attempt. De.'s access tokens are short-lived, so the replayed one
//     is stale precisely on the reconnect after an outage long enough to have
//     crossed an expiry. De. refuses the handshake — and until 2026-09-08 that
//     refusal took de.arch's whole process down with it.
//
//   · The rooms. Room membership is per-connection and De. does not restore
//     it. A reconnected socket is connected to the server and in none of the
//     rooms it was in, so it stays open, reports itself healthy, and delivers
//     nothing. That is the worse of the two failures because nothing anywhere
//     reports it.
//
// So `auth` is a function, evaluated per attempt, and every join is remembered
// and replayed.
//
// ─────────────────────────────────────────────────────────────────────────────

export type RealtimeConnectOptions = {
  /**
   * A fresh access token for each connection attempt.
   *
   * An app holds tokens it was given rather than credentials it can mint, so
   * this is usually "ask my backend for a new tracking session". Omitted, the
   * token this client was constructed with is used on every attempt, which is
   * correct only for a process that rotates it in place.
   */
  getToken?: () => string | Promise<string>
}

export default abstract class RealtimeSocket extends AccessManager {
  protected nsp?: Socket
  protected iosHost: string
  protected id?: string

  /**
   * Every room this socket asked to be in, by the token that got it there.
   *
   * Kept so a reconnect can restore them. A JRT outlives an ordinary blip, so
   * replaying it is right; when one has expired the rejoin fails and
   * `onRejoinError` is how the app learns to ask for a new session rather than
   * sitting on a silent connection.
   */
  private rooms = new Set<string>()
  private rejoinError?: ( error: Error ) => void

  constructor( access: AccessOptions ){
    super( access, 'API' )

    // Socket.io is served by the same de.arch API server, so an explicit
    // origin governs the socket exactly as it governs the requests.
    this.iosHost = access.baseUrl?.replace( /\/+$/, '' )
                    || baseURL('API', access.env || 'dev', access.devHostname )
  }

  /** The `utype` this client connects as. Must match the JRT's `role`. */
  protected abstract get utype(): string

  protected open( id: string, options: RealtimeConnectOptions = {} ): Promise<void> {
    this.id = id

    return new Promise( ( resolve, reject ) => {
      const credentials = async (): Promise<SocketAuthCredentials> => ({
        utype:        this.utype,
        id,
        remoteOrigin: globalThis?.window ? globalThis.origin : this.remoteOrigin as string,
        accessToken:  options.getToken ? await options.getToken() : this.accessToken as string
      })

      this.nsp = io( this.iosHost, {
        // The function form — re-evaluated before every attempt, which is the
        // whole point. The object form is read once, at construction.
        auth: ( cb: ( data: any ) => void ) => {
          credentials()
            .then( cb )
            // A token the app could not fetch is still an attempt: let De.
            // refuse it and surface a connect_error, rather than hanging.
            .catch( () => cb({ utype: this.utype, id }) )
        }
      })

      this.nsp.on('connect', () => {
        this.restore()
        resolve()
      })
      this.nsp.on('connect_error', reject )
    })
  }

  /** Re-enter every room this socket was in before the connection dropped. */
  private restore(): void {
    for( const jrtoken of this.rooms )
      this.nsp?.emit('JOIN', jrtoken, ( errmess?: string ) => {
        if( !errmess ) return

        this.rooms.delete( jrtoken )
        this.rejoinError?.( new Error( errmess ) )
      })
  }

  /**
   * Enter an order room with a Join Room Token from
   * `GET /v1/tracking/:reference?role=…`.
   */
  join( jrtoken: string ): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      this.nsp?.emit('JOIN', jrtoken, ( errmess?: string ) => {
        if( errmess ) return reject( new Error( errmess ) )

        this.rooms.add( jrtoken )
        resolve( true )
      })
    })
  }

  /** Stop replaying a room — the order is closed, or the app navigated away. */
  leave( jrtoken: string ): void {
    this.rooms.delete( jrtoken )
  }

  /**
   * A room could not be re-entered after a reconnect.
   *
   * Almost always an expired JRT. The app's answer is to ask its backend for a
   * fresh tracking session and `join` again — and, since it is reconnecting,
   * to `replay` from the `since` that came with it.
   */
  onRejoinError( fn: ( error: Error ) => void ){
    this.rejoinError = fn
    return this
  }

  /** Fires on every reconnect, which is where a client should replay its gap. */
  onReconnect( fn: () => void ){
    this.nsp?.io.on('reconnect', fn )
    return this
  }

  disconnect(){
    this.rooms.clear()
    this.nsp?.disconnect()
    return true
  }

  /**
   * Ask for everything a room emitted while this socket was away.
   *
   * `since` is the timestamp the tracking session came back with, or that of
   * the last event actually seen. Reconnecting without it leaves a hole
   * exactly as long as the outage.
   */
  replay( reference: string, since: number ){
    this.nsp?.emit('REPLAY', { room: `order:${reference}`, since })
    return this
  }
}
