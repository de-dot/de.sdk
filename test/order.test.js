
const { DClient } = require('../dist')

const clientId = '1234567890'
let 
instance,
Order,
intentToken,
PTC // Package Tracking Code

describe('[DCLIENT - ORDER]: Initialize DClient -- [/lib/DClient/index.js]', () => {
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

    Order = api.Order
  })

  test('Should throw Error <<clientId> argument required>', async () => {
    try { await Order.intent() }
    catch( error ){
      expect( error.message ).toBe('<clientId> argument required')
    }
  })
})

describe('[DCLIENT - ORDER]: Initiation Cycle -- [/lib/DClient/Order.js]', () => {
  test('Create order intent successfully', async () => {
    intentToken = await Order.intent( clientId )
    expect( intentToken ).toMatch(/\w+/)
  })

  test('Should throw Error <Undefined intent token>', async () => {
    try { await Order.unintent() }
    catch( error ){
      expect( error.message ).toBe('Undefined intent token')
    }
  })

  test('Should throw Error <Invalid Request>', async () => {
    try { await Order.unintent('abcd1234') }
    catch( error ){
      expect( error.message ).toBe('Invalid Request')
    }
  })

  test('Revoke order intent successfully', async () => {
    const done = await Order.unintent( intentToken )
    expect( done ).toBeTruthy()
  })

  test('New order intent', async () => {
    intentToken = await Order.intent( clientId )
    expect( intentToken ).toMatch(/\w+/)
  })
})

describe('[DCLIENT - ORDER]: Waypoints -- [/lib/DClient/Order.js]', () => {

  test('Should throw Error <Expect <list> argument to be [Waypoint or Waypoint<array>]>', async () => {
    try { await Order.addWaypoint() }
    catch( error ){
      expect( error.message ).toBe('Expect <list> argument to be [Waypoint or Waypoint<array>]')
    }
  })
  
  test('Should throw request body validation error', async () => {
    try {
      const waypoints = {
        "type": "pickup",
        "address": "Legon university, Accra - Ghana"
      }

      await Order.addWaypoint( waypoints )
    }
    catch( error ){
      expect( error.message ).toBe('body/0 must have required property \'no\'')
    }
  })
  
  test('Add waypoints to order successfully', async () => {
    const 
    waypoints = [
      {
        "no": 1,
        "type": "pickup",
        "description": "",
        "coordinates": [1.2233, 5.4433],
        "address": "Legon university, Accra - Ghana",
        "contact": {
          "type": "restaurant",
          "reference": "{{$guid}}",
          "phone": "+2330245558888",
          "email": "info@delice.com"
        }
      },
      {
        "no": 2,
        "type": "dropoff",
        "description": "",
        "coordinates": [1.2230, 5.4405],
        "address": "Madina market, Accra - Ghana",
        "contact": {
          "type": "client",
          "reference": "{{$guid}}",
          "phone": "+2330200007777",
          "email": "aurphal2012@gmail.com"
        }
      }
    ],
    response = await Order.addWaypoint( waypoints )
    
    expect( Array.isArray( response ) ).toBeTruthy()
  })

  describe('--------------- GET & FETCH', () => {
    test('Should throw Error: Expected waypoint number', async () => {
      try { await Order.getWaypoint() }
      catch( error ){
        expect( error.message ).toBe('Expected waypoint number')
      }
    })

    test('Should throw Error: Waypoint Not Found', async () => {
      try { await Order.getWaypoint( 3 ) }
      catch( error ){
        expect( error.message ).toBe('Waypoint Not Found')
      }
    })

    test('Retreive order waypoint details successfully', async () => {
      const
      response = await Order.getWaypoint( 1 ),
      exp = expect( response )
      
      exp.toHaveProperty('no')
      exp.toHaveProperty('type')
      exp.toHaveProperty('coordinates')
      exp.toHaveProperty('address')
      exp.toHaveProperty('contact')
    })

    test('Fetch order waypoints successfully', async () => {
      const response = await Order.fetchWaypoints()
      expect( Array.isArray( response ) ).toBeTruthy()
    })
  })

  describe('--------------- UPDATE', () => {
    test('Should throw Error: Waypoint Not Found', async () => {
      try {
        const 
        updates = {
          "coordinates": [1.3233, 5.4533],
          "address": "Airport Hill, 124th",
          "contact.type": "pharmacy",
          "contact.email": "quick@pharma.com"
        }
        
        await Order.updateWaypoint( 3, updates )
      }
      catch( error ){
        expect( error.message ).toBe('Waypoint Not Found')
      }
    })

    test('Update order waypoint successfully', async () => {
      const
      updates = {
        "coordinates": [1.3233, 5.4533],
        "address": "Airport Hill, 124th",
        "contact.type": "pharmacy",
        "contact.email": "quick@pharma.com"
      },
      response = await Order.updateWaypoint( 1, updates )
      
      expect( Array.isArray( response ) ).toBeTruthy()
    })
  })

  describe('--------------- DELETE', () => {
    test('Should throw Error: Expected waypoint number', async () => {
      try { await Order.deleteWaypoint() }
      catch( error ){
        expect( error.message ).toBe('Expected waypoint number')
      }
    })

    test('Should throw Error: Waypoint Not Found', async () => {
      try { await Order.deleteWaypoint( 3 ) }
      catch( error ){
        expect( error.message ).toBe('Waypoint Not Found')
      }
    })

    test('Remove order waypoint successfully', async () => {
      const response = await Order.deleteWaypoint( 2 )
      expect( Array.isArray( response ) ).toBeTruthy()
    })
  })
})

