import type {
	LSPPricingAddValidation,
	LSPPricingRetrieveValidation,
	LSPPricingFetchValidation,
	LSPPricingUpdateValidation,
	LSPPricingRemoveValidation,
	LSPPricingAddTierValidation,
	LSPPricingUpdateTierValidation,
	LSPPricingRemoveTierValidation,
	LSPPricingAddSeasonalAdjustmentValidation,
	LSPPricingRemoveSeasonalAdjustmentValidation,
	LSPPricingUpdateFuelSurchargeValidation,
	LSPPricingBulkUpdateByCategoryValidation,
	LSPPricingAddContractTermsValidation,
	LSPPricingUpdateContractTermsValidation,
	LSPPricingValidateValidation,
	LSPPricingGetTemplatesValidation,
	LSPPricingCreateFromTemplateValidation,
	LSPPricingBindToValidation
} from '@de./types/lsp/pricing'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Pricing ───────────────────────────────────────────────────────────────

export default class LSPPricing {
	constructor( private http: Http ){}

	async add( body: LSPPricingAddValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/pricing/rules',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPPricingFetchValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPPricingUpdateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	async bindTo( id: string, action: 'add' | 'remove', body: LSPPricingBindToValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/bind/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Tiers ─────────────────────────────────────────────────────────────────

	async addTier( id: string, body: LSPPricingAddTierValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/tiers`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTier( id: string, index: number, body: LSPPricingUpdateTierValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/tiers/${index}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeTier( id: string, index: number ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/tiers/${index}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Contract ──────────────────────────────────────────────────────────────

	async addContractTerms( id: string, body: LSPPricingAddContractTermsValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/contract`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateContractTerms( id: string, body: LSPPricingUpdateContractTermsValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/contract`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Adjustments ───────────────────────────────────────────────────────────

	async addSeasonalAdjustment( id: string, body: LSPPricingAddSeasonalAdjustmentValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/adjustments`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeSeasonalAdjustment( id: string, index: number ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/rules/${id}/adjustments/${index}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	async updateFuelSurcharge( id: string, body: LSPPricingUpdateFuelSurchargeValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/utils/rules/${id}/fuel-surcharge`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkUpdateByCategory( body: LSPPricingBulkUpdateByCategoryValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/pricing/utils/bulk/update',
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Templates ─────────────────────────────────────────────────────────────

	async getTemplates( querystring?: LSPPricingGetTemplatesValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pricing/templates${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async createFromTemplate( body: LSPPricingCreateFromTemplateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/pricing/templates/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async validate( body: LSPPricingValidateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/pricing/utils/validate',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
