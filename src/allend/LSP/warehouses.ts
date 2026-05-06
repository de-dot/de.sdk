import type {
	LSPWarehouseCreateValidation,
	LSPWarehouseRetrieveValidation,
	LSPWarehouseListValidation,
	LSPWarehouseUpdateValidation,
	LSPWarehouseUpdateStatusValidation,
	LSPWarehouseRemoveValidation,
	LSPWarehouseGetCapabilityValidation,
	LSPWarehouseSetCapabilityValidation,
	LSPWarehouseGetCapacityValidation,
	LSPWarehouseSetCapacityValidation
} from '@de./types/lsp/warehouse'
import { qs, type Http, type Res } from '../../utils'

// ── LSP Warehouses ────────────────────────────────────────────────────────────

export default class LSPWarehouses {
	constructor( private http: Http ){}

	async create( body: LSPWarehouseCreateValidation['body'] ): Promise<LSPWarehouseCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseCreateValidation['response']>>({
			url: '/lsp/warehouses/create',
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: LSPWarehouseListValidation['querystring'] ): Promise<LSPWarehouseListValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseListValidation['response']>>({
			url: `/lsp/warehouses${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<LSPWarehouseRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseRetrieveValidation['response']>>({
			url: `/lsp/warehouses/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: LSPWarehouseUpdateValidation['body'] ): Promise<LSPWarehouseUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseUpdateValidation['response']>>({
			url: `/lsp/warehouses/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async updateStatus( id: string, body: LSPWarehouseUpdateStatusValidation['body'] ): Promise<LSPWarehouseUpdateStatusValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseUpdateStatusValidation['response']>>({
			url: `/lsp/warehouses/${id}/status`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<void> {
		const { error, message } = await this.http.request<Res<unknown>>({
			url: `/lsp/warehouses/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
	}

	async bindPricing( id: string, action: 'add' | 'remove', body: { id?: string, code?: string } ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/warehouses/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────

	async getCapability( id: string, type: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/warehouses/${id}/capabilities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapability( id: string, type: string, body: LSPWarehouseSetCapabilityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/warehouses/${id}/capabilities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────

	async getCapacity( id: string, type: string ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/warehouses/${id}/capacities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapacity( id: string, type: string, body: LSPWarehouseSetCapacityValidation['body'] ): Promise<unknown> {
		const { error, message, data } = await this.http.request<Res<unknown>>({
			url: `/lsp/warehouses/${id}/capacities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
