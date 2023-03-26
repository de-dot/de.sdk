
import type DBClient from '.'
import io, { Socket, SocketOptions } from 'socket.io-client'
import { GPSLocation, Message, Peer, OrderStage } from '../../types'

export default class Event {
  private ca: DBClient
  private nsp?: Socket
  private iosHost: string
  private workspace: string

  constructor( ca: DBClient, workspace: string ){
    // super()
    this.ca = ca

    this.workspace = workspace
    this.iosHost = this.ca.options.env == 'prod' ? 'https://api.delidev.com' : 'http://api.delidev.io:24800'
  }

  connect(): Promise<void> {
    return new Promise( ( resolve, reject ) => {
      // Connect to main clients namespace
      const
      [ type, icode ] = Buffer.from( this.workspace, 'base64').toString('utf-8').split(':'),
      tokenToken = { nsp: icode, utype: 'client', id: this.ca.clientId },
      options: SocketOptions = {
        auth: {
          token: Buffer.from( JSON.stringify( tokenToken ) ).toString('base64')
        }
      }

      this.nsp = io( this.iosHost, options )
      this.nsp.on('connect', resolve )
      this.nsp.on('connect_error', reject )
    } )
  }
  disconnect(){ 
    this.nsp?.disconnect()
    return true
  }
  join( jrtoken: string ): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      this.nsp?.emit('JOIN', jrtoken, ( error?: Error ) => {
        console.log('Error:', error )
        error ? reject( error ) : resolve( true )
      } )
    })
  }

  onLeft( fn: ( peer: Peer ) => void ){ this.nsp?.on('LEFT', fn ) }
  onConnected( fn: ( peer: Peer ) => void ){ this.nsp?.on('CONNECTED', fn ) }
  onDisconnected( fn: ( peer: Peer ) => void ){ this.nsp?.on('DISCONNECTED', fn ) }

  onRoute( fn: ( data: any ) => void ){ this.nsp?.on('ROUTE-CHANGE', fn ) }
  onStage( fn: ( data: OrderStage ) => void ){ this.nsp?.on('STAGE-CHANGE', fn ) }
  onLocation( fn: ( location: GPSLocation ) => void ){ this.nsp?.on('LOCATION-CHANGE', fn ) }
  onMessage( fn: ( payload: Message ) => void ){ this.nsp?.on('MESSAGE', fn ) }
}