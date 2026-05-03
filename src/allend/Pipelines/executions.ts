import type {
	PipelineExecutionCreateValidation,
	PipelineExecutionGetValidation,
	PipelineExecutionListValidation,
	PipelineExecutionActionValidation,
	PipelineExecutionCancelValidation
} from '@de./types'
import { qs, type Http, type Res } from '../../utils'

// ─── Executions ───────────────────────────────────────────────────────────────

export class PipelinesExecutions {
  constructor( private http: Http ){}

  async create( body: PipelineExecutionCreateValidation['body'] ): Promise<PipelineExecutionCreateValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineExecutionCreateValidation['response']>>({
      url: '/pipelines/executions',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async list( querystring?: PipelineExecutionListValidation['querystring'] ): Promise<PipelineExecutionListValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineExecutionListValidation['response']>>({
      url: `/pipelines/executions${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async get( id: string ): Promise<PipelineExecutionGetValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineExecutionGetValidation['response']>>({
      url: `/pipelines/executions/${id}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async start( id: string ): Promise<PipelineExecutionActionValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineExecutionActionValidation['response']>>({
      url: `/pipelines/executions/${id}/start`,
      method: 'POST'
    })
    if( error ) throw new Error( message )
    return data
  }

  async cancel( id: string, body: PipelineExecutionCancelValidation['body'] ): Promise<PipelineExecutionCancelValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineExecutionCancelValidation['response']>>({
      url: `/pipelines/executions/${id}/cancel`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }
}
