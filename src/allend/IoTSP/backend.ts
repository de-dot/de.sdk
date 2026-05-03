import { io, type Socket } from 'socket.io-client'
import { IOT_SERVER_BASEURL } from '../../baseUrl'

// ─── Config ───────────────────────────────────────────────────────────────────

export type IoTBackendConfig = {
	channel: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
}

// ─── Record API ───────────────────────────────────────────────────────────────
//
// Thin wrapper around the socket-based IoT record operations.
// All methods return promises that resolve with the broker's ack payload.

export class Records {
	constructor( private socket: Socket ){}

	get( id: string ): Promise<any> {
		return new Promise(( resolve, reject ) => {
			if( !this.socket.connected ) 
				return reject( new Error('Socket disconnected') )

			this.socket.emit('@record:get', id, ( error: string, response: any ) =>
				error ? reject( new Error( error ) ) : resolve( response )
			)
		})
	}

	fetch( params: { limit?: number, page?: number } = {} ): Promise<any> {
		return new Promise(( resolve, reject ) => {
			if( !this.socket.connected ) 
				return reject( new Error('Socket disconnected') )

			this.socket.emit('@record:fetch', params, ( error: string, response: any ) =>
				error ? reject( new Error( error ) ) : resolve( response )
			)
		})
	}

	find( query: string ): Promise<any> {
		return new Promise(( resolve, reject ) => {
			if( !this.socket.connected ) 
				return reject( new Error('Socket disconnected') )

			this.socket.emit('@record:find', query, ( error: string, response: any ) =>
				error ? reject( new Error( error ) ) : resolve( response )
			)
		})
	}

	delete( id: string ): Promise<any> {
		return new Promise(( resolve, reject ) => {
			if( !this.socket.connected ) 
				return reject( new Error('Socket disconnected') )

			this.socket.emit('@record:del', id, ( error: string, response: any ) =>
				error ? reject( new Error( error ) ) : resolve( response )
			)
		})
	}
}

// ─────────────────────────────────────────────────────────────────────────────
//
// IoT: realtime socket client for de.iotb channels.
//
//   const iot = new IoT({ channel: 'fleet-1', accessToken: token })
//   const { socket, records } = iot.connect()
//
// ─────────────────────────────────────────────────────────────────────────────

export default class IoTBackend {
	private config: IoTBackendConfig
	private socket?: Socket

	constructor( config: IoTBackendConfig ){
		if( !config.channel )     throw new Error('Undefined channel. See https://doc.dedot.io/sdk/iot')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		this.config = config
	}

	connect(): { socket: Socket, records: Records } {
		const
		baseURL = IOT_SERVER_BASEURL[ this.config.env || 'dev' ],
		socket  = io(`${baseURL}/${this.config.channel}`, {
			auth: { accessToken: this.config.accessToken }
		})

		return {
			socket,
			records: new Records( socket )
		}
	}

	disconnect(){
		this.socket?.disconnect() 
	}
}
