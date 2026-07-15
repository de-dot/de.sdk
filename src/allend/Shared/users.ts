import type {
	SharedUserRetrieveValidation,
	SharedUserFetchValidation,
	SharedUserRemoveValidation
} from '@de./types/shared/user'
import type { ContextType } from '@de./types'
import { qs, type Http, type Res } from '../../utils'

export default class SharedUsers {
	constructor( private http: Http, private ctype: ContextType ){}

	async list( querystring?: SharedUserFetchValidation['querystring'] ): Promise<SharedUserFetchValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedUserFetchValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/users${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( uid: string ): Promise<SharedUserRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedUserRetrieveValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/users/${uid}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( uid: string ): Promise<SharedUserRemoveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedUserRemoveValidation['response']>>({
			url: `/${this.ctype.toLowerCase()}/users/${uid}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
