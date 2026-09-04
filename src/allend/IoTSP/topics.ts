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

	async add( body: IoTTopicRegisterValidation['body'] ): Promise<Data<IoTTopicRegisterValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicRegisterValidation['response']>>>({
			url: `/iotsp/topics/register`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: IoTTopicUpdateValidation['body'] ): Promise<Data<IoTTopicUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicUpdateValidation['response']>>>({
			url: `/iotsp/topics/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: IoTTopicListValidation['querystring'] ): Promise<Data<IoTTopicListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicListValidation['response']>>>({
			url: `/iotsp/topics${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async find( querystring: IoTTopicFindValidation['querystring'] ): Promise<Data<IoTTopicFindValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicFindValidation['response']>>>({
			url: `/iotsp/topics/find${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( reference: string ): Promise<Data<IoTTopicRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicRetrieveValidation['response']>>>({
			url: `/iotsp/topics/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async enable( reference: string ): Promise<Data<IoTTopicStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicStatusValidation['response']>>>({
			url: `/iotsp/topics/${reference}/enable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}
 
	async disable( reference: string ): Promise<Data<IoTTopicStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicStatusValidation['response']>>>({
			url: `/iotsp/topics/${reference}/disable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async delete( reference: string ): Promise<Data<IoTTopicUnregisterValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicUnregisterValidation['response']>>>({
			url: `/iotsp/topics/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getConnectors( reference: string ): Promise<Data<IoTTopicConnectorsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicConnectorsValidation['response']>>>({
			url: `/iotsp/topics/${reference}/connectors`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignConnector( reference: string, body: IoTTopicXssignConnectorValidation['body'] ): Promise<Data<IoTTopicXssignConnectorValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicXssignConnectorValidation['response']>>>({
			url: `/iotsp/topics/${reference}/connector/assign`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async unassignConnector( reference: string, body: IoTTopicXssignConnectorValidation['body'] ): Promise<Data<IoTTopicXssignConnectorValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<IoTTopicXssignConnectorValidation['response']>>>({
			url: `/iotsp/topics/${reference}/connector/unassign`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
