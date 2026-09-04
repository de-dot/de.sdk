import type { APIResponseBase } from '@de./types'
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
import { qs, type Http, type Res, type Data } from '../../utils'

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
		return await this.http.request<LSPRallyConfigRetrieveValidation['response']>({
			url: '/lsp/rally/config',
			method: 'GET'
		})
	}

	/**
	 * Set one or more knobs for this workspace.
	 *
	 * A partial body — only the keys sent are touched. Keys the engine holds at
	 * process scope are rejected rather than silently ignored, since a setting
	 * that appears to take and does nothing is worse than a refusal.
	 */
	async updateRallyConfig( body: LSPRallyConfigUpdateValidation['body'] ): Promise<LSPRallyConfigUpdateValidation['response']> {
		return await this.http.request<LSPRallyConfigUpdateValidation['response']>({
			url: '/lsp/rally/config',
			method: 'PATCH',
			body
		})
	}

	/** Put one knob back to the platform default, leaving the rest tuned. */
	async resetRallyConfigKey( key: string ): Promise<LSPRallyConfigResetKeyValidation['response']> {
		return await this.http.request<LSPRallyConfigResetKeyValidation['response']>({
			url: `/lsp/rally/config/${key}`,
			method: 'DELETE'
		})
	}

	/** Drop every override this workspace holds. */
	async resetRallyConfig(): Promise<LSPRallyConfigResetValidation['response']> {
		return await this.http.request<LSPRallyConfigResetValidation['response']>({
			url: '/lsp/rally/config',
			method: 'DELETE'
		})
	}

	// ── Zones ─────────────────────────────────────────────────────────────────

	async createZone( body: LSPZoneCreateValidation['body'] ): Promise<LSPZoneCreateValidation['response']> {
		return await this.http.request<LSPZoneCreateValidation['response']>({
			url: '/lsp/zones',
			method: 'POST',
			body
		})
	}

	async listZones( querystring?: LSPZoneListValidation['querystring'] ): Promise<LSPZoneListValidation['response']> {
		return await this.http.request<LSPZoneListValidation['response']>({
			url: `/lsp/zones${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getZoneDensity( id: string ): Promise<LSPZoneDensityValidation['response']> {
		return await this.http.request<LSPZoneDensityValidation['response']>({
			url: `/lsp/zones/${id}/density`,
			method: 'GET'
		})
	}

	async updateZoneStatus( id: string, body: LSPZoneUpdateStatusValidation['body'] ): Promise<LSPZoneUpdateStatusValidation['response']> {
		return await this.http.request<LSPZoneUpdateStatusValidation['response']>({
			url: `/lsp/zones/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async removeZone( id: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/zones/${id}`,
			method: 'DELETE'
		})
	}

	// ── Graph ─────────────────────────────────────────────────────────────────

	async getGraphPoi( externalId: string ): Promise<LSPGraphGetPoiValidation['response']> {
		return await this.http.request<LSPGraphGetPoiValidation['response']>({
			url: `/lsp/graph/poi/${externalId}`,
			method: 'GET'
		})
	}

	async registerGraphPoi( body: LSPGraphRegisterPoiValidation['body'] ): Promise<LSPGraphRegisterPoiValidation['response']> {
		return await this.http.request<LSPGraphRegisterPoiValidation['response']>({
			url: '/lsp/graph/poi',
			method: 'POST',
			body
		})
	}

	async getNearestGraph( querystring: LSPGraphNearestValidation['querystring'] ): Promise<LSPGraphNearestValidation['response']> {
		return await this.http.request<LSPGraphNearestValidation['response']>({
			url: `/lsp/graph/nearest${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getGraphLandmarks(): Promise<LSPGraphLandmarksValidation['response']> {
		return await this.http.request<LSPGraphLandmarksValidation['response']>({
			url: '/lsp/graph/landmarks',
			method: 'GET'
		})
	}

	// ── Score ─────────────────────────────────────────────────────────────────

	async getOriginScore( senderId: string ): Promise<LSPScoreOriginValidation['response']> {
		return await this.http.request<LSPScoreOriginValidation['response']>({
			url: `/lsp/score/origin/${senderId}`,
			method: 'GET'
		})
	}

	async getAgentScore( agentId: string ): Promise<LSPScoreAgentValidation['response']> {
		return await this.http.request<LSPScoreAgentValidation['response']>({
			url: `/lsp/score/agent/${agentId}`,
			method: 'GET'
		})
	}

	// ── Reports ───────────────────────────────────────────────────────────────

	async getInventoryReport( querystring?: LSPReportsInventoryValidation['querystring'] ): Promise<LSPReportsInventoryValidation['response']> {
		return await this.http.request<LSPReportsInventoryValidation['response']>({
			url: `/lsp/reports/inventory${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getOperationsReport( querystring?: LSPReportsOperationsValidation['querystring'] ): Promise<LSPReportsOperationsValidation['response']> {
		return await this.http.request<LSPReportsOperationsValidation['response']>({
			url: `/lsp/reports/operations${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getFacilityReport( querystring?: LSPReportsFacilityValidation['querystring'] ): Promise<LSPReportsFacilityValidation['response']> {
		return await this.http.request<LSPReportsFacilityValidation['response']>({
			url: `/lsp/reports/facility${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getTasksReport( querystring?: LSPReportsTasksValidation['querystring'] ): Promise<LSPReportsTasksValidation['response']> {
		return await this.http.request<LSPReportsTasksValidation['response']>({
			url: `/lsp/reports/tasks${qs( querystring )}`,
			method: 'GET'
		})
	}
}
