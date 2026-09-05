/**
 * Service base URLs per environment.
 *
 * Only the `dev` hosts are overridable. A React Native app cannot reach the
 * host machine on `localhost` -- the Android emulator maps it to 10.0.2.2, and
 * a physical device needs the machine's LAN address -- so the platform entry
 * resolves an appropriate host and passes it down as `devHostname`.
 *
 * The resolution deliberately lives in the caller rather than here: importing
 * react-native's `Platform` at this level would drag the whole framework into
 * the Node and browser builds.
 */

const DEV_PORTS = {
	ASI: 44000,
	RTS: 24800,
	API: 24800,
	IOT: 11011,
	WSP: 22200
}

export const ASI_SERVER_BASEURL = {
	dev:     `http://localhost:${DEV_PORTS.ASI}`,
	staging: 'https://auth.staging.dedot.io',
	prod:    'https://auth.dedot.io'
}
// Realtime Socket
export const RTS_SERVER_BASEURL = {
	dev:     `http://localhost:${DEV_PORTS.RTS}`,
	staging: 'https://api.staging.dedot.io',
	prod:    'https://api.dedot.io'
}
export const API_SERVER_BASEURL = {
	dev:     `http://localhost:${DEV_PORTS.API}`,
	staging: 'https://api.staging.dedot.io',
	prod:    'https://api.dedot.io'
}
/**
 * de.workspace — the control plane, a separate service from de.arch.
 *
 * It is not reachable through the API host: de.arch serves no `/workspace`
 * routes, so a client pointed there gets 404 for the whole surface.
 *
 * Pass `baseUrl` to address a host that differs — what a self-hosted De.
 * needs, and what a dev machine running de.workspace on a port other than
 * 22200 needs.
 */
export const WSP_SERVER_BASEURL = {
	dev:     `http://localhost:${DEV_PORTS.WSP}`,
	staging: 'https://workspace.staging.dedot.io',
	prod:    'https://workspace.dedot.io'
}
export const IOT_SERVER_BASEURL = {
	dev:     `http://localhost:${DEV_PORTS.IOT}`,
	staging: 'https://iot.staging.dedot.io',
	prod:    'https://iot.dedot.io'
}

export type ServerEnv = 'dev' | 'staging' | 'prod'
export type ServerName = keyof typeof DEV_PORTS

const BASEURLS = {
	ASI: ASI_SERVER_BASEURL,
	RTS: RTS_SERVER_BASEURL,
	API: API_SERVER_BASEURL,
	IOT: IOT_SERVER_BASEURL,
	WSP: WSP_SERVER_BASEURL
}

/**
 * Resolve a service's base URL for an environment.
 *
 * @param server - Which service to address
 * @param env - (Default: `dev`) Target environment
 * @param devHostname - (Optional) Host to substitute for `localhost` in `dev`
 * @return - Base URL
 */
export function baseURL( server: ServerName, env: ServerEnv = 'dev', devHostname?: string ): string {
	const url = BASEURLS[ server ][ env ]

	// Staging and production are fixed hosts -- an override there is meaningless
	return env === 'dev' && devHostname
					? `http://${devHostname}:${DEV_PORTS[ server ]}`
					: url
}
