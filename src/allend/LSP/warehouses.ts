import type {
	LSPWarehouseCreateValidation,
	LSPWarehouseRetrieveValidation,
	LSPWarehouseListValidation,
	LSPWarehouseUpdateValidation,
	LSPWarehouseUpdateStatusValidation,
	LSPWarehouseRemoveValidation,
	LSPWarehouseGetStorageCapabilityValidation,
	LSPWarehouseSetStorageCapabilityValidation,
	LSPWarehouseGetPhysicalCapacityValidation,
	LSPWarehouseSetPhysicalCapacityValidation
} from '@de./types/lsp/warehouse'
import type { LSPPricingBindToValidation } from '@de./types/lsp/pricing'
import { qs, type Http, type Res } from '../../utils'
import LSPFacilityPSL from './psl'
import LSPFacilityInventory from './inventory'

// ── LSP Warehouses ────────────────────────────────────────────────────────────

export default class LSPWarehouses {
	psl: LSPFacilityPSL
	inventory: LSPFacilityInventory

	constructor( private http: Http ){
		this.psl = new LSPFacilityPSL( this.http, 'warehouses' )
		this.inventory = new LSPFacilityInventory( this.http, 'warehouses' )
	}

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

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPPricingBindToValidation['response']>>({
			url: `/lsp/warehouses/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capabilities ──────────────────────────────────────────────────────────
	// Generic accessors — representative Validation (Storage) used for typing.

	async getCapability( id: string, type: string ): Promise<LSPWarehouseGetStorageCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseGetStorageCapabilityValidation['response']>>({
			url: `/lsp/warehouses/${id}/capabilities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapability( id: string, type: string, body: LSPWarehouseSetStorageCapabilityValidation['body'] ): Promise<LSPWarehouseSetStorageCapabilityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseSetStorageCapabilityValidation['response']>>({
			url: `/lsp/warehouses/${id}/capabilities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	// ── Capacities ────────────────────────────────────────────────────────────
	// Generic accessors — representative Validation (Physical) used for typing.

	async getCapacity( id: string, type: string ): Promise<LSPWarehouseGetPhysicalCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseGetPhysicalCapacityValidation['response']>>({
			url: `/lsp/warehouses/${id}/capacities/${type}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async setCapacity( id: string, type: string, body: LSPWarehouseSetPhysicalCapacityValidation['body'] ): Promise<LSPWarehouseSetPhysicalCapacityValidation['response']> {
		const { error, message, data } = await this.http.request<Res<LSPWarehouseSetPhysicalCapacityValidation['response']>>({
			url: `/lsp/warehouses/${id}/capacities/${type}`,
			method: 'PUT',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
