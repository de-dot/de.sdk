import type {
	IoTRuleAddValidation,
	IoTRuleFindValidation,
	IoTRuleListValidation,
	IoTRuleRemoveValidation,
	IoTRuleRetrieveValidation,
	IoTRuleStatusValidation,
	IoTRuleUpdateValidation,
	IoTRuleConnectorsValidation,
	IoTRuleXssignConnectorValidation
} from '@de./types/iotsp/rule'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── Rules ─────────────────────────────────────────────────────────────────

export default class IoTRules {
	constructor( private http: Http ) {}

	async add( body: IoTRuleAddValidation['body'] ): Promise<IoTRuleAddValidation['response']> {
		return await this.http.request<IoTRuleAddValidation['response']>({
			url: '/iotsp/rules/add',
			method: 'POST',
			body
		})
	}

	async update( reference: string, body: IoTRuleUpdateValidation['body'] ): Promise<IoTRuleUpdateValidation['response']> {
		return await this.http.request<IoTRuleUpdateValidation['response']>({
			url: `/iotsp/rules/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async list( querystring?: IoTRuleListValidation['querystring'] ): Promise<IoTRuleListValidation['response']> {
		return await this.http.request<IoTRuleListValidation['response']>({
			url: `/iotsp/rules${qs( querystring )}`,
			method: 'GET'
		})
	}

	async find( querystring: IoTRuleFindValidation['querystring'] ): Promise<IoTRuleFindValidation['response']> {
		return await this.http.request<IoTRuleFindValidation['response']>({
			url: `/iotsp/rules/find${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<IoTRuleRetrieveValidation['response']> {
		return await this.http.request<IoTRuleRetrieveValidation['response']>({
			url: `/iotsp/rules/${reference}`,
			method: 'GET'
		})
	}

	async enable( reference: string ): Promise<IoTRuleStatusValidation['response']> {
		return await this.http.request<IoTRuleStatusValidation['response']>({
			url: `/iotsp/rules/${reference}/enable`,
			method: 'PATCH'
		})
	}

	async disable( reference: string ): Promise<IoTRuleStatusValidation['response']> {
		return await this.http.request<IoTRuleStatusValidation['response']>({
			url: `/iotsp/rules/${reference}/disable`,
			method: 'PATCH'
		})
	}

	async delete( reference: string ): Promise<IoTRuleRemoveValidation['response']> {
		return await this.http.request<IoTRuleRemoveValidation['response']>({
			url: `/iotsp/rules/${reference}`,
			method: 'DELETE'
		})
	}

	async getConnectors( reference: string ): Promise<IoTRuleConnectorsValidation['response']> {
		return await this.http.request<IoTRuleConnectorsValidation['response']>({
			url: `/iotsp/rules/${reference}/connectors`,
			method: 'GET'
		})
	}

	async assignConnector( reference: string, body: IoTRuleXssignConnectorValidation['body'] ): Promise<IoTRuleXssignConnectorValidation['response']> {
		return await this.http.request<IoTRuleXssignConnectorValidation['response']>({
			url: `/iotsp/rules/${reference}/connector/assign`,
			method: 'PUT',
			body
		})
	}

	async unassignConnector( reference: string, body: IoTRuleXssignConnectorValidation['body'] ): Promise<IoTRuleXssignConnectorValidation['response']> {
		return await this.http.request<IoTRuleXssignConnectorValidation['response']>({
			url: `/iotsp/rules/${reference}/connector/unassign`,
			method: 'PATCH',
			body
		})
	}
}
