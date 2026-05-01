import type { HTTPRequestOptions, HTTPResponse } from '../../types'
import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'
import LSPRest from './lsp'

export default class Arch extends AccessManager {
  constructor( access: AccessOptions ){
    super( access, 'API' )
  }

  get lsp(){ return new LSPRest( this ) }
}