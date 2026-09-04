import type {
	CustomerIntentCreateValidation,
	CustomerIntentGetValidation,
	CustomerIntentAddWaypointsValidation,
	CustomerIntentAddPackagesValidation,
	CustomerIntentSubmitValidation,
	CustomerIntentCancelValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Customer Intents ─────────────────────────────────────────────────────────

export default class CustomerIntents {
	constructor( private http: Http ){}

	async create( body: CustomerIntentCreateValidation['body'] ): Promise<Data<CustomerIntentCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerIntentCreateValidation['response']>>>({
			url: '/customer/intents',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( intentToken: string ): Promise<Data<CustomerIntentGetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerIntentGetValidation['response']>>>({
			url: '/customer/intents',
			method: 'GET',
			headers: { 'x-intent-token': intentToken }
		})
		if( error ) throw new Error( message )
		return data
	}

	async addWaypoints( intentToken: string, body: CustomerIntentAddWaypointsValidation['body'] ): Promise<Data<CustomerIntentAddWaypointsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerIntentAddWaypointsValidation['response']>>>({
			url: '/customer/intents/waypoints',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addPackages( intentToken: string, body: CustomerIntentAddPackagesValidation['body'] ): Promise<Data<CustomerIntentAddPackagesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerIntentAddPackagesValidation['response']>>>({
			url: '/customer/intents/packages',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async submit( intentToken: string, body: CustomerIntentSubmitValidation['body'] ): Promise<Data<CustomerIntentSubmitValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerIntentSubmitValidation['response']>>>({
			url: '/customer/intents/submit',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( intentToken: string ): Promise<Data<CustomerIntentCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerIntentCancelValidation['response']>>>({
			url: '/customer/intents',
			method: 'DELETE',
			headers: { 'x-intent-token': intentToken }
		})
		if( error ) throw new Error( message )
		return data
	}
}
