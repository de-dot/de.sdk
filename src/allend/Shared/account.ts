import type {
	SharedAccountKnowsValidation,
	SharedAccountRetrieveValidation
} from '@de./types/shared/account'
import { type Http, type Res } from '../../utils'

export default class SharedAccount {
	constructor( private http: Http, private prefix: string ){}

	async knows(): Promise<SharedAccountKnowsValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedAccountKnowsValidation['response']>>({
			url: `/${this.prefix}/account/knows`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve(): Promise<SharedAccountRetrieveValidation['response']> {
		const { error, message, data } = await this.http.request<Res<SharedAccountRetrieveValidation['response']>>({
			url: `/${this.prefix}/account`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
