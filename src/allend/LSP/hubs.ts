import type { APIResponseBase } from '@de./types'
import type {
	LSPHubCreateValidation,
	LSPHubRetrieveValidation,
	LSPHubListValidation,
	LSPHubUpdateValidation,
	LSPHubUpdateStatusValidation,
	LSPHubRemoveValidation,
	LSPHubGetOperationsCapabilityValidation,
	LSPHubSetOperationsCapabilityValidation,
	LSPHubSetCapacityValidation,
	LSPHubGetCapacityValidation
} from '@de./types/lsp/hub'
import type {
	LSPSortValidation,
	LSPSortingListValidation,
	LSPSortingStatsValidation,
	LSPCrossDockInitiateValidation,
	LSPCrossDockCompleteValidation,
	LSPCrossDockStatsValidation
} from '@de./types/lsp/order/management'
import type {
	LSPPassthroughOrderCreateValidation,
	LSPPassthroughOrderListValidation,
	LSPPassthroughOrderGetValidation,
	LSPPassthroughOrderLogsValidation,
	LSPPassthroughOrderUpdateStageValidation,
	LSPPassthroughOrderUpdateStatusValidation,
	LSPPassthroughOrderAssignValidation,
	LSPPassthroughOrderCancelValidation
} from '@de./types/lsp/order/passthrough'
import { qs, type Http, type Res, type Data } from '../../utils'
import { LSPPricingBindToValidation } from '@de./types/lsp/pricing'
import LSPFacilityPSL from './psl'
import LSPFacilityInventory from './inventory'

// ── LSP Hubs ──────────────────────────────────────────────────────────────────

export default class LSPHubs {
	psl: LSPFacilityPSL
	inventory: LSPFacilityInventory

	constructor( private http: Http ){
		this.psl = new LSPFacilityPSL( this.http, 'hubs' )
		this.inventory = new LSPFacilityInventory( this.http, 'hubs' )
	}

