import type { APIResponseBase } from '@de./types'
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

	async create( body: LSPPodCreateValidation['body'] ): Promise<LSPPodCreateValidation['response']> {
		return await this.http.request<LSPPodCreateValidation['response']>({
			url: '/lsp/pods',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPPodListValidation['querystring'] ): Promise<LSPPodListValidation['response']> {
		return await this.http.request<LSPPodListValidation['response']>({
			url: `/lsp/pods${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<LSPPodRetrieveValidation['response']> {
		return await this.http.request<LSPPodRetrieveValidation['response']>({
			url: `/lsp/pods/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPPodUpdateValidation['body'] ): Promise<LSPPodUpdateValidation['response']> {
		return await this.http.request<LSPPodUpdateValidation['response']>({
			url: `/lsp/pods/${id}`,
			method: 'PATCH',
			body
		})
	}

	async updateStatus( id: string, body: LSPPodUpdateStatusValidation['body'] ): Promise<LSPPodUpdateStatusValidation['response']> {
		return await this.http.request<LSPPodUpdateStatusValidation['response']>({
			url: `/lsp/pods/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/pods/${id}`,
			method: 'DELETE'
		})
	}

	async registerAsConsolidationPoint( id: string, body: LSPPodRegisterCpointValidation['body'] ): Promise<LSPPodRegisterCpointValidation['response']> {
		return await this.http.request<LSPPodRegisterCpointValidation['response']>({
			url: `/lsp/pods/${id}/as/consolidation-point`,
			method: 'POST',
			body
		})
	}

	async registerAsGraphNode( id: string, body: LSPPodRegisterGraphNodeValidation['body'] ): Promise<LSPPodRegisterGraphNodeValidation['response']> {
		return await this.http.request<LSPPodRegisterGraphNodeValidation['response']>({
			url: `/lsp/pods/${id}/as/graph-node`,
			method: 'POST',
			body
		})
	}

	// ── Compartments ──────────────────────────────────────────────────────────

	async listCompartments( podId: string, querystring?: LSPPodCompartmentListValidation['querystring'] ): Promise<LSPPodCompartmentListValidation['response']> {
		return await this.http.request<LSPPodCompartmentListValidation['response']>({
			url: `/lsp/pods/${podId}/compartments${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieveCompartment( podId: string, id: string ): Promise<LSPPodCompartmentRetrieveValidation['response']> {
		return await this.http.request<LSPPodCompartmentRetrieveValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}`,
			method: 'GET'
		})
	}

	async reserveCompartment( podId: string, id: string, body: LSPPodCompartmentReserveValidation['body'] ): Promise<LSPPodCompartmentReserveValidation['response']> {
		return await this.http.request<LSPPodCompartmentReserveValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}/reserve`,
			method: 'POST',
			body
		})
	}

	async loadCompartment( podId: string, id: string ): Promise<LSPPodCompartmentLoadValidation['response']> {
		return await this.http.request<LSPPodCompartmentLoadValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}/load`,
			method: 'POST'
		})
	}

	async unlockCompartment( podId: string, id: string ): Promise<LSPPodCompartmentUnlockValidation['response']> {
		return await this.http.request<LSPPodCompartmentUnlockValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}/unlock`,
			method: 'POST'
		})
	}

	async collectCompartment( podId: string, id: string, body: LSPPodCompartmentCollectValidation['body'] ): Promise<LSPPodCompartmentCollectValidation['response']> {
		return await this.http.request<LSPPodCompartmentCollectValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}/collect`,
			method: 'POST',
			body
		})
	}

	async releaseCompartment( podId: string, id: string, body: LSPPodCompartmentReleaseValidation['body'] ): Promise<LSPPodCompartmentReleaseValidation['response']> {
		return await this.http.request<LSPPodCompartmentReleaseValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}/release`,
			method: 'POST',
			body
		})
	}

	async markCompartmentFaulty( podId: string, id: string, body: LSPPodCompartmentMarkFaultyValidation['body'] ): Promise<LSPPodCompartmentMarkFaultyValidation['response']> {
		return await this.http.request<LSPPodCompartmentMarkFaultyValidation['response']>({
			url: `/lsp/pods/${podId}/compartments/${id}/faulty`,
			method: 'POST',
			body
		})
	}

	// ── Drone ─────────────────────────────────────────────────────────────────

	async openDroneHatch( podId: string, id: string ): Promise<LSPPodDroneOpenHatchValidation['response']> {
		return await this.http.request<LSPPodDroneOpenHatchValidation['response']>({
			url: `/lsp/pods/${podId}/drone/${id}/hatch/open`,
			method: 'POST'
		})
	}

	async closeDroneHatch( podId: string, id: string ): Promise<LSPPodDroneCloseHatchValidation['response']> {
		return await this.http.request<LSPPodDroneCloseHatchValidation['response']>({
			url: `/lsp/pods/${podId}/drone/${id}/hatch/close`,
			method: 'POST'
		})
	}

	async confirmDroneDeposit( podId: string, id: string, body: LSPPodDroneConfirmDepositValidation['body'] ): Promise<LSPPodDroneConfirmDepositValidation['response']> {
		return await this.http.request<LSPPodDroneConfirmDepositValidation['response']>({
			url: `/lsp/pods/${podId}/drone/${id}/deposit/confirm`,
			method: 'POST',
			body
		})
	}
}
