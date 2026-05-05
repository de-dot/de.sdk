import type {
	CustomerRideRequestValidation,
	CustomerRideListValidation,
	CustomerRideGetValidation,
	CustomerRideTrackingValidation,
	CustomerRideCancelValidation,
	CustomerRideRatingValidation
} from '@de./types'
import { qs, type Http, type Res } from '../../utils'

// ─── Customer Rides ───────────────────────────────────────────────────────────

export default class CustomerRides {
	constructor( private http: Http ){}

	async request( body: CustomerRideRequestValidation['body'] ): Promise<CustomerRideRequestValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerRideRequestValidation['response']>>({
			url: '/customer/rides',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: CustomerRideListValidation['querystring'] ): Promise<CustomerRideListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerRideListValidation['response']>>({
			url: `/customer/rides${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<CustomerRideGetValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerRideGetValidation['response']>>({
			url: `/customer/rides/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async tracking( reference: string ): Promise<CustomerRideTrackingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerRideTrackingValidation['response']>>({
			url: `/customer/rides/${reference}/tracking`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: CustomerRideCancelValidation['body'] ): Promise<CustomerRideCancelValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerRideCancelValidation['response']>>({
			url: `/customer/rides/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rating( reference: string, body: CustomerRideRatingValidation['body'] ): Promise<CustomerRideRatingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerRideRatingValidation['response']>>({
			url: `/customer/rides/${reference}/rating`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
