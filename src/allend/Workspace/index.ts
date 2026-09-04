import type { AccessOptions, UserSession } from '../../types/access'
import type { Workspace as WorkspaceRecord } from '@de./types/workspace'
import type { Admin, AdminUpdate } from '@de./types/workspace/admin'
import type { Connector, ConnectorType } from '@de./types/workspace/connector'
import AccessManager from '../Access'
import { qs, type Res } from '../../utils'

export type WorkspaceConfig = {
	context: string
	accessToken: string
	env?: 'dev' | 'staging' | 'prod'
	platform?: 'web' | 'mobile' | 'server' | 'proxy'
	remoteOrigin?: string
	/** Per-request deadline in ms. See `AccessOptions.timeout`. */
	timeout?: number
	/** Explicit service origin, overriding the env table. See `AccessOptions.baseUrl`. */
	baseUrl?: string
	/**
	 * The signed-in operator.
	 *
	 * Required in practice. de.workspace authenticates a *person*, not an
	 * integration — its routes read `de-auth-token` / `de-auth-device` — so a
	 * client carrying only a bearer token cannot reach any of them.
	 */
	session?: UserSession
}

/** The four provider kinds a workspace can register, as they appear in a path. */
export type ProviderKind = 'lsp' | 'csp' | 'dev' | 'iotsp'

/** Context type as the connector routes spell it. */
export type ContextType = 'LSP' | 'CSP' | 'DEV' | 'IoTSP'

export type ProviderRecord = { xcode: string, name: string, type: string }

