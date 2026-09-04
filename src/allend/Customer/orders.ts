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

	async list( querystring?: CustomerOrderListValidation['querystring'] ): Promise<CustomerOrderListValidation['response']> {
		return await this.http.request<CustomerOrderListValidation['response']>({
			url: `/customer/orders${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string, querystring?: CustomerOrderGetValidation['querystring'] ): Promise<CustomerOrderGetValidation['response']> {
		return await this.http.request<CustomerOrderGetValidation['response']>({
			url: `/customer/orders/${reference}${qs( querystring )}`,
			method: 'GET'
		})
	}

	async tracking( reference: string ): Promise<CustomerOrderTrackingValidation['response']> {
		return await this.http.request<CustomerOrderTrackingValidation['response']>({
			url: `/customer/orders/${reference}/tracking`,
			method: 'GET'
		})
	}

	async cancel( reference: string, body: CustomerOrderCancelValidation['body'] ): Promise<CustomerOrderCancelValidation['response']> {
		return await this.http.request<CustomerOrderCancelValidation['response']>({
			url: `/customer/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
	}

	async rating( reference: string, body: CustomerOrderRatingValidation['body'] ): Promise<CustomerOrderRatingValidation['response']> {
		return await this.http.request<CustomerOrderRatingValidation['response']>({
			url: `/customer/orders/${reference}/rating`,
			method: 'POST',
			body
		})
	}
}
