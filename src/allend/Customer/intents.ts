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

	async create( body: CustomerIntentCreateValidation['body'] ): Promise<CustomerIntentCreateValidation['response']> {
		return await this.http.request<CustomerIntentCreateValidation['response']>({
			url: '/customer/intents',
			method: 'POST',
			body
		})
	}

	async get( intentToken: string ): Promise<CustomerIntentGetValidation['response']> {
		return await this.http.request<CustomerIntentGetValidation['response']>({
			url: '/customer/intents',
			method: 'GET',
			headers: { 'x-intent-token': intentToken }
		})
	}

	async addWaypoints( intentToken: string, body: CustomerIntentAddWaypointsValidation['body'] ): Promise<CustomerIntentAddWaypointsValidation['response']> {
		return await this.http.request<CustomerIntentAddWaypointsValidation['response']>({
			url: '/customer/intents/waypoints',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
	}

	async addPackages( intentToken: string, body: CustomerIntentAddPackagesValidation['body'] ): Promise<CustomerIntentAddPackagesValidation['response']> {
		return await this.http.request<CustomerIntentAddPackagesValidation['response']>({
			url: '/customer/intents/packages',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
	}

	async submit( intentToken: string, body: CustomerIntentSubmitValidation['body'] ): Promise<CustomerIntentSubmitValidation['response']> {
		return await this.http.request<CustomerIntentSubmitValidation['response']>({
			url: '/customer/intents/submit',
			method: 'POST',
			headers: { 'x-intent-token': intentToken },
			body
		})
	}

	async cancel( intentToken: string ): Promise<CustomerIntentCancelValidation['response']> {
		return await this.http.request<CustomerIntentCancelValidation['response']>({
			url: '/customer/intents',
			method: 'DELETE',
			headers: { 'x-intent-token': intentToken }
		})
	}
}
