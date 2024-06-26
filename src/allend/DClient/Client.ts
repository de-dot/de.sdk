
import type { AccessOptions } from '../../types/access'
import type { HTTPRequestOptions, GPSLocation, OrderService, HTTPResponse, Vehicle  } from '../../types'
import Access from '../Access'

type OrderServiceResponse = HTTPResponse & {
  orders: OrderService[]
}
type PeriferalsResponse = HTTPResponse & {
  periferals: Vehicle[]
}

export default class Client extends Access {
  private clientId: string

  constructor( clientId: string, access: AccessOptions ){
    if( !clientId ) 
      throw new Error('Undefined <clientId>')

    // Instanciate access
    super( access )
    // ID/reference of the client on this session
    this.clientId = clientId
  }

  async fetchActiveOrders(){
    if( !this.accessToken )
      throw new Error('Authentication required')
      
    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/orders/actives`,
      method: 'GET'
    },
    { error, message, orders } = await this.request<OrderServiceResponse>( options )
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
    { error, message, orders } = await this.request<OrderServiceResponse>( options )
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
    { error, message, periferals } = await this.request<PeriferalsResponse>( options )
    if( error ) throw new Error( message )
    
    return periferals
  }
}