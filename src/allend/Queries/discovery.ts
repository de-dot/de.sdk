import type {
	QueryDiscoverValidation,
	QueryAdvancedDiscoverValidation,
	QueryFindAvailableValidation,
	QueryCountServicesValidation,
	QueryGetServiceValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Discovery ────────────────────────────────────────────────────────────────

export class QueriesDiscovery {
	constructor( private http: Http ){}

	async discover( body: QueryDiscoverValidation['body'] ): Promise<QueryDiscoverValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryDiscoverValidation['response']>>({
			url: '/queries/discovery/discover',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async advancedDiscover( body: QueryAdvancedDiscoverValidation['body'] ): Promise<QueryAdvancedDiscoverValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryAdvancedDiscoverValidation['response']>>({
			url: '/queries/discovery/discover/advanced',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async findAvailable( body: QueryFindAvailableValidation['body'] ): Promise<QueryFindAvailableValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryFindAvailableValidation['response']>>({
			url: '/queries/discovery/available',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async count( body: QueryCountServicesValidation['body'] ): Promise<QueryCountServicesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryCountServicesValidation['response']>>({
			url: '/queries/discovery/count',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( compositeId: string ): Promise<QueryGetServiceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<QueryGetServiceValidation['response']>>({
			url: `/queries/discovery/${compositeId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
