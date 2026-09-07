// ─────────────────────────────────────────────────────────────
// @de./sdk — which URLs the MSI WebView may navigate to
//
// React Native's `originWhitelist` compiles each entry to `^<escaped>` and
// tests it against the request's origin. There is no end anchor, so
// `https://msi.dedot.io` admits `https://msi.dedot.io.example.com` — and the
// injected bridge, carrying the transport's auth secret, runs in whatever
// page the WebView lands on. `belongsToGateway` is the end anchor.
// ─────────────────────────────────────────────────────────────

const belongsToGateway = require('../dist/allend/MSI/origin').default

const GATEWAY = 'https://msi.dedot.io'

describe('MSI gateway navigation', () => {

  test('the gateway itself, and anything under it', () => {
    expect( belongsToGateway( GATEWAY, GATEWAY ) ).toBe( true )
    expect( belongsToGateway( GATEWAY, `${GATEWAY}/` ) ).toBe( true )
    expect( belongsToGateway( GATEWAY, `${GATEWAY}/index.html` ) ).toBe( true )
    expect( belongsToGateway( GATEWAY, `${GATEWAY}?env=dev` ) ).toBe( true )
    expect( belongsToGateway( GATEWAY, `${GATEWAY}#map` ) ).toBe( true )
  })

  test('about:blank — the WebView load the whitelist itself always permits', () => {
    expect( belongsToGateway( GATEWAY, 'about:blank') ).toBe( true )
  })

  /**
   * The case originWhitelist gets wrong. Each of these is a prefix of the
   * gateway origin followed by something that is not a separator, so a
   * prefix test says yes and an origin test says no.
   */
  test('a host that merely starts with the gateway origin', () => {
    expect( belongsToGateway( GATEWAY, 'https://msi.dedot.io.example.com') ).toBe( false )
    expect( belongsToGateway( GATEWAY, 'https://msi.dedot.io.example.com/steal') ).toBe( false )
    expect( belongsToGateway( GATEWAY, 'https://msi.dedot.iox/') ).toBe( false )
    expect( belongsToGateway( GATEWAY, 'https://msi.dedot.io@evil.example/') ).toBe( false )
  })

  test('another origin entirely', () => {
    expect( belongsToGateway( GATEWAY, 'https://evil.example/') ).toBe( false )
    expect( belongsToGateway( GATEWAY, 'http://msi.dedot.io/') ).toBe( false )   // scheme downgrade
    expect( belongsToGateway( GATEWAY, 'javascript:alert(1)') ).toBe( false )
  })

  test('a dev gateway is matched on its port too', () => {
    const DEV = 'http://10.0.2.2:4800'

    expect( belongsToGateway( DEV, `${DEV}/` ) ).toBe( true )
    expect( belongsToGateway( DEV, 'http://10.0.2.2:48001/') ).toBe( false )
  })

  test('nothing matches an empty side', () => {
    expect( belongsToGateway( GATEWAY, '') ).toBe( false )
    expect( belongsToGateway( '', 'https://msi.dedot.io') ).toBe( false )
  })
})
