import type {
	CustomerRideRequestValidation,
	CustomerRideListValidation,
	CustomerRideGetValidation,
	CustomerRideTrackingValidation,
	CustomerRideCancelValidation,
	CustomerRideRatingValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Customer Rides ───────────────────────────────────────────────────────────

export default class CustomerRides {
	constructor( private http: Http ){}

	async request( body: CustomerRideRequestValidation['body'] ): Promise<CustomerRideRequestValidation['response']> {
		return await this.http.request<CustomerRideRequestValidation['response']>({
			url: '/customer/rides',
			method: 'POST',
			body
		})
	}

	async list( querystring?: CustomerRideListValidation['querystring'] ): Promise<CustomerRideListValidation['response']> {
		return await this.http.request<CustomerRideListValidation['response']>({
			url: `/customer/rides${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<CustomerRideGetValidation['response']> {
		return await this.http.request<CustomerRideGetValidation['response']>({
			url: `/customer/rides/${reference}`,
			method: 'GET'
		})
	}

	async tracking( reference: string ): Promise<CustomerRideTrackingValidation['response']> {
		return await this.http.request<CustomerRideTrackingValidation['response']>({
			url: `/customer/rides/${reference}/tracking`,
			method: 'GET'
		})
	}

	async cancel( reference: string, body: CustomerRideCancelValidation['body'] ): Promise<CustomerRideCancelValidation['response']> {
		return await this.http.request<CustomerRideCancelValidation['response']>({
			url: `/customer/rides/${reference}/cancel`,
			method: 'POST',
			body
		})
	}

	async rating( reference: string, body: CustomerRideRatingValidation['body'] ): Promise<CustomerRideRatingValidation['response']> {
		return await this.http.request<CustomerRideRatingValidation['response']>({
			url: `/customer/rides/${reference}/rating`,
			method: 'POST',
			body
		})
	}
}
