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
	async getRallyConfig(): Promise<Data<LSPRallyConfigRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPRallyConfigRetrieveValidation['response']>>>({
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
	async updateRallyConfig( body: LSPRallyConfigUpdateValidation['body'] ): Promise<Data<LSPRallyConfigUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPRallyConfigUpdateValidation['response']>>>({
			url: '/lsp/rally/config',
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	/** Put one knob back to the platform default, leaving the rest tuned. */
	async resetRallyConfigKey( key: string ): Promise<Data<LSPRallyConfigResetKeyValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPRallyConfigResetKeyValidation['response']>>>({
			url: `/lsp/rally/config/${key}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	/** Drop every override this workspace holds. */
	async resetRallyConfig(): Promise<Data<LSPRallyConfigResetValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPRallyConfigResetValidation['response']>>>({
			url: '/lsp/rally/config',
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Zones ─────────────────────────────────────────────────────────────────

	async createZone( body: LSPZoneCreateValidation['body'] ): Promise<Data<LSPZoneCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPZoneCreateValidation['response']>>>({
			url: '/lsp/zones',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listZones( querystring?: LSPZoneListValidation['querystring'] ): Promise<Data<LSPZoneListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPZoneListValidation['response']>>>({
			url: `/lsp/zones${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getZoneDensity( id: string ): Promise<Data<LSPZoneDensityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPZoneDensityValidation['response']>>>({
			url: `/lsp/zones/${id}/density`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateZoneStatus( id: string, body: LSPZoneUpdateStatusValidation['body'] ): Promise<Data<LSPZoneUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPZoneUpdateStatusValidation['response']>>>({
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

	async getGraphPoi( externalId: string ): Promise<Data<LSPGraphGetPoiValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPGraphGetPoiValidation['response']>>>({
			url: `/lsp/graph/poi/${externalId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async registerGraphPoi( body: LSPGraphRegisterPoiValidation['body'] ): Promise<Data<LSPGraphRegisterPoiValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPGraphRegisterPoiValidation['response']>>>({
			url: '/lsp/graph/poi',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getNearestGraph( querystring: LSPGraphNearestValidation['querystring'] ): Promise<Data<LSPGraphNearestValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPGraphNearestValidation['response']>>>({
			url: `/lsp/graph/nearest${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getGraphLandmarks(): Promise<Data<LSPGraphLandmarksValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPGraphLandmarksValidation['response']>>>({
			url: '/lsp/graph/landmarks',
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Score ─────────────────────────────────────────────────────────────────

	async getOriginScore( senderId: string ): Promise<Data<LSPScoreOriginValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPScoreOriginValidation['response']>>>({
			url: `/lsp/score/origin/${senderId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getAgentScore( agentId: string ): Promise<Data<LSPScoreAgentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPScoreAgentValidation['response']>>>({
			url: `/lsp/score/agent/${agentId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Reports ───────────────────────────────────────────────────────────────

	async getInventoryReport( querystring?: LSPReportsInventoryValidation['querystring'] ): Promise<Data<LSPReportsInventoryValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPReportsInventoryValidation['response']>>>({
			url: `/lsp/reports/inventory${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getOperationsReport( querystring?: LSPReportsOperationsValidation['querystring'] ): Promise<Data<LSPReportsOperationsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPReportsOperationsValidation['response']>>>({
			url: `/lsp/reports/operations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getFacilityReport( querystring?: LSPReportsFacilityValidation['querystring'] ): Promise<Data<LSPReportsFacilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPReportsFacilityValidation['response']>>>({
			url: `/lsp/reports/facility${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getTasksReport( querystring?: LSPReportsTasksValidation['querystring'] ): Promise<Data<LSPReportsTasksValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPReportsTasksValidation['response']>>>({
			url: `/lsp/reports/tasks${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
