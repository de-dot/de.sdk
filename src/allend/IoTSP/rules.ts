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
import { qs, type Http, type Res } from '../../utils'

// ── Rules ─────────────────────────────────────────────────────────────────

export default class IoTRules {
	constructor( private http: Http ) {}

	async add( body: IoTRuleAddValidation['body'] ): Promise<IoTRuleAddValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleAddValidation['response']>>({
			url: '/iotsp/rules/add',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: IoTRuleUpdateValidation['body'] ): Promise<IoTRuleUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleUpdateValidation['response']>>({
			url: `/iotsp/rules/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: IoTRuleListValidation['querystring'] ): Promise<IoTRuleListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleListValidation['response']>>({
			url: `/iotsp/rules${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async find( querystring: IoTRuleFindValidation['querystring'] ): Promise<IoTRuleFindValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleFindValidation['response']>>({
			url: `/iotsp/rules/find${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<IoTRuleRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleRetrieveValidation['response']>>({
			url: `/iotsp/rules/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async enable( reference: string ): Promise<IoTRuleStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleStatusValidation['response']>>({
			url: `/iotsp/rules/${reference}/enable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async disable( reference: string ): Promise<IoTRuleStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleStatusValidation['response']>>({
			url: `/iotsp/rules/${reference}/disable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async delete( reference: string ): Promise<IoTRuleRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleRemoveValidation['response']>>({
			url: `/iotsp/rules/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getConnectors( reference: string ): Promise<IoTRuleConnectorsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleConnectorsValidation['response']>>({
			url: `/iotsp/rules/${reference}/connectors`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignConnector( reference: string, body: IoTRuleXssignConnectorValidation['body'] ): Promise<IoTRuleXssignConnectorValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleXssignConnectorValidation['response']>>({
			url: `/iotsp/rules/${reference}/connector/assign`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async unassignConnector( reference: string, body: IoTRuleXssignConnectorValidation['body'] ): Promise<IoTRuleXssignConnectorValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTRuleXssignConnectorValidation['response']>>({
			url: `/iotsp/rules/${reference}/connector/unassign`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
