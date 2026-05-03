import type {
	IoTDeviceAddValidation,
	IoTDeviceFindValidation,
	IoTDeviceListValidation,
	IoTDeviceRemoveValidation,
	IoTDeviceRetrieveValidation,
	IoTDeviceStatusValidation,
	IoTDeviceUpdateValidation
} from '@de./types/iotsp/device'
import { qs, type Http, type Res } from '../../utils'

// ── Devices ───────────────────────────────────────────────────────────────

export default class IoTDevices {
	constructor( private http: Http ){}

	async add( body: IoTDeviceAddValidation['body'] ): Promise<IoTDeviceAddValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceAddValidation['response']>>({
			url: `/iotsp/devices/add`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: IoTDeviceUpdateValidation['body'] ): Promise<IoTDeviceUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceUpdateValidation['response']>>({
			url: `/iotsp/devices/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: IoTDeviceListValidation['querystring'] ): Promise<IoTDeviceListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceListValidation['response']>>({
			url: `/iotsp/devices${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async find( querystring: IoTDeviceFindValidation['querystring'] ): Promise<IoTDeviceFindValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceFindValidation['response']>>({
			url: `/iotsp/devices/find${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( id: string ): Promise<IoTDeviceRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceRetrieveValidation['response']>>({
			url: `/iotsp/devices/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async enable( id: string ): Promise<IoTDeviceStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceStatusValidation['response']>>({
			url: `/iotsp/devices/${id}/enable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}
 
	async disable( id: string ): Promise<IoTDeviceStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceStatusValidation['response']>>({
			url: `/iotsp/devices/${id}/disable`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async delete( id: string ): Promise<IoTDeviceRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<IoTDeviceRemoveValidation['response']>>({
			url: `/iotsp/devices/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
