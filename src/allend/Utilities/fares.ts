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

	async deliveryFees( body: UtilDeliveryFeesValidation['body'] ): Promise<Data<UtilDeliveryFeesValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilDeliveryFeesValidation['response']>>>({
			url: '/utilities/fares/delivery',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async transportFare( body: UtilTransportFareValidation['body'] ): Promise<Data<UtilTransportFareValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilTransportFareValidation['response']>>>({
			url: '/utilities/fares/transport',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async rideFare( body: UtilRideFareValidation['body'] ): Promise<Data<UtilRideFareValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilRideFareValidation['response']>>>({
			url: '/utilities/fares/ride',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async crossBorderFare( body: UtilCrossBorderFareValidation['body'] ): Promise<Data<UtilCrossBorderFareValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<UtilCrossBorderFareValidation['response']>>>({
			url: '/utilities/fares/crossborder',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
