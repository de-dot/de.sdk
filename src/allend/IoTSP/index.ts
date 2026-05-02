import type { AccessOptions } from '../../types/access'
import type { HTTPResponse } from '../../types'
import AccessManager from '../Access'

export type IoTSPConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// IoTSP: IoT Service Provider API — de.arch /iotsp routes.
// Covers device management, topics, and rules.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class IoTSP extends AccessManager {
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
		super( access, 'API' )
	}

	// ── Devices ───────────────────────────────────────────────────────────────

	async listDevices( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ devices: any[] }>>({
			url: `/iotsp/devices${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.devices
	}

	async getDevice( deviceId: string ): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<{ device: any }>>({
			url: `/iotsp/devices/${deviceId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.device
	}

	// ── Topics ────────────────────────────────────────────────────────────────

	async listTopics( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ topics: any[] }>>({
			url: `/iotsp/topics${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.topics
	}

	async createTopic( payload: Record<string, any> ): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: '/iotsp/topics',
			method: 'POST',
			body: payload
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Rules ─────────────────────────────────────────────────────────────────

	async listRules( params?: Record<string, any> ): Promise<any[]> {
		const qs = params ? '?' + new URLSearchParams( params ).toString() : ''
		const { error, message, data } = await this.request<HTTPResponse<{ rules: any[] }>>({
			url: `/iotsp/rules${qs}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data.rules
	}

	async createRule( payload: Record<string, any> ): Promise<any> {
		const { error, message, data } = await this.request<HTTPResponse<any>>({
			url: '/iotsp/rules',
			method: 'POST',
			body: payload
		})
		if( error ) throw new Error( message )
		return data
	}
}
