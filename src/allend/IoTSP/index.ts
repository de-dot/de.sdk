import type { AccessOptions } from '../../types/access'
import SharedContextClient from '../Shared/context'
import SharedOperators from '../Shared/operators'
import IoTBackend, { type IoTBackendConfig, Records } from './backend'
import IoTDevices from './devices'
import IoTTopics from './topics'
import IoTRules from './rules'

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
// Covers device management, topics, rules, plus shared faqs/users/account/
// invitation (SharedContextClient) and operators.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class IoTSP extends SharedContextClient<'IoTSP'> {
	private readonly BackendInstance?: IoTBackend
	readonly operators: SharedOperators<'IoTSP'>
	readonly devices:   IoTDevices
	readonly topics:    IoTTopics
	readonly rules:     IoTRules

	constructor( config: IoTSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/iotsp')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin
		}
		super( access, 'IoTSP' )

		if( config.backend )
			this.BackendInstance = new IoTBackend( config.backend )

		this.operators = new SharedOperators( this, 'IoTSP' )
		this.devices   = new IoTDevices( this )
		this.topics    = new IoTTopics( this )
		this.rules     = new IoTRules( this )
	}

	get backend(){
		if( !this.BackendInstance )
			throw new Error('No backend instance available. Expect <backend> config')

		return this.BackendInstance
	}
}
