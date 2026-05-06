import { type Http } from '../../utils'
import SharedFAQs from './faqs'
import SharedUsers from './users'
import SharedAccount from './account'
import SharedOperators from './operators'
import SharedInvitation from './invitation'

// ─── Shared Routes ────────────────────────────────────────────────────────────
//
// Service-scoped shared modules mounted at /:service/faqs, /:service/users, etc.
// Each service class instantiates this with its own prefix.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Shared {
	faqs: SharedFAQs
	users: SharedUsers
	account: SharedAccount
	operators: SharedOperators
	invitation: SharedInvitation

	constructor( http: Http, prefix: string ){
		this.faqs       = new SharedFAQs( http, prefix )
		this.users      = new SharedUsers( http, prefix )
		this.account    = new SharedAccount( http, prefix )
		this.operators  = new SharedOperators( http, prefix )
		this.invitation = new SharedInvitation( http, prefix )
	}
}

export { SharedFAQs, SharedUsers, SharedAccount, SharedOperators, SharedInvitation }
export { default as SharedBuckets } from './buckets'
