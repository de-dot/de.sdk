import type { Env, Platform } from '../../types'
import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'
import { UtilitiesCommon } from './common'
import { UtilitiesFares } from './fares'
import { UtilitiesNearby } from './nearby'

// ─── Config ───────────────────────────────────────────────────────────────────

export type UtilitiesConfig = {
	context: string
	accessToken: string
	env?: Env
	platform?: Platform
	remoteOrigin?: string
	version?: number
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export default class Utilities extends AccessManager {
	readonly common: UtilitiesCommon
	readonly fares:  UtilitiesFares
	readonly nearby: UtilitiesNearby

	constructor( config: UtilitiesConfig ){
		if( !config )             throw new Error('Undefined config')
		if( !config.context )     throw new Error('Undefined context')
		if( !config.accessToken ) throw new Error('Undefined accessToken')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin,
			version:      config.version
		}

		super( access, 'API' )

		this.common = new UtilitiesCommon( this )
		this.fares  = new UtilitiesFares( this )
		this.nearby = new UtilitiesNearby( this )
	}
}
