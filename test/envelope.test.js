// ─────────────────────────────────────────────────────────────
// @de./sdk — the envelope contract
//
// Every De. route answers { error, status, message?, trace?, data }, and the
// clients hand that back whole. Two rules follow, and the whole integration
// rests on them:
//
//   · a REFUSAL is returned, not thrown — `status` names it precisely
//     (SENDER_CAP_REACHED, AGENT::ORDER::NOT_FOUND), and an exception message
//     is not a place to put that
//   · a body that is NOT the envelope is thrown, because it is not De.
//     answering. Fastify's own 404 carries `error` as the string 'Not Found',
//     and returning that as a refusal is how a wrong URL once masqueraded as a
//     workspace being told no
//
// The suite this replaces tested a pre-2.0 API — appId/appSecret credentials,
// client.nearby(), a server on localhost:5000 — and 62 of its 63 assertions
// failed. Nothing ran it, because there is no CI.
// ─────────────────────────────────────────────────────────────

const { LSP, APIError, statusOf } = require('../dist')

const CONTEXT = Buffer.from('wid-1:LSP:299-C30A-00C1386').toString('base64')

/** Capture what the client sends, and answer with whatever the test wants. */
const stubFetch = responder => {
  const calls = []

  globalThis.fetch = async ( url, options ) => {
    calls.push({ url, options })

    const { status = 200, body } = responder({ url, options })

    return {
      status,
      statusText: String( status ),
      json: async () => {
        if( body === undefined ) throw new Error('no body')
        return body
      }
    }
  }

  return calls
}

const client = () => new LSP({
  context: CONTEXT,
  baseUrl: 'http://localhost:24800',
  platform: 'proxy',
  accessToken: 'token-123'
})

const ORIGINAL_FETCH = globalThis.fetch
afterEach( () => { globalThis.fetch = ORIGINAL_FETCH })

describe('what a client hands back', () => {
  test('a success comes back as the whole envelope, not the payload', async () => {
    stubFetch( () => ({ body: { error: false, status: 'ORDER::LIST', data: { orders: [ 1, 2 ] } } }) )

    const response = await client().orders.list()

    expect( response.error ).toBe( false )
    expect( response.status ).toBe('ORDER::LIST')
    expect( response.data ).toEqual({ orders: [ 1, 2 ] })
  })

  test('a refusal is returned, carrying the status that names it', async () => {
    stubFetch( () => ({
      status: 404,
      body: { error: true, status: 'AGENT::ORDER::NOT_FOUND', message: 'No such order' }
    }) )

    const response = await client().orders.list()

    expect( response.error ).toBe( true )
    expect( response.status ).toBe('AGENT::ORDER::NOT_FOUND')
  })

  test("a body that is not the envelope throws — it is not De. answering", async () => {
    // Fastify's own 404: `error` is the string 'Not Found', not a boolean.
    stubFetch( () => ({ status: 404, body: { statusCode: 404, error: 'Not Found', message: 'Route not found' } }) )

    await expect( client().orders.list() ).rejects.toThrow( APIError )
  })

  test('a body that will not parse throws, carrying the status', async () => {
    stubFetch( () => ({ status: 502, body: undefined }) )

    await expect( client().orders.list() ).rejects.toMatchObject({ status: 502 })
  })
})

describe('statusOf', () => {
  test('recovers the HTTP status the envelope does not carry', async () => {
    stubFetch( () => ({ status: 409, body: { error: true, status: 'CONSOLIDATION::NOT_IN_PROGRESS' } }) )

    const response = await client().orders.list()

    expect( statusOf( response ) ).toBe( 409 )
  })

  test('is keyed on identity, so concurrent calls cannot read each other', async () => {
    // A proxy forwarding err.status would otherwise degrade every refusal to
    // whichever call happened to answer last.
    let n = 0
    stubFetch( () => {
      n++
      return { status: n === 1 ? 409 : 403, body: { error: true, status: `REFUSAL_${n}` } }
    })

    const c = client()
    const [ first, second ] = await Promise.all([ c.orders.list(), c.orders.list() ])

    expect( statusOf( first ) ).not.toBe( statusOf( second ) )
    expect( [ statusOf( first ), statusOf( second ) ].sort() ).toEqual([ 403, 409 ])
  })
})

describe('what goes on the wire', () => {
  test('the request carries the user agent De. gates on', async () => {
    // de.auth and de.arch check `de-user-agent` against ALLOWED_USER_AGENTS and
    // answer 412 before any handler runs, so this header is load-bearing.
    const calls = stubFetch( () => ({ body: { error: false, status: 'OK', data: {} } }) )

    await client().orders.list()

    expect( calls[0].options.headers['de-user-agent'] ).toBe('De.proxy/1.0')
    expect( calls[0].options.headers.authorization ).toBe('Bearer token-123')
  })

  test('the path is versioned exactly once', async () => {
    const calls = stubFetch( () => ({ body: { error: false, status: 'OK', data: {} } }) )

    await client().orders.list()

    expect( calls[0].url.startsWith('http://localhost:24800/v1/') ).toBe( true )
    expect( calls[0].url ).not.toMatch(/\/v1\/v1\//)
  })
})

describe('context', () => {
  test('scope decodes the context into its three parts', () => {
    expect( client().scope ).toEqual({ wid: 'wid-1', type: 'LSP', xcode: '299-C30A-00C1386' })
  })

  test('scope is undefined rather than throwing when the context is not one', () => {
    const c = new LSP({ context: 'not-base64-context', baseUrl: 'http://localhost:24800', platform: 'proxy', accessToken: 'token-123' })
    expect( c.scope ).toBeUndefined()
  })
})
