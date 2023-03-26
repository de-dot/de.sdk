
const { Access } = require('../dist')

let instance

describe('[ACCESS]: Configurations -- [/lib/Access.js]', () => {
  test('Should throw: No configuration error', () => {
    expect( () => new Access() ).toThrow(/^Undefined credentials/)
  })

  test('Should throw configuration fields missing error', () => {
    expect( () => new Access({ workspace: 'abcd' }) )
        .toThrow(/^Undefined app ID/)
  })

  test('Should throw Error <Application Not Found>', async () => {
    try {
      const credentials = {
        workspace: 'abcd',
        appId: '1234',
        appSecret: '83buf...bh929'
      }
      
      instance = new Access( credentials )
      await instance.getToken()
    }
    catch( error ){ expect( error.message ).toBe('Application Not Found') }
  })
})

describe('[ACCESS]: Setup -- [/lib/Access.js]', () => {
  test('Return response with <token>', async () => {
    const credentials = {
      workspace: 'RFNQOkRTUC1EMDI4LTAzM0Y3QUE=',
      appId: '6B8am3SIXy6M444K8T0GjCqG',
      appSecret: 'oSHwEPPrbrR5x6Qtn77ehiiTRibNkp58T4T1tR906wvUgYuC'
    }
    
    instance = new Access( credentials )

    const token = await instance.getToken()
    expect( token ).toMatch(/\w+/)
  })

  test('Return response with new <token> value', async () => {
    const token = await instance.refreshToken()
    expect( token ).toMatch(/\w+/)
  })
})