import type {
	AgentConsolidationRespondValidation,
	AgentConsolidationHandoffValidation,
	AgentConsolidationCompleteValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Consolidation ──────────────────────────────────────────────────────

export default class AgentConsolidation {
	constructor( private http: Http ){}

	async respond( body: AgentConsolidationRespondValidation['body'] ): Promise<AgentConsolidationRespondValidation['response']> {
		return await this.http.request<AgentConsolidationRespondValidation['response']>({
			url: '/agent/consolidation/respond',
			method: 'POST',
			body
		})
	}

	async handoffConfirm( body: AgentConsolidationHandoffValidation['body'] ): Promise<AgentConsolidationHandoffValidation['response']> {
		return await this.http.request<AgentConsolidationHandoffValidation['response']>({
			url: '/agent/consolidation/handoff/confirm',
			method: 'POST',
			body
		})
	}

	/**
	 * The receiving rider reporting leg 2 delivered.
	 *
	 * No handoff code — the PIN authenticated the transfer between riders at
	 * confirm. This is what takes the offer out of IN_PROGRESS and returns the
	 * rider to their zone pool.
	 */
	async handoffComplete( body: AgentConsolidationCompleteValidation['body'] ): Promise<AgentConsolidationCompleteValidation['response']> {
		return await this.http.request<AgentConsolidationCompleteValidation['response']>({
			url: '/agent/consolidation/handoff/complete',
			method: 'POST',
			body
		})
	}
}
