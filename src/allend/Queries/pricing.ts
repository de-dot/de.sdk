import type {
	QueryGetPricingValidation,
	QueryEstimateCostValidation,
	QueryComparePricingValidation,
	QueryPricingInvalidateCacheValidation,
	QueryPricingCacheStatsValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Pricing ──────────────────────────────────────────────────────────────────

export class QueriesPricing {
	constructor( private http: Http ){}

	async get( lsp: string, serviceId: string ): Promise<QueryGetPricingValidation['response']> {
		return await this.http.request<QueryGetPricingValidation['response']>({
			url: `/queries/pricing/${lsp}/${serviceId}`,
			method: 'GET'
		})
	}

	async estimate( body: QueryEstimateCostValidation['body'] ): Promise<QueryEstimateCostValidation['response']> {
		return await this.http.request<QueryEstimateCostValidation['response']>({
			url: '/queries/pricing/estimate',
			method: 'POST',
			body
		})
	}

	async compare( body: QueryComparePricingValidation['body'] ): Promise<QueryComparePricingValidation['response']> {
		return await this.http.request<QueryComparePricingValidation['response']>({
			url: '/queries/pricing/compare',
			method: 'POST',
			body
		})
	}

	async invalidateCache( lsp: string, serviceId: string ): Promise<QueryPricingInvalidateCacheValidation['response']> {
		return await this.http.request<QueryPricingInvalidateCacheValidation['response']>({
			url: `/queries/pricing/cache/${lsp}/${serviceId}`,
			method: 'DELETE'
		})
	}

	async cacheStats(): Promise<QueryPricingCacheStatsValidation['response']> {
		return await this.http.request<QueryPricingCacheStatsValidation['response']>({
			url: '/queries/pricing/cache/stats',
			method: 'GET'
		})
	}
}
