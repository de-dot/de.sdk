import type {
	LSPAgentRetrieveValidation,
	LSPAgentListValidation,
	LSPAgentUpdateValidation,
	LSPAgentAssignVehicleValidation,
	LSPAgentUnassignVehicleValidation,
	LSPAgentRemoveValidation
} from '@de./types/aux/agents'
import type {
	LSPConsolidationScheduleValidation,
	LSPConsolidationFetchValidation,
	LSPConsolidationGetValidation,
	LSPConsolidationUpdateStateValidation,
	LSPConsolidationCreatePointValidation,
	LSPConsolidationFetchPointsValidation
} from '@de./types/lsp/consolidation'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Agents ────────────────────────────────────────────────────────────────

export default class LSPAgents {
	constructor( private http: Http ){}

	async list( querystring?: LSPAgentListValidation['querystring'] ): Promise<LSPAgentListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPAgentListValidation['response']>>({
			url: `/lsp/agents${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string, querystring?: LSPAgentRetrieveValidation['querystring'] ): Promise<LSPAgentRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPAgentRetrieveValidation['response']>>({
			url: `/lsp/agents/${id}${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPAgentUpdateValidation['body'] ): Promise<LSPAgentUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPAgentUpdateValidation['response']>>({
			url: `/lsp/agents/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignVehicle( id: string, body: LSPAgentAssignVehicleValidation['body'] ): Promise<LSPAgentAssignVehicleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPAgentAssignVehicleValidation['response']>>({
			url: `/lsp/agents/${id}/vehicle/assign`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async unassignVehicle( id: string ): Promise<LSPAgentUnassignVehicleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPAgentUnassignVehicleValidation['response']>>({
			url: `/lsp/agents/${id}/vehicle/unassign`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/agents/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Consolidation ──────────────────────────────────────────────────────────

	async scheduleConsolidation( body: LSPConsolidationScheduleValidation['body'] ): Promise<LSPConsolidationScheduleValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPConsolidationScheduleValidation['response']>>({
			url: '/lsp/agents/consolidation/schedule',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listConsolidations( querystring?: LSPConsolidationFetchValidation['querystring'] ): Promise<LSPConsolidationFetchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPConsolidationFetchValidation['response']>>({
			url: `/lsp/agents/consolidation${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getConsolidation( consolidationId: string ): Promise<LSPConsolidationGetValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPConsolidationGetValidation['response']>>({
			url: `/lsp/agents/consolidation/${consolidationId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateConsolidationState( consolidationId: string, body: LSPConsolidationUpdateStateValidation['body'] ): Promise<LSPConsolidationUpdateStateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPConsolidationUpdateStateValidation['response']>>({
			url: `/lsp/agents/consolidation/${consolidationId}/state`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async createConsolidationPoint( body: LSPConsolidationCreatePointValidation['body'] ): Promise<LSPConsolidationCreatePointValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPConsolidationCreatePointValidation['response']>>({
			url: '/lsp/agents/consolidation/points',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listConsolidationPoints( querystring?: LSPConsolidationFetchPointsValidation['querystring'] ): Promise<LSPConsolidationFetchPointsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPConsolidationFetchPointsValidation['response']>>({
			url: `/lsp/agents/consolidation/points${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
