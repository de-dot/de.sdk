import type {
	CSPAnalyticsOrdersValidation,
	CSPAnalyticsFulfillmentValidation,
	CSPAnalyticsProvidersValidation,
	CSPAnalyticsGenerateReportValidation,
	CSPAnalyticsGetReportValidation,
	CSPAnalyticsListReportsValidation
} from '@de./types/csp/analytics'
import { qs, type Http, type Res } from '../../utils'

// ── CSP Analytics ─────────────────────────────────────────────────────────

export default class CSPAnalytics {
	constructor( private http: Http ){}

	async orders( body: CSPAnalyticsOrdersValidation['body'] ): Promise<CSPAnalyticsOrdersValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPAnalyticsOrdersValidation['response']>>({
			url: '/csp/analytics/orders',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async fulfillment( body: CSPAnalyticsFulfillmentValidation['body'] ): Promise<CSPAnalyticsFulfillmentValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPAnalyticsFulfillmentValidation['response']>>({
			url: '/csp/analytics/fulfillment',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async providers( body: CSPAnalyticsProvidersValidation['body'] ): Promise<CSPAnalyticsProvidersValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPAnalyticsProvidersValidation['response']>>({
			url: '/csp/analytics/providers',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async generateReport( body: CSPAnalyticsGenerateReportValidation['body'] ): Promise<CSPAnalyticsGenerateReportValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPAnalyticsGenerateReportValidation['response']>>({
			url: '/csp/analytics/reports',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getReport( id: string ): Promise<CSPAnalyticsGetReportValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPAnalyticsGetReportValidation['response']>>({
			url: `/csp/analytics/reports/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async listReports( querystring?: CSPAnalyticsListReportsValidation['querystring'] ): Promise<CSPAnalyticsListReportsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPAnalyticsListReportsValidation['response']>>({
			url: `/csp/analytics/reports${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
