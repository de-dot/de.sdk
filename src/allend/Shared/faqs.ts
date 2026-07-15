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
import { qs, type Http, type Res } from '../../utils'

export default class SharedFAQs {
	constructor( private http: Http, private ctype: UserContextType ){}

	async add( body: SharedFAQAddValidation['body'] ): Promise<SharedFAQAddValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQAddValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async list( querystring?: SharedFAQFetchValidation['querystring'] ): Promise<SharedFAQFetchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQFetchValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( reference: string ): Promise<SharedFAQRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQRetrieveValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async search( querystring: SharedFAQSearchValidation['querystring'] ): Promise<SharedFAQSearchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQSearchValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/search${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( reference: string, body: SharedFAQUpdateValidation['body'] ): Promise<SharedFAQUpdateValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQUpdateValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( reference: string ): Promise<SharedFAQRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQRemoveValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}

	async addServiceContext( reference: string, body: SharedFAQAddServiceContextValidation['body'] ): Promise<SharedFAQAddServiceContextValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQAddServiceContextValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/context`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async removeServiceContext( reference: string, body: SharedFAQRemoveServiceContextValidation['body'] ): Promise<SharedFAQRemoveServiceContextValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQRemoveServiceContextValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/context`,
			method: 'DELETE',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async archive( reference: string ): Promise<SharedFAQArchiveOrRestoreValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQArchiveOrRestoreValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/archive`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async restore( reference: string ): Promise<SharedFAQArchiveOrRestoreValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQArchiveOrRestoreValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/restore`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async lock( reference: string ): Promise<SharedFAQLockOrUnlockValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQLockOrUnlockValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/lock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}

	async unlock( reference: string ): Promise<SharedFAQLockOrUnlockValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedFAQLockOrUnlockValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/unlock`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}
}
