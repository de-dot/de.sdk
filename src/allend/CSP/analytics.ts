import type {
	CSPAnalyticsOrdersValidation,
	CSPAnalyticsFulfillmentValidation,
	CSPAnalyticsProvidersValidation,
	CSPAnalyticsGenerateReportValidation,
	CSPAnalyticsGetReportValidation,
	CSPAnalyticsListReportsValidation
} from '@de./types/csp/analytics'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── CSP Analytics ─────────────────────────────────────────────────────────

export default class CSPAnalytics {
	constructor( private http: Http ){}

	async orders( body: CSPAnalyticsOrdersValidation['body'] ): Promise<CSPAnalyticsOrdersValidation['response']> {
		return await this.http.request<CSPAnalyticsOrdersValidation['response']>({
			url: '/csp/analytics/orders',
			method: 'POST',
			body
		})
	}

	async fulfillment( body: CSPAnalyticsFulfillmentValidation['body'] ): Promise<CSPAnalyticsFulfillmentValidation['response']> {
		return await this.http.request<CSPAnalyticsFulfillmentValidation['response']>({
			url: '/csp/analytics/fulfillment',
			method: 'POST',
			body
		})
	}

	async providers( body: CSPAnalyticsProvidersValidation['body'] ): Promise<CSPAnalyticsProvidersValidation['response']> {
		return await this.http.request<CSPAnalyticsProvidersValidation['response']>({
			url: '/csp/analytics/providers',
			method: 'POST',
			body
		})
	}

	async generateReport( body: CSPAnalyticsGenerateReportValidation['body'] ): Promise<CSPAnalyticsGenerateReportValidation['response']> {
		return await this.http.request<CSPAnalyticsGenerateReportValidation['response']>({
			url: '/csp/analytics/reports',
			method: 'POST',
			body
		})
	}

	async getReport( id: string ): Promise<CSPAnalyticsGetReportValidation['response']> {
		return await this.http.request<CSPAnalyticsGetReportValidation['response']>({
			url: `/csp/analytics/reports/${id}`,
			method: 'GET'
		})
	}

	async listReports( querystring?: CSPAnalyticsListReportsValidation['querystring'] ): Promise<CSPAnalyticsListReportsValidation['response']> {
		return await this.http.request<CSPAnalyticsListReportsValidation['response']>({
			url: `/csp/analytics/reports${qs( querystring )}`,
			method: 'GET'
		})
	}
}
