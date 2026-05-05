import type {
	QueryCapacityValidation,
	QueryBatchCapacityValidation,
	QueryAllCapacitiesValidation,
	QueryCapacityInvalidateCacheValidation,
	QueryCapacityCacheStatsValidation
} from '@de./types'
import { type Http, type Res, qs } from '../../utils'

// ─── Capacity ─────────────────────────────────────────────────────────────────

export class QueriesCapacity {
	constructor( private http: Http ){}

	async query( body: QueryCapacityValidation['body'] ): Promise<QueryCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryCapacityValidation['response']>>({
			url: '/queries/capacity/query',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async batchQuery( body: QueryBatchCapacityValidation['body'] ): Promise<QueryBatchCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryBatchCapacityValidation['response']>>({
			url: '/queries/capacity/query/batch',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getAll( lsp: string, serviceId: string ): Promise<QueryAllCapacitiesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryAllCapacitiesValidation['response']>>({
			url: `/queries/capacity/${lsp}/${serviceId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async invalidateCache( lsp: string, serviceId: string, querystring?: QueryCapacityInvalidateCacheValidation['querystring'] ): Promise<QueryCapacityInvalidateCacheValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryCapacityInvalidateCacheValidation['response']>>({
			url: `/queries/capacity/cache/${lsp}/${serviceId}${qs( querystring )}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cacheStats(): Promise<QueryCapacityCacheStatsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryCapacityCacheStatsValidation['response']>>({
			url: '/queries/capacity/cache/stats',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
