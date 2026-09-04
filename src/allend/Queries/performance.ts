import type {
	QuerySyncPerformanceValidation,
	QueryBatchSyncPerformanceValidation,
	QueryGetPerformanceValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Performance ──────────────────────────────────────────────────────────────

export class QueriesPerformance {
	constructor( private http: Http ){}

	async sync( body: QuerySyncPerformanceValidation['body'] ): Promise<QuerySyncPerformanceValidation['response']> {
		return await this.http.request<QuerySyncPerformanceValidation['response']>({
			url: '/queries/performance/sync',
			method: 'POST',
			body
		})
	}

	async batchSync( body: QueryBatchSyncPerformanceValidation['body'] ): Promise<QueryBatchSyncPerformanceValidation['response']> {
		return await this.http.request<QueryBatchSyncPerformanceValidation['response']>({
			url: '/queries/performance/sync/batch',
			method: 'POST',
			body
		})
	}

	async get( lsp: string, serviceId: string ): Promise<QueryGetPerformanceValidation['response']> {
		return await this.http.request<QueryGetPerformanceValidation['response']>({
			url: `/queries/performance/${lsp}/${serviceId}`,
			method: 'GET'
		})
	}
}
