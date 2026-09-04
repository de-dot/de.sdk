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

	async orders( body: CSPAnalyticsOrdersValidation['body'] ): Promise<Data<CSPAnalyticsOrdersValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPAnalyticsOrdersValidation['response']>>>({
			url: '/csp/analytics/orders',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async fulfillment( body: CSPAnalyticsFulfillmentValidation['body'] ): Promise<Data<CSPAnalyticsFulfillmentValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPAnalyticsFulfillmentValidation['response']>>>({
			url: '/csp/analytics/fulfillment',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async providers( body: CSPAnalyticsProvidersValidation['body'] ): Promise<Data<CSPAnalyticsProvidersValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPAnalyticsProvidersValidation['response']>>>({
			url: '/csp/analytics/providers',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async generateReport( body: CSPAnalyticsGenerateReportValidation['body'] ): Promise<Data<CSPAnalyticsGenerateReportValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPAnalyticsGenerateReportValidation['response']>>>({
			url: '/csp/analytics/reports',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getReport( id: string ): Promise<Data<CSPAnalyticsGetReportValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPAnalyticsGetReportValidation['response']>>>({
			url: `/csp/analytics/reports/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async listReports( querystring?: CSPAnalyticsListReportsValidation['querystring'] ): Promise<Data<CSPAnalyticsListReportsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPAnalyticsListReportsValidation['response']>>>({
			url: `/csp/analytics/reports${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
