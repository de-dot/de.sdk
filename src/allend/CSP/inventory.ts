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

	async syncCatalog( body: CSPInventorySyncCatalogValidation['body'] ): Promise<CSPInventorySyncCatalogValidation['response']> {
		return await this.http.request<CSPInventorySyncCatalogValidation['response']>({
			url: '/csp/inventory/sync',
			method: 'POST',
			body
		})
	}

	async checkAvailability( body: CSPInventoryCheckAvailabilityValidation['body'] ): Promise<CSPInventoryCheckAvailabilityValidation['response']> {
		return await this.http.request<CSPInventoryCheckAvailabilityValidation['response']>({
			url: '/csp/inventory/availability',
			method: 'POST',
			body
		})
	}

	async bulkPush( body: CSPInventoryBulkPushValidation['body'] ): Promise<CSPInventoryBulkPushValidation['response']> {
		return await this.http.request<CSPInventoryBulkPushValidation['response']>({
			url: '/csp/inventory/bulk/push',
			method: 'POST',
			body
		})
	}

	async bulkPull( body: CSPInventoryBulkPullValidation['body'] ): Promise<CSPInventoryBulkPullValidation['response']> {
		return await this.http.request<CSPInventoryBulkPullValidation['response']>({
			url: '/csp/inventory/bulk/pull',
			method: 'POST',
			body
		})
	}

	async getSyncStatus( syncId: string ): Promise<CSPInventoryGetSyncStatusValidation['response']> {
		return await this.http.request<CSPInventoryGetSyncStatusValidation['response']>({
			url: `/csp/inventory/sync/${syncId}`,
			method: 'GET'
		})
	}

	async reserve( body: CSPInventoryReserveValidation['body'] ): Promise<CSPInventoryReserveValidation['response']> {
		return await this.http.request<CSPInventoryReserveValidation['response']>({
			url: '/csp/inventory/reservations',
			method: 'POST',
			body
		})
	}

	async commit( body: CSPInventoryCommitValidation['body'] ): Promise<CSPInventoryCommitValidation['response']> {
		return await this.http.request<CSPInventoryCommitValidation['response']>({
			url: '/csp/inventory/reservations/commit',
			method: 'POST',
			body
		})
	}

	async release( body: CSPInventoryReleaseValidation['body'] ): Promise<CSPInventoryReleaseValidation['response']> {
		return await this.http.request<CSPInventoryReleaseValidation['response']>({
			url: '/csp/inventory/reservations/release',
			method: 'POST',
			body
		})
	}

	async listReservations( querystring?: CSPInventoryListReservationsValidation['querystring'] ): Promise<CSPInventoryListReservationsValidation['response']> {
		return await this.http.request<CSPInventoryListReservationsValidation['response']>({
			url: `/csp/inventory/reservations${qs( querystring )}`,
			method: 'GET'
		})
	}

	async getReservation( id: string ): Promise<CSPInventoryGetReservationValidation['response']> {
		return await this.http.request<CSPInventoryGetReservationValidation['response']>({
			url: `/csp/inventory/reservations/${id}`,
			method: 'GET'
		})
	}
}
