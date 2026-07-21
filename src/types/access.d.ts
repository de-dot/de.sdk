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
}
