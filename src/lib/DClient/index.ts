
import type { Credentials, AccessOptions } from '../../types/access'
import Access from '../Access'
import Map from './Map'
import Order from './Order'
import Event from './Event'

export default class DClient extends Access {

  constructor( creds: Credentials, options?: AccessOptions ){
    super( creds, { ...options, autorefresh: true } )
  }

  async authenticate(){
    // Retreive access token
    await this.getToken()

    return {
      Map: new Map( this ),
      Order: new Order( this ),
      Event: new Event( this )
    }
  }
}