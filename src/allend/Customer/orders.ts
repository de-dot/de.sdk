import type {
	CustomerOrderListValidation,
	CustomerOrderGetValidation,
	CustomerOrderTrackingValidation,
	CustomerOrderCancelValidation,
	CustomerOrderRatingValidation
} from '@de./types'
import { qs, type Http, type Res } from '../../utils'

// ─── Customer Orders ──────────────────────────────────────────────────────────

export default class CustomerOrders {
	constructor( private http: Http ){}

	async list( querystring?: CustomerOrderListValidation['querystring'] ): Promise<CustomerOrderListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerOrderListValidation['response']>>({
			url: `/customer/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string, querystring?: CustomerOrderGetValidation['querystring'] ): Promise<CustomerOrderGetValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerOrderGetValidation['response']>>({
			url: `/customer/orders/${reference}${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async tracking( reference: string ): Promise<CustomerOrderTrackingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerOrderTrackingValidation['response']>>({
			url: `/customer/orders/${reference}/tracking`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: CustomerOrderCancelValidation['body'] ): Promise<CustomerOrderCancelValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerOrderCancelValidation['response']>>({
			url: `/customer/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rating( reference: string, body: CustomerOrderRatingValidation['body'] ): Promise<CustomerOrderRatingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CustomerOrderRatingValidation['response']>>({
			url: `/customer/orders/${reference}/rating`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
