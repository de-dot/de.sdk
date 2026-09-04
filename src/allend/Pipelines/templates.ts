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

  async create( body: PipelineTemplateCreateValidation['body'] ): Promise<Data<PipelineTemplateCreateValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineTemplateCreateValidation['response']>>>({
      url: '/pipelines/templates',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async list( querystring?: PipelineTemplateListValidation['querystring'] ): Promise<Data<PipelineTemplateListValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineTemplateListValidation['response']>>>({
      url: `/pipelines/templates${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async get( id: string ): Promise<Data<PipelineTemplateGetValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineTemplateGetValidation['response']>>>({
      url: `/pipelines/templates/${id}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async update( id: string, body: PipelineTemplateUpdateValidation['body'] ): Promise<Data<PipelineTemplateUpdateValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineTemplateUpdateValidation['response']>>>({
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
