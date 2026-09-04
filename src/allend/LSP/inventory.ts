import type {
	LSPInventoryCreateValidation,
	LSPInventoryFetchValidation,
	LSPInventoryRetrieveValidation,
	LSPInventoryUpdateValidation,
	LSPInventoryAdjustValidation,
	LSPInventoryRemoveValidation
} from '@de./types/inventory'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Facility Inventory ──────────────────────────────────────────────────────
//
// Dual-mounted under hubs and warehouses: /lsp/{hubs|warehouses}/:id/inventory
// Instantiated per facility segment; each method takes the facility id.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSPFacilityInventory {
	constructor( private http: Http, private segment: 'hubs' | 'warehouses' ){}

	async create( facilityId: string, body: LSPInventoryCreateValidation['body'] ): Promise<LSPInventoryCreateValidation['response']> {
		return await this.http.request<LSPInventoryCreateValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/create`,
			method: 'POST',
			body
		})
	}

	async list( facilityId: string, querystring?: LSPInventoryFetchValidation['querystring'] ): Promise<LSPInventoryFetchValidation['response']> {
		return await this.http.request<LSPInventoryFetchValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/inventory${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( facilityId: string, itemId: string ): Promise<LSPInventoryRetrieveValidation['response']> {
		return await this.http.request<LSPInventoryRetrieveValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'GET'
		})
	}

	async update( facilityId: string, itemId: string, body: LSPInventoryUpdateValidation['body'] ): Promise<LSPInventoryUpdateValidation['response']> {
		return await this.http.request<LSPInventoryUpdateValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'PATCH',
			body
		})
	}

	async adjust( facilityId: string, itemId: string, body: LSPInventoryAdjustValidation['body'] ): Promise<LSPInventoryAdjustValidation['response']> {
		return await this.http.request<LSPInventoryAdjustValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}/adjust`,
			method: 'POST',
			body
		})
	}

	async remove( facilityId: string, itemId: string ): Promise<LSPInventoryRemoveValidation['response']> {
		return await this.http.request<LSPInventoryRemoveValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'DELETE'
		})
	}
}
