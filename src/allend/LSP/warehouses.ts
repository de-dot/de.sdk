import type { APIResponseBase } from '@de./types'
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
import { qs, type Http, type Res, type Data } from '../../utils'
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
		return await this.http.request<LSPWarehouseCreateValidation['response']>({
			url: '/lsp/warehouses/create',
			method: 'POST',
			body
		})
	}

	async list( querystring?: LSPWarehouseListValidation['querystring'] ): Promise<LSPWarehouseListValidation['response']> {
		return await this.http.request<LSPWarehouseListValidation['response']>({
			url: `/lsp/warehouses${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<LSPWarehouseRetrieveValidation['response']> {
		return await this.http.request<LSPWarehouseRetrieveValidation['response']>({
			url: `/lsp/warehouses/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: LSPWarehouseUpdateValidation['body'] ): Promise<LSPWarehouseUpdateValidation['response']> {
		return await this.http.request<LSPWarehouseUpdateValidation['response']>({
			url: `/lsp/warehouses/${id}`,
			method: 'PATCH',
			body
		})
	}

	async updateStatus( id: string, body: LSPWarehouseUpdateStatusValidation['body'] ): Promise<LSPWarehouseUpdateStatusValidation['response']> {
		return await this.http.request<LSPWarehouseUpdateStatusValidation['response']>({
			url: `/lsp/warehouses/${id}/status`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<APIResponseBase> {
		return await this.http.request<APIResponseBase>({
			url: `/lsp/warehouses/${id}`,
			method: 'DELETE'
		})
	}

	async bindPricing( id: string, action: LSPPricingBindToValidation['params']['action'], body: LSPPricingBindToValidation['body'] ): Promise<LSPPricingBindToValidation['response']> {
		return await this.http.request<LSPPricingBindToValidation['response']>({
			url: `/lsp/warehouses/${id}/pricing/${action}`,
			method: 'PUT',
			body
		})
	}

	// ── Capabilities ──────────────────────────────────────────────────────────
	// Generic accessors — representative Validation (Storage) used for typing.

	async getCapability( id: string, type: string ): Promise<LSPWarehouseGetStorageCapabilityValidation['response']> {
		return await this.http.request<LSPWarehouseGetStorageCapabilityValidation['response']>({
			url: `/lsp/warehouses/${id}/capabilities/${type}`,
			method: 'GET'
		})
	}

	async setCapability( id: string, type: string, body: LSPWarehouseSetStorageCapabilityValidation['body'] ): Promise<LSPWarehouseSetStorageCapabilityValidation['response']> {
		return await this.http.request<LSPWarehouseSetStorageCapabilityValidation['response']>({
			url: `/lsp/warehouses/${id}/capabilities/${type}`,
			method: 'PUT',
			body
		})
	}

	// ── Capacities ────────────────────────────────────────────────────────────
	// Generic accessors — representative Validation (Physical) used for typing.

	async getCapacity( id: string, type: string ): Promise<LSPWarehouseGetPhysicalCapacityValidation['response']> {
		return await this.http.request<LSPWarehouseGetPhysicalCapacityValidation['response']>({
			url: `/lsp/warehouses/${id}/capacities/${type}`,
			method: 'GET'
		})
	}

	async setCapacity( id: string, type: string, body: LSPWarehouseSetPhysicalCapacityValidation['body'] ): Promise<LSPWarehouseSetPhysicalCapacityValidation['response']> {
		return await this.http.request<LSPWarehouseSetPhysicalCapacityValidation['response']>({
			url: `/lsp/warehouses/${id}/capacities/${type}`,
			method: 'PUT',
			body
		})
	}
}
