import type {
	PipelineEscalationListValidation,
	PipelineEscalationResolveValidation
} from '@de./types'
import { qs, type Http, type Res } from './utils'

// ─── Escalations ──────────────────────────────────────────────────────────────

export class PipelinesEscalations {
  constructor( private http: Http ){}

  async list( querystring?: PipelineEscalationListValidation['querystring'] ): Promise<PipelineEscalationListValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineEscalationListValidation['response']>>({
      url: `/pipelines/escalations${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async resolve( id: string, body?: PipelineEscalationResolveValidation['body'] ): Promise<PipelineEscalationResolveValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineEscalationResolveValidation['response']>>({
      url: `/pipelines/escalations/${id}/resolve`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }
}
