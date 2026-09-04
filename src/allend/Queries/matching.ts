import type { QueryMatchValidation } from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Matching ─────────────────────────────────────────────────────────────────

export class QueriesMatching {
	constructor( private http: Http ){}

	async match( body: QueryMatchValidation['body'] ): Promise<QueryMatchValidation['response']> {
		return await this.http.request<QueryMatchValidation['response']>({
			url: '/queries/matching/match',
			method: 'POST',
			body
		})
	}
}