describe('[DCLIENT - ORDER]: Packages -- [/lib/DClient/Order.js]', () => {

  test('Should throw Error <Expect <list> argument to be [Package or Package<array>]>', async () => {
    try { await Order.addPackage() }
    catch( error ){
      expect( error.message ).toBe('Expect <list> argument to be [Package or Package<array>]')
    }
  })
  
  test('Should throw request body validation error', async () => {
    try {
      const packages = {
        "careLevel": 3
      }

      await Order.addPackage( packages )
    }
    catch( error ){
      expect( error.message ).toBe('body/0 must have required property \'waypointNo\'')
    }
  })
  
  test('Add packages to order successfully', async () => {
    const 
    packages = [
      {
        "waypointNo": 1,
        "careLevel": 3,
        "category": "FD",
        "weight": 0.25,
        "note": "Wrap well"
      }
    ],
    response = await Order.addPackage( packages )
    
    expect( Array.isArray( response ) ).toBeTruthy()
    PTC = response[0].PTC
  })

  describe('--------------- GET & FETCH', () => {
    test('Should throw Error: Expected Package Tracking Code', async () => {
      try { await Order.getPackage() }
      catch( error ){
        expect( error.message ).toBe('Expected Package Tracking Code')
      }
    })

    test('Should throw Error: Package Not Found', async () => {
      try { await Order.getPackage('FD-1234abcd') }
      catch( error ){
        expect( error.message ).toBe('Package Not Found')
      }
    })

    test('Retreive order package details successfully', async () => {
      const 
      response = await Order.getPackage( PTC ),
      exp = expect( response )
      
      exp.toHaveProperty('PTC')
      exp.toHaveProperty('waypointNo')
      exp.toHaveProperty('careLevel')
      exp.toHaveProperty('category')
    })

    test('Fetch order packages successfully', async () => {
      const response = await Order.fetchPackages()
      expect( Array.isArray( response ) ).toBeTruthy()
    })
  })

  describe('--------------- UPDATE', () => {
    test('Should throw Error: Package Not Found', async () => {
      try {
        const 
        updates = {
          "category": 'GR',
          "careLevel": 4
        }
        
        await Order.updatePackage('GD-1234acbd', updates )
      }
      catch( error ){
        expect( error.message ).toBe('Package Not Found')
      }
    })

    test('Update order package successfully', async () => {
      const
      updates = {
        "category": 'GR',
        "careLevel": 4
      },
      response = await Order.updatePackage( PTC, updates )
      
      expect( Array.isArray( response ) ).toBeTruthy()
      PTC = response[0].PTC // Update PTC
    })
  })

  describe('--------------- DELETE', () => {
    test('Should throw Error: Expected Package Tracking Code', async () => {
      try { await Order.deletePackage() }
      catch( error ){
        expect( error.message ).toBe('Expected Package Tracking Code')
      }
    })

    test('Should throw Error: Package Not Found', async () => {
      try { await Order.deletePackage('GD-1234acbd') }
      catch( error ){
        expect( error.message ).toBe('Package Not Found')
      }
    })

    test('Remove order package successfully', async () => {
      const response = await Order.deletePackage( PTC )
      expect( Array.isArray( response ) ).toBeTruthy()
    })
  })
})

