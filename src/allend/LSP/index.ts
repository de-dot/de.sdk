import type { AccessOptions } from '../../types/access'
import type { HTTPRequestOptions, HTTPResponse } from '../../types'
import AccessManager from '../Access'

export type LSPConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// LSP: Logistics Service Provider API — de.arch /lsp routes.
// Covers agents, orders, coverage, inventory, pricing, services, and more.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSP extends AccessManager {
	constructor( config: LSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/lsp')
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

	// ── Agents ────────────────────────────────────────────────────────────────

	async listAgents( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ agents: any[] }>>({
			url: `/lsp/agents${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.agents
	}

	// ── Orders ────────────────────────────────────────────────────────────────

	async listOrders( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ orders: any[] }>>({
			url: `/lsp/orders${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.orders
	}

	// ── Coverage ──────────────────────────────────────────────────────────────

	async getCoverageAreas( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ areas: any[] }>>({
			url: `/lsp/operations/coverage/areas${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.areas
	}

	// ── Services ──────────────────────────────────────────────────────────────

	async listCarriers( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ carriers: any[] }>>({
			url: `/lsp/services/carriers${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.carriers
	}

	async listFleets( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ fleets: any[] }>>({
			url: `/lsp/services/fleets${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.fleets
	}

	async listHubs( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ hubs: any[] }>>({
			url: `/lsp/services/hubs${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.hubs
	}

	async listWarehouses( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ warehouses: any[] }>>({
			url: `/lsp/services/warehouses${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.warehouses
	}
}
