import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'
import CustomerIntents from './intents'
import CustomerOrders from './orders'
import CustomerRides from './rides'

export type CustomerConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// Customer: Customer Operation Interfaces — de.arch AUX/customer routes.
// Covers intents, orders, and rides.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Customer extends AccessManager {
	intents: CustomerIntents
	orders: CustomerOrders
	rides: CustomerRides

	constructor( config: CustomerConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/aux')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin
		}
		super( access, 'API' )

		this.intents = new CustomerIntents( this )
		this.orders  = new CustomerOrders( this )
		this.rides   = new CustomerRides( this )
	}
}
