import type { AccessOptions } from '../../types/access'
import type { UserContextType } from '@de./types'
import AccessManager from '../Access'
import SharedFAQs from './faqs'
import SharedUsers from './users'
import SharedAccount from './account'
import SharedInvitation from './invitation'

// ─────────────────────────────────────────────────────────────────────────────
//
// SharedContextClient: base for context-scoped service clients (LSP, DEV, CSP, IoTSP).
//
// Wires the shared sub-clients that de.arch reassigns under every user context
// (faqs, users, account, invitation) — mirroring the per-service route reassignment
// in de.arch's *(ctype) route factories. Context-selective resources — operators
// (OperatorContextType only) and buckets — are added by the concrete client where valid.
//
// The public API stays flat: consumers use `client.faqs`, `client.users`, etc.
//
// ─────────────────────────────────────────────────────────────────────────────

export default abstract class SharedContextClient<C extends UserContextType> extends AccessManager {
	readonly faqs:       SharedFAQs
	readonly users:      SharedUsers
	readonly account:    SharedAccount
	readonly invitation: SharedInvitation<C>

	constructor( access: AccessOptions, ctype: C ){
		super( access, 'API' )

		this.faqs       = new SharedFAQs( this, ctype )
		this.users      = new SharedUsers( this, ctype )
		this.account    = new SharedAccount( this, ctype )
		this.invitation = new SharedInvitation<C>( this, ctype )
	}
}
