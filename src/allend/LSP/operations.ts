import type {
	LSPScoreOriginValidation,
	LSPScoreAgentValidation,
	LSPReportsInventoryValidation,
	LSPReportsOperationsValidation,
	LSPReportsFacilityValidation,
	LSPReportsTasksValidation
} from '@de./types/lsp/operations'
import type {
	LSPZoneListValidation,
	LSPZoneDensityValidation,
	LSPZoneCreateValidation,
	LSPZoneUpdateStatusValidation,
	LSPZoneRemoveValidation
} from '@de./types/lsp/zones'
import type {
	LSPGraphGetPoiValidation,
	LSPGraphRegisterPoiValidation,
	LSPGraphNearestValidation,
	LSPGraphLandmarksValidation
} from '@de./types/lsp/graph'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Operations ────────────────────────────────────────────────────────────

export default class LSPOperations {
	constructor( private http: Http ){}

	// ── Coverage ──────────────────────────────────────────────────────────────

	async getCoverage(): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/coverage',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async createCoverageArea( body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/coverage/areas',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateCoverageArea( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/coverage/areas/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async createCoverageRoute( body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/coverage/routes',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateCoverageRoute( id: string, body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/coverage/routes/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkCoverage( body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/coverage/checks/check',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async findCoverage( body: unknown ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/coverage/checks/find',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Zones ─────────────────────────────────────────────────────────────────

	async createZone( body: LSPZoneCreateValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/zones',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listZones( querystring?: LSPZoneListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/zones${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getZoneDensity( id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/zones/${id}/density`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateZoneStatus( id: string, body: LSPZoneUpdateStatusValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/zones/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeZone( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/zones/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	// ── Graph ─────────────────────────────────────────────────────────────────

	async getGraphPoi( externalId: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/graph/poi/${externalId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async registerGraphPoi( body: LSPGraphRegisterPoiValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/graph/poi',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getNearestGraph( querystring: LSPGraphNearestValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/graph/nearest${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getGraphLandmarks(): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: '/lsp/graph/landmarks',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Score ─────────────────────────────────────────────────────────────────

	async getOriginScore( senderId: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/score/origin/${senderId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getAgentScore( agentId: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/score/agent/${agentId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Reports ───────────────────────────────────────────────────────────────

	async getInventoryReport( querystring?: LSPReportsInventoryValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/reports/inventory${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOperationsReport( querystring?: LSPReportsOperationsValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/reports/operations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFacilityReport( querystring?: LSPReportsFacilityValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/reports/facility${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTasksReport( querystring?: LSPReportsTasksValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/reports/tasks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
