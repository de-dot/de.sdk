import type {
	SharedBucketCreateValidation,
	SharedBucketRetrieveValidation,
	SharedBucketFetchValidation,
	SharedBucketUpdateValidation,
	SharedBucketRemoveValidation,
	SharedBucketAssignValidation,
	SharedBucketUnassignValidation,
	SharedBucketLockOrUnlockValidation,
	SharedBucketAddOrRemoveItemValidation,
	SharedBucketFetchItemsValidation,
	SharedBucketPackagedValidation
} from '@de./types/shared/bucket'
import type { UserContextType } from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

export default class SharedBuckets {
	constructor( private http: Http, private ctype: UserContextType ){}

	async create( body: SharedBucketCreateValidation['body'] ): Promise<SharedBucketCreateValidation['response']> {
		return await this.http.request<SharedBucketCreateValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets`,
			method: 'POST',
			body
		})
	}

	async list(): Promise<SharedBucketFetchValidation['response']> {
		return await this.http.request<SharedBucketFetchValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets`,
			method: 'GET'
		})
	}

	async retrieve( reference: string ): Promise<SharedBucketRetrieveValidation['response']> {
		return await this.http.request<SharedBucketRetrieveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'GET'
		})
	}

	async update( reference: string, body: SharedBucketUpdateValidation['body'] ): Promise<SharedBucketUpdateValidation['response']> {
		return await this.http.request<SharedBucketUpdateValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async remove( reference: string ): Promise<SharedBucketRemoveValidation['response']> {
		return await this.http.request<SharedBucketRemoveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'DELETE'
		})
	}

	async assign( reference: string, to: SharedBucketAssignValidation['params']['to'], body: SharedBucketAssignValidation['body'] ): Promise<SharedBucketAssignValidation['response']> {
		return await this.http.request<SharedBucketAssignValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/assign/${to}`,
			method: 'POST',
			body
		})
	}

	async unassign( reference: string, to: SharedBucketUnassignValidation['params']['to'], body: SharedBucketUnassignValidation['body'] ): Promise<SharedBucketUnassignValidation['response']> {
		return await this.http.request<SharedBucketUnassignValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/unassign/${to}`,
			method: 'POST',
			body
		})
	}

	async lock( reference: string ): Promise<SharedBucketLockOrUnlockValidation['response']> {
		return await this.http.request<SharedBucketLockOrUnlockValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/lock`,
			method: 'PATCH'
		})
	}

	async unlock( reference: string ): Promise<SharedBucketLockOrUnlockValidation['response']> {
		return await this.http.request<SharedBucketLockOrUnlockValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/unlock`,
			method: 'PATCH'
		})
	}

	async addItem( reference: string, body: SharedBucketAddOrRemoveItemValidation['body'] ): Promise<SharedBucketAddOrRemoveItemValidation['response']> {
		return await this.http.request<SharedBucketAddOrRemoveItemValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'POST',
			body
		})
	}

	async removeItem( reference: string, body: SharedBucketAddOrRemoveItemValidation['body'] ): Promise<SharedBucketAddOrRemoveItemValidation['response']> {
		return await this.http.request<SharedBucketAddOrRemoveItemValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'DELETE',
			body
		})
	}

	async listItems( reference: string ): Promise<SharedBucketFetchItemsValidation['response']> {
		return await this.http.request<SharedBucketFetchItemsValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'GET'
		})
	}

	async markPackaged( reference: string, body: SharedBucketPackagedValidation['body'] ): Promise<SharedBucketPackagedValidation['response']> {
		return await this.http.request<SharedBucketPackagedValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/packaged`,
			method: 'POST',
			body
		})
	}
}
