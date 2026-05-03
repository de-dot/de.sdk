import type {
	PipelineInterventionStageValidation,
	PipelineInterventionExecutionValidation
} from '@de./types'
import { type Http, type Res } from '../../utils'

// ─── Interventions ────────────────────────────────────────────────────────────

export class PipelinesInterventions {
  constructor( private http: Http ){}

  async stage( executionId: string, stageId: string, body?: PipelineInterventionStageValidation['body'] ): Promise<PipelineInterventionStageValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineInterventionStageValidation['response']>>({
      url: `/pipelines/interventions/stage/${executionId}/${stageId}`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async execution( executionId: string, body?: PipelineInterventionExecutionValidation['body'] ): Promise<PipelineInterventionExecutionValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineInterventionExecutionValidation['response']>>({
      url: `/pipelines/interventions/execution/${executionId}`,
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }
}
