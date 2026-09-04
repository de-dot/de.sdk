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
	/**
	 * Lowercased, like every other shared client.
	 *
	 * This one took the context type as a raw `prefix` and used it verbatim, so
	 * an LSP client addressed `/LSP/invitation/agent` — de.arch mounts `/lsp`,
	 * and every invitation a workspace ever sent through the SDK came back 404.
	 */
	constructor( private http: Http, private ctype: UserContextType ){}

	private get prefix(): string { return this.ctype.toLowerCase() }

	async send( as: string, body: InvitationV<C>['send']['body'] ): Promise<InvitationV<C>['send']['response']> {
		return await this.http.request<InvitationV<C>['send']['response']>({
			url: `/${this.prefix}/invitation/${as}`,
			method: 'POST',
			body
		})
	}

	async cancel( body: InvitationV<C>['cancel']['body'] ): Promise<InvitationV<C>['cancel']['response']> {
		return await this.http.request<InvitationV<C>['cancel']['response']>({
			url: `/${this.prefix}/invitation/cancel`,
			method: 'POST',
			body
		})
	}

	async accept( body: InvitationV<C>['accept']['body'] ): Promise<InvitationV<C>['accept']['response']> {
		return await this.http.request<InvitationV<C>['accept']['response']>({
			url: `/${this.prefix}/invitation/accept`,
			method: 'POST',
			body
		})
	}
}
