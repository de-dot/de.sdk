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

	async distance( body: UtilDistanceValidation['body'] ): Promise<UtilDistanceValidation['response']> {
		return await this.http.request<UtilDistanceValidation['response']>({
			url: '/utilities/distance',
			method: 'POST',
			body
		})
	}

	async distanceMatrix( body: UtilBatchDistanceMatrixValidation['body'] ): Promise<UtilBatchDistanceMatrixValidation['response']> {
		return await this.http.request<UtilBatchDistanceMatrixValidation['response']>({
			url: '/utilities/distance/matrix',
			method: 'POST',
			body
		})
	}

	async savingsMatrix( body: UtilSavingsMatrixValidation['body'] ): Promise<UtilSavingsMatrixValidation['response']> {
		return await this.http.request<UtilSavingsMatrixValidation['response']>({
			url: '/utilities/distance/savings',
			method: 'POST',
			body
		})
	}

	async assignZone( body: UtilAssignZoneValidation['body'] ): Promise<UtilAssignZoneValidation['response']> {
		return await this.http.request<UtilAssignZoneValidation['response']>({
			url: '/utilities/zone',
			method: 'POST',
			body
		})
	}

	async eta( body: UtilETAValidation['body'] ): Promise<UtilETAValidation['response']> {
		return await this.http.request<UtilETAValidation['response']>({
			url: '/utilities/eta',
			method: 'POST',
			body
		})
	}

	async batchGeocode( body: UtilBatchGeocodeValidation['body'] ): Promise<UtilBatchGeocodeValidation['response']> {
		return await this.http.request<UtilBatchGeocodeValidation['response']>({
			url: '/utilities/geocode/batch',
			method: 'POST',
			body
		})
	}
}
