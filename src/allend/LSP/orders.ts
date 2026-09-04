import type {
	LSPOrderCompleteValidation,
	LSPOrderCancelValidation,
	LSPOrderFailValidation,
	LSPOrderUpdateStageValidation,
	LSPOrderGetStatusValidation,
	LSPOrderListValidation,
	LSPOrderGetValidation,
	LSPOrderSubscribeValidation,
	LSPOrderRequeueValidation
} from '@de./types/lsp/order/management'
import type {
	LSPOrderIntakeCreateValidation,
	LSPOrderIntakeApproveValidation
} from '@de./types/lsp/order/delivery'
import type {
	LSPInboundOrderCreateValidation,
	LSPInboundOrderCompleteValidation,
	LSPInboundOrderUpdateValidation,
	LSPInboundOrderRetrieveValidation,
	LSPInboundOrderListValidation,
	LSPInboundOrderUpdateStatusValidation,
	LSPInboundOrderAssignValidation
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
	LSPTaskPerformanceValidation,
	LSPTaskAssignValidation
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
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Orders ────────────────────────────────────────────────────────────────

export default class LSPOrders {
	constructor( private http: Http ){}

	// ── Rally Intake ──────────────────────────────────────────────────────────

	/**
	 * Submit a delivery order for rally dispatch.
	 *
	 * `batchStatus` in the reply says what the engine did with it: FORMING and
	 * DISPATCHED mean it joined a batch, DIRECT that it was sent on its own,
	 * and the SENDER_* values that the sender's own limits stopped it. All four
	 * are successful submissions — only an error is a failure to submit.
	 */
	async create( body: LSPOrderIntakeCreateValidation['body'] ): Promise<Data<LSPOrderIntakeCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderIntakeCreateValidation['response']>>>({
			url: '/lsp/orders',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	/** Release an order the engine is holding for the sender's approval. */
	async approve( reference: string ): Promise<Data<LSPOrderIntakeApproveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderIntakeApproveValidation['response']>>>({
			url: `/lsp/orders/${reference}/approve`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Order Management ──────────────────────────────────────────────────────

	async list( querystring?: LSPOrderListValidation['querystring'] ): Promise<Data<LSPOrderListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderListValidation['response']>>>({
			url: `/lsp/orders${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<Data<LSPOrderGetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderGetValidation['response']>>>({
			url: `/lsp/orders/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getStatus( reference: string ): Promise<Data<LSPOrderGetStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderGetStatusValidation['response']>>>({
			url: `/lsp/orders/${reference}/status`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async complete( reference: string, body: LSPOrderCompleteValidation['body'] ): Promise<Data<LSPOrderCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderCompleteValidation['response']>>>({
			url: `/lsp/orders/${reference}/complete`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	/**
	 * Put a stalled order back into a zone's dispatch queue.
	 *
	 * The coordinator's intervention when nothing has picked the order up —
	 * `zoneId` is where to try next, which need not be where it started.
	 */
	async requeue( reference: string, body: LSPOrderRequeueValidation['body'] ): Promise<Data<LSPOrderRequeueValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderRequeueValidation['response']>>>({
			url: `/lsp/orders/${reference}/requeue`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( reference: string, body: LSPOrderCancelValidation['body'] ): Promise<Data<LSPOrderCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderCancelValidation['response']>>>({
			url: `/lsp/orders/${reference}/cancel`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async fail( reference: string, body: LSPOrderFailValidation['body'] ): Promise<Data<LSPOrderFailValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderFailValidation['response']>>>({
			url: `/lsp/orders/${reference}/fail`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStage( reference: string, body: LSPOrderUpdateStageValidation['body'] ): Promise<Data<LSPOrderUpdateStageValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderUpdateStageValidation['response']>>>({
			url: `/lsp/orders/${reference}/stage`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async subscribe( id: string, reference: string ): Promise<Data<LSPOrderSubscribeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPOrderSubscribeValidation['response']>>>({
			url: `/lsp/orders/${reference}/track/subscribe`,
			method: 'POST',
			body: { id }
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Inbound Orders ────────────────────────────────────────────────────────

	async createInbound( facilityId: string, body: LSPInboundOrderCreateValidation['body'] ): Promise<Data<LSPInboundOrderCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderCreateValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeInbound( facilityId: string, reference: string, body: LSPInboundOrderCompleteValidation['body'] ): Promise<Data<LSPInboundOrderCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderCompleteValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound/${reference}/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listInbound( facilityId: string, querystring?: LSPInboundOrderListValidation['querystring'] ): Promise<Data<LSPInboundOrderListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderListValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveInbound( facilityId: string, reference: string ): Promise<Data<LSPInboundOrderRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderRetrieveValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateInbound( facilityId: string, reference: string, body: LSPInboundOrderUpdateValidation['body'] ): Promise<Data<LSPInboundOrderUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderUpdateValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateInboundStatus( facilityId: string, reference: string, body: LSPInboundOrderUpdateStatusValidation['body'] ): Promise<Data<LSPInboundOrderUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderUpdateStatusValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignOrUnassignInbound( facilityId: string, reference: string, action: LSPInboundOrderAssignValidation['params']['action'], to: LSPInboundOrderAssignValidation['params']['to'], body: LSPInboundOrderAssignValidation['body'] ): Promise<Data<LSPInboundOrderAssignValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInboundOrderAssignValidation['response']>>>({
			url: `/lsp/${facilityId}/inbound/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Tasks ─────────────────────────────────────────────────────────────────

	async createTask( facilityId: string, body: LSPTaskCreateValidation['body'] ): Promise<Data<LSPTaskCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskCreateValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async createTaskBatch( facilityId: string, body: LSPTaskBatchCreateValidation['body'] ): Promise<Data<LSPTaskBatchCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskBatchCreateValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/batch`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeTask( facilityId: string, reference: string, body: LSPTaskCompleteValidation['body'] ): Promise<Data<LSPTaskCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskCompleteValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/${reference}/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listTasks( facilityId: string, querystring?: LSPTaskListValidation['querystring'] ): Promise<Data<LSPTaskListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskListValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveTask( facilityId: string, reference: string ): Promise<Data<LSPTaskRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskRetrieveValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTaskPerformance( facilityId: string, querystring: LSPTaskPerformanceValidation['querystring'] ): Promise<Data<LSPTaskPerformanceValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskPerformanceValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/metrics/performance${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTask( facilityId: string, reference: string, body: LSPTaskUpdateValidation['body'] ): Promise<Data<LSPTaskUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskUpdateValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTaskStatus( facilityId: string, reference: string, body: LSPTaskUpdateStatusValidation['body'] ): Promise<Data<LSPTaskUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskUpdateStatusValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignOrUnassignTask( facilityId: string, reference: string, action: LSPTaskAssignValidation['params']['action'], to: LSPTaskAssignValidation['params']['to'], body: LSPTaskAssignValidation['body'] ): Promise<Data<LSPTaskAssignValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskAssignValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelTask( facilityId: string, reference: string, body: LSPTaskCancelValidation['body'] ): Promise<Data<LSPTaskCancelValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPTaskCancelValidation['response']>>>({
			url: `/lsp/${facilityId}/tasks/${reference}/cancel`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Shipments ─────────────────────────────────────────────────────────────

	async createShipment( reference: string, body: LSPShipmentCreateValidation['body'] ): Promise<Data<LSPShipmentCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShipmentCreateValidation['response']>>>({
			url: `/lsp/orders/${reference}/shipments`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listShipments( querystring?: LSPShipmentFetchValidation['querystring'] ): Promise<Data<LSPShipmentFetchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShipmentFetchValidation['response']>>>({
			url: `/lsp/shipments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveShipment( reference: string ): Promise<Data<LSPShipmentRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShipmentRetrieveValidation['response']>>>({
			url: `/lsp/shipments/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateShipment( reference: string, body: LSPShipmentUpdateValidation['body'] ): Promise<Data<LSPShipmentUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShipmentUpdateValidation['response']>>>({
			url: `/lsp/shipments/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateShipmentStatus( reference: string, body: LSPShipmentUpdateStatusValidation['body'] ): Promise<Data<LSPShipmentUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShipmentUpdateStatusValidation['response']>>>({
			url: `/lsp/shipments/${reference}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addShipmentPackage( reference: string, body: LSPShipmentAddPackageValidation['body'] ): Promise<Data<LSPShipmentAddPackageValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShipmentAddPackageValidation['response']>>>({
			url: `/lsp/shipments/${reference}/packages`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Shipping Orders ───────────────────────────────────────────────────────

	async listShipping( querystring?: LSPShippingOrderListValidation['querystring'] ): Promise<Data<LSPShippingOrderListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderListValidation['response']>>>({
			url: `/lsp/shipping${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveShipping( reference: string ): Promise<Data<LSPShippingOrderRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderRetrieveValidation['response']>>>({
			url: `/lsp/shipping/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeShipping( reference: string, body: LSPShippingOrderCompleteValidation['body'] ): Promise<Data<LSPShippingOrderCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderCompleteValidation['response']>>>({
			url: `/lsp/shipping/${reference}/complete`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async approveShipping( reference: string ): Promise<Data<LSPShippingOrderRefOnlyValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderRefOnlyValidation['response']>>>({
			url: `/lsp/shipping/${reference}/approve`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async suspendShipping( reference: string ): Promise<Data<LSPShippingOrderRefOnlyValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderRefOnlyValidation['response']>>>({
			url: `/lsp/shipping/${reference}/suspend`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancelShipping( reference: string ): Promise<Data<LSPShippingOrderRefOnlyValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderRefOnlyValidation['response']>>>({
			url: `/lsp/shipping/${reference}/cancel`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignOrUnassignShipping( reference: string, action: 'assign' | 'unassign', to: 'agent' | 'operator', body: { id: string } ): Promise<Data<LSPShippingOrderAssignOrUnassignValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPShippingOrderAssignOrUnassignValidation['response']>>>({
			url: `/lsp/shipping/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
