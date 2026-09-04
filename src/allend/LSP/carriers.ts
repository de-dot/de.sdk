import type { APIResponseBase } from '@de./types'
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
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Carriers ──────────────────────────────────────────────────────────────

export default class LSPCarriers {
	constructor( private http: Http ){}

	async create( body: LSPCarrierCreateValidation['body'] ): Promise<LSPCarrierCreateValidation['response']> {
		return await this.http.request<LSPCarrierCreateValidation['response']>({
			url: '/lsp/carriers/create',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPCarrierListValidation['querystring'] ): Promise<LSPCarrierListValidation['response']> {
		return await this.http.request<LSPCarrierListValidation['response']>({
			url: `/lsp/carriers${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<LSPCarrierRetrieveValidation['response']> {
		return await this.http.request<LSPCarrierRetrieveValidation['response']>({
			url: `/lsp/carriers/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPCarrierUpdateValidation['body'] ): Promise<LSPCarrierUpdateValidation['response']> {
		return await this.http.request<LSPCarrierUpdateValidation['response']>({
			url: `/lsp/carriers/${id}`,
			method: 'PATCH',
			body
		})
	}

	async updateStatus( id: string, body: LSPCarrierUpdateStatusValidation['body'] ): Promise<LSPCarrierUpdateStatusValidation['response']> {
		return await this.http.request<LSPCarrierUpdateStatusValidation['response']>({
			url: `/lsp/carriers/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/carriers/${id}`,
			method: 'DELETE'
		})
	}

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		return await this.http.request<LSPPricingBindToValidation['response']>({
			url: `/lsp/carriers/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
	}

	// ── Capabilities ──────────────────────────────────────────────────────────────

	async getAllCapabilities( id: string ): Promise<LSPCarrierGetAllCapabilitiesValidation['response']> {
		return await this.http.request<LSPCarrierGetAllCapabilitiesValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities`,
			method: 'GET'
		})
	}

	async getTransportCapability( id: string ): Promise<LSPCarrierGetTransportCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetTransportCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'GET'
		})
	}

