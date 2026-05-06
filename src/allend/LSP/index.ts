import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'
import LSPAgents from './agents'
import LSPCarriers from './carriers'
import LSPFleets from './fleets'
import LSPHubs from './hubs'
import LSPWarehouses from './warehouses'
import LSPPods from './pods'
import LSPOrders from './orders'
import LSPPricing from './pricing'
import LSPOperations from './operations'
import Shared, { SharedBuckets } from '../Shared'

export type LSPConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// LSP: Logistics Service Provider API — de.arch /lsp routes.
// Covers agents, orders, coverage, inventory, pricing, services, and more.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSP extends AccessManager {
	shared: Shared
	buckets: SharedBuckets
	agents: LSPAgents
	carriers: LSPCarriers
	fleets: LSPFleets
	hubs: LSPHubs
	warehouses: LSPWarehouses
	pods: LSPPods
	orders: LSPOrders
	pricing: LSPPricing
	operations: LSPOperations

	constructor( config: LSPConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/lsp')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin
		}
		super( access, 'API' )

		this.shared     = new Shared( this, 'lsp' )
		this.buckets    = new SharedBuckets( this, 'lsp' )
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
