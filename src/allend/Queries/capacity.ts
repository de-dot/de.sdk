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

	async query( body: QueryCapacityValidation['body'] ): Promise<Data<QueryCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryCapacityValidation['response']>>>({
			url: '/queries/capacity/query',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async batchQuery( body: QueryBatchCapacityValidation['body'] ): Promise<Data<QueryBatchCapacityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryBatchCapacityValidation['response']>>>({
			url: '/queries/capacity/query/batch',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getAll( lsp: string, serviceId: string ): Promise<Data<QueryAllCapacitiesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryAllCapacitiesValidation['response']>>>({
			url: `/queries/capacity/${lsp}/${serviceId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async invalidateCache( lsp: string, serviceId: string, querystring?: QueryCapacityInvalidateCacheValidation['querystring'] ): Promise<Data<QueryCapacityInvalidateCacheValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryCapacityInvalidateCacheValidation['response']>>>({
			url: `/queries/capacity/cache/${lsp}/${serviceId}${qs( querystring )}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async cacheStats(): Promise<Data<QueryCapacityCacheStatsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryCapacityCacheStatsValidation['response']>>>({
			url: '/queries/capacity/cache/stats',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
