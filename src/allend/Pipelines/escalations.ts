import type {
	PipelineEscalationListValidation,
	PipelineEscalationResolveValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Escalations ──────────────────────────────────────────────────────────────

export class PipelinesEscalations {
  constructor( private http: Http ){}

  async list( querystring?: PipelineEscalationListValidation['querystring'] ): Promise<Data<PipelineEscalationListValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineEscalationListValidation['response']>>>({
      url: `/pipelines/escalations${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async resolve( id: string, body?: PipelineEscalationResolveValidation['body'] ): Promise<Data<PipelineEscalationResolveValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineEscalationResolveValidation['response']>>>({
      url: `/pipelines/escalations/${id}/resolve`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }
}
