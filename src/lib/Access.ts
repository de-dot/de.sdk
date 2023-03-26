
import type { Credentials, AccessOptions, HTTPRequestOptions } from '../types/access'
import req from 'request-promise'

const EXPIRY_TIME = 3.75 // in 3 minutes 45 seconds

export default class Access {
  private version: number
  protected creds: Credentials
  private expiryTime?: NodeJS.Timeout
  private autorefresh?: boolean
  private baseURL: string
  public accessToken?: string

  constructor( creds: Credentials, options?: AccessOptions ){

    if( !creds ) throw new Error('Undefined credentials. Check https://doc.delidev.com/sdk/auth')
    if( !creds.workspace ) throw new Error('Undefined workspace reference. Check https://doc.delidev.com/sdk/auth')
    if( !creds.appId ) throw new Error('Undefined app ID. Check https://doc.delidev.com/sdk/auth')
    if( !creds.appSecret ) throw new Error('Undefined app secret. Check https://doc.delidev.com/sdk/auth')

    this.creds = creds
    this.version = options?.version || 1
    this.baseURL = options?.env === 'prod' ? 'https://api.delidev.com' : 'http://api.delidev.io:24800'
    this.autorefresh = options?.autorefresh || false
  }

  async getToken(){
    const
    { workspace, appId, appSecret } = this.creds,
    options: HTTPRequestOptions = {
      url: '/access/token',
      method: 'POST',
      body: {
        workspace,
        id: appId,
        secret: appSecret
      }
    },
    { error, message, token } = await this.request( options )
    if( error ) throw new Error( message )

    // Set auto-refresh token every 4 mins
    if( this.autorefresh ){
      clearTimeout( this.expiryTime )
      this.expiryTime = setTimeout( () => this.refreshToken(), EXPIRY_TIME * 60 * 1000 )
    }
    
    this.accessToken = token
    return token
  }

  async refreshToken(){
    if( !this.accessToken )
      throw new Error('No access token found')

    try {
      const
      options: HTTPRequestOptions = {
        url: '/access/refresh',
        method: 'PATCH',
        body: { secret: this.creds.appSecret }
      },
      { error, message, token } = await this.request( options )
      if( error ) throw new Error( message )

      // Set auto-refresh token every 4 mins
      if( this.autorefresh ){
        clearTimeout( this.expiryTime )
        this.expiryTime = setTimeout( () => this.refreshToken(), EXPIRY_TIME * 60 * 1000 )
      }
      
      this.accessToken = token
      return token
    }
    catch( error: any ){
      console.error(`Refresh access token failed: ${error.message}`)
      return await this.getToken() // Get new token instead
    }
  }

  async request( options: HTTPRequestOptions ){
    
    const rawOptions: any = {
      url: '',
      method: 'GET',
      headers: {
        /**
         * Default User agent for SDK request calls
         * 
         * NOTE: Later replace by latest SDK version
         */
        'x-user-agent': `De.remote/${this.version}.0`
      },
      json: true,
      simple: false
    }

    if( this.accessToken )
      rawOptions.headers.authorization = `Bearer ${this.accessToken}`

    if( options.body )
      rawOptions.headers['content-type'] = 'application/json'

    if( typeof options.headers == 'object' )
      options.headers = {
        ...options.headers,
        ...rawOptions.headers
      }

    options = { ...rawOptions, ...options }

    if( !options.url ) throw new Error('Undefined request <url>')
    options.url = `${this.baseURL}/v${this.version}/${options.url.replace(/^\//, '')}`

    // console.log( options )
    return await req( options )
  }
}