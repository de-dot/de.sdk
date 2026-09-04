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

  async create( body: PipelineExecutionCreateValidation['body'] ): Promise<PipelineExecutionCreateValidation['response']> {
    return await this.http.request<PipelineExecutionCreateValidation['response']>({
      url: '/pipelines/executions',
      method: 'POST',
      body
    })
  }

  async list( querystring?: PipelineExecutionListValidation['querystring'] ): Promise<PipelineExecutionListValidation['response']> {
    return await this.http.request<PipelineExecutionListValidation['response']>({
      url: `/pipelines/executions${qs( querystring )}`,
      method: 'GET'
    })
  }

  async get( id: string ): Promise<PipelineExecutionGetValidation['response']> {
    return await this.http.request<PipelineExecutionGetValidation['response']>({
      url: `/pipelines/executions/${id}`,
      method: 'GET'
    })
  }

  async start( id: string ): Promise<PipelineExecutionActionValidation['response']> {
    return await this.http.request<PipelineExecutionActionValidation['response']>({
      url: `/pipelines/executions/${id}/start`,
      method: 'POST'
    })
  }

  async cancel( id: string, body: PipelineExecutionCancelValidation['body'] ): Promise<PipelineExecutionCancelValidation['response']> {
    return await this.http.request<PipelineExecutionCancelValidation['response']>({
      url: `/pipelines/executions/${id}/cancel`,
      method: 'POST',
      body
    })
  }
}
