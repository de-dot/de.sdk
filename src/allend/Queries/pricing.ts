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

	async get( lsp: string, serviceId: string ): Promise<Data<QueryGetPricingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryGetPricingValidation['response']>>>({
			url: `/queries/pricing/${lsp}/${serviceId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async estimate( body: QueryEstimateCostValidation['body'] ): Promise<Data<QueryEstimateCostValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryEstimateCostValidation['response']>>>({
			url: '/queries/pricing/estimate',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async compare( body: QueryComparePricingValidation['body'] ): Promise<Data<QueryComparePricingValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryComparePricingValidation['response']>>>({
			url: '/queries/pricing/compare',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async invalidateCache( lsp: string, serviceId: string ): Promise<Data<QueryPricingInvalidateCacheValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryPricingInvalidateCacheValidation['response']>>>({
			url: `/queries/pricing/cache/${lsp}/${serviceId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cacheStats(): Promise<Data<QueryPricingCacheStatsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryPricingCacheStatsValidation['response']>>>({
			url: '/queries/pricing/cache/stats',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
