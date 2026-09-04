import type {
	AgentDispatchRespondValidation,
	AgentDispatchRateValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Dispatch ───────────────────────────────────────────────────────────

export default class AgentDispatch {
	constructor( private http: Http ){}

	async respond( body: AgentDispatchRespondValidation['body'] ): Promise<AgentDispatchRespondValidation['response']> {
		return await this.http.request<AgentDispatchRespondValidation['response']>({
			url: '/agent/dispatch/respond',
			method: 'POST',
			body
		})
	}

	async rate( body: AgentDispatchRateValidation['body'] ): Promise<AgentDispatchRateValidation['response']> {
		return await this.http.request<AgentDispatchRateValidation['response']>({
			url: '/agent/dispatch/rate',
			method: 'POST',
			body
		})
	}
}
