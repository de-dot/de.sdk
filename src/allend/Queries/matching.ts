import type { QueryMatchValidation } from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Matching ─────────────────────────────────────────────────────────────────

export class QueriesMatching {
	constructor( private http: Http ){}

	async match( body: QueryMatchValidation['body'] ): Promise<Data<QueryMatchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<QueryMatchValidation['response']>>>({
			url: '/queries/matching/match',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
