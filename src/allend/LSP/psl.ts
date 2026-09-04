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
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Facility PSL (Pick/Sort/Locations) ──────────────────────────────────────
//
// Dual-mounted under hubs and warehouses: /lsp/{hubs|warehouses}/:id/psl
// Instantiated per facility segment; each method takes the facility id.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class LSPFacilityPSL {
	constructor( private http: Http, private segment: 'hubs' | 'warehouses' ){}

	async create( facilityId: string, body: LSPPSLCreateValidation['body'] ): Promise<LSPPSLCreateValidation['response']> {
		return await this.http.request<LSPPSLCreateValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/create`,
			method: 'POST',
			body
		})
	}

	async list( facilityId: string, querystring?: LSPPSLFetchValidation['querystring'] ): Promise<LSPPSLFetchValidation['response']> {
		return await this.http.request<LSPPSLFetchValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( facilityId: string, locationId: string ): Promise<LSPPSLRetrieveValidation['response']> {
		return await this.http.request<LSPPSLRetrieveValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}`,
			method: 'GET'
		})
	}

	async update( facilityId: string, locationId: string, body: LSPPSLUpdateValidation['body'] ): Promise<LSPPSLUpdateValidation['response']> {
		return await this.http.request<LSPPSLUpdateValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}`,
			method: 'PATCH',
			body
		})
	}

	async updateStatus( facilityId: string, locationId: string, body: LSPPSLUpdateStatusValidation['body'] ): Promise<LSPPSLUpdateStatusValidation['response']> {
		return await this.http.request<LSPPSLUpdateStatusValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}/status`,
			method: 'PATCH',
			body
		})
	}

	async hierarchy( facilityId: string, locationId: string ): Promise<LSPPSLHierarchyValidation['response']> {
		return await this.http.request<LSPPSLHierarchyValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}/hierarchy`,
			method: 'GET'
		})
	}

	async available( facilityId: string, querystring?: LSPPSLAvailableValidation['querystring'] ): Promise<LSPPSLAvailableValidation['response']> {
		return await this.http.request<LSPPSLAvailableValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/query/available${qs( querystring )}`,
			method: 'GET'
		})
	}

	async remove( facilityId: string, locationId: string ): Promise<LSPPSLRemoveValidation['response']> {
		return await this.http.request<LSPPSLRemoveValidation['response']>({
			url: `/lsp/${this.segment}/${facilityId}/psl/${locationId}`,
			method: 'DELETE'
		})
	}
}
