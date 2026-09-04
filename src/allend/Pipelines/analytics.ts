import type {
	PipelineAnalyticsOverviewValidation,
	PipelineAnalyticsPipelineValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Analytics ────────────────────────────────────────────────────────────────

export class PipelinesAnalytics {
	constructor( private http: Http ){}

	async overview( querystring?: PipelineAnalyticsOverviewValidation['querystring'] ): Promise<PipelineAnalyticsOverviewValidation['response']> {
		return await this.http.request<PipelineAnalyticsOverviewValidation['response']>({
			url: `/pipelines/analytics/overview${qs( querystring )}`,
			method: 'GET'
		})
	}

	async pipeline( pid: string, querystring?: PipelineAnalyticsPipelineValidation['querystring'] ): Promise<PipelineAnalyticsPipelineValidation['response']> {
		return await this.http.request<PipelineAnalyticsPipelineValidation['response']>({
			url: `/pipelines/analytics/pipeline/${pid}${qs( querystring )}`,
			method: 'GET'
		})
	}
}
