// ─────────────────────────────────────────────────────────────
// @de./sdk — Auth, with either credential
//
// A connector answers to two credentials. The secret (`de_sk_…`) belongs on a
// server; the publishable key (`de_pk_…`) is made to ship inside an app. The
// properties that matter:
//
//   · each sends only its own fields — a publishable request carries no cid,
//     secret or uid for de.arch to be confused by
//   · a publishable key renews by minting afresh: rotation proves possession
//     of the secret, which an app does not have
//   · a secret is refused inside an app. It works perfectly there, which is
//     exactly why nothing else would ever say so
// ─────────────────────────────────────────────────────────────

const { Auth } = require('../dist')

const CONTEXT = Buffer.from('wid-1:LSP:299-C30A-00C1386').toString('base64')

const stubFetch = () => {
  const calls = []
  let n = 0

  globalThis.fetch = async ( url, options ) => {
    calls.push({ url, method: options.method, body: options.body && JSON.parse( options.body ) })
    return { status: 200, json: async () => ({ error: false, status: 'ACCESS::TOKEN', data: { token: `token-${++n}` } }) }
  }

  return calls
}

afterEach( () => {
  delete globalThis.fetch
  delete globalThis.document
})

describe('with a secret', () => {
  it('sends cid, secret and uid', async () => {
    const calls = stubFetch()

    await new Auth({ context: CONTEXT, cid: 'c1', secret: 'de_sk_x', uid: 'op-1' }).getToken()

    expect( calls[0].url ).toMatch(/\/v1\/access\/token$/)
    expect( calls[0].body ).toMatchObject({ context: CONTEXT, cid: 'c1', secret: 'de_sk_x', uid: 'op-1' })
    expect( calls[0].body ).not.toHaveProperty('publicKey')
  })

  it('rotates by proving the secret', async () => {
    const calls = stubFetch()
    const auth = new Auth({ context: CONTEXT, cid: 'c1', secret: 'de_sk_x' })

    await auth.getToken()
    await auth.rotateToken()

    expect( calls[1] ).toMatchObject({ method: 'PATCH', body: { secret: 'de_sk_x' } })
    expect( calls[1].url ).toMatch(/\/access\/token\/rotate$/)
  })

  it('is refused inside a browser', () => {
    globalThis.document = {}

    expect( () => new Auth({ context: CONTEXT, cid: 'c1', secret: 'de_sk_x' }) ).toThrow(/cannot be used inside an app/)
  })

  it('never sends an expiry — token life is the server\'s', async () => {
    const calls = stubFetch()

    await new Auth({ context: CONTEXT, cid: 'c1', secret: 'de_sk_x' }).getToken()

    expect( calls[0].body ).not.toHaveProperty('expire')
  })
})

describe('with a publishable key', () => {
  it('sends the key and nothing that would name a connector or a user', async () => {
    const calls = stubFetch()

    await new Auth({ context: CONTEXT, publicKey: 'de_pk_y' }).getToken()

    expect( calls[0].body ).toEqual({ context: CONTEXT, publicKey: 'de_pk_y' })
  })

  it('renews by minting again, never through rotation', async () => {
    const calls = stubFetch()
    const seen = []
    const auth = new Auth({ context: CONTEXT, publicKey: 'de_pk_y', onNewToken: t => seen.push( t ) })

    await auth.getToken()
    const renewed = await auth.rotateToken()

    expect( calls.map( c => c.url.replace(/^.*\/v1/, '') ) ).toEqual(['/access/token', '/access/token'])
    expect( renewed ).toBe('token-2')
    expect( seen ).toEqual(['token-2'])
  })

  it('works inside an app', () => {
    globalThis.document = {}

    expect( () => new Auth({ context: CONTEXT, publicKey: 'de_pk_y' }) ).not.toThrow()
  })

  it('refuses a secret alongside it', () => {
    expect( () => new Auth({ context: CONTEXT, publicKey: 'de_pk_y', cid: 'c1', secret: 'de_sk_x' }) ).toThrow(/not both/)
  })
})
