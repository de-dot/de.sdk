import type { AgentReallocationRespondValidation } from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Reallocation ───────────────────────────────────────────────────────

export default class AgentReallocation {
	constructor( private http: Http ){}

	async respond( body: AgentReallocationRespondValidation['body'] ): Promise<Data<AgentReallocationRespondValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentReallocationRespondValidation['response']>>>({
			url: '/agent/reallocation/respond',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
