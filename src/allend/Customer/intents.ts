import type {
	CustomerIntentCreateValidation,
	CustomerIntentGetValidation,
	CustomerIntentAddWaypointsValidation,
	CustomerIntentAddPackagesValidation,
	CustomerIntentSubmitValidation,
	CustomerIntentCancelValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Customer Intents ─────────────────────────────────────────────────────────

export default class CustomerIntents {
	constructor( private http: Http ){}

	async create( body: CustomerIntentCreateValidation['body'] ): Promise<CustomerIntentCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerIntentCreateValidation['response']>>({
			url: '/customer/intents',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( intentToken: string ): Promise<CustomerIntentGetValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerIntentGetValidation['response']>>({
			url: '/customer/intents',
			method: 'GET',
			headers: { 'x-intent-token': intentToken }
		})
		if( error ) throw new Error( message )
		return data
	}

	async addWaypoints( intentToken: string, body: CustomerIntentAddWaypointsValidation['body'] ): Promise<CustomerIntentAddWaypointsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerIntentAddWaypointsValidation['response']>>({
			url: '/customer/intents/waypoints',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addPackages( intentToken: string, body: CustomerIntentAddPackagesValidation['body'] ): Promise<CustomerIntentAddPackagesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerIntentAddPackagesValidation['response']>>({
			url: '/customer/intents/packages',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async submit( intentToken: string, body: CustomerIntentSubmitValidation['body'] ): Promise<CustomerIntentSubmitValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerIntentSubmitValidation['response']>>({
			url: '/customer/intents/submit',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( intentToken: string ): Promise<CustomerIntentCancelValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerIntentCancelValidation['response']>>({
			url: '/customer/intents',
			method: 'DELETE',
			headers: { 'x-intent-token': intentToken }
		})
		if( error ) throw new Error( message )
		return data
	}
}
