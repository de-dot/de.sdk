import type { AccessOptions } from '../../types/access'
import SharedContextClient from '../Shared/context'
import SharedBuckets from '../Shared/buckets'
import SharedOperators from '../Shared/operators'
import LSPAgents from './agents'
import LSPCarriers from './carriers'
import LSPFleets from './fleets'
import LSPHubs from './hubs'
import LSPWarehouses from './warehouses'
import LSPPods from './pods'
import LSPOrders from './orders'
import LSPPricing from './pricing'
import LSPOperations from './operations'

export type LSPConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
	/** Per-request deadline in ms. See `AccessOptions.timeout`. */
	timeout?: number
	/** Explicit service origin, overriding the env table. See `AccessOptions.baseUrl`. */
	baseUrl?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// LSP: Logistics Service Provider API — de.arch /lsp routes.
// Covers agents, orders, coverage, inventory, pricing, services, and more.
// Shared faqs/users/account/invitation come from SharedContextClient.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSP extends SharedContextClient<'LSP'> {
	readonly buckets:    SharedBuckets
	readonly operators:  SharedOperators<'LSP'>
	readonly agents:     LSPAgents
	readonly carriers:   LSPCarriers
	readonly fleets:     LSPFleets
	readonly hubs:       LSPHubs
	readonly warehouses: LSPWarehouses
	readonly pods:       LSPPods
	readonly orders:     LSPOrders
	readonly pricing:    LSPPricing
	readonly operations: LSPOperations

	constructor( config: LSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/lsp')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin,
			timeout:      config.timeout,
			baseUrl:      config.baseUrl
		}
		super( access, 'LSP' )

		this.buckets    = new SharedBuckets( this, 'LSP' )
		this.operators  = new SharedOperators( this, 'LSP' )
		this.agents     = new LSPAgents( this )
		this.carriers   = new LSPCarriers( this )
		this.fleets     = new LSPFleets( this )
		this.hubs       = new LSPHubs( this )
		this.warehouses = new LSPWarehouses( this )
		this.pods       = new LSPPods( this )
		this.orders     = new LSPOrders( this )
		this.pricing    = new LSPPricing( this )
		this.operations = new LSPOperations( this )
	}
}