	async setTransportCapability( id: string, body: LSPCarrierSetTransportCapabilityValidation['body'] ): Promise<LSPCarrierSetTransportCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetTransportCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PUT',
			body
		})
	}

	async updateTransportCapability( id: string, body: LSPCarrierUpdateTransportCapabilityValidation['body'] ): Promise<LSPCarrierUpdateTransportCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateTransportCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PATCH',
			body
		})
	}

	async deleteTransportCapability( id: string ): Promise<LSPCarrierDeleteTransportCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierDeleteTransportCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'DELETE'
		})
	}

	async getFleetCapability( id: string ): Promise<LSPCarrierGetFleetCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetFleetCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'GET'
		})
	}

	async setFleetCapability( id: string, body: LSPCarrierSetFleetCapabilityValidation['body'] ): Promise<LSPCarrierSetFleetCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetFleetCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PUT',
			body
		})
	}

	async updateFleetCapability( id: string, body: LSPCarrierUpdateFleetCapabilityValidation['body'] ): Promise<LSPCarrierUpdateFleetCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateFleetCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PATCH',
			body
		})
	}

	async getHandlingCapability( id: string ): Promise<LSPCarrierGetHandlingCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetHandlingCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'GET'
		})
	}

	async setHandlingCapability( id: string, body: LSPCarrierSetHandlingCapabilityValidation['body'] ): Promise<LSPCarrierSetHandlingCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetHandlingCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PUT',
			body
		})
	}

	async updateHandlingCapability( id: string, body: LSPCarrierUpdateHandlingCapabilityValidation['body'] ): Promise<LSPCarrierUpdateHandlingCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateHandlingCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PATCH',
			body
		})
	}

	async getCoverageCapability( id: string ): Promise<LSPCarrierGetCoverageCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetCoverageCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'GET'
		})
	}

	async setCoverageCapability( id: string, body: LSPCarrierSetCoverageCapabilityValidation['body'] ): Promise<LSPCarrierSetCoverageCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetCoverageCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PUT',
			body
		})
	}

	async updateCoverageCapability( id: string, body: LSPCarrierUpdateCoverageCapabilityValidation['body'] ): Promise<LSPCarrierUpdateCoverageCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateCoverageCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PATCH',
			body
		})
	}

	async getTechnologyCapability( id: string ): Promise<LSPCarrierGetTechnologyCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetTechnologyCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'GET'
		})
	}

	async setTechnologyCapability( id: string, body: LSPCarrierSetTechnologyCapabilityValidation['body'] ): Promise<LSPCarrierSetTechnologyCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetTechnologyCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PUT',
			body
		})
	}

	async updateTechnologyCapability( id: string, body: LSPCarrierUpdateTechnologyCapabilityValidation['body'] ): Promise<LSPCarrierUpdateTechnologyCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateTechnologyCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PATCH',
			body
		})
	}

	async getServiceCapability( id: string ): Promise<LSPCarrierGetServiceCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetServiceCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'GET'
		})
	}

	async setServiceCapability( id: string, body: LSPCarrierSetServiceCapabilityValidation['body'] ): Promise<LSPCarrierSetServiceCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetServiceCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PUT',
			body
		})
	}

	async updateServiceCapability( id: string, body: LSPCarrierUpdateServiceCapabilityValidation['body'] ): Promise<LSPCarrierUpdateServiceCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateServiceCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PATCH',
			body
		})
	}

	async getComplianceCapability( id: string ): Promise<LSPCarrierGetComplianceCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierGetComplianceCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'GET'
		})
	}

	async setComplianceCapability( id: string, body: LSPCarrierSetComplianceCapabilityValidation['body'] ): Promise<LSPCarrierSetComplianceCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierSetComplianceCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PUT',
			body
		})
	}

	async updateComplianceCapability( id: string, body: LSPCarrierUpdateComplianceCapabilityValidation['body'] ): Promise<LSPCarrierUpdateComplianceCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierUpdateComplianceCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PATCH',
			body
		})
	}

	async bulkUpdateCapabilities( id: string, body: LSPCarrierBulkCapabilitiesUpdateValidation['body'] ): Promise<LSPCarrierBulkCapabilitiesUpdateValidation['response']> {
		return await this.http.request<LSPCarrierBulkCapabilitiesUpdateValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/bulk`,
			method: 'PATCH',
			body
		})
	}

	async getCapabilityInsights( id: string, querystring?: LSPCarrierGetCapabilityInsightsValidation['querystring'] ): Promise<LSPCarrierGetCapabilityInsightsValidation['response']> {
		return await this.http.request<LSPCarrierGetCapabilityInsightsValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/insights${qs( querystring )}`,
			method: 'GET'
		})
	}

	async validateCapability( id: string, type: string, body: LSPCarrierValidateCapabilityValidation['body'] ): Promise<LSPCarrierValidateCapabilityValidation['response']> {
		return await this.http.request<LSPCarrierValidateCapabilityValidation['response']>({
			url: `/lsp/carriers/${id}/capabilities/validate/${type}`,
			method: 'POST',
			body
		})
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getAllCapacities( id: string ): Promise<LSPCarrierGetAllCapacitiesValidation['response']> {
		return await this.http.request<LSPCarrierGetAllCapacitiesValidation['response']>({
			url: `/lsp/carriers/${id}/capacities`,
			method: 'GET'
		})
	}

	async getFleetCapacity( id: string ): Promise<LSPCarrierGetFleetCapacityValidation['response']> {
		return await this.http.request<LSPCarrierGetFleetCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'GET'
		})
	}

	async setFleetCapacity( id: string, body: LSPCarrierSetFleetCapacityValidation['body'] ): Promise<LSPCarrierSetFleetCapacityValidation['response']> {
		return await this.http.request<LSPCarrierSetFleetCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'PUT',
			body
		})
	}

	async getServiceCapacity( id: string ): Promise<LSPCarrierGetServiceCapacityValidation['response']> {
		return await this.http.request<LSPCarrierGetServiceCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'GET'
		})
	}

	async setServiceCapacity( id: string, body: LSPCarrierSetServiceCapacityValidation['body'] ): Promise<LSPCarrierSetServiceCapacityValidation['response']> {
		return await this.http.request<LSPCarrierSetServiceCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'PUT',
			body
		})
	}

	async getOperationalCapacity( id: string ): Promise<LSPCarrierGetOperationalCapacityValidation['response']> {
		return await this.http.request<LSPCarrierGetOperationalCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'GET'
		})
	}

	async setOperationalCapacity( id: string, body: LSPCarrierSetOperationalCapacityValidation['body'] ): Promise<LSPCarrierSetOperationalCapacityValidation['response']> {
		return await this.http.request<LSPCarrierSetOperationalCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'PUT',
			body
		})
	}

	async getNetworkCapacity( id: string ): Promise<LSPCarrierGetNetworkCapacityValidation['response']> {
		return await this.http.request<LSPCarrierGetNetworkCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'GET'
		})
	}

	async setNetworkCapacity( id: string, body: LSPCarrierSetNetworkCapacityValidation['body'] ): Promise<LSPCarrierSetNetworkCapacityValidation['response']> {
		return await this.http.request<LSPCarrierSetNetworkCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'PUT',
			body
		})
	}

	async getTechnologyCapacity( id: string ): Promise<LSPCarrierGetTechnologyCapacityValidation['response']> {
		return await this.http.request<LSPCarrierGetTechnologyCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'GET'
		})
	}

	async setTechnologyCapacity( id: string, body: LSPCarrierSetTechnologyCapacityValidation['body'] ): Promise<LSPCarrierSetTechnologyCapacityValidation['response']> {
		return await this.http.request<LSPCarrierSetTechnologyCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'PUT',
			body
		})
	}

	async getFinancialCapacity( id: string ): Promise<LSPCarrierGetFinancialCapacityValidation['response']> {
		return await this.http.request<LSPCarrierGetFinancialCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'GET'
		})
	}

	async setFinancialCapacity( id: string, body: LSPCarrierSetFinancialCapacityValidation['body'] ): Promise<LSPCarrierSetFinancialCapacityValidation['response']> {
		return await this.http.request<LSPCarrierSetFinancialCapacityValidation['response']>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'PUT',
			body
		})
	}
}