describe('[DCLIENT - ORDER]: Initiate Service -- [/lib/DClient/Order.js]', () => {

  test('Should throw Error: Expect <payload> argument to be [OrderService]', async () => {
    try { await Order.initiate() }
    catch( error ){
      expect( error.message ).toBe('Expect <payload> argument to be [OrderService]')
    }
  })
  
  test('Should throw request body validation error', async () => {
    try {
      const service = {
        "xpress": "standard"
      }

      await Order.initiate( service )
    }
    catch( error ){
      expect( error.message ).toBe('body must have required property \'fees\'')
    }
  })
  
  test('Initiate order service successfully', async () => {
    const 
    service = {
      "fees": {
        "total": {
          "amount": 12,
          "currency": "GHS"
        },
        "tax": 0.015,
        "discount": 0.2
      },
      "payment": {
        "mode": "cash",
        "paid": false
      },
      "xpress": "standard"
    },
    response = await Order.initiate( service )

    expect( response ).toMatch(/\w+/)
  })

  describe('--------------- GET', () => {
    test('Should throw Error: Invalid Request', async () => {
      try { await Order.getService('1234abcd') }
      catch( error ){
        expect( error.message ).toBe('Invalid Request')
      }
    })

    test('Retreive order service details successfully', async () => {
      const
      response = await Order.getService(),
      exp = expect( response )
      
      exp.toHaveProperty('fees')
      exp.toHaveProperty('payment')
    })
  })

  describe('--------------- UPDATE', () => {
    test('Should throw body validation schema error', async () => {
      try {
        const updates = {
          "fees.total.amount": 'AB',
          "payment.method": 123,
        }
        
        await Order.updateService( updates )
      }
      catch( error ){
        expect( error.message ).toBe('body/fees.total.amount must be number')
      }
    })

    test('Update order service successfully', async () => {
      const
      updates = {
        "fees.total.amount": 30,
        "payment.method": "MOMO",
        "payment.paid": true,
        "xpress": "vip"
      },
      response = await Order.updateService( updates ),
      exp = expect( response )
      
      exp.toHaveProperty('fees')
      exp.toHaveProperty('payment')
      exp.toHaveProperty('xpress')
    })
  })

  describe('--------------- RATING', () => {
    test('Should throw error: Expect <rating> to be number betwee 0 to 5', async () => {
      try { await Order.rateService() }
      catch( error ){
        expect( error.message ).toBe('Expect <rating> to be number betwee 0 to 5')
      }
    })

    test('Should throw error: No agent assigned to the order', async () => {
      try { await Order.rateService( 4.5 ) }
      catch( error ){
        expect( error.message ).toBe('No agent assigned to the order')
      }
    })

    // TODO: Order must be assigned to an agent for this test to succeeed
    // test('Rate order service successfully', async () => {
    //   const response = await Order.rateService( 4.5 )
    //   expect( response ).toBeTruthy()
    // })
  })
})

describe('[DCLIENT - ORDER]: Operators -- [/lib/DClient/Order.js]', () => {
  test('Should throw Error: Unknown order operator', async () => {
    try { await Order.getOperator('any') }
    catch( error ){
      expect( error.message ).toBe('Unknown order operator')
    }
  })

  test('Get DSP operator on the order', async () => {
    const
    response = await Order.getOperator('DSP'),
    exp = expect( response )
    
    exp.toHaveProperty('icode')
    exp.toHaveProperty('name')
    exp.toHaveProperty('emails')
  })

  test('Get all operators on the order', async () => {
    const
    response = await Order.getOperators(),
    exp = expect( response )
    
    exp.toHaveProperty('DSP')
  })
})

describe('[DCLIENT - ORDER]: Monitoring -- [/lib/DClient/Order.js]', () => {
  test('Get order\'s current stage', async () => {
    const
    response = await Order.getCurrentStage(),
    exp = expect( response )
    
    exp.toHaveProperty('current')
    exp.toHaveProperty('status')
  })

  test('Get order\'s current route', async () => {
    const
    response = await Order.getCurrentRoute(),
    exp = expect( response )
    
    exp.toHaveProperty('itineary')
    exp.toHaveProperty('waypoints')
  })
})