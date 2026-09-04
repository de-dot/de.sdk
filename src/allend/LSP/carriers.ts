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

	async create( body: LSPCarrierCreateValidation['body'] ): Promise<Data<LSPCarrierCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierCreateValidation['response']>>>({
			url: '/lsp/carriers/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPCarrierListValidation['querystring'] ): Promise<Data<LSPCarrierListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierListValidation['response']>>>({
			url: `/lsp/carriers${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<Data<LSPCarrierRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierRetrieveValidation['response']>>>({
			url: `/lsp/carriers/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPCarrierUpdateValidation['body'] ): Promise<Data<LSPCarrierUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateValidation['response']>>>({
			url: `/lsp/carriers/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPCarrierUpdateStatusValidation['body'] ): Promise<Data<LSPCarrierUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateStatusValidation['response']>>>({
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

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<Data<LSPPricingBindToValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingBindToValidation['response']>>>({
			url: `/lsp/carriers/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────────

	async getAllCapabilities( id: string ): Promise<Data<LSPCarrierGetAllCapabilitiesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetAllCapabilitiesValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTransportCapability( id: string ): Promise<Data<LSPCarrierGetTransportCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetTransportCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTransportCapability( id: string, body: LSPCarrierSetTransportCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetTransportCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetTransportCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTransportCapability( id: string, body: LSPCarrierUpdateTransportCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateTransportCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateTransportCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async deleteTransportCapability( id: string ): Promise<Data<LSPCarrierDeleteTransportCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierDeleteTransportCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/transport`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFleetCapability( id: string ): Promise<Data<LSPCarrierGetFleetCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetFleetCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFleetCapability( id: string, body: LSPCarrierSetFleetCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetFleetCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetFleetCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateFleetCapability( id: string, body: LSPCarrierUpdateFleetCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateFleetCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateFleetCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/fleet`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getHandlingCapability( id: string ): Promise<Data<LSPCarrierGetHandlingCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetHandlingCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setHandlingCapability( id: string, body: LSPCarrierSetHandlingCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetHandlingCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetHandlingCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateHandlingCapability( id: string, body: LSPCarrierUpdateHandlingCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateHandlingCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateHandlingCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/handling`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCoverageCapability( id: string ): Promise<Data<LSPCarrierGetCoverageCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetCoverageCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCoverageCapability( id: string, body: LSPCarrierSetCoverageCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetCoverageCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetCoverageCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateCoverageCapability( id: string, body: LSPCarrierUpdateCoverageCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateCoverageCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateCoverageCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/coverage`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTechnologyCapability( id: string ): Promise<Data<LSPCarrierGetTechnologyCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetTechnologyCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTechnologyCapability( id: string, body: LSPCarrierSetTechnologyCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetTechnologyCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetTechnologyCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTechnologyCapability( id: string, body: LSPCarrierUpdateTechnologyCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateTechnologyCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateTechnologyCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/technology`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getServiceCapability( id: string ): Promise<Data<LSPCarrierGetServiceCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetServiceCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setServiceCapability( id: string, body: LSPCarrierSetServiceCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetServiceCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetServiceCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateServiceCapability( id: string, body: LSPCarrierUpdateServiceCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateServiceCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateServiceCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/service`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getComplianceCapability( id: string ): Promise<Data<LSPCarrierGetComplianceCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetComplianceCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setComplianceCapability( id: string, body: LSPCarrierSetComplianceCapabilityValidation['body'] ): Promise<Data<LSPCarrierSetComplianceCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetComplianceCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateComplianceCapability( id: string, body: LSPCarrierUpdateComplianceCapabilityValidation['body'] ): Promise<Data<LSPCarrierUpdateComplianceCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierUpdateComplianceCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/compliance`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkUpdateCapabilities( id: string, body: LSPCarrierBulkCapabilitiesUpdateValidation['body'] ): Promise<Data<LSPCarrierBulkCapabilitiesUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierBulkCapabilitiesUpdateValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/bulk`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getCapabilityInsights( id: string, querystring?: LSPCarrierGetCapabilityInsightsValidation['querystring'] ): Promise<Data<LSPCarrierGetCapabilityInsightsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetCapabilityInsightsValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/insights${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async validateCapability( id: string, type: string, body: LSPCarrierValidateCapabilityValidation['body'] ): Promise<Data<LSPCarrierValidateCapabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierValidateCapabilityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capabilities/validate/${type}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getAllCapacities( id: string ): Promise<Data<LSPCarrierGetAllCapacitiesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetAllCapacitiesValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFleetCapacity( id: string ): Promise<Data<LSPCarrierGetFleetCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetFleetCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFleetCapacity( id: string, body: LSPCarrierSetFleetCapacityValidation['body'] ): Promise<Data<LSPCarrierSetFleetCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetFleetCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/fleet`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getServiceCapacity( id: string ): Promise<Data<LSPCarrierGetServiceCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetServiceCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setServiceCapacity( id: string, body: LSPCarrierSetServiceCapacityValidation['body'] ): Promise<Data<LSPCarrierSetServiceCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetServiceCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/service`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOperationalCapacity( id: string ): Promise<Data<LSPCarrierGetOperationalCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetOperationalCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setOperationalCapacity( id: string, body: LSPCarrierSetOperationalCapacityValidation['body'] ): Promise<Data<LSPCarrierSetOperationalCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetOperationalCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/operational`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getNetworkCapacity( id: string ): Promise<Data<LSPCarrierGetNetworkCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetNetworkCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setNetworkCapacity( id: string, body: LSPCarrierSetNetworkCapacityValidation['body'] ): Promise<Data<LSPCarrierSetNetworkCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetNetworkCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/network`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTechnologyCapacity( id: string ): Promise<Data<LSPCarrierGetTechnologyCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetTechnologyCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setTechnologyCapacity( id: string, body: LSPCarrierSetTechnologyCapacityValidation['body'] ): Promise<Data<LSPCarrierSetTechnologyCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetTechnologyCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/technology`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFinancialCapacity( id: string ): Promise<Data<LSPCarrierGetFinancialCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierGetFinancialCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setFinancialCapacity( id: string, body: LSPCarrierSetFinancialCapacityValidation['body'] ): Promise<Data<LSPCarrierSetFinancialCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPCarrierSetFinancialCapacityValidation['response']>>>({
			url: `/lsp/carriers/${id}/capacities/financial`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
