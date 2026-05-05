import type {
	UtilDeliveryFeesValidation,
	UtilTransportFareValidation,
	UtilRideFareValidation,
	UtilCrossBorderFareValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Fares ────────────────────────────────────────────────────────────────────

export class UtilitiesFares {
	constructor( private http: Http ){}

	async deliveryFees( body: UtilDeliveryFeesValidation['body'] ): Promise<UtilDeliveryFeesValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilDeliveryFeesValidation['response']>>({
			url: '/utilities/fares/delivery',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async transportFare( body: UtilTransportFareValidation['body'] ): Promise<UtilTransportFareValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilTransportFareValidation['response']>>({
			url: '/utilities/fares/transport',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rideFare( body: UtilRideFareValidation['body'] ): Promise<UtilRideFareValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilRideFareValidation['response']>>({
			url: '/utilities/fares/ride',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async crossBorderFare( body: UtilCrossBorderFareValidation['body'] ): Promise<UtilCrossBorderFareValidation['response']> {
		const { error, message, data } = await this.http.request<Res<UtilCrossBorderFareValidation['response']>>({
			url: '/utilities/fares/crossborder',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
