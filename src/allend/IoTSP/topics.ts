import type {
	IoTTopicRegisterValidation,
	IoTTopicFindValidation,
	IoTTopicListValidation,
	IoTTopicUnregisterValidation,
	IoTTopicRetrieveValidation,
	IoTTopicStatusValidation,
	IoTTopicUpdateValidation,
	IoTTopicConnectorsValidation,
	IoTTopicXssignConnectorValidation
} from '@de./types/iotsp/topic'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── Topics ───────────────────────────────────────────────────────────────

export default class IoTTopics {
	constructor( private http: Http ){}

	async add( body: IoTTopicRegisterValidation['body'] ): Promise<IoTTopicRegisterValidation['response']> {
		return await this.http.request<IoTTopicRegisterValidation['response']>({
			url: `/iotsp/topics/register`,
			method: 'POST',
			body
		})
	}

	async update( reference: string, body: IoTTopicUpdateValidation['body'] ): Promise<IoTTopicUpdateValidation['response']> {
		return await this.http.request<IoTTopicUpdateValidation['response']>({
			url: `/iotsp/topics/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async list( querystring?: IoTTopicListValidation['querystring'] ): Promise<IoTTopicListValidation['response']> {
		return await this.http.request<IoTTopicListValidation['response']>({
			url: `/iotsp/topics${qs( querystring )}`,
			method: 'GET'
		})
	}

	async find( querystring: IoTTopicFindValidation['querystring'] ): Promise<IoTTopicFindValidation['response']> {
		return await this.http.request<IoTTopicFindValidation['response']>({
			url: `/iotsp/topics/find${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( reference: string ): Promise<IoTTopicRetrieveValidation['response']> {
		return await this.http.request<IoTTopicRetrieveValidation['response']>({
			url: `/iotsp/topics/${reference}`,
			method: 'GET'
		})
	}

	async enable( reference: string ): Promise<IoTTopicStatusValidation['response']> {
		return await this.http.request<IoTTopicStatusValidation['response']>({
			url: `/iotsp/topics/${reference}/enable`,
			method: 'PATCH'
		})
	}
 
	async disable( reference: string ): Promise<IoTTopicStatusValidation['response']> {
		return await this.http.request<IoTTopicStatusValidation['response']>({
			url: `/iotsp/topics/${reference}/disable`,
			method: 'PATCH'
		})
	}

	async delete( reference: string ): Promise<IoTTopicUnregisterValidation['response']> {
		return await this.http.request<IoTTopicUnregisterValidation['response']>({
			url: `/iotsp/topics/${reference}`,
			method: 'DELETE'
		})
	}

	async getConnectors( reference: string ): Promise<IoTTopicConnectorsValidation['response']> {
		return await this.http.request<IoTTopicConnectorsValidation['response']>({
			url: `/iotsp/topics/${reference}/connectors`,
			method: 'GET'
		})
	}

	async assignConnector( reference: string, body: IoTTopicXssignConnectorValidation['body'] ): Promise<IoTTopicXssignConnectorValidation['response']> {
		return await this.http.request<IoTTopicXssignConnectorValidation['response']>({
			url: `/iotsp/topics/${reference}/connector/assign`,
			method: 'PUT',
			body
		})
	}

	async unassignConnector( reference: string, body: IoTTopicXssignConnectorValidation['body'] ): Promise<IoTTopicXssignConnectorValidation['response']> {
		return await this.http.request<IoTTopicXssignConnectorValidation['response']>({
			url: `/iotsp/topics/${reference}/connector/unassign`,
			method: 'PATCH',
			body
		})
	}
}
