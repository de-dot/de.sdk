import type {
	PipelineTemplateCreateValidation,
	PipelineTemplateGetValidation,
	PipelineTemplateListValidation,
	PipelineTemplateUpdateValidation
} from '@de./types'
import { qs, type Http, type Res } from './utils'

// ─── Templates ────────────────────────────────────────────────────────────────

export class PipelinesTemplates {
  constructor( private http: Http ){}

  async create( body: PipelineTemplateCreateValidation['body'] ): Promise<PipelineTemplateCreateValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineTemplateCreateValidation['response']>>({
      url: '/pipelines/templates',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async list( querystring?: PipelineTemplateListValidation['querystring'] ): Promise<PipelineTemplateListValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineTemplateListValidation['response']>>({
      url: `/pipelines/templates${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async get( id: string ): Promise<PipelineTemplateGetValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineTemplateGetValidation['response']>>({
      url: `/pipelines/templates/${id}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async update( id: string, body: PipelineTemplateUpdateValidation['body'] ): Promise<PipelineTemplateUpdateValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineTemplateUpdateValidation['response']>>({
      url: `/pipelines/templates/${id}`,
      method: 'PATCH',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async delete( id: string ): Promise<void> {
    const { error, message } = await this.http.request<Res>({
      url: `/pipelines/templates/${id}`,
      method: 'DELETE'
    })
    if( error ) throw new Error( message )
  }
}