	async create( body: LSPHubCreateValidation['body'] ): Promise<LSPHubCreateValidation['response']> {
		return await this.http.request<LSPHubCreateValidation['response']>({
			url: '/lsp/hubs/create',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPHubListValidation['querystring'] ): Promise<LSPHubListValidation['response']> {
		return await this.http.request<LSPHubListValidation['response']>({
			url: `/lsp/hubs${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<LSPHubRetrieveValidation['response']> {
		return await this.http.request<LSPHubRetrieveValidation['response']>({
			url: `/lsp/hubs/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPHubUpdateValidation['body'] ): Promise<LSPHubUpdateValidation['response']> {
		return await this.http.request<LSPHubUpdateValidation['response']>({
			url: `/lsp/hubs/${id}`,
			method: 'PATCH',
			body
		})
	}

	async updateStatus( id: string, body: LSPHubUpdateStatusValidation['body'] ): Promise<LSPHubUpdateStatusValidation['response']> {
		return await this.http.request<LSPHubUpdateStatusValidation['response']>({
			url: `/lsp/hubs/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<LSPHubRemoveValidation['response']> {
		return await this.http.request<LSPHubRemoveValidation['response']>({
			url: `/lsp/hubs/${id}`,
			method: 'DELETE'
		})
	}

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		return await this.http.request<LSPPricingBindToValidation['response']>({
			url: `/lsp/hubs/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
	}

	// ── Capabilities ──────────────────────────────────────────────────────────

	async getCapability( id: string, type: string ): Promise<LSPHubGetOperationsCapabilityValidation['response']> {
		return await this.http.request<LSPHubGetOperationsCapabilityValidation['response']>({
			url: `/lsp/hubs/${id}/capabilities/${type}`,
			method: 'GET'
		})
	}

	async setCapability( id: string, type: string, body: LSPHubSetOperationsCapabilityValidation['body'] ): Promise<LSPHubSetOperationsCapabilityValidation['response']> {
		return await this.http.request<LSPHubSetOperationsCapabilityValidation['response']>({
			url: `/lsp/hubs/${id}/capabilities/${type}`,
			method: 'PUT',
			body
		})
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getCapacity( id: string, type: string ): Promise<LSPHubGetCapacityValidation['response']> {
		return await this.http.request<LSPHubGetCapacityValidation['response']>({
			url: `/lsp/hubs/${id}/capacities/${type}`,
			method: 'GET'
		})
	}

	async setCapacity( id: string, type: string, body: LSPHubSetCapacityValidation['body'] ): Promise<LSPHubSetCapacityValidation['response']> {
		return await this.http.request<LSPHubSetCapacityValidation['response']>({
			url: `/lsp/hubs/${id}/capacities/${type}`,
			method: 'PUT',
			body
		})
	}

	// ── Passthrough ───────────────────────────────────────────────────────────

	async createPassthrough( hubId: string, body: LSPPassthroughOrderCreateValidation['body'] ): Promise<LSPPassthroughOrderCreateValidation['response']> {
		return await this.http.request<LSPPassthroughOrderCreateValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough`,
			method: 'POST',
			body
		})
	}

	async listPassthrough( hubId: string, querystring?: LSPPassthroughOrderListValidation['querystring'] ): Promise<LSPPassthroughOrderListValidation['response']> {
		return await this.http.request<LSPPassthroughOrderListValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrievePassthrough( hubId: string, reference: string ): Promise<LSPPassthroughOrderGetValidation['response']> {
		return await this.http.request<LSPPassthroughOrderGetValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}`,
			method: 'GET'
		})
	}

	async getPassthroughLogs( hubId: string, reference: string ): Promise<LSPPassthroughOrderLogsValidation['response']> {
		return await this.http.request<LSPPassthroughOrderLogsValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/logs`,
			method: 'GET'
		})
	}

	async updatePassthroughStage( hubId: string, reference: string, body: LSPPassthroughOrderUpdateStageValidation['body'] ): Promise<LSPPassthroughOrderUpdateStageValidation['response']> {
		return await this.http.request<LSPPassthroughOrderUpdateStageValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/stage`,
			method: 'PUT',
			body
		})
	}

	async updatePassthroughStatus( hubId: string, reference: string, body: LSPPassthroughOrderUpdateStatusValidation['body'] ): Promise<LSPPassthroughOrderUpdateStatusValidation['response']> {
		return await this.http.request<LSPPassthroughOrderUpdateStatusValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/status`,
			method: 'PUT',
			body
		})
	}

	async assignPassthrough( hubId: string, reference: string, body: LSPPassthroughOrderAssignValidation['body'] ): Promise<LSPPassthroughOrderAssignValidation['response']> {
		return await this.http.request<LSPPassthroughOrderAssignValidation['response']>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/assign`,
			method: 'PATCH',
			body
		})
	}

	async removePassthrough( hubId: string, reference: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}`,
			method: 'DELETE'
		})
	}

	// ── Sorting ───────────────────────────────────────────────────────────────

	async createSortingJob( hubId: string, body: LSPSortValidation['body'] ): Promise<LSPSortValidation['response']> {
		return await this.http.request<LSPSortValidation['response']>({
			url: `/lsp/hubs/${hubId}/sorting`,
			method: 'POST',
			body
		})
	}

	async listSortingJobs( hubId: string, querystring?: LSPSortingListValidation['querystring'] ): Promise<LSPSortingListValidation['response']> {
		return await this.http.request<LSPSortingListValidation['response']>({
			url: `/lsp/hubs/${hubId}/sorting${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getSortingStats( hubId: string, querystring?: LSPSortingStatsValidation['querystring'] ): Promise<LSPSortingStatsValidation['response']> {
		return await this.http.request<LSPSortingStatsValidation['response']>({
			url: `/lsp/hubs/${hubId}/sorting/stats${qs( querystring )}`,
			method: 'GET'
		})
	}

	// ── Cross-docking ─────────────────────────────────────────────────────────

	async initiateCrossDock( hubId: string, body: LSPCrossDockInitiateValidation['body'] ): Promise<LSPCrossDockInitiateValidation['response']> {
		return await this.http.request<LSPCrossDockInitiateValidation['response']>({
			url: `/lsp/hubs/${hubId}/crossdock/initiate`,
			method: 'POST',
			body
		})
	}

	async completeCrossDock( hubId: string, body: LSPCrossDockCompleteValidation['body'] ): Promise<LSPCrossDockCompleteValidation['response']> {
		return await this.http.request<LSPCrossDockCompleteValidation['response']>({
			url: `/lsp/hubs/${hubId}/crossdock/complete`,
			method: 'POST',
			body
		})
	}

	async getCrossDockStats( hubId: string, querystring?: LSPCrossDockStatsValidation['querystring'] ): Promise<LSPCrossDockStatsValidation['response']> {
		return await this.http.request<LSPCrossDockStatsValidation['response']>({
			url: `/lsp/hubs/${hubId}/crossdock/stats${qs( querystring )}`,
			method: 'GET'
		})
	}
}
