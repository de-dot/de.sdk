import type {
	QueryDiscoverValidation,
	QueryAdvancedDiscoverValidation,
	QueryFindAvailableValidation,
	QueryCountServicesValidation,
	QueryGetServiceValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Discovery ────────────────────────────────────────────────────────────────

export class QueriesDiscovery {
	constructor( private http: Http ){}

	async discover( body: QueryDiscoverValidation['body'] ): Promise<QueryDiscoverValidation['response']> {
		return await this.http.request<QueryDiscoverValidation['response']>({
			url: '/queries/discovery/discover',
			method: 'POST',
			body
		})
	}

	async advancedDiscover( body: QueryAdvancedDiscoverValidation['body'] ): Promise<QueryAdvancedDiscoverValidation['response']> {
		return await this.http.request<QueryAdvancedDiscoverValidation['response']>({
			url: '/queries/discovery/discover/advanced',
			method: 'POST',
			body
		})
	}

	async findAvailable( body: QueryFindAvailableValidation['body'] ): Promise<QueryFindAvailableValidation['response']> {
		return await this.http.request<QueryFindAvailableValidation['response']>({
			url: '/queries/discovery/available',
			method: 'POST',
			body
		})
	}

	async count( body: QueryCountServicesValidation['body'] ): Promise<QueryCountServicesValidation['response']> {
		return await this.http.request<QueryCountServicesValidation['response']>({
			url: '/queries/discovery/count',
			method: 'POST',
			body
		})
	}

	async get( compositeId: string ): Promise<QueryGetServiceValidation['response']> {
		return await this.http.request<QueryGetServiceValidation['response']>({
			url: `/queries/discovery/${compositeId}`,
			method: 'GET'
		})
	}
}
