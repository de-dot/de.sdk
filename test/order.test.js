
const { DClient } = require('../dist')

const DEBUG_TEST = true
let 
instance,
Order,
intentToken

describe('[DCLIENT ORDER TEST] --------------------------------------', function(){

  describe('# -- Initialize DClient -- [/lib/DClient/index.js]', function(){
    it('DClient initialized', async function(){
      const credentials = {
        workspace: 'RFNQOkRTUC1EMDI4LTAzM0Y3QUE=',
        appId: '6B8am3SIXy6M444K8T0GjCqG',
        appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
      }
      
      instance = new DClient( '1234', credentials )
      Order = ( await instance.authenticate() ).Order
      if( !Order )
        throw new Error('DClient initialization failed')
    })

    it('Should throw Error <<clientId> argument required>', async function(){
      if( !Order ) return

      try { await Order.intent() }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })
  })

  describe('# -- Initiate Order -- [/lib/DClient/Order.js]', function(){
    it('Create order intent successfully', async function(){
      if( !Order ) return

      intentToken = await Order.intent('1234567890')
      console.log( intentToken )
    })

    it('Should throw Error <Invalid order intent token>', async function(){
      if( !Order ) return

      try { await Order.unintent() }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Revoke order intent successfully', async function(){
      if( !Order ) return
      await Order.unintent( intentToken )
    })
  })
  
})