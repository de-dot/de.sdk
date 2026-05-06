import AccessManager from '../Access'
import IoTBackend, { type IoTBackendConfig, Records } from './backend'
import IoTDevices from './devices'
import IoTTopics from './topics'
import IoTRules from './rules'
import Shared from '../Shared'

export { Records }

export type IoTSPConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
	backend?: IoTBackendConfig
}

// ─────────────────────────────────────────────────────────────────────────────
//
// IoTSP: IoT Service Provider API — de.arch /iotsp routes.
// Covers device management, topics, and rules.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class IoTSP extends AccessManager {
	private readonly BackendInstance?: IoTBackend
	readonly shared: Shared
	readonly devices: IoTDevices
	readonly topics: IoTTopics
	readonly rules: IoTRules

	constructor( config: IoTSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/iotsp')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		super({
			context: config.context,
			accessToken: config.accessToken,
			env: config.env || 'dev',
			platform: config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin
		}, 'API' )

		if( config.backend )
			this.BackendInstance = new IoTBackend( config.backend )

		this.shared  = new Shared( this, 'iotsp' )
		this.devices = new IoTDevices( this )
		this.topics  = new IoTTopics( this )
		this.rules   = new IoTRules( this )
	}

	get backend(){
		if( !this.BackendInstance )
			throw new Error('No backend instance available. Expect <backend> config')
		
		return this.BackendInstance
	}
}
