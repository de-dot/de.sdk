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
	async create( body: LSPOrderIntakeCreateValidation['body'] ): Promise<LSPOrderIntakeCreateValidation['response']> {
		return await this.http.request<LSPOrderIntakeCreateValidation['response']>({
			url: '/lsp/orders',
			method: 'POST',
			body
		})
	}

	/** Release an order the engine is holding for the sender's approval. */
	async approve( reference: string ): Promise<LSPOrderIntakeApproveValidation['response']> {
		return await this.http.request<LSPOrderIntakeApproveValidation['response']>({
			url: `/lsp/orders/${reference}/approve`,
			method: 'POST'
		})
	}

	// ── Order Management ──────────────────────────────────────────────────────

	async list( querystring?: LSPOrderListValidation['querystring'] ): Promise<LSPOrderListValidation['response']> {
		return await this.http.request<LSPOrderListValidation['response']>({
			url: `/lsp/orders${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<LSPOrderGetValidation['response']> {
		return await this.http.request<LSPOrderGetValidation['response']>({
			url: `/lsp/orders/${reference}`,
			method: 'GET'
		})
	}

	async getStatus( reference: string ): Promise<LSPOrderGetStatusValidation['response']> {
		return await this.http.request<LSPOrderGetStatusValidation['response']>({
			url: `/lsp/orders/${reference}/status`,
			method: 'GET'
		})
	}

	async complete( reference: string, body: LSPOrderCompleteValidation['body'] ): Promise<LSPOrderCompleteValidation['response']> {
		return await this.http.request<LSPOrderCompleteValidation['response']>({
			url: `/lsp/orders/${reference}/complete`,
			method: 'PATCH',
			body
		})
	}

	/**
	 * Put a stalled order back into a zone's dispatch queue.
	 *
	 * The coordinator's intervention when nothing has picked the order up —
	 * `zoneId` is where to try next, which need not be where it started.
	 */
	async requeue( reference: string, body: LSPOrderRequeueValidation['body'] ): Promise<LSPOrderRequeueValidation['response']> {
		return await this.http.request<LSPOrderRequeueValidation['response']>({
			url: `/lsp/orders/${reference}/requeue`,
			method: 'POST',
			body
		})
	}

	async cancel( reference: string, body: LSPOrderCancelValidation['body'] ): Promise<LSPOrderCancelValidation['response']> {
		return await this.http.request<LSPOrderCancelValidation['response']>({
			url: `/lsp/orders/${reference}/cancel`,
			method: 'PATCH',
			body
		})
	}

	async fail( reference: string, body: LSPOrderFailValidation['body'] ): Promise<LSPOrderFailValidation['response']> {
		return await this.http.request<LSPOrderFailValidation['response']>({
			url: `/lsp/orders/${reference}/fail`,
			method: 'PATCH',
			body
		})
	}

	async updateStage( reference: string, body: LSPOrderUpdateStageValidation['body'] ): Promise<LSPOrderUpdateStageValidation['response']> {
		return await this.http.request<LSPOrderUpdateStageValidation['response']>({
			url: `/lsp/orders/${reference}/stage`,
			method: 'PATCH',
			body
		})
	}

	async subscribe( id: string, reference: string ): Promise<LSPOrderSubscribeValidation['response']> {
		return await this.http.request<LSPOrderSubscribeValidation['response']>({
			url: `/lsp/orders/${reference}/track/subscribe`,
			method: 'POST',
			body: { id }
		})
	}

	// ── Inbound Orders ────────────────────────────────────────────────────────

	async createInbound( facilityId: string, body: LSPInboundOrderCreateValidation['body'] ): Promise<LSPInboundOrderCreateValidation['response']> {
		return await this.http.request<LSPInboundOrderCreateValidation['response']>({
			url: `/lsp/${facilityId}/inbound/create`,
			method: 'POST',
			body
		})
	}

	async completeInbound( facilityId: string, reference: string, body: LSPInboundOrderCompleteValidation['body'] ): Promise<LSPInboundOrderCompleteValidation['response']> {
		return await this.http.request<LSPInboundOrderCompleteValidation['response']>({
			url: `/lsp/${facilityId}/inbound/${reference}/complete`,
			method: 'POST',
			body
		})
	}

	async listInbound( facilityId: string, querystring?: LSPInboundOrderListValidation['querystring'] ): Promise<LSPInboundOrderListValidation['response']> {
		return await this.http.request<LSPInboundOrderListValidation['response']>({
			url: `/lsp/${facilityId}/inbound${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveInbound( facilityId: string, reference: string ): Promise<LSPInboundOrderRetrieveValidation['response']> {
		return await this.http.request<LSPInboundOrderRetrieveValidation['response']>({
			url: `/lsp/${facilityId}/inbound/${reference}`,
			method: 'GET'
		})
	}

	async updateInbound( facilityId: string, reference: string, body: LSPInboundOrderUpdateValidation['body'] ): Promise<LSPInboundOrderUpdateValidation['response']> {
		return await this.http.request<LSPInboundOrderUpdateValidation['response']>({
			url: `/lsp/${facilityId}/inbound/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async updateInboundStatus( facilityId: string, reference: string, body: LSPInboundOrderUpdateStatusValidation['body'] ): Promise<LSPInboundOrderUpdateStatusValidation['response']> {
		return await this.http.request<LSPInboundOrderUpdateStatusValidation['response']>({
			url: `/lsp/${facilityId}/inbound/${reference}/status`,
			method: 'PATCH',
			body
		})
	}

	async assignOrUnassignInbound( facilityId: string, reference: string, action: LSPInboundOrderAssignValidation['params']['action'], to: LSPInboundOrderAssignValidation['params']['to'], body: LSPInboundOrderAssignValidation['body'] ): Promise<LSPInboundOrderAssignValidation['response']> {
		return await this.http.request<LSPInboundOrderAssignValidation['response']>({
			url: `/lsp/${facilityId}/inbound/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
	}

	// ── Tasks ─────────────────────────────────────────────────────────────────

	async createTask( facilityId: string, body: LSPTaskCreateValidation['body'] ): Promise<LSPTaskCreateValidation['response']> {
		return await this.http.request<LSPTaskCreateValidation['response']>({
			url: `/lsp/${facilityId}/tasks/create`,
			method: 'POST',
			body
		})
	}

	async createTaskBatch( facilityId: string, body: LSPTaskBatchCreateValidation['body'] ): Promise<LSPTaskBatchCreateValidation['response']> {
		return await this.http.request<LSPTaskBatchCreateValidation['response']>({
			url: `/lsp/${facilityId}/tasks/batch`,
			method: 'POST',
			body
		})
	}

	async completeTask( facilityId: string, reference: string, body: LSPTaskCompleteValidation['body'] ): Promise<LSPTaskCompleteValidation['response']> {
		return await this.http.request<LSPTaskCompleteValidation['response']>({
			url: `/lsp/${facilityId}/tasks/${reference}/complete`,
			method: 'POST',
			body
		})
	}

	async listTasks( facilityId: string, querystring?: LSPTaskListValidation['querystring'] ): Promise<LSPTaskListValidation['response']> {
		return await this.http.request<LSPTaskListValidation['response']>({
			url: `/lsp/${facilityId}/tasks${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveTask( facilityId: string, reference: string ): Promise<LSPTaskRetrieveValidation['response']> {
		return await this.http.request<LSPTaskRetrieveValidation['response']>({
			url: `/lsp/${facilityId}/tasks/${reference}`,
			method: 'GET'
		})
	}

	async getTaskPerformance( facilityId: string, querystring: LSPTaskPerformanceValidation['querystring'] ): Promise<LSPTaskPerformanceValidation['response']> {
		return await this.http.request<LSPTaskPerformanceValidation['response']>({
			url: `/lsp/${facilityId}/tasks/metrics/performance${qs( querystring )}`,
			method: 'GET'
		})
	}

	async updateTask( facilityId: string, reference: string, body: LSPTaskUpdateValidation['body'] ): Promise<LSPTaskUpdateValidation['response']> {
		return await this.http.request<LSPTaskUpdateValidation['response']>({
			url: `/lsp/${facilityId}/tasks/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async updateTaskStatus( facilityId: string, reference: string, body: LSPTaskUpdateStatusValidation['body'] ): Promise<LSPTaskUpdateStatusValidation['response']> {
		return await this.http.request<LSPTaskUpdateStatusValidation['response']>({
			url: `/lsp/${facilityId}/tasks/${reference}/status`,
			method: 'PATCH',
			body
		})
	}

	async assignOrUnassignTask( facilityId: string, reference: string, action: LSPTaskAssignValidation['params']['action'], to: LSPTaskAssignValidation['params']['to'], body: LSPTaskAssignValidation['body'] ): Promise<LSPTaskAssignValidation['response']> {
		return await this.http.request<LSPTaskAssignValidation['response']>({
			url: `/lsp/${facilityId}/tasks/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
	}

	async cancelTask( facilityId: string, reference: string, body: LSPTaskCancelValidation['body'] ): Promise<LSPTaskCancelValidation['response']> {
		return await this.http.request<LSPTaskCancelValidation['response']>({
			url: `/lsp/${facilityId}/tasks/${reference}/cancel`,
			method: 'DELETE',
			body
		})
	}

	// ── Shipments ─────────────────────────────────────────────────────────────

	async createShipment( reference: string, body: LSPShipmentCreateValidation['body'] ): Promise<LSPShipmentCreateValidation['response']> {
		return await this.http.request<LSPShipmentCreateValidation['response']>({
			url: `/lsp/orders/${reference}/shipments`,
			method: 'POST',
			body
		})
	}

	async listShipments( querystring?: LSPShipmentFetchValidation['querystring'] ): Promise<LSPShipmentFetchValidation['response']> {
		return await this.http.request<LSPShipmentFetchValidation['response']>({
			url: `/lsp/shipments${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveShipment( reference: string ): Promise<LSPShipmentRetrieveValidation['response']> {
		return await this.http.request<LSPShipmentRetrieveValidation['response']>({
			url: `/lsp/shipments/${reference}`,
			method: 'GET'
		})
	}

	async updateShipment( reference: string, body: LSPShipmentUpdateValidation['body'] ): Promise<LSPShipmentUpdateValidation['response']> {
		return await this.http.request<LSPShipmentUpdateValidation['response']>({
			url: `/lsp/shipments/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async updateShipmentStatus( reference: string, body: LSPShipmentUpdateStatusValidation['body'] ): Promise<LSPShipmentUpdateStatusValidation['response']> {
		return await this.http.request<LSPShipmentUpdateStatusValidation['response']>({
			url: `/lsp/shipments/${reference}/status`,
			method: 'PATCH',
			body
		})
	}

	async addShipmentPackage( reference: string, body: LSPShipmentAddPackageValidation['body'] ): Promise<LSPShipmentAddPackageValidation['response']> {
		return await this.http.request<LSPShipmentAddPackageValidation['response']>({
			url: `/lsp/shipments/${reference}/packages`,
			method: 'POST',
			body
		})
	}

	// ── Shipping Orders ───────────────────────────────────────────────────────

	async listShipping( querystring?: LSPShippingOrderListValidation['querystring'] ): Promise<LSPShippingOrderListValidation['response']> {
		return await this.http.request<LSPShippingOrderListValidation['response']>({
			url: `/lsp/shipping${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveShipping( reference: string ): Promise<LSPShippingOrderRetrieveValidation['response']> {
		return await this.http.request<LSPShippingOrderRetrieveValidation['response']>({
			url: `/lsp/shipping/${reference}`,
			method: 'GET'
		})
	}

	async completeShipping( reference: string, body: LSPShippingOrderCompleteValidation['body'] ): Promise<LSPShippingOrderCompleteValidation['response']> {
		return await this.http.request<LSPShippingOrderCompleteValidation['response']>({
			url: `/lsp/shipping/${reference}/complete`,
			method: 'PATCH',
			body
		})
	}

	async approveShipping( reference: string ): Promise<LSPShippingOrderRefOnlyValidation['response']> {
		return await this.http.request<LSPShippingOrderRefOnlyValidation['response']>({
			url: `/lsp/shipping/${reference}/approve`,
			method: 'PATCH'
		})
	}

	async suspendShipping( reference: string ): Promise<LSPShippingOrderRefOnlyValidation['response']> {
		return await this.http.request<LSPShippingOrderRefOnlyValidation['response']>({
			url: `/lsp/shipping/${reference}/suspend`,
			method: 'PATCH'
		})
	}

	async cancelShipping( reference: string ): Promise<LSPShippingOrderRefOnlyValidation['response']> {
		return await this.http.request<LSPShippingOrderRefOnlyValidation['response']>({
			url: `/lsp/shipping/${reference}/cancel`,
			method: 'PATCH'
		})
	}

	async assignOrUnassignShipping( reference: string, action: 'assign' | 'unassign', to: 'agent' | 'operator', body: { id: string } ): Promise<LSPShippingOrderAssignOrUnassignValidation['response']> {
		return await this.http.request<LSPShippingOrderAssignOrUnassignValidation['response']>({
			url: `/lsp/shipping/${reference}/${action}/${to}`,
			method: 'PATCH',
			body
		})
	}
}
