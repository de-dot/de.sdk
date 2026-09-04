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

	async add( body: SharedFAQAddValidation['body'] ): Promise<SharedFAQAddValidation['response']> {
		return await this.http.request<SharedFAQAddValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs`,
			method: 'POST',
			body
		})
	}

	async list( querystring?: SharedFAQFetchValidation['querystring'] ): Promise<SharedFAQFetchValidation['response']> {
		return await this.http.request<SharedFAQFetchValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( reference: string ): Promise<SharedFAQRetrieveValidation['response']> {
		return await this.http.request<SharedFAQRetrieveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'GET'
		})
	}

	async search( querystring: SharedFAQSearchValidation['querystring'] ): Promise<SharedFAQSearchValidation['response']> {
		return await this.http.request<SharedFAQSearchValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/search${qs( querystring )}`,
			method: 'GET'
		})
	}

	async update( reference: string, body: SharedFAQUpdateValidation['body'] ): Promise<SharedFAQUpdateValidation['response']> {
		return await this.http.request<SharedFAQUpdateValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'PATCH',
			body
		})
	}

	async remove( reference: string ): Promise<SharedFAQRemoveValidation['response']> {
		return await this.http.request<SharedFAQRemoveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}`,
			method: 'DELETE'
		})
	}

	async addServiceContext( reference: string, body: SharedFAQAddServiceContextValidation['body'] ): Promise<SharedFAQAddServiceContextValidation['response']> {
		return await this.http.request<SharedFAQAddServiceContextValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/context`,
			method: 'POST',
			body
		})
	}

	async removeServiceContext( reference: string, body: SharedFAQRemoveServiceContextValidation['body'] ): Promise<SharedFAQRemoveServiceContextValidation['response']> {
		return await this.http.request<SharedFAQRemoveServiceContextValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/context`,
			method: 'DELETE',
			body
		})
	}

	async archive( reference: string ): Promise<SharedFAQArchiveOrRestoreValidation['response']> {
		return await this.http.request<SharedFAQArchiveOrRestoreValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/archive`,
			method: 'PATCH'
		})
	}

	async restore( reference: string ): Promise<SharedFAQArchiveOrRestoreValidation['response']> {
		return await this.http.request<SharedFAQArchiveOrRestoreValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/restore`,
			method: 'PATCH'
		})
	}

	async lock( reference: string ): Promise<SharedFAQLockOrUnlockValidation['response']> {
		return await this.http.request<SharedFAQLockOrUnlockValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/lock`,
			method: 'PATCH'
		})
	}

	async unlock( reference: string ): Promise<SharedFAQLockOrUnlockValidation['response']> {
		return await this.http.request<SharedFAQLockOrUnlockValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/faqs/${reference}/unlock`,
			method: 'PATCH'
		})
	}
}
