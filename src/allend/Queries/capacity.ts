import type {
	QueryCapacityValidation,
	QueryBatchCapacityValidation,
	QueryAllCapacitiesValidation,
	QueryCapacityInvalidateCacheValidation,
	QueryCapacityCacheStatsValidation
} from '@de./types'
import { type Http, type Res, type Data, qs } from '../../utils'

// ─── Capacity ─────────────────────────────────────────────────────────────────

export class QueriesCapacity {
	constructor( private http: Http ){}

	async query( body: QueryCapacityValidation['body'] ): Promise<QueryCapacityValidation['response']> {
		return await this.http.request<QueryCapacityValidation['response']>({
			url: '/queries/capacity/query',
			method: 'POST',
			body
		})
	}

	async batchQuery( body: QueryBatchCapacityValidation['body'] ): Promise<QueryBatchCapacityValidation['response']> {
		return await this.http.request<QueryBatchCapacityValidation['response']>({
			url: '/queries/capacity/query/batch',
			method: 'POST',
			body
		})
	}

	async getAll( lsp: string, serviceId: string ): Promise<QueryAllCapacitiesValidation['response']> {
		return await this.http.request<QueryAllCapacitiesValidation['response']>({
			url: `/queries/capacity/${lsp}/${serviceId}`,
			method: 'GET'
		})
	}

	async invalidateCache( lsp: string, serviceId: string, querystring?: QueryCapacityInvalidateCacheValidation['querystring'] ): Promise<QueryCapacityInvalidateCacheValidation['response']> {
		return await this.http.request<QueryCapacityInvalidateCacheValidation['response']>({
			url: `/queries/capacity/cache/${lsp}/${serviceId}${qs( querystring )}`,
			method: 'DELETE'
		})
	}

	async cacheStats(): Promise<QueryCapacityCacheStatsValidation['response']> {
		return await this.http.request<QueryCapacityCacheStatsValidation['response']>({
			url: '/queries/capacity/cache/stats',
			method: 'GET'
		})
	}
}
