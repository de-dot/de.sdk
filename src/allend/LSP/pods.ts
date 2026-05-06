import type {
	LSPPodCreateValidation,
	LSPPodRetrieveValidation,
	LSPPodListValidation,
	LSPPodUpdateValidation,
	LSPPodUpdateStatusValidation,
	LSPPodRemoveValidation,
	LSPPodRegisterCpointValidation,
	LSPPodRegisterGraphNodeValidation,
	LSPPodCompartmentListValidation,
	LSPPodCompartmentRetrieveValidation,
	LSPPodCompartmentReserveValidation,
	LSPPodCompartmentCollectValidation,
	LSPPodCompartmentReleaseValidation,
	LSPPodCompartmentMarkFaultyValidation,
	LSPPodDroneConfirmDepositValidation
} from '@de./types/lsp/pod'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Pods ──────────────────────────────────────────────────────────────────

export default class LSPPods {
	constructor( private http: Http ){}

	async create( body: LSPPodCreateValidation['body'] ): Promise<LSPPodCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodCreateValidation['response']>>({
			url: '/lsp/pods',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPPodListValidation['querystring'] ): Promise<LSPPodListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodListValidation['response']>>({
			url: `/lsp/pods${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<LSPPodRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodRetrieveValidation['response']>>({
			url: `/lsp/pods/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPPodUpdateValidation['body'] ): Promise<LSPPodUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodUpdateValidation['response']>>({
			url: `/lsp/pods/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPPodUpdateStatusValidation['body'] ): Promise<LSPPodUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodUpdateStatusValidation['response']>>({
			url: `/lsp/pods/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	async registerAsConsolidationPoint( id: string, body: LSPPodRegisterCpointValidation['body'] ): Promise<LSPPodRegisterCpointValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodRegisterCpointValidation['response']>>({
			url: `/lsp/pods/${id}/as/consolidation-point`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async registerAsGraphNode( id: string, body: LSPPodRegisterGraphNodeValidation['body'] ): Promise<LSPPodRegisterGraphNodeValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPodRegisterGraphNodeValidation['response']>>({
			url: `/lsp/pods/${id}/as/graph-node`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Compartments ──────────────────────────────────────────────────────────

	async listCompartments( podId: string, querystring?: LSPPodCompartmentListValidation['querystring'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveCompartment( podId: string, id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async reserveCompartment( podId: string, id: string, body: LSPPodCompartmentReserveValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}/reserve`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async loadCompartment( podId: string, id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}/load`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async unlockCompartment( podId: string, id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}/unlock`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async collectCompartment( podId: string, id: string, body: LSPPodCompartmentCollectValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}/collect`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async releaseCompartment( podId: string, id: string, body: LSPPodCompartmentReleaseValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}/release`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async markCompartmentFaulty( podId: string, id: string, body: LSPPodCompartmentMarkFaultyValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/compartments/${id}/faulty`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Drone ─────────────────────────────────────────────────────────────────

	async openDroneHatch( podId: string, id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/drone/${id}/hatch/open`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async closeDroneHatch( podId: string, id: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/drone/${id}/hatch/close`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async confirmDroneDeposit( podId: string, id: string, body: LSPPodDroneConfirmDepositValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/pods/${podId}/drone/${id}/deposit/confirm`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
