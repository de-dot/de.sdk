import type {
	AgentDispatchRespondValidation,
	AgentDispatchRateValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Dispatch ───────────────────────────────────────────────────────────

export default class AgentDispatch {
	constructor( private http: Http ){}

	async respond( body: AgentDispatchRespondValidation['body'] ): Promise<Data<AgentDispatchRespondValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentDispatchRespondValidation['response']>>>({
			url: '/agent/dispatch/respond',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rate( body: AgentDispatchRateValidation['body'] ): Promise<Data<AgentDispatchRateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentDispatchRateValidation['response']>>>({
			url: '/agent/dispatch/rate',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
