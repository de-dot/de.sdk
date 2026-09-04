import type { AgentReallocationRespondValidation } from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Reallocation ───────────────────────────────────────────────────────

export default class AgentReallocation {
	constructor( private http: Http ){}

	async respond( body: AgentReallocationRespondValidation['body'] ): Promise<AgentReallocationRespondValidation['response']> {
		return await this.http.request<AgentReallocationRespondValidation['response']>({
			url: '/agent/reallocation/respond',
			method: 'POST',
			body
		})
	}
}
