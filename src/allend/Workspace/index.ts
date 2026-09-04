import type { AccessOptions } from '../../types/access'
import type { HTTPResponse } from '../../types'
import AccessManager from '../Access'

export type WorkspaceConfig = {
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
// Workspace: workspace management API — de.arch /workspace routes.
// Covers admins, connectors, billings, and provider registrations
// (LSPs, CSPs, IoTSPs, developers).
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Workspace extends AccessManager {
	constructor( config: WorkspaceConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/workspace')
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
		super( access, 'API' )
	}

	// ── Index ─────────────────────────────────────────────────────────────────

	async get(): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: '/workspace',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Admins ────────────────────────────────────────────────────────────────

	async listAdmins( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ admins: any[] }>>({
			url: `/workspace/admins${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.admins
	}

	// ── Connectors ────────────────────────────────────────────────────────────

	async listConnectors( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ connectors: any[] }>>({
			url: `/workspace/connectors${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.connectors
	}

	async getConnector( connectorId: string ): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<{ connector: any }>>({
			url: `/workspace/connectors/${connectorId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.connector
	}

	// ── Billings ──────────────────────────────────────────────────────────────

	async getBillings( params?: Record<string, any> ): Promise<any> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: `/workspace/billings${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Providers ─────────────────────────────────────────────────────────────

	async listLSPs( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ lsps: any[] }>>({
			url: `/workspace/providers/lsps${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.lsps
	}

	async listCSPs( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ csps: any[] }>>({
			url: `/workspace/providers/csps${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.csps
	}
}