// ─────────────────────────────────────────────────────────────────────────────
//
// Workspace: the control plane — de.workspace routes.
//
// A separate service from de.arch, which serves no `/workspace` routes at all.
// This client previously addressed `/workspace/admins`, `/workspace/connectors`
// and `/workspace/providers/lsps` against the API host; none of those exist
// anywhere, so every method 404'd. The real surface is workspace-id scoped:
// `/v1/:wid/admins`, `/v1/:wid/:ctype/:xcode/connectors`, `/v1/:wid/lsps`.
//
// Route shapes are taken from de.workspace/src/api/index.ts.
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Workspace extends AccessManager {
	constructor( config: WorkspaceConfig ){
		if( !config.context )     throw new Error('Undefined context. See https://doc.dedot.io/sdk/workspace')
		if( !config.accessToken ) throw new Error('Undefined accessToken. See https://doc.dedot.io/sdk/auth')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin,
			timeout:      config.timeout,
			baseUrl:      config.baseUrl,
			session:      config.session
		}
		super( access, 'WSP' )
	}

	/**
	 * Returns the envelope, like every other client here.
	 *
	 * de.workspace answers `{ error, status, message, data }` too, and its
	 * `status` names a refusal precisely — WORKSPACE::EXISTS on a second
	 * setup, "already enabled" on a redundant enable. Both are outcomes a
	 * caller acts on rather than failures.
	 */
	private call<T>( method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', url: string, body?: any ): Promise<Res<T>> {
		return this.request<Res<T>>({ url, method, ...( body !== undefined ? { body } : {}) })
	}

	// ── Workspace ─────────────────────────────────────────────────────────────

	/**
	 * A person may own exactly one workspace; a second call answers
	 * WORKSPACE::EXISTS rather than creating another.
	 */
	async create( body: { settings?: { theme?: string } } = {} ): Promise<Res<{ wid: string }>> {
		return this.call('POST', '/workspace/setup', body )
	}

	async retrieve( wid: string ): Promise<Res<WorkspaceRecord>> {
		return this.call('GET', `/workspace/${wid}`)
	}

	async update( wid: string, body: Partial<Pick<WorkspaceRecord, 'settings'>> ): Promise<Res<WorkspaceRecord>> {
		return this.call('PATCH', `/workspace/${wid}`, body )
	}

	/** Deletion is two-step: an intent, then the delete that quotes it. */
	async requestDeletion( wid: string ): Promise<Res<{ intent: string }>> {
		return this.call('POST', `/workspace/${wid}/deletion/intent`, {})
	}

	async remove( wid: string, querystring?: { intent?: string } ): Promise<Res<void>> {
		return this.call('DELETE', `/workspace/${wid}${qs( querystring )}`)
	}

	// ── Providers ─────────────────────────────────────────────────────────────

	async createProvider( wid: string, kind: ProviderKind, body: Record<string, any> ): Promise<Res<{ xcode: string, context: string }>> {
		return this.call('POST', `/${wid}/${kind}/setup`, body )
	}

	async listProviders( wid: string, kind: ProviderKind ): Promise<Res<Record<string, ProviderRecord[]>>> {
		return this.call('GET', `/${wid}/${kind}s`)
	}

	async retrieveProvider( wid: string, kind: ProviderKind, xcode: string ): Promise<Res<ProviderRecord>> {
		return this.call('GET', `/${wid}/${kind}/${xcode}`)
	}

	async updateProvider( wid: string, kind: ProviderKind, xcode: string, body: Record<string, any> ): Promise<Res<ProviderRecord>> {
		return this.call('PATCH', `/${wid}/${kind}/${xcode}`, body )
	}

	/**
	 * Base64 of `wid:TYPE:xcode` — the context string every other client in
	 * this SDK is constructed with.
	 */
	async getProviderContext( wid: string, kind: ProviderKind, xcode: string ): Promise<Res<{ context: string }>> {
		return this.call('GET', `/${wid}/${kind}/${xcode}/context`)
	}

	async requestProviderDeletion( wid: string, kind: ProviderKind, xcode: string ): Promise<Res<{ intent: string }>> {
		return this.call('POST', `/${wid}/${kind}/${xcode}/deletion/intent`, {})
	}

	async removeProvider( wid: string, kind: ProviderKind, xcode: string, querystring?: { intent?: string } ): Promise<Res<void>> {
		return this.call('DELETE', `/${wid}/${kind}/${xcode}${qs( querystring )}`)
	}

	// ── Connectors ────────────────────────────────────────────────────────────

	/**
	 * Created disabled, and the reply carries only the id — the secret has to
	 * be read back with `getConnector`.
	 */
	async createConnector(
		wid: string, ctype: ContextType, xcode: string,
		body: { name: string, type: ConnectorType, description?: string, config?: Record<string, any> }
	): Promise<Res<{ connectorId: string }>> {
		return this.call('POST', `/${wid}/${ctype}/${xcode}/connectors`, body )
	}

	async listConnectors( wid: string, ctype: ContextType, xcode: string, querystring?: Record<string, any> ): Promise<Res<{ connectors?: Connector[] }>> {
		return this.call('GET', `/${wid}/${ctype}/${xcode}/connectors${qs( querystring )}`)
	}

	async getConnector( wid: string, ctype: ContextType, xcode: string, id: string ): Promise<Res<{ connector: Connector }>> {
		return this.call('GET', `/${wid}/${ctype}/${xcode}/connectors/${id}`)
	}

	async updateConnector( wid: string, ctype: ContextType, xcode: string, id: string, body: Record<string, any> ): Promise<Res<Connector>> {
		return this.call('PATCH', `/${wid}/${ctype}/${xcode}/connectors/${id}`, body )
	}

	/**
	 * Enable or disable. Both are bodiless — Fastify rejects a JSON
	 * content-type with no body, and the transport sends one only when there
	 * is a body to send.
	 */
	async setConnectorEnabled( wid: string, ctype: ContextType, xcode: string, id: string, enabled: boolean ): Promise<Res<void>> {
		return this.call('PATCH', `/${wid}/${ctype}/${xcode}/connectors/${id}/${enabled ? 'enable' : 'disable'}`)
	}

	/** Replaces the config wholesale; `patchConnectorConfig` merges instead. */
	async setConnectorConfig( wid: string, ctype: ContextType, xcode: string, id: string, config: Record<string, any> ): Promise<Res<void>> {
		return this.call('PUT', `/${wid}/${ctype}/${xcode}/connectors/${id}/config`, config )
	}

	async patchConnectorConfig( wid: string, ctype: ContextType, xcode: string, id: string, config: Record<string, any> ): Promise<Res<void>> {
		return this.call('PATCH', `/${wid}/${ctype}/${xcode}/connectors/${id}/config`, config )
	}

	/**
	 * Origin allow-list and maintainers.
	 *
	 * An empty `origins` means no origin check at all, which is what a client
	 * that must not pin itself to one hostname wants.
	 */
	async setConnectorAccess( wid: string, ctype: ContextType, xcode: string, id: string, body: { origins?: string[], maintainers?: string[] }): Promise<Res<void>> {
		return this.call('PATCH', `/${wid}/${ctype}/${xcode}/connectors/${id}/access`, body )
	}

	async rotateConnectorSecret( wid: string, ctype: ContextType, xcode: string, id: string ): Promise<Res<{ secret: string }>> {
		return this.call('PATCH', `/${wid}/${ctype}/${xcode}/connectors/${id}/secret/rotate`)
	}

	async requestConnectorDeletion( wid: string, ctype: ContextType, xcode: string, id: string ): Promise<Res<{ intent: string }>> {
		return this.call('POST', `/${wid}/${ctype}/${xcode}/connectors/${id}/deletion/intent`, {})
	}

	async removeConnector( wid: string, ctype: ContextType, xcode: string, id: string, querystring?: { intent?: string } ): Promise<Res<void>> {
		return this.call('DELETE', `/${wid}/${ctype}/${xcode}/connectors/${id}${qs( querystring )}`)
	}

	// ── Admins ────────────────────────────────────────────────────────────────

	async listAdmins( wid: string, querystring?: Record<string, any> ): Promise<Res<{ admins?: Admin[] }>> {
		return this.call('GET', `/${wid}/admins${qs( querystring )}`)
	}

	async getAdmin( wid: string, id: string ): Promise<Res<Admin>> {
		return this.call('GET', `/${wid}/admins/${id}`)
	}

	async updateAdmin( wid: string, id: string, body: AdminUpdate ): Promise<Res<Admin>> {
		return this.call('PATCH', `/${wid}/admins/${id}`, body )
	}

	async removeAdmin( wid: string, id: string ): Promise<Res<void>> {
		return this.call('DELETE', `/${wid}/admins/${id}`)
	}

	// ── Billing ───────────────────────────────────────────────────────────────

	async getBilling( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings${qs( querystring )}`)
	}

	async getBillingUsage( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings/usage${qs( querystring )}`)
	}

	async listBillingNotifications( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings/notifications${qs( querystring )}`)
	}

	async acknowledgeBillingNotification( wid: string, id: string ): Promise<Res<void>> {
		return this.call('POST', `/${wid}/billings/notifications/${id}/acknowledge`, {})
	}

	async listInvoices( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings/invoices${qs( querystring )}`)
	}

	async listConnectorBilling( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings/connectors${qs( querystring )}`)
	}

	async getConnectorBilling( wid: string, cid: string ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings/connectors/${cid}`)
	}

	async getConnectorBillingHistory( wid: string, cid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/billings/connectors/${cid}/history${qs( querystring )}`)
	}

	async estimateConnectorBilling( wid: string, cid: string, body: Record<string, any> ): Promise<Res<any>> {
		return this.call('POST', `/${wid}/billings/connectors/${cid}/estimate`, body )
	}

	async changeConnectorTier( wid: string, cid: string, body: Record<string, any> ): Promise<Res<any>> {
		return this.call('POST', `/${wid}/billings/connectors/${cid}/tier/change`, body )
	}

	// ── Users & account ───────────────────────────────────────────────────────

	async listUsers( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/users${qs( querystring )}`)
	}

	async getUser( wid: string, uid: string ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/users/${uid}`)
	}

	async removeUser( wid: string, uid: string ): Promise<Res<void>> {
		return this.call('DELETE', `/${wid}/users/${uid}`)
	}

	async getAccount( wid: string ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/account`)
	}

	/** Who this account already knows in the workspace. */
	async getAccountKnows( wid: string, querystring?: Record<string, any> ): Promise<Res<any>> {
		return this.call('GET', `/${wid}/account/knows${qs( querystring )}`)
	}

	// ── Invitation ────────────────────────────────────────────────────────────

	async invite( wid: string, as: string, body: Record<string, any> ): Promise<Res<{ vcode: string }>> {
		return this.call('POST', `/${wid}/invitation/${as}`, body )
	}

	async cancelInvitation( wid: string, body: Record<string, any> ): Promise<Res<void>> {
		return this.call('DELETE', `/${wid}/invitation`, body )
	}

	async acceptInvitation( wid: string, body: { vcode: string } ): Promise<Res<any>> {
		return this.call('POST', `/${wid}/invitation/accept`, body )
	}
}
