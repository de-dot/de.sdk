import type {
	UtilDeliveryFeesValidation,
	UtilTransportFareValidation,
	UtilRideFareValidation,
	UtilCrossBorderFareValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Fares ────────────────────────────────────────────────────────────────────

export class UtilitiesFares {
	constructor( private http: Http ){}

	async deliveryFees( body: UtilDeliveryFeesValidation['body'] ): Promise<UtilDeliveryFeesValidation['response']> {
		return await this.http.request<UtilDeliveryFeesValidation['response']>({
			url: '/utilities/fares/delivery',
			method: 'POST',
			body
		})
	}

	async transportFare( body: UtilTransportFareValidation['body'] ): Promise<UtilTransportFareValidation['response']> {
		return await this.http.request<UtilTransportFareValidation['response']>({
			url: '/utilities/fares/transport',
			method: 'POST',
			body
		})
	}

	async rideFare( body: UtilRideFareValidation['body'] ): Promise<UtilRideFareValidation['response']> {
		return await this.http.request<UtilRideFareValidation['response']>({
			url: '/utilities/fares/ride',
			method: 'POST',
			body
		})
	}

	async crossBorderFare( body: UtilCrossBorderFareValidation['body'] ): Promise<UtilCrossBorderFareValidation['response']> {
		return await this.http.request<UtilCrossBorderFareValidation['response']>({
			url: '/utilities/fares/crossborder',
			method: 'POST',
			body
		})
	}
}
