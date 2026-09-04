import type {
	CSPWebhookCreateValidation,
	CSPWebhookListValidation,
	CSPWebhookRetrieveValidation,
	CSPWebhookUpdateValidation,
	CSPWebhookRemoveValidation,
	CSPWebhookLogsValidation,
	CSPWebhookTestValidation
} from '@de./types/csp/webhook'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── CSP Webhooks ──────────────────────────────────────────────────────────

export default class CSPWebhooks {
	constructor( private http: Http ){}

	async create( body: CSPWebhookCreateValidation['body'] ): Promise<Data<CSPWebhookCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookCreateValidation['response']>>>({
			url: '/csp/webhooks',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: CSPWebhookListValidation['querystring'] ): Promise<Data<CSPWebhookListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookListValidation['response']>>>({
			url: `/csp/webhooks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<Data<CSPWebhookRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookRetrieveValidation['response']>>>({
			url: `/csp/webhooks/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: CSPWebhookUpdateValidation['body'] ): Promise<Data<CSPWebhookUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookUpdateValidation['response']>>>({
			url: `/csp/webhooks/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<Data<CSPWebhookRemoveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookRemoveValidation['response']>>>({
			url: `/csp/webhooks/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async logs( id: string, querystring?: CSPWebhookLogsValidation['querystring'] ): Promise<Data<CSPWebhookLogsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookLogsValidation['response']>>>({
			url: `/csp/webhooks/${id}/logs${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async test( id: string, body?: CSPWebhookTestValidation['body'] ): Promise<Data<CSPWebhookTestValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPWebhookTestValidation['response']>>>({
			url: `/csp/webhooks/${id}/test`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
