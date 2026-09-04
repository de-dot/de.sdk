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

	async create( facilityId: string, body: LSPInventoryCreateValidation['body'] ): Promise<Data<LSPInventoryCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInventoryCreateValidation['response']>>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( facilityId: string, querystring?: LSPInventoryFetchValidation['querystring'] ): Promise<Data<LSPInventoryFetchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInventoryFetchValidation['response']>>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( facilityId: string, itemId: string ): Promise<Data<LSPInventoryRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInventoryRetrieveValidation['response']>>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( facilityId: string, itemId: string, body: LSPInventoryUpdateValidation['body'] ): Promise<Data<LSPInventoryUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInventoryUpdateValidation['response']>>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async adjust( facilityId: string, itemId: string, body: LSPInventoryAdjustValidation['body'] ): Promise<Data<LSPInventoryAdjustValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInventoryAdjustValidation['response']>>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}/adjust`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( facilityId: string, itemId: string ): Promise<Data<LSPInventoryRemoveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPInventoryRemoveValidation['response']>>>({
			url: `/lsp/${this.segment}/${facilityId}/inventory/${itemId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
