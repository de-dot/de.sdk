import type {
	LSPCarrierCreateValidation,
	LSPCarrierRetrieveValidation,
	LSPCarrierListValidation,
	LSPCarrierUpdateValidation,
	LSPCarrierUpdateStatusValidation,
	LSPCarrierRemoveValidation,
	LSPCarrierGetTransportCapabilityValidation,
	LSPCarrierSetTransportCapabilityValidation,
	LSPCarrierUpdateTransportCapabilityValidation,
	LSPCarrierGetFleetCapabilityValidation,
	LSPCarrierSetFleetCapabilityValidation,
	LSPCarrierUpdateFleetCapabilityValidation,
	LSPCarrierGetHandlingCapabilityValidation,
	LSPCarrierSetHandlingCapabilityValidation,
	LSPCarrierUpdateHandlingCapabilityValidation,
	LSPCarrierGetCoverageCapabilityValidation,
	LSPCarrierSetCoverageCapabilityValidation,
	LSPCarrierUpdateCoverageCapabilityValidation,
	LSPCarrierGetTechnologyCapabilityValidation,
	LSPCarrierSetTechnologyCapabilityValidation,
	LSPCarrierUpdateTechnologyCapabilityValidation,
	LSPCarrierGetServiceCapabilityValidation,
	LSPCarrierSetServiceCapabilityValidation,
	LSPCarrierUpdateServiceCapabilityValidation,
	LSPCarrierGetComplianceCapabilityValidation,
	LSPCarrierSetComplianceCapabilityValidation,
	LSPCarrierUpdateComplianceCapabilityValidation,
	LSPCarrierGetAllCapabilitiesValidation,
	LSPCarrierBulkCapabilitiesUpdateValidation,
	LSPCarrierGetCapabilityInsightsValidation,
	LSPCarrierValidateCapabilityValidation,
	LSPCarrierGetFleetCapacityValidation,
	LSPCarrierSetFleetCapacityValidation,
	LSPCarrierGetServiceCapacityValidation,
	LSPCarrierSetServiceCapacityValidation,
	LSPCarrierGetOperationalCapacityValidation,
	LSPCarrierSetOperationalCapacityValidation,
	LSPCarrierGetNetworkCapacityValidation,
	LSPCarrierSetNetworkCapacityValidation,
	LSPCarrierGetTechnologyCapacityValidation,
	LSPCarrierSetTechnologyCapacityValidation,
	LSPCarrierGetFinancialCapacityValidation,
	LSPCarrierSetFinancialCapacityValidation,
	LSPCarrierGetAllCapacitiesValidation
} from '@de./types/lsp/carrier'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Carriers ──────────────────────────────────────────────────────────────

export default class LSPCarriers {
	constructor( private http: Http ){}

	async create( body: LSPCarrierCreateValidation['body'] ): Promise<LSPCarrierCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierCreateValidation['response']>>({
			url: '/lsp/carriers/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPCarrierListValidation['querystring'] ): Promise<LSPCarrierListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierListValidation['response']>>({
			url: `/lsp/carriers${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<LSPCarrierRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierRetrieveValidation['response']>>({
			url: `/lsp/carriers/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPCarrierUpdateValidation['body'] ): Promise<LSPCarrierUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateValidation['response']>>({
			url: `/lsp/carriers/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPCarrierUpdateStatusValidation['body'] ): Promise<LSPCarrierUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateStatusValidation['response']>>({
			url: `/lsp/carriers/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	async bindPricing( id: string, action: 'add' | 'remove', body: { id?: string, code?: string } ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────

	async getAllCapabilities( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTransportCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTransportCapability( id: string, body: LSPCarrierSetTransportCapabilityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTransportCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFleetCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFleetCapability( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateFleetCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getHandlingCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setHandlingCapability( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateHandlingCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCoverageCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCoverageCapability( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateCoverageCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTechnologyCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTechnologyCapability( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTechnologyCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getServiceCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setServiceCapability( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateServiceCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getComplianceCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setComplianceCapability( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateComplianceCapability( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkUpdateCapabilities( id: string, body: LSPCarrierBulkCapabilitiesUpdateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/bulk`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCapabilityInsights( id: string, querystring?: LSPCarrierGetCapabilityInsightsValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/insights${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async validateCapability( id: string, type: string, body: LSPCarrierValidateCapabilityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capabilities/validate/${type}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getAllCapacities( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFleetCapacity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFleetCapacity( id: string, body: LSPCarrierSetFleetCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getServiceCapacity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setServiceCapacity( id: string, body: LSPCarrierSetServiceCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOperationalCapacity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setOperationalCapacity( id: string, body: LSPCarrierSetOperationalCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getNetworkCapacity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setNetworkCapacity( id: string, body: LSPCarrierSetNetworkCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTechnologyCapacity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTechnologyCapacity( id: string, body: LSPCarrierSetTechnologyCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFinancialCapacity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFinancialCapacity( id: string, body: LSPCarrierSetFinancialCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
