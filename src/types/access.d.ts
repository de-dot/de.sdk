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
}
