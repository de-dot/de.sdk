import type {
	PipelineAnalyticsOverviewValidation,
	PipelineAnalyticsPipelineValidation
} from '@de./types'
import { qs, type Http, type Res } from '../../utils'

// ─── Analytics ────────────────────────────────────────────────────────────────

export class PipelinesAnalytics {
	constructor( private http: Http ){}

	async overview( querystring?: PipelineAnalyticsOverviewValidation['querystring'] ): Promise<PipelineAnalyticsOverviewValidation['response']> {
		const { error, message, data } = await this.http.request<Res<PipelineAnalyticsOverviewValidation['response']>>({
			url: `/pipelines/analytics/overview${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async pipeline( pid: string, querystring?: PipelineAnalyticsPipelineValidation['querystring'] ): Promise<PipelineAnalyticsPipelineValidation['response']> {
		const { error, message, data } = await this.http.request<Res<PipelineAnalyticsPipelineValidation['response']>>({
			url: `/pipelines/analytics/pipeline/${pid}${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
