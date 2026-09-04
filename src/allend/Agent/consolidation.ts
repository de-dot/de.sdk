import type {
	AgentConsolidationRespondValidation,
	AgentConsolidationHandoffValidation,
	AgentConsolidationCompleteValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Agent Consolidation ──────────────────────────────────────────────────────

export default class AgentConsolidation {
	constructor( private http: Http ){}

	async respond( body: AgentConsolidationRespondValidation['body'] ): Promise<AgentConsolidationRespondValidation['response']> {
		const { error, message, data } = await this.http.request<Res<AgentConsolidationRespondValidation['response']>>({
			url: '/agent/consolidation/respond',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async handoffConfirm( body: AgentConsolidationHandoffValidation['body'] ): Promise<AgentConsolidationHandoffValidation['response']> {
		const { error, message, data } = await this.http.request<Res<AgentConsolidationHandoffValidation['response']>>({
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
	async handoffComplete( body: AgentConsolidationCompleteValidation['body'] ): Promise<AgentConsolidationCompleteValidation['response']> {
		const { error, message, data } = await this.http.request<Res<AgentConsolidationCompleteValidation['response']>>({
			url: '/agent/consolidation/handoff/complete',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
