import type {
	UtilSearchNearbyValidation,
	UtilSearchInBoundsValidation,
	UtilFindNearestValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Nearby ───────────────────────────────────────────────────────────────────

export class UtilitiesNearby {
	constructor( private http: Http ){}

	async search( body: UtilSearchNearbyValidation['body'] ): Promise<Data<UtilSearchNearbyValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilSearchNearbyValidation['response']>>>({
			url: '/utilities/nearby/search',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async searchInBounds( body: UtilSearchInBoundsValidation['body'] ): Promise<Data<UtilSearchInBoundsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilSearchInBoundsValidation['response']>>>({
			url: '/utilities/nearby/bounds',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async findNearest( body: UtilFindNearestValidation['body'] ): Promise<Data<UtilFindNearestValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilFindNearestValidation['response']>>>({
			url: '/utilities/nearby/nearest',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
