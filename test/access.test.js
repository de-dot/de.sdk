
const { Access } = require('../dist')

const DEBUG_TEST = true
let instance

describe('[ACCESS TEST] --------------------------------------', function(){
  describe('# -- Initialize -- [/lib/Access.js]', function(){
    it('Should throw Error <Undefined credentials. Check https://doc.delidev.com/sdk/auth>', function(){
      try { new Access() }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Should throw Error <Undefined [credential field]. Check https://doc.delidev.com/sdk/auth>', function(){
      try { new Access({ workspace: 'abcd' }) }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Should throw Error <Application Not Found>', async function(){
      try {
        const credentials = {
          workspace: 'abcd',
          appId: '1234',
          appSecret: '83buf...bh929'
        }
        
        instance = new Access( credentials )
        await instance.getToken()
      }
      catch( error ){ DEBUG_TEST && console.error( error.message ) }
    })

    it('Return response with <token>', async function(){
      const credentials = {
        workspace: 'RFNQOkRTUC1EMDI4LTAzM0Y3QUE=',
        appId: '6B8am3SIXy6M444K8T0GjCqG',
        appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
      }
      
      instance = new Access( credentials )
      await instance.getToken()
    })

    it('Return response with new <token> value', async function(){
      await instance.refreshToken()
    })
  })
})