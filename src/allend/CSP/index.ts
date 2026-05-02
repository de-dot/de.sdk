import type { AccessOptions } from '../../types/access'
import type { HTTPResponse } from '../../types'
import AccessManager from '../Access'

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
	}

	// ── Orders ────────────────────────────────────────────────────────────────

	async listOrders( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ orders: any[] }>>({
			url: `/csp/orders${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.orders
	}

	// ── Inventory ─────────────────────────────────────────────────────────────

	async getInventory( params?: Record<string, any> ): Promise<any> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: `/csp/inventory${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkAvailability( payload: Record<string, any> ): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: '/csp/inventory/availability',
			method: 'POST',
			body: payload
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Analytics ─────────────────────────────────────────────────────────────

	async getAnalytics( params?: Record<string, any> ): Promise<any> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: `/csp/analytics${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Webhooks ──────────────────────────────────────────────────────────────

	async listWebhooks(): Promise<any[]> {
		const { error, message, data } = await this.request<HTTPResponse<{ webhooks: any[] }>>({
			url: '/csp/webhooks',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.webhooks
	}

	async registerWebhook( payload: Record<string, any> ): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: '/csp/webhooks',
			method: 'POST',
			body: payload
		})
		if( error ) throw new Error( message )
		return data
	}
}
