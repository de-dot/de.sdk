import type { AccessOptions } from '../../types/access'
import type { HTTPRequestOptions, RTLocation, MSIEntity, HTTPResponse } from '../../types'
import AccessManager from '../Access'

type OrderServiceResponse = HTTPResponse<{ orders: any[] }>
type NearbyResponse = HTTPResponse<{ nearby: MSIEntity[] }>

export default class Client extends AccessManager {
  private clientId: string

  constructor( clientId: string, access: AccessOptions ){
    if( !clientId ) 
      throw new Error('Undefined <clientId>')

    // Instanciate access
    super( access, 'API' )
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
    { error, message, data } = await this.request<OrderServiceResponse>( options )
    if( error ) throw new Error( message )
    
    return data.orders
  }

  async fetchOrderHistory(){
    if( !this.accessToken )
      throw new Error('Authentication required')
    
    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/orders/history`,
      method: 'GET'
    },
    { error, message, data } = await this.request<OrderServiceResponse>( options )
    if( error ) throw new Error( message )
    
    return data.orders
  }

  async nearby( location: RTLocation ){
    if( !this.accessToken )
      throw new Error('Authentication required')

    if( !location )
      throw new Error('Undefined epicenter location')

    if( !location.lng || !location.lat )
      throw new Error('Invalid location coordinates')

    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/nearby`,
      method: 'POST',
      body: location
    },
    { error, message, data } = await this.request<NearbyResponse>( options )
    if( error ) throw new Error( message )
    
    return data.nearby
  }
}