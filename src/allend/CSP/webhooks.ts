import type {
	CSPWebhookCreateValidation,
	CSPWebhookListValidation,
	CSPWebhookRetrieveValidation,
	CSPWebhookUpdateValidation,
	CSPWebhookRemoveValidation,
	CSPWebhookLogsValidation,
	CSPWebhookTestValidation
} from '@de./types/csp/webhook'
import { qs, type Http, type Res } from '../../utils'

// ── CSP Webhooks ──────────────────────────────────────────────────────────

export default class CSPWebhooks {
	constructor( private http: Http ){}

	async create( body: CSPWebhookCreateValidation['body'] ): Promise<CSPWebhookCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookCreateValidation['response']>>({
			url: '/csp/webhooks',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: CSPWebhookListValidation['querystring'] ): Promise<CSPWebhookListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookListValidation['response']>>({
			url: `/csp/webhooks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<CSPWebhookRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookRetrieveValidation['response']>>({
			url: `/csp/webhooks/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: CSPWebhookUpdateValidation['body'] ): Promise<CSPWebhookUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookUpdateValidation['response']>>({
			url: `/csp/webhooks/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<CSPWebhookRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookRemoveValidation['response']>>({
			url: `/csp/webhooks/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async logs( id: string, querystring?: CSPWebhookLogsValidation['querystring'] ): Promise<CSPWebhookLogsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookLogsValidation['response']>>({
			url: `/csp/webhooks/${id}/logs${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async test( id: string, body?: CSPWebhookTestValidation['body'] ): Promise<CSPWebhookTestValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPWebhookTestValidation['response']>>({
			url: `/csp/webhooks/${id}/test`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
