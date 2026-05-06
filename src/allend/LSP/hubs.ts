import type {
	LSPHubCreateValidation,
	LSPHubRetrieveValidation,
	LSPHubListValidation,
	LSPHubUpdateValidation,
	LSPHubUpdateStatusValidation,
	LSPHubRemoveValidation,
	LSPHubGetCapabilityValidation,
	LSPHubSetCapabilityValidation,
	LSPHubGetCapacityValidation,
	LSPHubSetCapacityValidation
} from '@de./types/lsp/hub'
import type {
	LSPSortValidation,
	LSPCrossDockInitiateValidation,
	LSPCrossDockCompleteValidation
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

// ── LSP Hubs ──────────────────────────────────────────────────────────────────

export default class LSPHubs {
	constructor( private http: Http ){}

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

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	async bindPricing( id: string, action: 'add' | 'remove', body: { id?: string, code?: string } ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────

	async getCapability( id: string, type: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${id}/capabilities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapability( id: string, type: string, body: LSPHubSetCapabilityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${id}/capabilities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getCapacity( id: string, type: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${id}/capacities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapacity( id: string, type: string, body: LSPHubSetCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${id}/capacities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Passthrough ───────────────────────────────────────────────────────────

	async createPassthrough( hubId: string, body: LSPPassthroughOrderCreateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listPassthrough( hubId: string, querystring?: LSPPassthroughOrderListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrievePassthrough( hubId: string, reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getPassthroughLogs( hubId: string, reference: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/logs`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updatePassthroughStage( hubId: string, reference: string, body: LSPPassthroughOrderUpdateStageValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/stage`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updatePassthroughStatus( hubId: string, reference: string, body: LSPPassthroughOrderUpdateStatusValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/passthrough/${reference}/status`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignPassthrough( hubId: string, reference: string, body: LSPPassthroughOrderAssignValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
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

	async createSortingJob( hubId: string, body: LSPSortValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/sorting`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listSortingJobs( hubId: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/sorting`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getSortingStats( hubId: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/sorting/stats`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Cross-docking ─────────────────────────────────────────────────────────

	async initiateCrossDock( hubId: string, body: LSPCrossDockInitiateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/crossdock/initiate`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async completeCrossDock( hubId: string, body: LSPCrossDockCompleteValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/crossdock/complete`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCrossDockStats( hubId: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/hubs/${hubId}/crossdock/stats`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
