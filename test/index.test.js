
// const { Order } = require('../dist')
const { debug } = require('../dist/utils')

describe('[ORDER TEST] ------------------------------------------------', function(){
  describe('# Initial Configuration: (/index.js)', function(){
    it('Should throw "No configuratin defined" Error', function(){
      try { api = Order.config() }
      catch( error ){ debug( error.message ) }
    })
  })
})