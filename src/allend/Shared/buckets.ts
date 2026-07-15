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
import { type Http, type Res } from '../../utils'

export default class SharedBuckets {
	constructor( private http: Http, private ctype: UserContextType ){}

	async create( body: SharedBucketCreateValidation['body'] ): Promise<SharedBucketCreateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketCreateValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list(): Promise<SharedBucketFetchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketFetchValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( reference: string ): Promise<SharedBucketRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketRetrieveValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: SharedBucketUpdateValidation['body'] ): Promise<SharedBucketUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketUpdateValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( reference: string ): Promise<SharedBucketRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketRemoveValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assign( reference: string, to: SharedBucketAssignValidation['params']['to'], body: SharedBucketAssignValidation['body'] ): Promise<SharedBucketAssignValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketAssignValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/assign/${to}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async unassign( reference: string, to: SharedBucketUnassignValidation['params']['to'], body: SharedBucketUnassignValidation['body'] ): Promise<SharedBucketUnassignValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketUnassignValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/unassign/${to}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async lock( reference: string ): Promise<SharedBucketLockOrUnlockValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketLockOrUnlockValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/lock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async unlock( reference: string ): Promise<SharedBucketLockOrUnlockValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketLockOrUnlockValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/unlock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async addItem( reference: string, body: SharedBucketAddOrRemoveItemValidation['body'] ): Promise<SharedBucketAddOrRemoveItemValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketAddOrRemoveItemValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeItem( reference: string, body: SharedBucketAddOrRemoveItemValidation['body'] ): Promise<SharedBucketAddOrRemoveItemValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketAddOrRemoveItemValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listItems( reference: string ): Promise<SharedBucketFetchItemsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketFetchItemsValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async markPackaged( reference: string, body: SharedBucketPackagedValidation['body'] ): Promise<SharedBucketPackagedValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedBucketPackagedValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/packaged`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
