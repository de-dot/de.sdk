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
import { qs, type Http, type Res } from '../../utils'
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
		const { error, message, data } = await this.http.request<Res<LSPHubCreateValidation['response']>>({
			url: '/lsp/hubs/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPHubListValidation['querystring'] ): Promise<LSPHubListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubListValidation['response']>>({
			url: `/lsp/hubs${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<LSPHubRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubRetrieveValidation['response']>>({
			url: `/lsp/hubs/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPHubUpdateValidation['body'] ): Promise<LSPHubUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubUpdateValidation['response']>>({
			url: `/lsp/hubs/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPHubUpdateStatusValidation['body'] ): Promise<LSPHubUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubUpdateStatusValidation['response']>>({
			url: `/lsp/hubs/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<boolean> {
		const { error, message } = await this.http.request<Res<LSPHubRemoveValidation['response']>>({
			url: `/lsp/hubs/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return true
	}

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPricingBindToValidation['response']>>({
			url: `/lsp/hubs/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────

	async getCapability( id: string, type: string ): Promise<LSPHubGetOperationsCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubGetOperationsCapabilityValidation['response']>>({
			url: `/lsp/hubs/${id}/capabilities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapability( id: string, type: string, body: LSPHubSetOperationsCapabilityValidation['body'] ): Promise<LSPHubSetOperationsCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubSetOperationsCapabilityValidation['response']>>({
			url: `/lsp/hubs/${id}/capabilities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getCapacity( id: string, type: string ): Promise<LSPHubGetCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubGetCapacityValidation['response']>>({
			url: `/lsp/hubs/${id}/capacities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapacity( id: string, type: string, body: LSPHubSetCapacityValidation['body'] ): Promise<LSPHubSetCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPHubSetCapacityValidation['response']>>({
			url: `/lsp/hubs/${id}/capacities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Passthrough ───────────────────────────────────────────────────────────

	async createPassthrough( hubId: string, body: LSPPassthroughOrderCreateValidation['body'] ): Promise<LSPPassthroughOrderCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderCreateValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listPassthrough( hubId: string, querystring?: LSPPassthroughOrderListValidation['querystring'] ): Promise<LSPPassthroughOrderListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderListValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrievePassthrough( hubId: string, reference: string ): Promise<LSPPassthroughOrderGetValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderGetValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getPassthroughLogs( hubId: string, reference: string ): Promise<LSPPassthroughOrderLogsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderLogsValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/logs`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updatePassthroughStage( hubId: string, reference: string, body: LSPPassthroughOrderUpdateStageValidation['body'] ): Promise<LSPPassthroughOrderUpdateStageValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderUpdateStageValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/stage`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updatePassthroughStatus( hubId: string, reference: string, body: LSPPassthroughOrderUpdateStatusValidation['body'] ): Promise<LSPPassthroughOrderUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderUpdateStatusValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/status`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignPassthrough( hubId: string, reference: string, body: LSPPassthroughOrderAssignValidation['body'] ): Promise<LSPPassthroughOrderAssignValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPassthroughOrderAssignValidation['response']>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/assign`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removePassthrough( hubId: string, reference: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Sorting ───────────────────────────────────────────────────────────────

	async createSortingJob( hubId: string, body: LSPSortValidation['body'] ): Promise<LSPSortValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPSortValidation['response']>>({
			url: `/lsp/hubs/${hubId}/sorting`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listSortingJobs( hubId: string, querystring?: LSPSortingListValidation['querystring'] ): Promise<LSPSortingListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPSortingListValidation['response']>>({
			url: `/lsp/hubs/${hubId}/sorting${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getSortingStats( hubId: string, querystring?: LSPSortingStatsValidation['querystring'] ): Promise<LSPSortingStatsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPSortingStatsValidation['response']>>({
			url: `/lsp/hubs/${hubId}/sorting/stats${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Cross-docking ─────────────────────────────────────────────────────────

	async initiateCrossDock( hubId: string, body: LSPCrossDockInitiateValidation['body'] ): Promise<LSPCrossDockInitiateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCrossDockInitiateValidation['response']>>({
			url: `/lsp/hubs/${hubId}/crossdock/initiate`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeCrossDock( hubId: string, body: LSPCrossDockCompleteValidation['body'] ): Promise<LSPCrossDockCompleteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCrossDockCompleteValidation['response']>>({
			url: `/lsp/hubs/${hubId}/crossdock/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCrossDockStats( hubId: string, querystring?: LSPCrossDockStatsValidation['querystring'] ): Promise<LSPCrossDockStatsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCrossDockStatsValidation['response']>>({
			url: `/lsp/hubs/${hubId}/crossdock/stats${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
