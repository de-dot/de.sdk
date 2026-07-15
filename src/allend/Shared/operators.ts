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
	LSPSharedOperatorRemoveValidation,
	IoTSPSharedOperatorRetrieveValidation,
	IoTSPSharedOperatorFetchValidation,
	IoTSPSharedOperatorUpdateValidation,
	IoTSPSharedOperatorRemoveValidation
} from '@de./types/shared/operator'
import { qs, type Http, type Res } from '../../utils'
import type { OperatorContextType } from '@de./types'

// ─── Validation map ───────────────────────────────────────────────────────────

type OperatorV<C extends OperatorContextType> = {
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
	IoTSP: {
		retrieve: IoTSPSharedOperatorRetrieveValidation
		fetch: IoTSPSharedOperatorFetchValidation
		update: IoTSPSharedOperatorUpdateValidation
		remove: IoTSPSharedOperatorRemoveValidation
	}
}[C]

// ─── Class ────────────────────────────────────────────────────────────────────

export default class SharedOperators<C extends OperatorContextType> {
	constructor( private http: Http, private ctype: OperatorContextType ){}

	async list( querystring?: OperatorV<C>['fetch']['querystring'] ): Promise<OperatorV<C>['fetch']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['fetch']['response']>>({
			url: `/${this.ctype.toLowerCase()}/operators${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async retrieve( id: string ): Promise<OperatorV<C>['retrieve']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['retrieve']['response']>>({
			url: `/${this.ctype.toLowerCase()}/operators/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async update( id: string, body: OperatorV<C>['update']['body'] ): Promise<OperatorV<C>['update']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['update']['response']>>({
			url: `/${this.ctype.toLowerCase()}/operators/${id}`,
			method: 'PATCH',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async remove( id: string ): Promise<OperatorV<C>['remove']['response']> {
		const { error, message, data } = await this.http.request<Res<OperatorV<C>['remove']['response']>>({
			url: `/${this.ctype.toLowerCase()}/operators/${id}`,
			method: 'DELETE'
		})
		if( error ) throw new Error( message )
		return data
	}
}
