import type {
	QuerySyncPerformanceValidation,
	QueryBatchSyncPerformanceValidation,
	QueryGetPerformanceValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Performance ──────────────────────────────────────────────────────────────

export class QueriesPerformance {
	constructor( private http: Http ){}

	async sync( body: QuerySyncPerformanceValidation['body'] ): Promise<QuerySyncPerformanceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QuerySyncPerformanceValidation['response']>>({
			url: '/queries/performance/sync',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async batchSync( body: QueryBatchSyncPerformanceValidation['body'] ): Promise<QueryBatchSyncPerformanceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryBatchSyncPerformanceValidation['response']>>({
			url: '/queries/performance/sync/batch',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( lsp: string, serviceId: string ): Promise<QueryGetPerformanceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryGetPerformanceValidation['response']>>({
			url: `/queries/performance/${lsp}/${serviceId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
