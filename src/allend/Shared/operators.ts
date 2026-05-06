import type {
	DEVSharedOperatorRetrieveValidation,
	DEVSharedOperatorFetchValidation,
	DEVSharedOperatorUpdateValidation,
	DEVSharedOperatorRemoveValidation,
	CSPSharedOperatorRetrieveValidation,
	CSPSharedOperatorFetchValidation,
	CSPSharedOperatorUpdateValidation,
	CSPSharedOperatorRemoveValidation,
	LSPSharedOperatorRetrieveValidation,
	LSPSharedOperatorFetchValidation,
	LSPSharedOperatorUpdateValidation,
	LSPSharedOperatorRemoveValidation
} from '@de./types/shared/operator'
import { qs, type Http, type Res } from '../../utils'

// ─── Validation map ───────────────────────────────────────────────────────────

type OperatorV<C extends 'DEV' | 'CSP' | 'LSP'> = {
	DEV: {
		retrieve: DEVSharedOperatorRetrieveValidation
		fetch: DEVSharedOperatorFetchValidation
		update: DEVSharedOperatorUpdateValidation
		remove: DEVSharedOperatorRemoveValidation
	}
	CSP: {
		retrieve: CSPSharedOperatorRetrieveValidation
		fetch: CSPSharedOperatorFetchValidation
		update: CSPSharedOperatorUpdateValidation
		remove: CSPSharedOperatorRemoveValidation
	}
	LSP: {
		retrieve: LSPSharedOperatorRetrieveValidation
		fetch: LSPSharedOperatorFetchValidation
		update: LSPSharedOperatorUpdateValidation
		remove: LSPSharedOperatorRemoveValidation
	}
}[C]

// ─── Class ────────────────────────────────────────────────────────────────────

export default class SharedOperators<C extends 'DEV' | 'CSP' | 'LSP'> {
	constructor( private http: Http, private prefix: string ){}

	async list( querystring?: OperatorV<C>['fetch']['querystring'] ): Promise<OperatorV<C>['fetch']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['fetch']['response']>>({
			url: `/${this.prefix}/operators${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<OperatorV<C>['retrieve']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['retrieve']['response']>>({
			url: `/${this.prefix}/operators/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: OperatorV<C>['update']['body'] ): Promise<OperatorV<C>['update']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['update']['response']>>({
			url: `/${this.prefix}/operators/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<OperatorV<C>['remove']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['remove']['response']>>({
			url: `/${this.prefix}/operators/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
