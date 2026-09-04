import type {
	PipelineExecutionCreateValidation,
	PipelineExecutionGetValidation,
	PipelineExecutionListValidation,
	PipelineExecutionActionValidation,
	PipelineExecutionCancelValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Executions ───────────────────────────────────────────────────────────────

export class PipelinesExecutions {
  constructor( private http: Http ){}

  async create( body: PipelineExecutionCreateValidation['body'] ): Promise<Data<PipelineExecutionCreateValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineExecutionCreateValidation['response']>>>({
      url: '/pipelines/executions',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async list( querystring?: PipelineExecutionListValidation['querystring'] ): Promise<Data<PipelineExecutionListValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineExecutionListValidation['response']>>>({
      url: `/pipelines/executions${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async get( id: string ): Promise<Data<PipelineExecutionGetValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineExecutionGetValidation['response']>>>({
      url: `/pipelines/executions/${id}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async start( id: string ): Promise<Data<PipelineExecutionActionValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineExecutionActionValidation['response']>>>({
      url: `/pipelines/executions/${id}/start`,
      method: 'POST'
    })
    if( error ) throw new Error( message )
    return data
  }

  async cancel( id: string, body: PipelineExecutionCancelValidation['body'] ): Promise<Data<PipelineExecutionCancelValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineExecutionCancelValidation['response']>>>({
      url: `/pipelines/executions/${id}/cancel`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }
}
