import type { APIResponseBase } from '@de./types'
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
	async adopt( body?: LSPPricingAdoptValidation['body'] ): Promise<LSPPricingAdoptValidation['response']> {
		return await this.http.request<LSPPricingAdoptValidation['response']>({
			url: '/lsp/pricing/rules/adopt',
			method: 'POST',
			body: body ?? {}
		})
	}

	async add( body: LSPPricingAddValidation['body'] ): Promise<LSPPricingAddValidation['response']> {
		return await this.http.request<LSPPricingAddValidation['response']>({
			url: '/lsp/pricing/rules',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPPricingFetchValidation['querystring'] ): Promise<LSPPricingFetchValidation['response']> {
		return await this.http.request<LSPPricingFetchValidation['response']>({
			url: `/lsp/pricing/rules${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<LSPPricingRetrieveValidation['response']> {
		return await this.http.request<LSPPricingRetrieveValidation['response']>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPPricingUpdateValidation['body'] ): Promise<LSPPricingUpdateValidation['response']> {
		return await this.http.request<LSPPricingUpdateValidation['response']>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/pricing/rules/${id}`,
			method: 'DELETE'
		})
	}

	async bindTo( id: string, action: 'add' | 'remove', body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		return await this.http.request<LSPPricingBindToValidation['response']>({
			url: `/lsp/pricing/rules/${id}/bind/${action}`,
			method: 'PUT',
			body
		})
	}

	// ── Tiers ─────────────────────────────────────────────────────────────────

	async addTier( id: string, body: LSPPricingAddTierValidation['body'] ): Promise<LSPPricingAddTierValidation['response']> {
		return await this.http.request<LSPPricingAddTierValidation['response']>({
			url: `/lsp/pricing/rules/${id}/tiers`,
			method: 'POST',
			body
		})
	}

	async updateTier( id: string, index: number, body: LSPPricingUpdateTierValidation['body'] ): Promise<LSPPricingUpdateTierValidation['response']> {
		return await this.http.request<LSPPricingUpdateTierValidation['response']>({
			url: `/lsp/pricing/rules/${id}/tiers/${index}`,
			method: 'PATCH',
			body
		})
	}

	async removeTier( id: string, index: number ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/pricing/rules/${id}/tiers/${index}`,
			method: 'DELETE'
		})
	}

	// ── Contract ──────────────────────────────────────────────────────────────

	async addContractTerms( id: string, body: LSPPricingAddContractTermsValidation['body'] ): Promise<LSPPricingAddContractTermsValidation['response']> {
		return await this.http.request<LSPPricingAddContractTermsValidation['response']>({
			url: `/lsp/pricing/rules/${id}/contract`,
			method: 'POST',
			body
		})
	}

	async updateContractTerms( id: string, body: LSPPricingUpdateContractTermsValidation['body'] ): Promise<LSPPricingUpdateContractTermsValidation['response']> {
		return await this.http.request<LSPPricingUpdateContractTermsValidation['response']>({
			url: `/lsp/pricing/rules/${id}/contract`,
			method: 'PATCH',
			body
		})
	}

	// ── Adjustments ───────────────────────────────────────────────────────────

	async addSeasonalAdjustment( id: string, body: LSPPricingAddSeasonalAdjustmentValidation['body'] ): Promise<LSPPricingAddSeasonalAdjustmentValidation['response']> {
		return await this.http.request<LSPPricingAddSeasonalAdjustmentValidation['response']>({
			url: `/lsp/pricing/rules/${id}/adjustments`,
			method: 'POST',
			body
		})
	}

	async removeSeasonalAdjustment( id: string, index: number ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/pricing/rules/${id}/adjustments/${index}`,
			method: 'DELETE'
		})
	}

	async updateFuelSurcharge( id: string, body: LSPPricingUpdateFuelSurchargeValidation['body'] ): Promise<LSPPricingUpdateFuelSurchargeValidation['response']> {
		return await this.http.request<LSPPricingUpdateFuelSurchargeValidation['response']>({
			url: `/lsp/pricing/utils/rules/${id}/fuel-surcharge`,
			method: 'PATCH',
			body
		})
	}

	async bulkUpdateByCategory( body: LSPPricingBulkUpdateByCategoryValidation['body'] ): Promise<LSPPricingBulkUpdateByCategoryValidation['response']> {
		return await this.http.request<LSPPricingBulkUpdateByCategoryValidation['response']>({
			url: '/lsp/pricing/utils/bulk/update',
			method: 'PATCH',
			body
		})
	}

	// ── Templates ─────────────────────────────────────────────────────────────

	async getTemplates( querystring?: LSPPricingGetTemplatesValidation['querystring'] ): Promise<LSPPricingGetTemplatesValidation['response']> {
		return await this.http.request<LSPPricingGetTemplatesValidation['response']>({
			url: `/lsp/pricing/templates${qs( querystring )}`,
			method: 'GET'
		})
	}

	async createFromTemplate( body: LSPPricingCreateFromTemplateValidation['body'] ): Promise<LSPPricingCreateFromTemplateValidation['response']> {
		return await this.http.request<LSPPricingCreateFromTemplateValidation['response']>({
			url: '/lsp/pricing/templates/create',
			method: 'POST',
			body
		})
	}

	async validate( body: LSPPricingValidateValidation['body'] ): Promise<LSPPricingValidateValidation['response']> {
		return await this.http.request<LSPPricingValidateValidation['response']>({
			url: '/lsp/pricing/utils/validate',
			method: 'POST',
			body
		})
	}
}
