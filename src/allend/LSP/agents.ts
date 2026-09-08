import type { APIResponseBase } from '@de./types'
import type {
	LSPAgentRetrieveValidation,
	LSPAgentListValidation,
	LSPAgentUpdateValidation,
	LSPAgentAssignVehicleValidation,
	LSPAgentUnassignVehicleValidation,
	LSPAgentRemoveValidation,
	LSPAgentEnrolValidation,
	LSPAgentEnrolmentRetrieveValidation,
	LSPAgentEnrolmentUpdateValidation
} from '@de./types/aux/agents'
import type {
	LSPConsolidationScheduleValidation,
	LSPConsolidationFetchValidation,
	LSPConsolidationGetValidation,
	LSPConsolidationUpdateStateValidation,
	LSPConsolidationCreatePointValidation,
	LSPConsolidationFetchPointsValidation
} from '@de./types/lsp/consolidation'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Agents ────────────────────────────────────────────────────────────────

export default class LSPAgents {
	constructor( private http: Http ){}

	// ── Self-enrolment ──────────────────────────────────────────────────────
	//
	// The invitation flow needs an operator to name each agent, which is right
	// when a provider picks riders one at a time and wrong for a platform that
	// already runs its own verification. Enrolment keeps what invitation was
	// buying — the agent lands in this provider's context, and the provider
	// agreed to take them — but takes the agreement from a standing policy
	// instead of a per-person act.

	/** The provider's standing enrolment policy. Operator-scoped. */
	async enrolmentPolicy(): Promise<LSPAgentEnrolmentRetrieveValidation['response']> {
		return await this.http.request<LSPAgentEnrolmentRetrieveValidation['response']>({
			url: '/lsp/agents/enrolment',
			method: 'GET'
		})
	}

	/** Set it. Off unless `enabled` says otherwise. Operator-scoped. */
	async setEnrolmentPolicy( body: LSPAgentEnrolmentUpdateValidation['body'] ): Promise<LSPAgentEnrolmentUpdateValidation['response']> {
		return await this.http.request<LSPAgentEnrolmentUpdateValidation['response']>({
			url: '/lsp/agents/enrolment',
			method: 'PUT',
			body
		})
	}

	/**
	 * Join this provider as an agent.
	 *
	 * Authorized as the person joining — the uid on the token — so a platform
	 * enrols on someone's behalf by minting for them, exactly as it would to
	 * redeem an invitation. `status`, `grade` and the zone come from the
	 * provider's policy, not from the body.
	 */
	async enrol( body: LSPAgentEnrolValidation['body'] ): Promise<LSPAgentEnrolValidation['response']> {
		return await this.http.request<LSPAgentEnrolValidation['response']>({
			url: '/lsp/agents/enrolment',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPAgentListValidation['querystring'] ): Promise<LSPAgentListValidation['response']> {
		return await this.http.request<LSPAgentListValidation['response']>({
			url: `/lsp/agents${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string, querystring?: LSPAgentRetrieveValidation['querystring'] ): Promise<LSPAgentRetrieveValidation['response']> {
		return await this.http.request<LSPAgentRetrieveValidation['response']>({
			url: `/lsp/agents/${id}${qs( querystring )}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPAgentUpdateValidation['body'] ): Promise<LSPAgentUpdateValidation['response']> {
		return await this.http.request<LSPAgentUpdateValidation['response']>({
			url: `/lsp/agents/${id}`,
			method: 'PATCH',
			body
		})
	}

	async assignVehicle( id: string, body: LSPAgentAssignVehicleValidation['body'] ): Promise<LSPAgentAssignVehicleValidation['response']> {
		return await this.http.request<LSPAgentAssignVehicleValidation['response']>({
			url: `/lsp/agents/${id}/vehicle/assign`,
			method: 'PUT',
			body
		})
	}

	async unassignVehicle( id: string ): Promise<LSPAgentUnassignVehicleValidation['response']> {
		return await this.http.request<LSPAgentUnassignVehicleValidation['response']>({
			url: `/lsp/agents/${id}/vehicle/unassign`,
			method: 'PATCH'
		})
	}

	async remove( id: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/agents/${id}`,
			method: 'DELETE'
		})
	}

	// ── Consolidation ──────────────────────────────────────────────────────────

	async scheduleConsolidation( body: LSPConsolidationScheduleValidation['body'] ): Promise<LSPConsolidationScheduleValidation['response']> {
		return await this.http.request<LSPConsolidationScheduleValidation['response']>({
			url: '/lsp/agents/consolidation/schedule',
			method: 'POST',
			body
		})
	}

	async listConsolidations( querystring?: LSPConsolidationFetchValidation['querystring'] ): Promise<LSPConsolidationFetchValidation['response']> {
		return await this.http.request<LSPConsolidationFetchValidation['response']>({
			url: `/lsp/agents/consolidation${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getConsolidation( consolidationId: string ): Promise<LSPConsolidationGetValidation['response']> {
		return await this.http.request<LSPConsolidationGetValidation['response']>({
			url: `/lsp/agents/consolidation/${consolidationId}`,
			method: 'GET'
		})
	}

	async updateConsolidationState( consolidationId: string, body: LSPConsolidationUpdateStateValidation['body'] ): Promise<LSPConsolidationUpdateStateValidation['response']> {
		return await this.http.request<LSPConsolidationUpdateStateValidation['response']>({
			url: `/lsp/agents/consolidation/${consolidationId}/state`,
			method: 'PUT',
			body
		})
	}

	async createConsolidationPoint( body: LSPConsolidationCreatePointValidation['body'] ): Promise<LSPConsolidationCreatePointValidation['response']> {
		return await this.http.request<LSPConsolidationCreatePointValidation['response']>({
			url: '/lsp/agents/consolidation/points',
			method: 'POST',
			body
		})
	}

	async listConsolidationPoints( querystring?: LSPConsolidationFetchPointsValidation['querystring'] ): Promise<LSPConsolidationFetchPointsValidation['response']> {
		return await this.http.request<LSPConsolidationFetchPointsValidation['response']>({
			url: `/lsp/agents/consolidation/points${qs( querystring )}`,
			method: 'GET'
		})
	}
}
