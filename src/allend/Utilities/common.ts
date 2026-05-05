import type {
	UtilDistanceValidation,
	UtilBatchDistanceMatrixValidation,
	UtilSavingsMatrixValidation,
	UtilAssignZoneValidation,
	UtilETAValidation,
	UtilBatchGeocodeValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Common Utilities ─────────────────────────────────────────────────────────

export class UtilitiesCommon {
	constructor( private http: Http ){}

	async distance( body: UtilDistanceValidation['body'] ): Promise<UtilDistanceValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilDistanceValidation['response']>>({
			url: '/utilities/distance',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async distanceMatrix( body: UtilBatchDistanceMatrixValidation['body'] ): Promise<UtilBatchDistanceMatrixValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilBatchDistanceMatrixValidation['response']>>({
			url: '/utilities/distance/matrix',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async savingsMatrix( body: UtilSavingsMatrixValidation['body'] ): Promise<UtilSavingsMatrixValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilSavingsMatrixValidation['response']>>({
			url: '/utilities/distance/savings',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async assignZone( body: UtilAssignZoneValidation['body'] ): Promise<UtilAssignZoneValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilAssignZoneValidation['response']>>({
			url: '/utilities/zone',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async eta( body: UtilETAValidation['body'] ): Promise<UtilETAValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilETAValidation['response']>>({
			url: '/utilities/eta',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async batchGeocode( body: UtilBatchGeocodeValidation['body'] ): Promise<UtilBatchGeocodeValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilBatchGeocodeValidation['response']>>({
			url: '/utilities/geocode/batch',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
