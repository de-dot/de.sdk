import type {
	DEVSharedInvitationSendValidation,
	DEVSharedInvitationCancelValidation,
	DEVSharedInvitationAcceptValidation,
	CSPSharedInvitationSendValidation,
	CSPSharedInvitationCancelValidation,
	CSPSharedInvitationAcceptValidation,
	LSPSharedInvitationSendValidation,
	LSPSharedInvitationCancelValidation,
	LSPSharedInvitationAcceptValidation
} from '@de./types/shared/invitation'
import type { UserContextType } from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Validation map ───────────────────────────────────────────────────────────

type InvitationV<C extends UserContextType> = {
	DEV: {
		send: DEVSharedInvitationSendValidation
		cancel: DEVSharedInvitationCancelValidation
		accept: DEVSharedInvitationAcceptValidation
	}
	CSP: {
		send: CSPSharedInvitationSendValidation
		cancel: CSPSharedInvitationCancelValidation
		accept: CSPSharedInvitationAcceptValidation
	}
	LSP: {
		send: LSPSharedInvitationSendValidation
		cancel: LSPSharedInvitationCancelValidation
		accept: LSPSharedInvitationAcceptValidation
	}
	IoTSP: {
		send: LSPSharedInvitationSendValidation
		cancel: LSPSharedInvitationCancelValidation
		accept: LSPSharedInvitationAcceptValidation
	}
}[C]

// ─── Class ────────────────────────────────────────────────────────────────────

export default class SharedInvitation<C extends UserContextType> {
	constructor( private http: Http, private prefix: string ){}

	async send( as: string, body: InvitationV<C>['send']['body'] ): Promise<Data<InvitationV<C>['send']['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<InvitationV<C>['send']['response']>>>({
			url: `/${this.prefix}/invitation/${as}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( body: InvitationV<C>['cancel']['body'] ): Promise<Data<InvitationV<C>['cancel']['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<InvitationV<C>['cancel']['response']>>>({
			url: `/${this.prefix}/invitation/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async accept( body: InvitationV<C>['accept']['body'] ): Promise<Data<InvitationV<C>['accept']['response']>> {
		const { error, message, data } = await this.http.request<Res<Data<InvitationV<C>['accept']['response']>>>({
			url: `/${this.prefix}/invitation/accept`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
