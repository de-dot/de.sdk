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

	async request( body: CustomerRideRequestValidation['body'] ): Promise<Data<CustomerRideRequestValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerRideRequestValidation['response']>>>({
			url: '/customer/rides',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: CustomerRideListValidation['querystring'] ): Promise<Data<CustomerRideListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerRideListValidation['response']>>>({
			url: `/customer/rides${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<Data<CustomerRideGetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerRideGetValidation['response']>>>({
			url: `/customer/rides/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async tracking( reference: string ): Promise<Data<CustomerRideTrackingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerRideTrackingValidation['response']>>>({
			url: `/customer/rides/${reference}/tracking`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: CustomerRideCancelValidation['body'] ): Promise<Data<CustomerRideCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerRideCancelValidation['response']>>>({
			url: `/customer/rides/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rating( reference: string, body: CustomerRideRatingValidation['body'] ): Promise<Data<CustomerRideRatingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerRideRatingValidation['response']>>>({
			url: `/customer/rides/${reference}/rating`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
