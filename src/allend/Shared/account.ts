import type {
	SharedAccountKnowsValidation,
	SharedAccountRetrieveValidation
} from '@de./types/shared/account'
import type { UserContextType } from '@de./types'
import type { Http, Res, Data } from '../../utils'

export default class SharedAccount {
	constructor( private http: Http, private ctype: UserContextType ){}

	async knows(): Promise<SharedAccountKnowsValidation['response']> {
		return await this.http.request<SharedAccountKnowsValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/account/knows`,
			method: 'GET'
		})
	}

	async retrieve(): Promise<SharedAccountRetrieveValidation['response']> {
		return await this.http.request<SharedAccountRetrieveValidation['response']>({
			url: `/${this.ctype.toLowerCase()}/account`,
			method: 'GET'
		})
	}
}
