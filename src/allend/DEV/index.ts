import type { AccessOptions } from '../../types/access'
import SharedContextClient from '../Shared/context'
import SharedOperators from '../Shared/operators'
import DEVDevelopers from './developers'

export type DEVConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
	/** Per-request deadline in ms. See `AccessOptions.timeout`. */
	timeout?: number
	/** Explicit service origin, overriding the env table. See `AccessOptions.baseUrl`. */
	baseUrl?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// DEV: Developer Service Provider API — de.arch /v1/dev routes.
// Covers developers, plus shared faqs/users/account/invitation (SharedContextClient)
// and operators.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class DEV extends SharedContextClient<'DEV'> {
	readonly operators:  SharedOperators<'DEV'>
	readonly developers: DEVDevelopers

	constructor( config: DEVConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/dev')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin,
			timeout:      config.timeout,
			baseUrl:      config.baseUrl
		}
		super( access, 'DEV' )

		this.operators  = new SharedOperators( this, 'DEV' )
		this.developers = new DEVDevelopers( this )
	}
}
