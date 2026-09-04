import type {
	UtilDistanceValidation,
	UtilBatchDistanceMatrixValidation,
	UtilSavingsMatrixValidation,
	UtilAssignZoneValidation,
	UtilETAValidation,
	UtilBatchGeocodeValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Common Utilities ─────────────────────────────────────────────────────────

export class UtilitiesCommon {
	constructor( private http: Http ){}

	async distance( body: UtilDistanceValidation['body'] ): Promise<Data<UtilDistanceValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilDistanceValidation['response']>>>({
			url: '/utilities/distance',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async distanceMatrix( body: UtilBatchDistanceMatrixValidation['body'] ): Promise<Data<UtilBatchDistanceMatrixValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilBatchDistanceMatrixValidation['response']>>>({
			url: '/utilities/distance/matrix',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async savingsMatrix( body: UtilSavingsMatrixValidation['body'] ): Promise<Data<UtilSavingsMatrixValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilSavingsMatrixValidation['response']>>>({
			url: '/utilities/distance/savings',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignZone( body: UtilAssignZoneValidation['body'] ): Promise<Data<UtilAssignZoneValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilAssignZoneValidation['response']>>>({
			url: '/utilities/zone',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async eta( body: UtilETAValidation['body'] ): Promise<Data<UtilETAValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilETAValidation['response']>>>({
			url: '/utilities/eta',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async batchGeocode( body: UtilBatchGeocodeValidation['body'] ): Promise<Data<UtilBatchGeocodeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilBatchGeocodeValidation['response']>>>({
			url: '/utilities/geocode/batch',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
