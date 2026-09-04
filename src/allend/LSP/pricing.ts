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
	LSPPricingBindToValidation,
	LSPPricingAdoptValidation
} from '@de./types/lsp/pricing'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Pricing ───────────────────────────────────────────────────────────────

export default class LSPPricing {
	constructor( private http: Http ){}

	/**
	 * Take the platform's own rate card as this workspace's starting point.
	 *
	 * The platform rules are code, not rows, so a workspace that has never
	 * priced anything quotes off them implicitly and cannot edit them. Adopting
	 * writes them in as this workspace's own rules, which is what makes them
	 * editable — and is idempotent on rule code, so a second call adopts only
	 * what is missing and reports the rest as `skipped`.
	 */
	async adopt( body?: LSPPricingAdoptValidation['body'] ): Promise<Data<LSPPricingAdoptValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingAdoptValidation['response']>>>({
			url: '/lsp/pricing/rules/adopt',
			method: 'POST',
			body: body ?? {}
		})
		if( error ) throw new Error( message )
		return data
	}

	async add( body: LSPPricingAddValidation['body'] ): Promise<Data<LSPPricingAddValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingAddValidation['response']>>>({
			url: '/lsp/pricing/rules',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPPricingFetchValidation['querystring'] ): Promise<Data<LSPPricingFetchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingFetchValidation['response']>>>({
			url: `/lsp/pricing/rules${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<Data<LSPPricingRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingRetrieveValidation['response']>>>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPPricingUpdateValidation['body'] ): Promise<Data<LSPPricingUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingUpdateValidation['response']>>>({
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

	async bindTo( id: string, action: 'add' | 'remove', body: LSPPricingBindToValidation['body'] ): Promise<Data<LSPPricingBindToValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingBindToValidation['response']>>>({
			url: `/lsp/pricing/rules/${id}/bind/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Tiers ─────────────────────────────────────────────────────────────────

	async addTier( id: string, body: LSPPricingAddTierValidation['body'] ): Promise<Data<LSPPricingAddTierValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingAddTierValidation['response']>>>({
			url: `/lsp/pricing/rules/${id}/tiers`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateTier( id: string, index: number, body: LSPPricingUpdateTierValidation['body'] ): Promise<Data<LSPPricingUpdateTierValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingUpdateTierValidation['response']>>>({
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

	async addContractTerms( id: string, body: LSPPricingAddContractTermsValidation['body'] ): Promise<Data<LSPPricingAddContractTermsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingAddContractTermsValidation['response']>>>({
			url: `/lsp/pricing/rules/${id}/contract`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateContractTerms( id: string, body: LSPPricingUpdateContractTermsValidation['body'] ): Promise<Data<LSPPricingUpdateContractTermsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingUpdateContractTermsValidation['response']>>>({
			url: `/lsp/pricing/rules/${id}/contract`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Adjustments ───────────────────────────────────────────────────────────

	async addSeasonalAdjustment( id: string, body: LSPPricingAddSeasonalAdjustmentValidation['body'] ): Promise<Data<LSPPricingAddSeasonalAdjustmentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingAddSeasonalAdjustmentValidation['response']>>>({
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

	async updateFuelSurcharge( id: string, body: LSPPricingUpdateFuelSurchargeValidation['body'] ): Promise<Data<LSPPricingUpdateFuelSurchargeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingUpdateFuelSurchargeValidation['response']>>>({
			url: `/lsp/pricing/utils/rules/${id}/fuel-surcharge`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkUpdateByCategory( body: LSPPricingBulkUpdateByCategoryValidation['body'] ): Promise<Data<LSPPricingBulkUpdateByCategoryValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingBulkUpdateByCategoryValidation['response']>>>({
			url: '/lsp/pricing/utils/bulk/update',
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Templates ─────────────────────────────────────────────────────────────

	async getTemplates( querystring?: LSPPricingGetTemplatesValidation['querystring'] ): Promise<Data<LSPPricingGetTemplatesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingGetTemplatesValidation['response']>>>({
			url: `/lsp/pricing/templates${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async createFromTemplate( body: LSPPricingCreateFromTemplateValidation['body'] ): Promise<Data<LSPPricingCreateFromTemplateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingCreateFromTemplateValidation['response']>>>({
			url: '/lsp/pricing/templates/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async validate( body: LSPPricingValidateValidation['body'] ): Promise<Data<LSPPricingValidateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPricingValidateValidation['response']>>>({
			url: '/lsp/pricing/utils/validate',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
