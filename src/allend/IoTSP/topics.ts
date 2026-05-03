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
import { qs, type Http, type Res } from '../../utils'

// ── Topics ───────────────────────────────────────────────────────────────

export default class IoTTopics {
	constructor( private http: Http ){}

	async add( body: IoTTopicRegisterValidation['body'] ): Promise<IoTTopicRegisterValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicRegisterValidation['response']>>({
			url: `/iotsp/topics/register`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: IoTTopicUpdateValidation['body'] ): Promise<IoTTopicUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicUpdateValidation['response']>>({
			url: `/iotsp/topics/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: IoTTopicListValidation['querystring'] ): Promise<IoTTopicListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicListValidation['response']>>({
			url: `/iotsp/topics${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async find( querystring: IoTTopicFindValidation['querystring'] ): Promise<IoTTopicFindValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicFindValidation['response']>>({
			url: `/iotsp/topics/find${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<IoTTopicRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicRetrieveValidation['response']>>({
			url: `/iotsp/topics/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async enable( reference: string ): Promise<IoTTopicStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicStatusValidation['response']>>({
			url: `/iotsp/topics/${reference}/enable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}
 
	async disable( reference: string ): Promise<IoTTopicStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicStatusValidation['response']>>({
			url: `/iotsp/topics/${reference}/disable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async delete( reference: string ): Promise<IoTTopicUnregisterValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicUnregisterValidation['response']>>({
			url: `/iotsp/topics/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getConnectors( reference: string ): Promise<IoTTopicConnectorsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicConnectorsValidation['response']>>({
			url: `/iotsp/topics/${reference}/connectors`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignConnector( reference: string, body: IoTTopicXssignConnectorValidation['body'] ): Promise<IoTTopicXssignConnectorValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicXssignConnectorValidation['response']>>({
			url: `/iotsp/topics/${reference}/connector/assign`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async unassignConnector( reference: string, body: IoTTopicXssignConnectorValidation['body'] ): Promise<IoTTopicXssignConnectorValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTTopicXssignConnectorValidation['response']>>({
			url: `/iotsp/topics/${reference}/connector/unassign`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
