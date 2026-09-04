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
	LSPPodCompartmentLoadValidation,
	LSPPodCompartmentUnlockValidation,
	LSPPodDroneConfirmDepositValidation,
	LSPPodDroneOpenHatchValidation,
	LSPPodDroneCloseHatchValidation
} from '@de./types/lsp/pod'
import { qs, type Http, type Res, type Data } from '../../utils'

// ── LSP Pods ──────────────────────────────────────────────────────────────────

export default class LSPPods {
	constructor( private http: Http ){}

	async create( body: LSPPodCreateValidation['body'] ): Promise<Data<LSPPodCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCreateValidation['response']>>>({
			url: '/lsp/pods',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPPodListValidation['querystring'] ): Promise<Data<LSPPodListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodListValidation['response']>>>({
			url: `/lsp/pods${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<Data<LSPPodRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodRetrieveValidation['response']>>>({
			url: `/lsp/pods/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPPodUpdateValidation['body'] ): Promise<Data<LSPPodUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodUpdateValidation['response']>>>({
			url: `/lsp/pods/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPPodUpdateStatusValidation['body'] ): Promise<Data<LSPPodUpdateStatusValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodUpdateStatusValidation['response']>>>({
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

	async registerAsConsolidationPoint( id: string, body: LSPPodRegisterCpointValidation['body'] ): Promise<Data<LSPPodRegisterCpointValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodRegisterCpointValidation['response']>>>({
			url: `/lsp/pods/${id}/as/consolidation-point`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async registerAsGraphNode( id: string, body: LSPPodRegisterGraphNodeValidation['body'] ): Promise<Data<LSPPodRegisterGraphNodeValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodRegisterGraphNodeValidation['response']>>>({
			url: `/lsp/pods/${id}/as/graph-node`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Compartments ──────────────────────────────────────────────────────────

	async listCompartments( podId: string, querystring?: LSPPodCompartmentListValidation['querystring'] ): Promise<Data<LSPPodCompartmentListValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentListValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieveCompartment( podId: string, id: string ): Promise<Data<LSPPodCompartmentRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentRetrieveValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async reserveCompartment( podId: string, id: string, body: LSPPodCompartmentReserveValidation['body'] ): Promise<Data<LSPPodCompartmentReserveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentReserveValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}/reserve`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async loadCompartment( podId: string, id: string ): Promise<Data<LSPPodCompartmentLoadValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentLoadValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}/load`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async unlockCompartment( podId: string, id: string ): Promise<Data<LSPPodCompartmentUnlockValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentUnlockValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}/unlock`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async collectCompartment( podId: string, id: string, body: LSPPodCompartmentCollectValidation['body'] ): Promise<Data<LSPPodCompartmentCollectValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentCollectValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}/collect`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async releaseCompartment( podId: string, id: string, body: LSPPodCompartmentReleaseValidation['body'] ): Promise<Data<LSPPodCompartmentReleaseValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentReleaseValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}/release`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async markCompartmentFaulty( podId: string, id: string, body: LSPPodCompartmentMarkFaultyValidation['body'] ): Promise<Data<LSPPodCompartmentMarkFaultyValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodCompartmentMarkFaultyValidation['response']>>>({
			url: `/lsp/pods/${podId}/compartments/${id}/faulty`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Drone ─────────────────────────────────────────────────────────────────

	async openDroneHatch( podId: string, id: string ): Promise<Data<LSPPodDroneOpenHatchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodDroneOpenHatchValidation['response']>>>({
			url: `/lsp/pods/${podId}/drone/${id}/hatch/open`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async closeDroneHatch( podId: string, id: string ): Promise<Data<LSPPodDroneCloseHatchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodDroneCloseHatchValidation['response']>>>({
			url: `/lsp/pods/${podId}/drone/${id}/hatch/close`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async confirmDroneDeposit( podId: string, id: string, body: LSPPodDroneConfirmDepositValidation['body'] ): Promise<Data<LSPPodDroneConfirmDepositValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<LSPPodDroneConfirmDepositValidation['response']>>>({
			url: `/lsp/pods/${podId}/drone/${id}/deposit/confirm`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
