import type { AccessOptions, UserSession } from '../../types/access'
import AccessManager from '../Access'
import { qs, type Res } from '../../utils'

// ─────────────────────────────────────────────────────────────────────────────
//
// OTPAuth: sign a person in — de.auth routes.
//
// The whole flow is phone-and-OTP, in three steps:
//
//   signin( phone, device )  → sends the code, replies `{ next }`
//   verify( phone, pvc )     → replies the session: ctoken + deviceId
//   setAccount( … )          → only when `next` says the person is new
//
// This client used to POST `/v1/auth/otp`, which de.auth does not serve — the
// single method it had could never succeed. Route shapes are taken from
// de.auth/src/routes/{auth,user}/index.ts.
//
// ─────────────────────────────────────────────────────────────────────────────

export type SigninBody = {
	phone: string
	/** Device fingerprint — an object or its JSON string. */
	device: string | Record<string, any>
	/** ISO 3166-1 alpha-2. */
	country?: string
}

export type SigninResult = {
	/** What the caller must do next — verification, or account creation first. */
	next: string
	/**
	 * The OTP itself, returned only when de.auth runs with
	 * NODE_ENV=development. In every other environment the code arrives by SMS
	 * and this is absent, which is what makes unattended sign-in a dev-only
	 * capability rather than a hole.
	 */
	testVCode?: number
}

export type CreateAccountBody = {
	phone: string
	agreeTerms: boolean | string
	firstName?: string
	lastName?: string
	photo?: string
	type?: string
	country?: string
	newsletters?: boolean | string
}

export type VerifyResult = {
	ctoken?: string
	deviceId?: string
	[ key: string ]: any
}

export default class OTPAuth extends AccessManager {
	constructor( access: AccessOptions ){
		super( access, 'ASI' )
	}

	// ── Sign-in ───────────────────────────────────────────────────────────────

	/** Step 1 — sends the code. */
	async signin( body: SigninBody ): Promise<Res<SigninResult>> {
		if( !body.phone ) throw new Error('<phone> argument required')

		return this.request<Res<SigninResult>>({ url: '/signin', method: 'POST', body })
	}

	/** Step 2 — exchanges the code for a session. */
	async verify( body: { phone: string, pvc: number, new_phone?: string }): Promise<Res<VerifyResult>> {
		return this.request<Res<VerifyResult>>({ url: '/verification', method: 'POST', body })
	}

	/** Step 1a — for a phone de.auth has never seen. */
	async setAccount( body: CreateAccountBody ): Promise<Res<{ next: string }>> {
		return this.request<Res<{ next: string }>>({ url: '/set-account', method: 'POST', body })
	}

	async resendSms( body: { phone: string }): Promise<Res<void>> {
		return this.request<Res<void>>({ url: '/resend/sms', method: 'POST', body })
	}

	/** GET, with the scope in the querystring — not a POST. */
	async signout( querystring?: { allDevices?: boolean | string }): Promise<Res<void>> {
		return this.request<Res<void>>({ url: `/signout${qs( querystring )}`, method: 'GET' })
	}

	// ── The signed-in person ──────────────────────────────────────────────────

	/**
	 * Resolve the session to a user, and to a uid.
	 *
	 * `scope` is not optional in practice: without it de.auth falls back to the
	 * calling service's configured scope and then fails its own response
	 * validation. This is the same scope de.arch asks for.
	 */
	async active( session: UserSession, scope = 'name:photo:email:phone:timezone' ): Promise<Res<{ uid: string }>> {
		return this.request<Res<{ uid: string }>>({
			url: `/user/active${qs({ scope })}`,
			method: 'GET',
			headers: {
				'de-auth-token':  session.token,
				'de-auth-device': session.device
			}
		})
	}

	async retrieve( querystring?: { type?: string }): Promise<Res<{ user: any }>> {
		return this.request<Res<{ user: any }>>({ url: `/user${qs( querystring )}`, method: 'GET' })
	}

	async search( querystring: Record<string, any> ): Promise<Res<any>> {
		return this.request<Res<any>>({ url: `/user/search${qs( querystring )}`, method: 'GET' })
	}

	async updateProfile( body: Record<string, any> ): Promise<Res<any>> {
		return this.request<Res<any>>({ url: '/user/profile', method: 'PATCH', body })
	}

	async updateSettings( body: Record<string, any> ): Promise<Res<any>> {
		return this.request<Res<any>>({ url: '/user/settings', method: 'PATCH', body })
	}

	async remove( body: Record<string, any> ): Promise<Res<void>> {
		return this.request<Res<void>>({ url: '/user', method: 'DELETE', body })
	}
}
