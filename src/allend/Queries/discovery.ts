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

	async discover( body: QueryDiscoverValidation['body'] ): Promise<Data<QueryDiscoverValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryDiscoverValidation['response']>>>({
			url: '/queries/discovery/discover',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async advancedDiscover( body: QueryAdvancedDiscoverValidation['body'] ): Promise<Data<QueryAdvancedDiscoverValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryAdvancedDiscoverValidation['response']>>>({
			url: '/queries/discovery/discover/advanced',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async findAvailable( body: QueryFindAvailableValidation['body'] ): Promise<Data<QueryFindAvailableValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryFindAvailableValidation['response']>>>({
			url: '/queries/discovery/available',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async count( body: QueryCountServicesValidation['body'] ): Promise<Data<QueryCountServicesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryCountServicesValidation['response']>>>({
			url: '/queries/discovery/count',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( compositeId: string ): Promise<Data<QueryGetServiceValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryGetServiceValidation['response']>>>({
			url: `/queries/discovery/${compositeId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
