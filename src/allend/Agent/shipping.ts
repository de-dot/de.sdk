import type {
	AgentShippingListValidation,
	AgentShippingGetValidation,
	AgentShippingAcceptValidation,
	AgentShippingUpdateStatusValidation,
	AgentShippingReportIssueValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Agent Shipping Orders ────────────────────────────────────────────────────

export default class AgentShipping {
	constructor( private http: Http ){}

	async list( querystring?: AgentShippingListValidation['querystring'] ): Promise<AgentShippingListValidation['response']> {
		return await this.http.request<AgentShippingListValidation['response']>({
			url: `/agent/shipping/orders${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<AgentShippingGetValidation['response']> {
		return await this.http.request<AgentShippingGetValidation['response']>({
			url: `/agent/shipping/orders/${reference}`,
			method: 'GET'
		})
	}

	async accept( reference: string ): Promise<AgentShippingAcceptValidation['response']> {
		return await this.http.request<AgentShippingAcceptValidation['response']>({
			url: `/agent/shipping/orders/${reference}/accept`,
			method: 'POST'
		})
	}

	async updateStatus( reference: string, body: AgentShippingUpdateStatusValidation['body'] ): Promise<AgentShippingUpdateStatusValidation['response']> {
		return await this.http.request<AgentShippingUpdateStatusValidation['response']>({
			url: `/agent/shipping/orders/${reference}/status`,
			method: 'PATCH',
			body
		})
	}

	async reportIssue( reference: string, body: AgentShippingReportIssueValidation['body'] ): Promise<AgentShippingReportIssueValidation['response']> {
		return await this.http.request<AgentShippingReportIssueValidation['response']>({
			url: `/agent/shipping/orders/${reference}/issue`,
			method: 'POST',
			body
		})
	}
}
