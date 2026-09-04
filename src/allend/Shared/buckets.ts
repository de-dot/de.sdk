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

	async create( body: SharedBucketCreateValidation['body'] ): Promise<Data<SharedBucketCreateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketCreateValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list(): Promise<Data<SharedBucketFetchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketFetchValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( reference: string ): Promise<Data<SharedBucketRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketRetrieveValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: SharedBucketUpdateValidation['body'] ): Promise<Data<SharedBucketUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketUpdateValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( reference: string ): Promise<Data<SharedBucketRemoveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketRemoveValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async assign( reference: string, to: SharedBucketAssignValidation['params']['to'], body: SharedBucketAssignValidation['body'] ): Promise<Data<SharedBucketAssignValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketAssignValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/assign/${to}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async unassign( reference: string, to: SharedBucketUnassignValidation['params']['to'], body: SharedBucketUnassignValidation['body'] ): Promise<Data<SharedBucketUnassignValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketUnassignValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/unassign/${to}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async lock( reference: string ): Promise<Data<SharedBucketLockOrUnlockValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketLockOrUnlockValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/lock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async unlock( reference: string ): Promise<Data<SharedBucketLockOrUnlockValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketLockOrUnlockValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/unlock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async addItem( reference: string, body: SharedBucketAddOrRemoveItemValidation['body'] ): Promise<Data<SharedBucketAddOrRemoveItemValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketAddOrRemoveItemValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeItem( reference: string, body: SharedBucketAddOrRemoveItemValidation['body'] ): Promise<Data<SharedBucketAddOrRemoveItemValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketAddOrRemoveItemValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async listItems( reference: string ): Promise<Data<SharedBucketFetchItemsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketFetchItemsValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/items`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async markPackaged( reference: string, body: SharedBucketPackagedValidation['body'] ): Promise<Data<SharedBucketPackagedValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedBucketPackagedValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/buckets/${reference}/packaged`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
