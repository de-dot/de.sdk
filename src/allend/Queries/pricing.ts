import type {
	QueryGetPricingValidation,
	QueryEstimateCostValidation,
	QueryComparePricingValidation,
	QueryPricingInvalidateCacheValidation,
	QueryPricingCacheStatsValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Pricing ──────────────────────────────────────────────────────────────────

export class QueriesPricing {
	constructor( private http: Http ){}

	async get( lsp: string, serviceId: string ): Promise<QueryGetPricingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryGetPricingValidation['response']>>({
			url: `/queries/pricing/${lsp}/${serviceId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async estimate( body: QueryEstimateCostValidation['body'] ): Promise<QueryEstimateCostValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryEstimateCostValidation['response']>>({
			url: '/queries/pricing/estimate',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async compare( body: QueryComparePricingValidation['body'] ): Promise<QueryComparePricingValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryComparePricingValidation['response']>>({
			url: '/queries/pricing/compare',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async invalidateCache( lsp: string, serviceId: string ): Promise<QueryPricingInvalidateCacheValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryPricingInvalidateCacheValidation['response']>>({
			url: `/queries/pricing/cache/${lsp}/${serviceId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cacheStats(): Promise<QueryPricingCacheStatsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryPricingCacheStatsValidation['response']>>({
			url: '/queries/pricing/cache/stats',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
