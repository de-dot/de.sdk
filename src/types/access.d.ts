
export type AccessOptions = {
  env?: 'dev' | 'prod'
  version?: number
  autorefresh?: boolean
}

export type Credentials = {
  clientType: 'dsp' | 'partner' | 'warehouse'
  clientId: string
  appId: string
  appSecret: string
}

export type HTTPRequestOptions = {
  url: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  headers?: { [index: string]: string }
  body?: any,
  json?: boolean
}