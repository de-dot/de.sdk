import type {
	UtilSearchNearbyValidation,
	UtilSearchInBoundsValidation,
	UtilFindNearestValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Nearby ───────────────────────────────────────────────────────────────────

export class UtilitiesNearby {
	constructor( private http: Http ){}

	async search( body: UtilSearchNearbyValidation['body'] ): Promise<UtilSearchNearbyValidation['response']> {
		return await this.http.request<UtilSearchNearbyValidation['response']>({
			url: '/utilities/nearby/search',
			method: 'POST',
			body
		})
	}

	async searchInBounds( body: UtilSearchInBoundsValidation['body'] ): Promise<UtilSearchInBoundsValidation['response']> {
		return await this.http.request<UtilSearchInBoundsValidation['response']>({
			url: '/utilities/nearby/bounds',
			method: 'POST',
			body
		})
	}

	async findNearest( body: UtilFindNearestValidation['body'] ): Promise<UtilFindNearestValidation['response']> {
		return await this.http.request<UtilFindNearestValidation['response']>({
			url: '/utilities/nearby/nearest',
			method: 'POST',
			body
		})
	}
}
