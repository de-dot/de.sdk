import type {
	SharedUserRetrieveValidation,
	SharedUserFetchValidation,
	SharedUserRemoveValidation
} from '@de./types/shared/user'
import type { ContextType } from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

export default class SharedUsers {
	constructor( private http: Http, private ctype: ContextType ){}

	async list( querystring?: SharedUserFetchValidation['querystring'] ): Promise<SharedUserFetchValidation['response']> {
		return await this.http.request<SharedUserFetchValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/users${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( uid: string ): Promise<SharedUserRetrieveValidation['response']> {
		return await this.http.request<SharedUserRetrieveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/users/${uid}`,
			method: 'GET'
		})
	}

	async remove( uid: string ): Promise<SharedUserRemoveValidation['response']> {
		return await this.http.request<SharedUserRemoveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/users/${uid}`,
			method: 'DELETE'
		})
	}
}
