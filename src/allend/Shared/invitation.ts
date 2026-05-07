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
import { type Http, type Res } from '../../utils'

// ─── Validation map ───────────────────────────────────────────────────────────

type InvitationV<C extends 'DEV' | 'CSP' | 'LSP'> = {
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
}[C]

// ─── Class ────────────────────────────────────────────────────────────────────

export default class SharedInvitation<C extends 'DEV' | 'CSP' | 'LSP'> {
	constructor( private http: Http, private prefix: string ){}

	async send( as: string, body: InvitationV<C>['send']['body'] ): Promise<InvitationV<C>['send']['response']> {
		const { error, message, data } = await this.http.request<Res<InvitationV<C>['send']['response']>>({
			url: `/${this.prefix}/invitation/${as}`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async cancel( body: InvitationV<C>['cancel']['body'] ): Promise<InvitationV<C>['cancel']['response']> {
		const { error, message, data } = await this.http.request<Res<InvitationV<C>['cancel']['response']>>({
			url: `/${this.prefix}/invitation/cancel`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async accept( body: InvitationV<C>['accept']['body'] ): Promise<InvitationV<C>['accept']['response']> {
		const { error, message, data } = await this.http.request<Res<InvitationV<C>['accept']['response']>>({
			url: `/${this.prefix}/invitation/accept`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}
}
