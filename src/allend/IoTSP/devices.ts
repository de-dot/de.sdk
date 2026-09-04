import type {
	IoTDeviceAddValidation,
	IoTDeviceFindValidation,
	IoTDeviceListValidation,
	IoTDeviceRemoveValidation,
	IoTDeviceRetrieveValidation,
	IoTDeviceStatusValidation,
	IoTDeviceUpdateValidation
} from '@de./types/iotsp/device'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── Devices ───────────────────────────────────────────────────────────────

export default class IoTDevices {
	constructor( private http: Http ){}

	async add( body: IoTDeviceAddValidation['body'] ): Promise<IoTDeviceAddValidation['response']> {
		return await this.http.request<IoTDeviceAddValidation['response']>({
			url: `/iotsp/devices/add`,
			method: 'POST',
			body
		})
	}

	async update( id: string, body: IoTDeviceUpdateValidation['body'] ): Promise<IoTDeviceUpdateValidation['response']> {
		return await this.http.request<IoTDeviceUpdateValidation['response']>({
			url: `/iotsp/devices/${id}`,
			method: 'PATCH',
			body
		})
	}

	async list( querystring?: IoTDeviceListValidation['querystring'] ): Promise<IoTDeviceListValidation['response']> {
		return await this.http.request<IoTDeviceListValidation['response']>({
			url: `/iotsp/devices${qs( querystring )}`,
			method: 'GET'
		})
	}

	async find( querystring: IoTDeviceFindValidation['querystring'] ): Promise<IoTDeviceFindValidation['response']> {
		return await this.http.request<IoTDeviceFindValidation['response']>({
			url: `/iotsp/devices/find${qs( querystring )}`,
			method: 'GET'
		})
	}

	async get( id: string ): Promise<IoTDeviceRetrieveValidation['response']> {
		return await this.http.request<IoTDeviceRetrieveValidation['response']>({
			url: `/iotsp/devices/${id}`,
			method: 'GET'
		})
	}

	async enable( id: string ): Promise<IoTDeviceStatusValidation['response']> {
		return await this.http.request<IoTDeviceStatusValidation['response']>({
			url: `/iotsp/devices/${id}/enable`,
			method: 'PATCH'
		})
	}
 
	async disable( id: string ): Promise<IoTDeviceStatusValidation['response']> {
		return await this.http.request<IoTDeviceStatusValidation['response']>({
			url: `/iotsp/devices/${id}/disable`,
			method: 'PATCH'
		})
	}

	async delete( id: string ): Promise<IoTDeviceRemoveValidation['response']> {
		return await this.http.request<IoTDeviceRemoveValidation['response']>({
			url: `/iotsp/devices/${id}`,
			method: 'DELETE'
		})
	}
}
