import type {
	LSPOrderCompleteValidation,
	LSPOrderCancelValidation,
	LSPOrderFailValidation,
	LSPOrderUpdateStageValidation,
	LSPOrderGetStatusValidation,
	LSPOrderListValidation,
	LSPOrderGetValidation,
	LSPOrderSubscribeValidation
} from '@de./types/lsp/order/management'
import type {
	LSPInboundOrderCreateValidation,
	LSPInboundOrderCompleteValidation,
	LSPInboundOrderUpdateValidation,
	LSPInboundOrderRetrieveValidation,
	LSPInboundOrderListValidation,
	LSPInboundOrderUpdateStatusValidation
} from '@de./types/lsp/order/inbound'
import type {
	LSPTaskCreateValidation,
	LSPTaskListValidation,
	LSPTaskRetrieveValidation,
	LSPTaskUpdateValidation,
	LSPTaskUpdateStatusValidation,
	LSPTaskCompleteValidation,
	LSPTaskBatchCreateValidation,
	LSPTaskCancelValidation,
	LSPTaskPerformanceValidation
} from '@de./types/lsp/order/internal'
import type {
	LSPShipmentCreateValidation,
	LSPShipmentUpdateValidation,
	LSPShipmentRetrieveValidation,
	LSPShipmentFetchValidation,
	LSPShipmentUpdateStatusValidation,
	LSPShipmentAddPackageValidation
} from '@de./types/lsp/operations'
import type {
	LSPShippingOrderRetrieveValidation,
	LSPShippingOrderListValidation,
	LSPShippingOrderAssignOrUnassignValidation,
	LSPShippingOrderRefOnlyValidation,
	LSPShippingOrderCompleteValidation
} from '@de./types/lsp/order/shipping'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Orders ────────────────────────────────────────────────────────────────

export default class LSPOrders {
	constructor( private http: Http ){}

	// ── Order Management ──────────────────────────────────────────────────────

	async list( querystring?: LSPOrderListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getStatus( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/status`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async complete( reference: string, body: LSPOrderCompleteValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/complete`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: LSPOrderCancelValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/cancel`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async fail( reference: string, body: LSPOrderFailValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/fail`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStage( reference: string, body: LSPOrderUpdateStageValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/stage`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async subscribe( id: string, reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/track/subscribe`,
			method: 'POST',
			body: { id }
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Inbound Orders ────────────────────────────────────────────────────────

	async createInbound( facilityId: string, body: LSPInboundOrderCreateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeInbound( facilityId: string, reference: string, body: LSPInboundOrderCompleteValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound/${reference}/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listInbound( facilityId: string, querystring?: LSPInboundOrderListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveInbound( facilityId: string, reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateInbound( facilityId: string, reference: string, body: LSPInboundOrderUpdateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateInboundStatus( facilityId: string, reference: string, body: LSPInboundOrderUpdateStatusValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignOrUnassignInbound( facilityId: string, reference: string, action: string, to: string, body: { id: string } ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/inbound/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Tasks ─────────────────────────────────────────────────────────────────

	async createTask( facilityId: string, body: LSPTaskCreateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async createTaskBatch( facilityId: string, body: LSPTaskBatchCreateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/batch`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeTask( facilityId: string, reference: string, body: LSPTaskCompleteValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/${reference}/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listTasks( facilityId: string, querystring?: LSPTaskListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveTask( facilityId: string, reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTaskPerformance( facilityId: string, querystring: LSPTaskPerformanceValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/metrics/performance${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTask( facilityId: string, reference: string, body: LSPTaskUpdateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTaskStatus( facilityId: string, reference: string, body: LSPTaskUpdateStatusValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignOrUnassignTask( facilityId: string, reference: string, action: string, to: string, body: { id: string } ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelTask( facilityId: string, reference: string, body: LSPTaskCancelValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/${facilityId}/tasks/${reference}/cancel`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Shipments ─────────────────────────────────────────────────────────────

	async createShipment( reference: string, body: LSPShipmentCreateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/orders/${reference}/shipments`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listShipments( querystring?: LSPShipmentFetchValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveShipment( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipments/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateShipment( reference: string, body: LSPShipmentUpdateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipments/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateShipmentStatus( reference: string, body: LSPShipmentUpdateStatusValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipments/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addShipmentPackage( reference: string, body: LSPShipmentAddPackageValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipments/${reference}/packages`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Shipping Orders ───────────────────────────────────────────────────────

	async listShipping( querystring?: LSPShippingOrderListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveShipping( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeShipping( reference: string, body: LSPShippingOrderCompleteValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping/${reference}/complete`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async approveShipping( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping/${reference}/approve`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async suspendShipping( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping/${reference}/suspend`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelShipping( reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping/${reference}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignOrUnassignShipping( reference: string, action: 'assign' | 'unassign', to: 'agent' | 'operator', body: { id: string } ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/shipping/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
