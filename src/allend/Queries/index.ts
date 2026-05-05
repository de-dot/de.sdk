import type { Env, Platform } from '../../types'
import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'
import { QueriesDiscovery } from './discovery'
import { QueriesMatching } from './matching'
import { QueriesCapacity } from './capacity'
import { QueriesPerformance } from './performance'
import { QueriesPricing } from './pricing'

// ─── Config ───────────────────────────────────────────────────────────────────

export type QueriesConfig = {
	context: string
	accessToken: string
	env?: Env
	platform?: Platform
	remoteOrigin?: string
	version?: number
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export default class Queries extends AccessManager {
	readonly discovery:   QueriesDiscovery
	readonly matching:    QueriesMatching
	readonly capacity:    QueriesCapacity
	readonly performance: QueriesPerformance
	readonly pricing:     QueriesPricing

	constructor( config: QueriesConfig ){
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

		this.discovery   = new QueriesDiscovery( this )
		this.matching    = new QueriesMatching( this )
		this.capacity    = new QueriesCapacity( this )
		this.performance = new QueriesPerformance( this )
		this.pricing     = new QueriesPricing( this )
	}
}
