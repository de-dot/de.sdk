import type {
	PipelineTemplateCreateValidation,
	PipelineTemplateGetValidation,
	PipelineTemplateListValidation,
	PipelineTemplateUpdateValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Templates ────────────────────────────────────────────────────────────────

export class PipelinesTemplates {
  constructor( private http: Http ){}

  async create( body: PipelineTemplateCreateValidation['body'] ): Promise<PipelineTemplateCreateValidation['response']> {
    return await this.http.request<PipelineTemplateCreateValidation['response']>({
      url: '/pipelines/templates',
      method: 'POST',
      body
    })
  }

  async list( querystring?: PipelineTemplateListValidation['querystring'] ): Promise<PipelineTemplateListValidation['response']> {
    return await this.http.request<PipelineTemplateListValidation['response']>({
      url: `/pipelines/templates${qs( querystring )}`,
      method: 'GET'
    })
  }

  async get( id: string ): Promise<PipelineTemplateGetValidation['response']> {
    return await this.http.request<PipelineTemplateGetValidation['response']>({
      url: `/pipelines/templates/${id}`,
      method: 'GET'
    })
  }

  async update( id: string, body: PipelineTemplateUpdateValidation['body'] ): Promise<PipelineTemplateUpdateValidation['response']> {
    return await this.http.request<PipelineTemplateUpdateValidation['response']>({
      url: `/pipelines/templates/${id}`,
      method: 'PATCH',
      body
    })
  }

  async delete( id: string ): Promise<void> {
    const { error, message } = await this.http.request<Res>({
      url: `/pipelines/templates/${id}`,
      method: 'DELETE'
    })
    if( error ) throw new Error( message )
  }
}
