export type AccessOptions = {
	env: 'dev' | 'staging' | 'prod'
	platform: 'web' | 'mobile' | 'server' | 'proxy'
	version?: number
	context: string
	accessToken: string
	remoteOrigin?: string
}
