import type {
	PipelineWebhookProcessValidation,
	PipelineWebhookRegisterValidation
} from '@de./types'
import { type Http, type Res } from './utils'

// ─── Webhooks ─────────────────────────────────────────────────────────────────

export class PipelinesWebhooks {
  constructor( private http: Http ){}

  async process( body: PipelineWebhookProcessValidation['body'] ): Promise<PipelineWebhookProcessValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineWebhookProcessValidation['response']>>({
      url: '/pipelines/webhooks',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async attach( id: string, body: PipelineWebhookRegisterValidation['body'] ): Promise<void> {
    const { error, message } = await this.http.request<Res>({
      url: `/pipelines/deployed/${id}/webhook`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
  }

  async detach( id: string ): Promise<void> {
    const { error, message } = await this.http.request<Res>({
      url: `/pipelines/deployed/${id}/webhook`,
      method: 'DELETE'
    })
    if( error ) throw new Error( message )
  }
}
