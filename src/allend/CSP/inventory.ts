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
import { qs, type Http, type Res } from '../../utils'

// ── CSP Inventory ────────────────────────────────────────────────────────

export default class CSPInventory {
	constructor( private http: Http ){}

	async syncCatalog( body: CSPInventorySyncCatalogValidation['body'] ): Promise<CSPInventorySyncCatalogValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventorySyncCatalogValidation['response']>>({
			url: '/csp/inventory/sync',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async checkAvailability( body: CSPInventoryCheckAvailabilityValidation['body'] ): Promise<CSPInventoryCheckAvailabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryCheckAvailabilityValidation['response']>>({
			url: '/csp/inventory/availability',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkPush( body: CSPInventoryBulkPushValidation['body'] ): Promise<CSPInventoryBulkPushValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryBulkPushValidation['response']>>({
			url: '/csp/inventory/bulk/push',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async bulkPull( body: CSPInventoryBulkPullValidation['body'] ): Promise<CSPInventoryBulkPullValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryBulkPullValidation['response']>>({
			url: '/csp/inventory/bulk/pull',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async getSyncStatus( syncId: string ): Promise<CSPInventoryGetSyncStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryGetSyncStatusValidation['response']>>({
			url: `/csp/inventory/sync/${syncId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async reserve( body: CSPInventoryReserveValidation['body'] ): Promise<CSPInventoryReserveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryReserveValidation['response']>>({
			url: '/csp/inventory/reservations',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async commit( body: CSPInventoryCommitValidation['body'] ): Promise<CSPInventoryCommitValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryCommitValidation['response']>>({
			url: '/csp/inventory/reservations/commit',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async release( body: CSPInventoryReleaseValidation['body'] ): Promise<CSPInventoryReleaseValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryReleaseValidation['response']>>({
			url: '/csp/inventory/reservations/release',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listReservations( querystring?: CSPInventoryListReservationsValidation['querystring'] ): Promise<CSPInventoryListReservationsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryListReservationsValidation['response']>>({
			url: `/csp/inventory/reservations${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async getReservation( id: string ): Promise<CSPInventoryGetReservationValidation['response']> {
		const { error, message, data } = await this.http.request<Res<CSPInventoryGetReservationValidation['response']>>({
			url: `/csp/inventory/reservations/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
