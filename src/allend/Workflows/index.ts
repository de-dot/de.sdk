import type { AccessOptions } from '../../types/access'
import AccessManager from '../Access'

export default class Workflow extends AccessManager {
  constructor( access: AccessOptions ){
    super( access, 'API' )
  }

  // get lsp(){ return new LSPRest( this ) }
}