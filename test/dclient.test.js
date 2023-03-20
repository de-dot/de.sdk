
const { DClient } = require('../dist')

const DEBUG_TEST = true
let instance

describe('[DCLIENT TEST] --------------------------------------', function(){
  describe('# -- Initialize -- [/lib/DClient/index.js]', function(){
    it('Should throw Error <Undefined credentials. Check https://doc.delidev.com/sdk/auth>', function(){
      try { new DClient() }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Should throw Error <Undefined [credential field]. Check https://doc.delidev.com/sdk/auth>', function(){
      try { new DClient( '1234', { workspace: 'abcd' }) }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })
    
    it('Get access token and return Interface<Map, Order, Event>', async function(){
      const credentials = {
        workspace: 'RFNQOkRTUC1EMDI4LTAzM0Y3QUE=',
        appId: '6B8am3SIXy6M444K8T0GjCqG',
        appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
      }
      
      instance = new DClient( '1234', credentials )
      const { Map, Order, Event } = await instance.authenticate()
    })
  })

  describe('# -- Periferals -- [/lib/DClient/index.js]', function(){
    it('Should throw Error <Undefined epicenter location>', async function(){
      try { await instance.periferals() }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Should throw Error <Invalid location coordinates>', async function(){
      try {
        const location = { lng: 4.4409 }
        await instance.periferals( location )
      }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Return periferal list if found any', async function(){
      const location = { lng: 4.4409, lat: 2.23001, heading: 20 }
      await instance.periferals( location )
    })
  })
})