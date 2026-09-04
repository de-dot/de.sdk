import type {
	SharedAccountKnowsValidation,
	SharedAccountRetrieveValidation
} from '@de./types/shared/account'
import type { UserContextType } from '@de./types'
import type { Http, Res, Data } from '../../utils'

export default class SharedAccount {
	constructor( private http: Http, private ctype: UserContextType ){}

	async knows(): Promise<Data<SharedAccountKnowsValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedAccountKnowsValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/account/knows`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve(): Promise<Data<SharedAccountRetrieveValidation['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<SharedAccountRetrieveValidation['response']>>>({
			url: `/${this.ctype.toLowerCase()}/account`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}
}
