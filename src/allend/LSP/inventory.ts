import type {
	LSPInventoryCreateValidation,
	LSPInventoryFetchValidation,
	LSPInventoryRetrieveValidation,
	LSPInventoryUpdateValidation,
	LSPInventoryAdjustValidation,
	LSPInventoryRemoveValidation
} from '@de./types/inventory'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Facility Inventory ──────────────────────────────────────────────────────
//
// Dual-mounted under hubs and warehouses: /lsp/{hubs|warehouses}/:id/inventory
// Instantiated per facility segment; each method takes the facility id.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSPFacilityInventory {
	constructor( private http: Http, private segment: 'hubs' | 'warehouses' ){}

	async create( facilityId: string, body: LSPInventoryCreateValidation['body'] ): Promise<LSPInventoryCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPInventoryCreateValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( facilityId: string, querystring?: LSPInventoryFetchValidation['querystring'] ): Promise<LSPInventoryFetchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPInventoryFetchValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( facilityId: string, itemId: string ): Promise<LSPInventoryRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPInventoryRetrieveValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( facilityId: string, itemId: string, body: LSPInventoryUpdateValidation['body'] ): Promise<LSPInventoryUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPInventoryUpdateValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async adjust( facilityId: string, itemId: string, body: LSPInventoryAdjustValidation['body'] ): Promise<LSPInventoryAdjustValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPInventoryAdjustValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}/adjust`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( facilityId: string, itemId: string ): Promise<LSPInventoryRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPInventoryRemoveValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
