
const { DClient } = require('../dist')

const DEBUG_TEST = true
let instance

describe('[DCLIENT TEST] ------------------------------------------------', function(){
  describe('# Initialize: (/lib/DClient/index.js)', function(){
    it('Should throw Error <Undefined credentials. Check https://doc.delidev.com/sdk/auth>', function(){
      try { new DClient() }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Should throw Error <Undefined [credential field]. Check https://doc.delidev.com/sdk/auth>', function(){
      try { new DClient({ clientId: 'abcd' }) }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })
    
    it('Get access token and return Interface<Map, Order, Event>', async function(){
      const credentials = {
        clientType: 'DSP',
        clientId: 'DSP-D028-033F7AA',
        appId: '6B8am3SIXy6M444K8T0GjCqG',
        appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
      }
      
      instance = new DClient( credentials )
      const { Map, Order, Event } = await instance.authenticate()
    })
  })
})