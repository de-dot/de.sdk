import type {
	AgentDeliveryListValidation,
	AgentDeliveryGetValidation,
	AgentDeliveryAcceptValidation,
	AgentDeliveryUpdateStatusValidation,
	AgentDeliveryReportIssueValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Agent Delivery Orders ────────────────────────────────────────────────────

export default class AgentDelivery {
	constructor( private http: Http ){}

	async list( querystring?: AgentDeliveryListValidation['querystring'] ): Promise<AgentDeliveryListValidation['response']> {
		return await this.http.request<AgentDeliveryListValidation['response']>({
			url: `/agent/delivery/orders${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<AgentDeliveryGetValidation['response']> {
		return await this.http.request<AgentDeliveryGetValidation['response']>({
			url: `/agent/delivery/orders/${reference}`,
			method: 'GET'
		})
	}

	async accept( reference: string ): Promise<AgentDeliveryAcceptValidation['response']> {
		return await this.http.request<AgentDeliveryAcceptValidation['response']>({
			url: `/agent/delivery/orders/${reference}/accept`,
			method: 'POST'
		})
	}

	async updateStatus( reference: string, body: AgentDeliveryUpdateStatusValidation['body'] ): Promise<AgentDeliveryUpdateStatusValidation['response']> {
		return await this.http.request<AgentDeliveryUpdateStatusValidation['response']>({
			url: `/agent/delivery/orders/${reference}/status`,
			method: 'PATCH',
			body
		})
	}

	async reportIssue( reference: string, body: AgentDeliveryReportIssueValidation['body'] ): Promise<AgentDeliveryReportIssueValidation['response']> {
		return await this.http.request<AgentDeliveryReportIssueValidation['response']>({
			url: `/agent/delivery/orders/${reference}/issue`,
			method: 'POST',
			body
		})
	}
}
