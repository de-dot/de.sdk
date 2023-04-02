
export type AuthOptions = {
  env?: 'dev' | 'prod'
  version?: number
  autorefresh?: boolean
}

export type AuthCredentials = {
  workspace: string
  remoteOrigin: string
  appId: string
  appSecret: string
}

export type SocketAuthCredentials = {
  utype: string
  id: string
  remoteOrigin: string
  accessToken: string
}

export type AuthRequestOptions = {
  url: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  headers?: { [index: string]: string }
  body?: any
}