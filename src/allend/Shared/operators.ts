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
import { qs, type Http, type Res, type Data } from '../../utils'
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
		return await this.http.request<OperatorV<C>['fetch']['response']>({
			url: `/${this.ctype.toLowerCase()}/operators${qs( querystring )}`,
			method: 'GET'
		})
	}

	async retrieve( id: string ): Promise<OperatorV<C>['retrieve']['response']> {
		return await this.http.request<OperatorV<C>['retrieve']['response']>({
			url: `/${this.ctype.toLowerCase()}/operators/${id}`,
			method: 'GET'
		})
	}

	async update( id: string, body: OperatorV<C>['update']['body'] ): Promise<OperatorV<C>['update']['response']> {
		return await this.http.request<OperatorV<C>['update']['response']>({
			url: `/${this.ctype.toLowerCase()}/operators/${id}`,
			method: 'PATCH',
			body
		})
	}

	async remove( id: string ): Promise<OperatorV<C>['remove']['response']> {
		return await this.http.request<OperatorV<C>['remove']['response']>({
			url: `/${this.ctype.toLowerCase()}/operators/${id}`,
			method: 'DELETE'
		})
	}
}
