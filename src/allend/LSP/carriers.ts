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
	LSPCarrierDeleteTransportCapabilityValidation,
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
import type { LSPPricingBindToValidation } from '@de./types/lsp/pricing'
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

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPricingBindToValidation['response']>>({
			url: `/lsp/carriers/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────────

	async getAllCapabilities( id: string ): Promise<LSPCarrierGetAllCapabilitiesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetAllCapabilitiesValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTransportCapability( id: string ): Promise<LSPCarrierGetTransportCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetTransportCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTransportCapability( id: string, body: LSPCarrierSetTransportCapabilityValidation['body'] ): Promise<LSPCarrierSetTransportCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetTransportCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTransportCapability( id: string, body: LSPCarrierUpdateTransportCapabilityValidation['body'] ): Promise<LSPCarrierUpdateTransportCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateTransportCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteTransportCapability( id: string ): Promise<LSPCarrierDeleteTransportCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierDeleteTransportCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFleetCapability( id: string ): Promise<LSPCarrierGetFleetCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetFleetCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFleetCapability( id: string, body: LSPCarrierSetFleetCapabilityValidation['body'] ): Promise<LSPCarrierSetFleetCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetFleetCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateFleetCapability( id: string, body: LSPCarrierUpdateFleetCapabilityValidation['body'] ): Promise<LSPCarrierUpdateFleetCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateFleetCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getHandlingCapability( id: string ): Promise<LSPCarrierGetHandlingCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetHandlingCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setHandlingCapability( id: string, body: LSPCarrierSetHandlingCapabilityValidation['body'] ): Promise<LSPCarrierSetHandlingCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetHandlingCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateHandlingCapability( id: string, body: LSPCarrierUpdateHandlingCapabilityValidation['body'] ): Promise<LSPCarrierUpdateHandlingCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateHandlingCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCoverageCapability( id: string ): Promise<LSPCarrierGetCoverageCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetCoverageCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCoverageCapability( id: string, body: LSPCarrierSetCoverageCapabilityValidation['body'] ): Promise<LSPCarrierSetCoverageCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetCoverageCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateCoverageCapability( id: string, body: LSPCarrierUpdateCoverageCapabilityValidation['body'] ): Promise<LSPCarrierUpdateCoverageCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateCoverageCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTechnologyCapability( id: string ): Promise<LSPCarrierGetTechnologyCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetTechnologyCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTechnologyCapability( id: string, body: LSPCarrierSetTechnologyCapabilityValidation['body'] ): Promise<LSPCarrierSetTechnologyCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetTechnologyCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTechnologyCapability( id: string, body: LSPCarrierUpdateTechnologyCapabilityValidation['body'] ): Promise<LSPCarrierUpdateTechnologyCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateTechnologyCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getServiceCapability( id: string ): Promise<LSPCarrierGetServiceCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetServiceCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setServiceCapability( id: string, body: LSPCarrierSetServiceCapabilityValidation['body'] ): Promise<LSPCarrierSetServiceCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetServiceCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateServiceCapability( id: string, body: LSPCarrierUpdateServiceCapabilityValidation['body'] ): Promise<LSPCarrierUpdateServiceCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateServiceCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getComplianceCapability( id: string ): Promise<LSPCarrierGetComplianceCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetComplianceCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setComplianceCapability( id: string, body: LSPCarrierSetComplianceCapabilityValidation['body'] ): Promise<LSPCarrierSetComplianceCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetComplianceCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateComplianceCapability( id: string, body: LSPCarrierUpdateComplianceCapabilityValidation['body'] ): Promise<LSPCarrierUpdateComplianceCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierUpdateComplianceCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkUpdateCapabilities( id: string, body: LSPCarrierBulkCapabilitiesUpdateValidation['body'] ): Promise<LSPCarrierBulkCapabilitiesUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierBulkCapabilitiesUpdateValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/bulk`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCapabilityInsights( id: string, querystring?: LSPCarrierGetCapabilityInsightsValidation['querystring'] ): Promise<LSPCarrierGetCapabilityInsightsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetCapabilityInsightsValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/insights${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async validateCapability( id: string, type: string, body: LSPCarrierValidateCapabilityValidation['body'] ): Promise<LSPCarrierValidateCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierValidateCapabilityValidation['response']>>({
			url: `/lsp/carriers/${id}/capabilities/validate/${type}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getAllCapacities( id: string ): Promise<LSPCarrierGetAllCapacitiesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetAllCapacitiesValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFleetCapacity( id: string ): Promise<LSPCarrierGetFleetCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetFleetCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFleetCapacity( id: string, body: LSPCarrierSetFleetCapacityValidation['body'] ): Promise<LSPCarrierSetFleetCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetFleetCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getServiceCapacity( id: string ): Promise<LSPCarrierGetServiceCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetServiceCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setServiceCapacity( id: string, body: LSPCarrierSetServiceCapacityValidation['body'] ): Promise<LSPCarrierSetServiceCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetServiceCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOperationalCapacity( id: string ): Promise<LSPCarrierGetOperationalCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetOperationalCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setOperationalCapacity( id: string, body: LSPCarrierSetOperationalCapacityValidation['body'] ): Promise<LSPCarrierSetOperationalCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetOperationalCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getNetworkCapacity( id: string ): Promise<LSPCarrierGetNetworkCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetNetworkCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setNetworkCapacity( id: string, body: LSPCarrierSetNetworkCapacityValidation['body'] ): Promise<LSPCarrierSetNetworkCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetNetworkCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTechnologyCapacity( id: string ): Promise<LSPCarrierGetTechnologyCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetTechnologyCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTechnologyCapacity( id: string, body: LSPCarrierSetTechnologyCapacityValidation['body'] ): Promise<LSPCarrierSetTechnologyCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetTechnologyCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFinancialCapacity( id: string ): Promise<LSPCarrierGetFinancialCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierGetFinancialCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFinancialCapacity( id: string, body: LSPCarrierSetFinancialCapacityValidation['body'] ): Promise<LSPCarrierSetFinancialCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPCarrierSetFinancialCapacityValidation['response']>>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
