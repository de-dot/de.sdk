import type {
	AgentRideListValidation,
	AgentRideGetValidation,
	AgentRideAcceptValidation,
	AgentRideStartValidation,
	AgentRideCompleteValidation,
	AgentRideCancelValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Agent Ride Orders ────────────────────────────────────────────────────────

export default class AgentRides {
	constructor( private http: Http ){}

	async list( querystring?: AgentRideListValidation['querystring'] ): Promise<AgentRideListValidation['response']> {
		return await this.http.request<AgentRideListValidation['response']>({
			url: `/agent/ride/orders${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<AgentRideGetValidation['response']> {
		return await this.http.request<AgentRideGetValidation['response']>({
			url: `/agent/ride/orders/${reference}`,
			method: 'GET'
		})
	}

	async accept( reference: string, body: AgentRideAcceptValidation['body'] ): Promise<AgentRideAcceptValidation['response']> {
		return await this.http.request<AgentRideAcceptValidation['response']>({
			url: `/agent/ride/orders/${reference}/accept`,
			method: 'POST',
			body
		})
	}

	async start( reference: string, body: AgentRideStartValidation['body'] ): Promise<AgentRideStartValidation['response']> {
		return await this.http.request<AgentRideStartValidation['response']>({
			url: `/agent/ride/orders/${reference}/start`,
			method: 'POST',
			body
		})
	}

	async complete( reference: string, body: AgentRideCompleteValidation['body'] ): Promise<AgentRideCompleteValidation['response']> {
		return await this.http.request<AgentRideCompleteValidation['response']>({
			url: `/agent/ride/orders/${reference}/complete`,
			method: 'POST',
			body
		})
	}

	async cancel( reference: string, body: AgentRideCancelValidation['body'] ): Promise<AgentRideCancelValidation['response']> {
		return await this.http.request<AgentRideCancelValidation['response']>({
			url: `/agent/ride/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
	}
}
