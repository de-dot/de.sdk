import type {
	AgentConsolidationRespondValidation,
	AgentConsolidationHandoffValidation,
	AgentConsolidationCompleteValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Consolidation ──────────────────────────────────────────────────────

export default class AgentConsolidation {
	constructor( private http: Http ){}

	async respond( body: AgentConsolidationRespondValidation['body'] ): Promise<Data<AgentConsolidationRespondValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentConsolidationRespondValidation['response']>>>({
			url: '/agent/consolidation/respond',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async handoffConfirm( body: AgentConsolidationHandoffValidation['body'] ): Promise<Data<AgentConsolidationHandoffValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentConsolidationHandoffValidation['response']>>>({
			url: '/agent/consolidation/handoff/confirm',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	/**
	 * The receiving rider reporting leg 2 delivered.
	 *
	 * No handoff code — the PIN authenticated the transfer between riders at
	 * confirm. This is what takes the offer out of IN_PROGRESS and returns the
	 * rider to their zone pool.
	 */
	async handoffComplete( body: AgentConsolidationCompleteValidation['body'] ): Promise<Data<AgentConsolidationCompleteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentConsolidationCompleteValidation['response']>>>({
			url: '/agent/consolidation/handoff/complete',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
