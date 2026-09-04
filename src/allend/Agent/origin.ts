import type {
	AgentOriginStatusReportValidation,
	AgentRegisterPoiValidation,
	AgentAddPoiNoteValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Origin ─────────────────────────────────────────────────────────────

export default class AgentOrigin {
	constructor( private http: Http ){}

	async statusReport( body: AgentOriginStatusReportValidation['body'] ): Promise<AgentOriginStatusReportValidation['response']> {
		return await this.http.request<AgentOriginStatusReportValidation['response']>({
			url: '/agent/origin/status',
			method: 'POST',
			body
		})
	}

	async registerPoi( body: AgentRegisterPoiValidation['body'] ): Promise<AgentRegisterPoiValidation['response']> {
		return await this.http.request<AgentRegisterPoiValidation['response']>({
			url: '/agent/origin/poi/register',
			method: 'POST',
			body
		})
	}

	async addPoiNote( body: AgentAddPoiNoteValidation['body'] ): Promise<AgentAddPoiNoteValidation['response']> {
		return await this.http.request<AgentAddPoiNoteValidation['response']>({
			url: '/agent/origin/poi/note',
			method: 'POST',
			body
		})
	}
}
