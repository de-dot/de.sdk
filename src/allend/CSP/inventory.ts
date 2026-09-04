import type {
	CSPInventorySyncCatalogValidation,
	CSPInventoryCheckAvailabilityValidation,
	CSPInventoryBulkPushValidation,
	CSPInventoryBulkPullValidation,
	CSPInventoryGetSyncStatusValidation,
	CSPInventoryReserveValidation,
	CSPInventoryCommitValidation,
	CSPInventoryReleaseValidation,
	CSPInventoryListReservationsValidation,
	CSPInventoryGetReservationValidation
} from '@de./types/csp/inventory'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── CSP Inventory ────────────────────────────────────────────────────────

export default class CSPInventory {
	constructor( private http: Http ){}

	async syncCatalog( body: CSPInventorySyncCatalogValidation['body'] ): Promise<Data<CSPInventorySyncCatalogValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventorySyncCatalogValidation['response']>>>({
			url: '/csp/inventory/sync',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkAvailability( body: CSPInventoryCheckAvailabilityValidation['body'] ): Promise<Data<CSPInventoryCheckAvailabilityValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryCheckAvailabilityValidation['response']>>>({
			url: '/csp/inventory/availability',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkPush( body: CSPInventoryBulkPushValidation['body'] ): Promise<Data<CSPInventoryBulkPushValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryBulkPushValidation['response']>>>({
			url: '/csp/inventory/bulk/push',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkPull( body: CSPInventoryBulkPullValidation['body'] ): Promise<Data<CSPInventoryBulkPullValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryBulkPullValidation['response']>>>({
			url: '/csp/inventory/bulk/pull',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getSyncStatus( syncId: string ): Promise<Data<CSPInventoryGetSyncStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryGetSyncStatusValidation['response']>>>({
			url: `/csp/inventory/sync/${syncId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async reserve( body: CSPInventoryReserveValidation['body'] ): Promise<Data<CSPInventoryReserveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryReserveValidation['response']>>>({
			url: '/csp/inventory/reservations',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async commit( body: CSPInventoryCommitValidation['body'] ): Promise<Data<CSPInventoryCommitValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryCommitValidation['response']>>>({
			url: '/csp/inventory/reservations/commit',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async release( body: CSPInventoryReleaseValidation['body'] ): Promise<Data<CSPInventoryReleaseValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryReleaseValidation['response']>>>({
			url: '/csp/inventory/reservations/release',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listReservations( querystring?: CSPInventoryListReservationsValidation['querystring'] ): Promise<Data<CSPInventoryListReservationsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryListReservationsValidation['response']>>>({
			url: `/csp/inventory/reservations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getReservation( id: string ): Promise<Data<CSPInventoryGetReservationValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<CSPInventoryGetReservationValidation['response']>>>({
			url: `/csp/inventory/reservations/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
