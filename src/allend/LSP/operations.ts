import type {
	LSPScoreOriginValidation,
	LSPScoreAgentValidation,
	LSPReportsInventoryValidation,
	LSPReportsOperationsValidation,
	LSPReportsFacilityValidation,
	LSPReportsTasksValidation,
	LSPRallyConfigRetrieveValidation,
	LSPRallyConfigUpdateValidation,
	LSPRallyConfigResetValidation,
	LSPRallyConfigResetKeyValidation
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
import LSPCoverage from './coverage'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Operations ────────────────────────────────────────────────────────────

export default class LSPOperations {
	readonly coverage: LSPCoverage

	constructor( private http: Http ){
		this.coverage = new LSPCoverage( this.http )
	}

	// ── Rally Config ──────────────────────────────────────────────────────────

	/**
	 * How the rally engine is tuned for this workspace.
	 *
	 * `config` is everything in force, platform defaults included; `overrides`
	 * is only what this workspace has set, which is the answer to "what did we
	 * change"; `describe` says the same thing knob by knob with the provenance
	 * and scope of each, so a surprising value can be traced without guessing.
	 */
	async getRallyConfig(): Promise<LSPRallyConfigRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPRallyConfigRetrieveValidation['response']>>({
			url: '/lsp/rally/config',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	/**
	 * Set one or more knobs for this workspace.
	 *
	 * A partial body — only the keys sent are touched. Keys the engine holds at
	 * process scope are rejected rather than silently ignored, since a setting
	 * that appears to take and does nothing is worse than a refusal.
	 */
	async updateRallyConfig( body: LSPRallyConfigUpdateValidation['body'] ): Promise<LSPRallyConfigUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPRallyConfigUpdateValidation['response']>>({
			url: '/lsp/rally/config',
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	/** Put one knob back to the platform default, leaving the rest tuned. */
	async resetRallyConfigKey( key: string ): Promise<LSPRallyConfigResetKeyValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPRallyConfigResetKeyValidation['response']>>({
			url: `/lsp/rally/config/${key}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	/** Drop every override this workspace holds. */
	async resetRallyConfig(): Promise<LSPRallyConfigResetValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPRallyConfigResetValidation['response']>>({
			url: '/lsp/rally/config',
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Zones ─────────────────────────────────────────────────────────────────

	async createZone( body: LSPZoneCreateValidation['body'] ): Promise<LSPZoneCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPZoneCreateValidation['response']>>({
			url: '/lsp/zones',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listZones( querystring?: LSPZoneListValidation['querystring'] ): Promise<LSPZoneListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPZoneListValidation['response']>>({
			url: `/lsp/zones${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getZoneDensity( id: string ): Promise<LSPZoneDensityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPZoneDensityValidation['response']>>({
			url: `/lsp/zones/${id}/density`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateZoneStatus( id: string, body: LSPZoneUpdateStatusValidation['body'] ): Promise<LSPZoneUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPZoneUpdateStatusValidation['response']>>({
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

	async getGraphPoi( externalId: string ): Promise<LSPGraphGetPoiValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPGraphGetPoiValidation['response']>>({
			url: `/lsp/graph/poi/${externalId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async registerGraphPoi( body: LSPGraphRegisterPoiValidation['body'] ): Promise<LSPGraphRegisterPoiValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPGraphRegisterPoiValidation['response']>>({
			url: '/lsp/graph/poi',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getNearestGraph( querystring: LSPGraphNearestValidation['querystring'] ): Promise<LSPGraphNearestValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPGraphNearestValidation['response']>>({
			url: `/lsp/graph/nearest${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getGraphLandmarks(): Promise<LSPGraphLandmarksValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPGraphLandmarksValidation['response']>>({
			url: '/lsp/graph/landmarks',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Score ─────────────────────────────────────────────────────────────────

	async getOriginScore( senderId: string ): Promise<LSPScoreOriginValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPScoreOriginValidation['response']>>({
			url: `/lsp/score/origin/${senderId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getAgentScore( agentId: string ): Promise<LSPScoreAgentValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPScoreAgentValidation['response']>>({
			url: `/lsp/score/agent/${agentId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Reports ───────────────────────────────────────────────────────────────

	async getInventoryReport( querystring?: LSPReportsInventoryValidation['querystring'] ): Promise<LSPReportsInventoryValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPReportsInventoryValidation['response']>>({
			url: `/lsp/reports/inventory${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOperationsReport( querystring?: LSPReportsOperationsValidation['querystring'] ): Promise<LSPReportsOperationsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPReportsOperationsValidation['response']>>({
			url: `/lsp/reports/operations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFacilityReport( querystring?: LSPReportsFacilityValidation['querystring'] ): Promise<LSPReportsFacilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPReportsFacilityValidation['response']>>({
			url: `/lsp/reports/facility${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTasksReport( querystring?: LSPReportsTasksValidation['querystring'] ): Promise<LSPReportsTasksValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPReportsTasksValidation['response']>>({
			url: `/lsp/reports/tasks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
