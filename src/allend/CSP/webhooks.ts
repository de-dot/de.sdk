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

	async create( body: CSPWebhookCreateValidation['body'] ): Promise<CSPWebhookCreateValidation['response']> {
		return await this.http.request<CSPWebhookCreateValidation['response']>({
			url: '/csp/webhooks',
			method: 'POST',
			body
		})
	}

	async list( querystring?: CSPWebhookListValidation['querystring'] ): Promise<CSPWebhookListValidation['response']> {
		return await this.http.request<CSPWebhookListValidation['response']>({
			url: `/csp/webhooks${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<CSPWebhookRetrieveValidation['response']> {
		return await this.http.request<CSPWebhookRetrieveValidation['response']>({
			url: `/csp/webhooks/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: CSPWebhookUpdateValidation['body'] ): Promise<CSPWebhookUpdateValidation['response']> {
		return await this.http.request<CSPWebhookUpdateValidation['response']>({
			url: `/csp/webhooks/${id}`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<CSPWebhookRemoveValidation['response']> {
		return await this.http.request<CSPWebhookRemoveValidation['response']>({
			url: `/csp/webhooks/${id}`,
			method: 'DELETE'
		})
	}

	async logs( id: string, querystring?: CSPWebhookLogsValidation['querystring'] ): Promise<CSPWebhookLogsValidation['response']> {
		return await this.http.request<CSPWebhookLogsValidation['response']>({
			url: `/csp/webhooks/${id}/logs${qs( querystring )}`,
			method: 'GET'
		})
	}

	async test( id: string, body?: CSPWebhookTestValidation['body'] ): Promise<CSPWebhookTestValidation['response']> {
		return await this.http.request<CSPWebhookTestValidation['response']>({
			url: `/csp/webhooks/${id}/test`,
			method: 'POST',
			body
		})
	}
}
