
const { DClient } = require('../dist')

let instance

describe('[DCLIENT]: Initialize -- [/lib/DClient/index.js]', () => {
  test('Should throw: No configuration error', () => {
    expect( () => new DClient() ).toThrow(/^Undefined credentials/)
  })

  test('Should throw: Undefined credentials error', () => {
    expect( () => new DClient( '1234', { appId: 'abcd' }) )
        .toThrow(/^Undefined workspace reference/)
  })
  
  test('Return DClient API Interface<Map, Order, Event>', async () => {
    const credentials = {
      workspace: 'RFNQOkRTUC1EMDI4LTAzM0Y3QUE=',
      appId: '6B8am3SIXy6M444K8T0GjCqG',
      appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
    }
    
    instance = new DClient( '1234', credentials, { autorefresh: false } )
    const
    api = await instance.authenticate(),
    exp = expect( api )
    
    exp.toHaveProperty('Map')
    exp.toHaveProperty('Order')
    exp.toHaveProperty('Event')
  })
})

describe('[DCLIENT]: Orders -- [/lib/DClient/index.js]', () => {
  test('Return list of active orders', async () => {
    const results = await instance.fetchActiveOrders()
    expect( Array.isArray( results ) ).toBeTruthy()
  })

  test('Return client order history', async () => {
    const results = await instance.fetchOrderHistory()
    expect( Array.isArray( results ) ).toBeTruthy()
  })
})

describe('[DCLIENT]: Periferals -- [/lib/DClient/index.js]', () => {
  test('Should throw Error <Undefined epicenter location>', async () => {
    expect( async () => await instance.periferals() )
        .rejects.toThrow('Undefined epicenter location')
  })

  test('Should throw Error <Invalid location coordinates>', async () => {
    try {
      const location = { lng: 4.4409 }
      await instance.periferals( location )
    }
    catch( error ){
      expect( error.message ).toBe('Invalid location coordinates')
    }
  })

  test('Return periferal list if found any', async () => {
    const
    location = { lng: 4.4409, lat: 2.23001, heading: 20 },
    results = await instance.periferals( location )

    expect( Array.isArray( results ) ).toBeTruthy()
  })
})