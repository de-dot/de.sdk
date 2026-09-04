import type {
	AgentLocationValidation,
	AgentNearbyValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Agent Navigation ─────────────────────────────────────────────────────────

export default class AgentNavigation {
	constructor( private http: Http ){}

	async location( body: AgentLocationValidation['body'] ): Promise<AgentLocationValidation['response']> {
		return await this.http.request<AgentLocationValidation['response']>({
			url: '/agent/navigation/location',
			method: 'POST',
			body
		})
	}

	async nearby( body: AgentNearbyValidation['body'], querystring?: AgentNearbyValidation['querystring'] ): Promise<AgentNearbyValidation['response']> {
		return await this.http.request<AgentNearbyValidation['response']>({
			url: `/agent/navigation/nearby${qs( querystring )}`,
			method: 'POST',
			body
		})
	}
}
