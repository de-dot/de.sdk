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
import { qs, type Http, type Res } from '../../utils'

// ── CSP Orders ────────────────────────────────────────────────────────────

export default class CSPOrders {
	constructor( private http: Http ){}

	async create( body: CSPOrderCreateValidation['body'] ): Promise<CSPOrderCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderCreateValidation['response']>>({
			url: '/csp/orders',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( reference: string ): Promise<CSPOrderRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderRetrieveValidation['response']>>({
			url: `/csp/orders/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: CSPOrderListValidation['querystring'] ): Promise<CSPOrderListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderListValidation['response']>>({
			url: `/csp/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: CSPOrderUpdateValidation['body'] ): Promise<CSPOrderUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderUpdateValidation['response']>>({
			url: `/csp/orders/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async tracking( reference: string ): Promise<CSPOrderTrackingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderTrackingValidation['response']>>({
			url: `/csp/orders/${reference}/tracking`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: CSPOrderCancelValidation['body'] ): Promise<CSPOrderCancelValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderCancelValidation['response']>>({
			url: `/csp/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async timeline( reference: string ): Promise<CSPOrderTimelineValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderTimelineValidation['response']>>({
			url: `/csp/orders/${reference}/timeline`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async reportException( reference: string, body: CSPOrderReportExceptionValidation['body'] ): Promise<CSPOrderReportExceptionValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderReportExceptionValidation['response']>>({
			url: `/csp/orders/${reference}/exceptions`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listExceptions( reference: string ): Promise<CSPOrderListExceptionsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderListExceptionsValidation['response']>>({
			url: `/csp/orders/${reference}/exceptions`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async resolveException( reference: string, exceptionId: string, body: CSPOrderResolveExceptionValidation['body'] ): Promise<CSPOrderResolveExceptionValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderResolveExceptionValidation['response']>>({
			url: `/csp/orders/${reference}/exceptions/${exceptionId}/resolve`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async dispatch( reference: string, body: CSPOrderDispatchValidation['body'] ): Promise<CSPOrderDispatchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderDispatchValidation['response']>>({
			url: `/csp/orders/${reference}/dispatch`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async split( reference: string, body: CSPOrderSplitValidation['body'] ): Promise<CSPOrderSplitValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderSplitValidation['response']>>({
			url: `/csp/orders/${reference}/split`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( reference: string, body: CSPOrderUpdateStatusValidation['body'] ): Promise<CSPOrderUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPOrderUpdateStatusValidation['response']>>({
			url: `/csp/orders/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
