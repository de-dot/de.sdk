import type {
	UtilSearchNearbyValidation,
	UtilSearchInBoundsValidation,
	UtilFindNearestValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Nearby ───────────────────────────────────────────────────────────────────

export class UtilitiesNearby {
	constructor( private http: Http ){}

	async search( body: UtilSearchNearbyValidation['body'] ): Promise<UtilSearchNearbyValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilSearchNearbyValidation['response']>>({
			url: '/utilities/nearby/search',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async searchInBounds( body: UtilSearchInBoundsValidation['body'] ): Promise<UtilSearchInBoundsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilSearchInBoundsValidation['response']>>({
			url: '/utilities/nearby/bounds',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async findNearest( body: UtilFindNearestValidation['body'] ): Promise<UtilFindNearestValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilFindNearestValidation['response']>>({
			url: '/utilities/nearby/nearest',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
