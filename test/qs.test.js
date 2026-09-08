// ─────────────────────────────────────────────────────────────
// @de./sdk — querystring serialization
//
// De.'s routes declare array querystring parameters (`state`, `status`, …) and
// Fastify parses repeated keys into arrays. `String( value )` on an array gives
// a comma-joined string, so the route answers `querystring/state must be array`
// — the schema was right and the request never matched it.
// ─────────────────────────────────────────────────────────────

const { qs } = require('../dist/utils')

describe('querystring', () => {

  test('an array becomes repeated keys, not a comma join', () => {
    expect( qs({ state: ['PROPOSED', 'COMMITTED'] }) ).toBe('?state=PROPOSED&state=COMMITTED')
    expect( qs({ state: ['PROPOSED', 'COMMITTED'] }) ).not.toContain('%2C')
  })

  test('scalars are unchanged', () => {
    expect( qs({ limit: 50, agentId: 'a-1' }) ).toBe('?limit=50&agentId=a-1')
  })

  test('null and undefined are dropped, on their own and inside an array', () => {
    expect( qs({ a: 1, b: null, c: undefined }) ).toBe('?a=1')
    expect( qs({ state: ['A', null, 'B'] }) ).toBe('?state=A&state=B')
  })

  test('nothing to send is an empty string, not a bare question mark', () => {
    expect( qs() ).toBe('')
    expect( qs({}) ).toBe('')
    expect( qs({ a: null }) ).toBe('')
  })

  test('values are encoded', () => {
    expect( qs({ q: 'a b&c' }) ).toBe('?q=a+b%26c')
  })
})
