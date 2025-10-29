import type { AccessOptions } from '../types/access'
import type { HTTPRequestOptions } from '../types'
import { API_SERVER_BASEURL } from '../baseUrl'

export default class Access {
  private version: number
  private baseURL: string
  protected accessToken?: string
  protected remoteOrigin?: string

  constructor( options: AccessOptions ){
    if( !options ) throw new Error('Undefined Access Configuration')
    if( !options.context ) throw new Error('Undefined Context Reference. Check https://doc.dedot.io/sdk/auth')
    if( !options.accessToken ) throw new Error('Undefined Access Token. Check https://doc.dedot.io/sdk/auth')
    
    this.version = options.version || 1
    this.accessToken = options.accessToken
    this.remoteOrigin = options.remoteOrigin
    this.baseURL = API_SERVER_BASEURL[ options.env || 'dev' ]
  }

  async request<Response>({ url, ...options }: HTTPRequestOptions ): Promise<Response> {
    const rawOptions: any = {
      method: 'GET',
      headers: {
        /**
         * Default User agent for SDK request calls
         * 
         * NOTE: Later replace by latest SDK version
         */
        origin: this.remoteOrigin,
        'de-user-agent': `De.remote/${this.version}.0`
      }
    }

    if( this.accessToken )
      rawOptions.headers.authorization = `Bearer ${this.accessToken}`

    if( options.body ){
      rawOptions.headers['content-type'] = 'application/json'
      if( typeof options.body === 'object' )
        options.body = JSON.stringify( options.body )
    }

    if( typeof options.headers == 'object' )
      options.headers = {
        ...options.headers,
        ...rawOptions.headers
      }

    options = { ...rawOptions, ...options }

    url = `${this.baseURL}/v${this.version}/${url.replace(/^\//, '')}`

    // Support fetch for in both node & browser environment
    let fetch = globalThis?.window && globalThis?.fetch
    if( !fetch )
      fetch = ( await import('node-fetch') ).default as any

    // console.log( options )
    return await ( await fetch( url, options ) ).json() as Response
  }

  setToken( token: string ): void { this.accessToken = token }
}