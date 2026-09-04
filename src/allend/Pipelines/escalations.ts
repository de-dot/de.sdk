import type {
	PipelineEscalationListValidation,
	PipelineEscalationResolveValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Escalations ──────────────────────────────────────────────────────────────

export class PipelinesEscalations {
  constructor( private http: Http ){}

  async list( querystring?: PipelineEscalationListValidation['querystring'] ): Promise<PipelineEscalationListValidation['response']> {
    return await this.http.request<PipelineEscalationListValidation['response']>({
      url: `/pipelines/escalations${qs( querystring )}`,
      method: 'GET'
    })
  }

  async resolve( id: string, body?: PipelineEscalationResolveValidation['body'] ): Promise<PipelineEscalationResolveValidation['response']> {
    return await this.http.request<PipelineEscalationResolveValidation['response']>({
      url: `/pipelines/escalations/${id}/resolve`,
      method: 'POST',
      body
    })
  }
}
