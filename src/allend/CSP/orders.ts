import type {
	CSPOrderCreateValidation,
	CSPOrderRetrieveValidation,
	CSPOrderListValidation,
	CSPOrderUpdateValidation,
	CSPOrderTrackingValidation,
	CSPOrderCancelValidation,
	CSPOrderTimelineValidation,
	CSPOrderReportExceptionValidation,
	CSPOrderListExceptionsValidation,
	CSPOrderResolveExceptionValidation,
	CSPOrderDispatchValidation,
	CSPOrderSplitValidation,
	CSPOrderUpdateStatusValidation
} from '@de./types/csp/order'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── CSP Orders ────────────────────────────────────────────────────────────

export default class CSPOrders {
	constructor( private http: Http ){}

	async create( body: CSPOrderCreateValidation['body'] ): Promise<Data<CSPOrderCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderCreateValidation['response']>>>({
			url: '/csp/orders',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( reference: string ): Promise<Data<CSPOrderRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderRetrieveValidation['response']>>>({
			url: `/csp/orders/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: CSPOrderListValidation['querystring'] ): Promise<Data<CSPOrderListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderListValidation['response']>>>({
			url: `/csp/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: CSPOrderUpdateValidation['body'] ): Promise<Data<CSPOrderUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderUpdateValidation['response']>>>({
			url: `/csp/orders/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async tracking( reference: string ): Promise<Data<CSPOrderTrackingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderTrackingValidation['response']>>>({
			url: `/csp/orders/${reference}/tracking`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: CSPOrderCancelValidation['body'] ): Promise<Data<CSPOrderCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderCancelValidation['response']>>>({
			url: `/csp/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async timeline( reference: string ): Promise<Data<CSPOrderTimelineValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderTimelineValidation['response']>>>({
			url: `/csp/orders/${reference}/timeline`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async reportException( reference: string, body: CSPOrderReportExceptionValidation['body'] ): Promise<Data<CSPOrderReportExceptionValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderReportExceptionValidation['response']>>>({
			url: `/csp/orders/${reference}/exceptions`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listExceptions( reference: string ): Promise<Data<CSPOrderListExceptionsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderListExceptionsValidation['response']>>>({
			url: `/csp/orders/${reference}/exceptions`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async resolveException( reference: string, exceptionId: string, body: CSPOrderResolveExceptionValidation['body'] ): Promise<Data<CSPOrderResolveExceptionValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderResolveExceptionValidation['response']>>>({
			url: `/csp/orders/${reference}/exceptions/${exceptionId}/resolve`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async dispatch( reference: string, body: CSPOrderDispatchValidation['body'] ): Promise<Data<CSPOrderDispatchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderDispatchValidation['response']>>>({
			url: `/csp/orders/${reference}/dispatch`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async split( reference: string, body: CSPOrderSplitValidation['body'] ): Promise<Data<CSPOrderSplitValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderSplitValidation['response']>>>({
			url: `/csp/orders/${reference}/split`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( reference: string, body: CSPOrderUpdateStatusValidation['body'] ): Promise<Data<CSPOrderUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPOrderUpdateStatusValidation['response']>>>({
			url: `/csp/orders/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
