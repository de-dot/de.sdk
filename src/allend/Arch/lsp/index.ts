import type { HTTPRequestOptions, OrderService, HTTPResponse, Entity  } from '../../types'
import Arch from '..'

type OrderServiceResponse = HTTPResponse<{ orders: LSP[] }>

export default class LSPRest {
  constructor( 
    private arch: Arch
  ){
    this.arch = arch
  }

  async fetchLSP(){
    const
    options: HTTPRequestOptions = {
      url: `/client/${this.clientId}/orders/actives`,
      method: 'GET'
    },
    { error, message, data } = await this.arch.request<OrderServiceResponse>( options )
    if( error ) throw new Error( message )
    
    return data.orders
  }
}