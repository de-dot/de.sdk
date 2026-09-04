import type {
	SharedFAQAddValidation,
	SharedFAQRetrieveValidation,
	SharedFAQFetchValidation,
	SharedFAQSearchValidation,
	SharedFAQUpdateValidation,
	SharedFAQRemoveValidation,
	SharedFAQAddServiceContextValidation,
	SharedFAQRemoveServiceContextValidation,
	SharedFAQArchiveOrRestoreValidation,
	SharedFAQLockOrUnlockValidation
} from '@de./types/shared/faq'
import type { UserContextType } from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

export default class SharedFAQs {
	constructor( private http: Http, private ctype: UserContextType ){}

	async add( body: SharedFAQAddValidation['body'] ): Promise<Data<SharedFAQAddValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQAddValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: SharedFAQFetchValidation['querystring'] ): Promise<Data<SharedFAQFetchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQFetchValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( reference: string ): Promise<Data<SharedFAQRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQRetrieveValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async search( querystring: SharedFAQSearchValidation['querystring'] ): Promise<Data<SharedFAQSearchValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQSearchValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/search${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: SharedFAQUpdateValidation['body'] ): Promise<Data<SharedFAQUpdateValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQUpdateValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( reference: string ): Promise<Data<SharedFAQRemoveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQRemoveValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async addServiceContext( reference: string, body: SharedFAQAddServiceContextValidation['body'] ): Promise<Data<SharedFAQAddServiceContextValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQAddServiceContextValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/context`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeServiceContext( reference: string, body: SharedFAQRemoveServiceContextValidation['body'] ): Promise<Data<SharedFAQRemoveServiceContextValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQRemoveServiceContextValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/context`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async archive( reference: string ): Promise<Data<SharedFAQArchiveOrRestoreValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQArchiveOrRestoreValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/archive`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async restore( reference: string ): Promise<Data<SharedFAQArchiveOrRestoreValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQArchiveOrRestoreValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/restore`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async lock( reference: string ): Promise<Data<SharedFAQLockOrUnlockValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQLockOrUnlockValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/lock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async unlock( reference: string ): Promise<Data<SharedFAQLockOrUnlockValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedFAQLockOrUnlockValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/unlock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}
}
