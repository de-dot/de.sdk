import type {
	DEVDeveloperRetrieveValidation,
	DEVDeveloperFetchValidation,
	DEVDeveloperUpdateValidation
} from '@de./types/dev/developer'
import { type Http, type Res, type Data } from '../../utils'

// ── DEV Developers ──────────────────────────────────────────────────────────────

export default class DEVDevelopers {
	constructor( private http: Http ){}

	async list(): Promise<Data<DEVDeveloperFetchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<DEVDeveloperFetchValidation['response']>>>({
			url: '/dev/developers',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<Data<DEVDeveloperRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<DEVDeveloperRetrieveValidation['response']>>>({
			url: `/dev/developers/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: DEVDeveloperUpdateValidation['body'] ): Promise<Data<DEVDeveloperUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<DEVDeveloperUpdateValidation['response']>>>({
			url: `/dev/developers/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/dev/developers/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}
}
