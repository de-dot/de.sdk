
const { DClient } = require('../dist')

const clientId = '1234567890'
let 
instance,
Event

describe('[DCLIENT - EVENT]: Initialize DClient -- [/lib/DClient/index.js]', () => {
  test('DClient initialized', async () => {
    const credentials = {
      workspace: 'RFNQOkRTUC1EMDI4LTAzM0Y3QUE=',
      appId: '6B8am3SIXy6M444K8T0GjCqG',
      appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
    }
    
    instance = new DClient( '1234', credentials, { autorefresh: false } )
    api = await instance.authenticate(),
    exp = expect( api )
    
    exp.toHaveProperty('Map')
    exp.toHaveProperty('Order')
    exp.toHaveProperty('Event')

    Event = api.Event
  })

  test('Connect to Event socket server successfully', async () => {
    try { await Event.connect() }
    catch( error ){
      expect( error.message ).toBe('<clientId> argument required')
    }
  })

  test('Should throw error: Cannot read properties of undefined (reading \'split\')', () => {
    expect( Event.join('1234567890qbcdefghij') ).rejects.toBe('Cannot read properties of undefined (reading \'split\')')
  })

  test('Join a socket connection successfully', () => {
    const jrtoken = 'rpTYDEds5EhMz1gNv4ibXLh9JVSAR9ezydiLyVYYiHeWTdn6vqmzVaNqMEj4YmKmjcF5BUL5aztS1yneFG47nFoE9itmdbeXDLd4UDqRAFXkdqpZ49zUhik66izpoxFYDjngM1Tq82esqt85tovwRDR34QQ6v87hQmzQrtzKGTUTcTZ1G13rJ5gRiKoRtiVBf5iDTprUwaXF78vkacZ8W4mMuQzL22$3oJLhGZhQLbHxhHZ9xtoPCJ2GufVmj2sDm1d'
    expect( Event.join( jrtoken ) ).resolves.toBeTruthy()
  })

  test('Disconnect from Event socket server successfully', async () => {
    expect( Event.disconnect() ).toBeTruthy()
  })
})
