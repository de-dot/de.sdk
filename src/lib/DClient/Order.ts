
import type Access from '../Access'
import type { HTTPRequestOptions } from '../../types/access'

export default class Order {
  private ca: Access // Client Access

  constructor( ca: Access ){
    this.ca = ca
  }

  async intent( clientId: string ){
    if( !clientId )
      throw new Error('<clientId> argument required')
    
    const
    options: HTTPRequestOptions = {
      url: '/order/intent',
      method: 'POST',
      body: { clientId }
    },
    { error, message, token } = await this.ca.request( options )
    if( error ) throw new Error( message )
    
    return token
  }

  async unintent( token: string ){
    if( !token )
      throw new Error('Invalid order intent token')

    const
    options: HTTPRequestOptions = {
      url: '/order/intent',
      method: 'DELETE',
      headers: { 'x-intent-token': token }
    },
    { error, message } = await this.ca.request( options )
    if( error ) throw new Error( message )
    
    return true
  }
}