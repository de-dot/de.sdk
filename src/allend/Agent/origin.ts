import type {
	AgentOriginStatusReportValidation,
	AgentRegisterPoiValidation,
	AgentAddPoiNoteValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Agent Origin ─────────────────────────────────────────────────────────────

export default class AgentOrigin {
	constructor( private http: Http ){}

	async statusReport( body: AgentOriginStatusReportValidation['body'] ): Promise<Data<AgentOriginStatusReportValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentOriginStatusReportValidation['response']>>>({
			url: '/agent/origin/status',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async registerPoi( body: AgentRegisterPoiValidation['body'] ): Promise<Data<AgentRegisterPoiValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentRegisterPoiValidation['response']>>>({
			url: '/agent/origin/poi/register',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async addPoiNote( body: AgentAddPoiNoteValidation['body'] ): Promise<Data<AgentAddPoiNoteValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<AgentAddPoiNoteValidation['response']>>>({
			url: '/agent/origin/poi/note',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
