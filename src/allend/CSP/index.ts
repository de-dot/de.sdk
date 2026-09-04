import type { AccessOptions } from '../../types/access'
import SharedContextClient from '../Shared/context'
import SharedOperators from '../Shared/operators'
import CSPOrders from './orders'
import CSPWebhooks from './webhooks'
import CSPAnalytics from './analytics'
import CSPInventory from './inventory'

export type CSPConfig = {
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
// CSP: Commerce Service Provider API — de.arch /csp routes.
// Covers orders, inventory, webhooks, analytics, plus shared faqs/users/account/
// invitation (SharedContextClient) and operators.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class CSP extends SharedContextClient<'CSP'> {
	readonly operators: SharedOperators<'CSP'>
	readonly orders:    CSPOrders
	readonly webhooks:  CSPWebhooks
	readonly analytics: CSPAnalytics
	readonly inventory: CSPInventory

	constructor( config: CSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/csp')
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
		super( access, 'CSP' )

		this.operators = new SharedOperators( this, 'CSP' )
		this.orders    = new CSPOrders( this )
		this.webhooks  = new CSPWebhooks( this )
		this.analytics = new CSPAnalytics( this )
		this.inventory = new CSPInventory( this )
	}
}
