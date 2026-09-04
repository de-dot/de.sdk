import type { AccessOptions } from '../../types/access'
import type { SharedTrackingSessionValidation } from '@de./types/shared/tracking'
import AccessManager from '../Access'
import { qs, type Res, type Data } from '../../utils'

export type TrackingConfig = {
	accessToken: string
	context: string
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
// Tracking: shared tracking API — de.arch /tracking routes.
// Issues join-room tokens for Socket.IO real-time order tracking.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Tracking extends AccessManager {
	constructor( config: TrackingConfig ){
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/tracking')

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

	async getSession( reference: string, role: SharedTrackingSessionValidation['querystring']['role'] ): Promise<SharedTrackingSessionValidation['response']> {
		return await this.request<SharedTrackingSessionValidation['response']>({
			url: `/tracking/${reference}${qs({ role })}`,
			method: 'GET'
		})
	}
}
