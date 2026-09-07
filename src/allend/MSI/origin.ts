/**
 * Whether a URL belongs to the MSI gateway itself.
 *
 * React Native's `originWhitelist` is prefix-matched and unanchored at the
 * end, so a whitelist of `https://msi.dedot.io` also admits
 * `https://msi.dedot.io.example.com`. That matters more in a WebView than it
 * would in a browser: the injected bridge — and the auth secret baked into
 * it — runs in whatever page the WebView ends up on. So the origin has to
 * match exactly, and only a path, query or fragment separator may follow it.
 *
 * @param baseURL - Gateway origin, without a trailing slash
 * @param url - URL the WebView is asking to navigate to
 * @return - Whether the navigation is to the gateway
 */
export default function belongsToGateway( baseURL: string, url: string ): boolean {
  if( !url || !baseURL ) return false
  if( url === 'about:blank' || url === baseURL ) return true

  return [ '/', '?', '#' ].some( separator => url.startsWith( baseURL + separator ) )
}
