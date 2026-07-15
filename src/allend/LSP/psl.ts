import type {
	LSPPSLCreateValidation,
	LSPPSLFetchValidation,
	LSPPSLRetrieveValidation,
	LSPPSLUpdateValidation,
	LSPPSLUpdateStatusValidation,
	LSPPSLHierarchyValidation,
	LSPPSLAvailableValidation,
	LSPPSLRemoveValidation
} from '@de./types/lsp/psl'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Facility PSL (Pick/Sort/Locations) ──────────────────────────────────────
//
// Dual-mounted under hubs and warehouses: /lsp/{hubs|warehouses}/:id/psl
// Instantiated per facility segment; each method takes the facility id.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSPFacilityPSL {
	constructor( private http: Http, private segment: 'hubs' | 'warehouses' ){}

	async create( facilityId: string, body: LSPPSLCreateValidation['body'] ): Promise<LSPPSLCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLCreateValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/create`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( facilityId: string, querystring?: LSPPSLFetchValidation['querystring'] ): Promise<LSPPSLFetchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLFetchValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( facilityId: string, locationId: string ): Promise<LSPPSLRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLRetrieveValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( facilityId: string, locationId: string, body: LSPPSLUpdateValidation['body'] ): Promise<LSPPSLUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLUpdateValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( facilityId: string, locationId: string, body: LSPPSLUpdateStatusValidation['body'] ): Promise<LSPPSLUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLUpdateStatusValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async hierarchy( facilityId: string, locationId: string ): Promise<LSPPSLHierarchyValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLHierarchyValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}/hierarchy`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async available( facilityId: string, querystring?: LSPPSLAvailableValidation['querystring'] ): Promise<LSPPSLAvailableValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLAvailableValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/query/available${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( facilityId: string, locationId: string ): Promise<LSPPSLRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPSLRemoveValidation['response']>>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
