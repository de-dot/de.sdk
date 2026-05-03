import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'
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
}

// ─────────────────────────────────────────────────────────────────────────────
//
// CSP: Commerce Service Provider API — de.arch /csp routes.
// Covers orders, inventory, webhooks, and analytics.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class CSP extends AccessManager {
	orders: CSPOrders
	webhooks: CSPWebhooks
	analytics: CSPAnalytics
	inventory: CSPInventory

	constructor( config: CSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/csp')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin
		}
		super( access, 'API' )

		this.orders    = new CSPOrders( this )
		this.webhooks  = new CSPWebhooks( this )
		this.analytics = new CSPAnalytics( this )
		this.inventory = new CSPInventory( this )
	}
}
