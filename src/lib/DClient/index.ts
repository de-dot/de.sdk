
import type { Credentials, AccessOptions } from '../../types/access'
import Access from '../Access'
import Map from './Map'

import type { HTTPRequestOptions } from '../../types/access'
import type { GPSLocation } from '../../types'
import Order from './Order'
import Event from './Event'

export default class DClient extends Access {
  public clientId: string
  public options: AccessOptions

  constructor( clientId: string, creds: Credentials, options?: AccessOptions ){
    super( creds, { autorefresh: true, ...options } )
    
    if( !clientId )
      throw new Error('Undefined <clientId> required')

    // ID/reference of the client on this session
    this.clientId = clientId
    this.options = options || {}
  }

  async authenticate(){
    // Retreive access token
    await this.getToken()

    return {
      Map: new Map( this ),
      Order: new Order( this ),
      Event: new Event( this, this.creds.workspace )
    }
  }

  async fetchActiveOrders(){
    if( !this.accessToken )
      throw new Error('Authentication required')
      
    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/orders/actives`,
      method: 'GET'
    },
    { error, message, orders } = await this.request( options )
    if( error ) throw new Error( message )
    
    return orders
  }

  async fetchOrderHistory(){
    if( !this.accessToken )
      throw new Error('Authentication required')
    
    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/orders/history`,
      method: 'GET'
    },
    { error, message, orders } = await this.request( options )
    if( error ) throw new Error( message )
    
    return orders
  }

  async periferals( location: GPSLocation ){
    if( !this.accessToken )
      throw new Error('Authentication required')

    if( !location )
      throw new Error('Undefined epicenter location')

    if( !location.lng || !location.lat )
      throw new Error('Invalid location coordinates')

    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/periferals`,
      method: 'POST',
      body: location
    },
    { error, message, periferals } = await this.request( options )
    if( error ) throw new Error( message )
    
    return periferals
  }
}