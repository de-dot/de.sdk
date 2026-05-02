import type Core from '../Arch'
import type { Coordinates } from '../../types'

// ─── Input types ──────────────────────────────────────────────────────────────

export type DeliveryContact = {
	type?: string
	reference: string
	phone?: string
	email?: string
}

export type DeliveryLocation = {
	address: string
	coordinates: Coordinates
	contact?: DeliveryContact
	description?: string
}

export type DeliveryPackage = {
	waypointNo?: number
	careLevel?: number
	category?: string
	weight?: number
	note?: string
}

export type DeliveryPickupInput = {
	clientId: string
	from: DeliveryLocation
	to: DeliveryLocation
	packages?: DeliveryPackage[]
	service?: Record<string, any>
}

export type DeliveryResult = {
	intentToken: string
	jrtoken: string
}

// ─────────────────────────────────────────────────────────────────────────────
//
// LAYER 2 — Delivery workflow.
// Composes Core.orders calls into a single "get this from A to B" operation:
//   intent → addWaypoint → addPackage? → initiate
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Delivery {
	constructor( private core: Core ){}

	async pickup({ clientId, from, to, packages, service = {} }: DeliveryPickupInput ): Promise<DeliveryResult> {
		if( !clientId ) throw new Error('<clientId> required for delivery pickup')
		if( !from )     throw new Error('<from> location required')
		if( !to )       throw new Error('<to> location required')

		// 1 — Create intent session
		const intentToken = await this.core.orders.intent( clientId )

		// 2 — Register pickup + dropoff waypoints
		await this.core.orders.addWaypoint([
			{
				no: 1,
				type: 'pickup',
				description: from.description || from.address,
				coordinates: from.coordinates,
				address: from.address,
				contact: from.contact || { type: 'sender', reference: clientId }
			},
			{
				no: 2,
				type: 'dropoff',
				description: to.description || to.address,
				coordinates: to.coordinates,
				address: to.address,
				contact: to.contact || { type: 'receiver', reference: '' }
			}
		], intentToken )

		// 3 — Attach packages when provided
		if( packages?.length ){
			const stamped = packages.map(( pkg, i ) => ({
				...pkg,
				waypointNo: pkg.waypointNo ?? 2 // defaults to dropoff
			}))
			await this.core.orders.addPackage( stamped, intentToken )
		}

		// 4 — Initiate the order and get the job-reference token
		const jrtoken = await this.core.orders.initiate( service, intentToken )

		return { intentToken, jrtoken }
	}
}
