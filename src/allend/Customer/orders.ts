import type {
	CustomerOrderListValidation,
	CustomerOrderGetValidation,
	CustomerOrderTrackingValidation,
	CustomerOrderCancelValidation,
	CustomerOrderRatingValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Customer Orders ──────────────────────────────────────────────────────────

export default class CustomerOrders {
	constructor( private http: Http ){}

	async list( querystring?: CustomerOrderListValidation['querystring'] ): Promise<Data<CustomerOrderListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerOrderListValidation['response']>>>({
			url: `/customer/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string, querystring?: CustomerOrderGetValidation['querystring'] ): Promise<Data<CustomerOrderGetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerOrderGetValidation['response']>>>({
			url: `/customer/orders/${reference}${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async tracking( reference: string ): Promise<Data<CustomerOrderTrackingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerOrderTrackingValidation['response']>>>({
			url: `/customer/orders/${reference}/tracking`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: CustomerOrderCancelValidation['body'] ): Promise<Data<CustomerOrderCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerOrderCancelValidation['response']>>>({
			url: `/customer/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rating( reference: string, body: CustomerOrderRatingValidation['body'] ): Promise<Data<CustomerOrderRatingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CustomerOrderRatingValidation['response']>>>({
			url: `/customer/orders/${reference}/rating`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
