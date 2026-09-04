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

	async list( querystring?: AgentShippingListValidation['querystring'] ): Promise<Data<AgentShippingListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentShippingListValidation['response']>>>({
			url: `/agent/shipping/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<Data<AgentShippingGetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentShippingGetValidation['response']>>>({
			url: `/agent/shipping/orders/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async accept( reference: string ): Promise<Data<AgentShippingAcceptValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentShippingAcceptValidation['response']>>>({
			url: `/agent/shipping/orders/${reference}/accept`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( reference: string, body: AgentShippingUpdateStatusValidation['body'] ): Promise<Data<AgentShippingUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentShippingUpdateStatusValidation['response']>>>({
			url: `/agent/shipping/orders/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async reportIssue( reference: string, body: AgentShippingReportIssueValidation['body'] ): Promise<Data<AgentShippingReportIssueValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentShippingReportIssueValidation['response']>>>({
			url: `/agent/shipping/orders/${reference}/issue`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
