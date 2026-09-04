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

	async create( body: CSPOrderCreateValidation['body'] ): Promise<CSPOrderCreateValidation['response']> {
		return await this.http.request<CSPOrderCreateValidation['response']>({
			url: '/csp/orders',
			method: 'POST',
			body
		})
	}

	async retrieve( reference: string ): Promise<CSPOrderRetrieveValidation['response']> {
		return await this.http.request<CSPOrderRetrieveValidation['response']>({
			url: `/csp/orders/${reference}`,
			method: 'GET'
		})
	}

	async list( querystring?: CSPOrderListValidation['querystring'] ): Promise<CSPOrderListValidation['response']> {
		return await this.http.request<CSPOrderListValidation['response']>({
			url: `/csp/orders${qs( querystring )}`,
			method: 'GET'
		})
	}

	async update( reference: string, body: CSPOrderUpdateValidation['body'] ): Promise<CSPOrderUpdateValidation['response']> {
		return await this.http.request<CSPOrderUpdateValidation['response']>({
			url: `/csp/orders/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async tracking( reference: string ): Promise<CSPOrderTrackingValidation['response']> {
		return await this.http.request<CSPOrderTrackingValidation['response']>({
			url: `/csp/orders/${reference}/tracking`,
			method: 'GET'
		})
	}

	async cancel( reference: string, body: CSPOrderCancelValidation['body'] ): Promise<CSPOrderCancelValidation['response']> {
		return await this.http.request<CSPOrderCancelValidation['response']>({
			url: `/csp/orders/${reference}/cancel`,
			method: 'POST',
			body
		})
	}

	async timeline( reference: string ): Promise<CSPOrderTimelineValidation['response']> {
		return await this.http.request<CSPOrderTimelineValidation['response']>({
			url: `/csp/orders/${reference}/timeline`,
			method: 'GET'
		})
	}

	async reportException( reference: string, body: CSPOrderReportExceptionValidation['body'] ): Promise<CSPOrderReportExceptionValidation['response']> {
		return await this.http.request<CSPOrderReportExceptionValidation['response']>({
			url: `/csp/orders/${reference}/exceptions`,
			method: 'POST',
			body
		})
	}

	async listExceptions( reference: string ): Promise<CSPOrderListExceptionsValidation['response']> {
		return await this.http.request<CSPOrderListExceptionsValidation['response']>({
			url: `/csp/orders/${reference}/exceptions`,
			method: 'GET'
		})
	}

	async resolveException( reference: string, exceptionId: string, body: CSPOrderResolveExceptionValidation['body'] ): Promise<CSPOrderResolveExceptionValidation['response']> {
		return await this.http.request<CSPOrderResolveExceptionValidation['response']>({
			url: `/csp/orders/${reference}/exceptions/${exceptionId}/resolve`,
			method: 'POST',
			body
		})
	}

	async dispatch( reference: string, body: CSPOrderDispatchValidation['body'] ): Promise<CSPOrderDispatchValidation['response']> {
		return await this.http.request<CSPOrderDispatchValidation['response']>({
			url: `/csp/orders/${reference}/dispatch`,
			method: 'POST',
			body
		})
	}

	async split( reference: string, body: CSPOrderSplitValidation['body'] ): Promise<CSPOrderSplitValidation['response']> {
		return await this.http.request<CSPOrderSplitValidation['response']>({
			url: `/csp/orders/${reference}/split`,
			method: 'POST',
			body
		})
	}

	async updateStatus( reference: string, body: CSPOrderUpdateStatusValidation['body'] ): Promise<CSPOrderUpdateStatusValidation['response']> {
		return await this.http.request<CSPOrderUpdateStatusValidation['response']>({
			url: `/csp/orders/${reference}/status`,
			method: 'PATCH',
			body
		})
	}
}
