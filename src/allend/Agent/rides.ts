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

	async list( querystring?: AgentRideListValidation['querystring'] ): Promise<Data<AgentRideListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRideListValidation['response']>>>({
			url: `/agent/ride/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<Data<AgentRideGetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRideGetValidation['response']>>>({
			url: `/agent/ride/orders/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async accept( reference: string, body: AgentRideAcceptValidation['body'] ): Promise<Data<AgentRideAcceptValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRideAcceptValidation['response']>>>({
			url: `/agent/ride/orders/${reference}/accept`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async start( reference: string, body: AgentRideStartValidation['body'] ): Promise<Data<AgentRideStartValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRideStartValidation['response']>>>({
			url: `/agent/ride/orders/${reference}/start`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async complete( reference: string, body: AgentRideCompleteValidation['body'] ): Promise<Data<AgentRideCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRideCompleteValidation['response']>>>({
			url: `/agent/ride/orders/${reference}/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: AgentRideCancelValidation['body'] ): Promise<Data<AgentRideCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRideCancelValidation['response']>>>({
			url: `/agent/ride/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
