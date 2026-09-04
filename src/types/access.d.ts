/**
 * End-user session credentials.
 *
 * Issued by de.auth when a person signs in (`ctoken` + `deviceId`) and sent
 * as the `de-auth-token` / `de-auth-device` header pair.
 */
export type UserSession = {
	/** Connection token from de.auth — the `ctoken` field. */
	token: string
	/** Device id issued alongside the connection token. */
	device: string
}

export type AccessOptions = {
	env: 'dev' | 'staging' | 'prod'
	platform: 'web' | 'mobile' | 'server' | 'proxy'
	version?: number
	context: string
	accessToken: string
	remoteOrigin?: string
	/**
	 * Host to substitute for `localhost` when `env` is `dev`.
	 *
	 * Native apps cannot reach the host machine on localhost -- the Android
	 * emulator maps it to 10.0.2.2 and a physical device needs the LAN address.
	 * Ignored outside `dev`.
	 */
	devHostname?: string
	/**
	 * Signed-in user, when the client acts on someone's behalf.
	 *
	 * Some de.arch routes authenticate the *caller* rather than the
	 * integration: AUX agent routes run `isConnected`, which reads
	 * `de-auth-token` / `de-auth-device` and never inspects the bearer token.
	 * A client that sends only `authorization` cannot reach them.
	 *
	 * Supply this when acting as a signed-in user — a rider in a driver app, a
	 * customer in a consumer app. The bearer token is still sent, since it
	 * identifies the integration; the two credentials travel together.
	 */
	session?: UserSession
	/**
	 * Deadline for every request this client makes, in milliseconds.
	 *
	 * Without one a request has no upper bound. Node closes idle keep-alive
	 * connections after 5s while the client pool hands one out regardless, so a
	 * request can be written into a socket the server already closed and then
	 * wait forever — a hang in the caller, not an error it can handle.
	 *
	 * Omit it to keep the runtime's own default (none, in practice).
	 */
	timeout?: number
	/**
	 * Explicit service origin, overriding the environment table.
	 *
	 * The table maps `dev` to fixed localhost ports, which only holds when
	 * every service runs on the port it was assigned. A self-hosted De., or a
	 * dev machine running de.workspace on its own port, has no entry there —
	 * and no host substitution can invent one, since `devHostname` swaps the
	 * host and keeps the port.
	 *
	 * Give an origin (`http://localhost:22200`), not a path.
	 */
	baseUrl?: string
}
