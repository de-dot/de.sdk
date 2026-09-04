import type {
	PipelineWorkerInitializeValidation,
	PipelineWorkerStatsValidation,
	PipelineWorkerStatsByNameValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Workers ──────────────────────────────────────────────────────────────────

export class PipelinesWorkers {
  constructor( private http: Http ){}

  async initialize(): Promise<PipelineWorkerInitializeValidation['response']> {
    return await this.http.request<PipelineWorkerInitializeValidation['response']>({
      url: '/pipelines/workers/initialize',
      method: 'POST'
    })
  }

  async start(): Promise<void> {
    const { error, message } = await this.http.request<Res>({
      url: '/pipelines/workers/start',
      method: 'POST'
    })
    if( error ) throw new Error( message )
  }

  async stop(): Promise<void> {
    const { error, message } = await this.http.request<Res>({
      url: '/pipelines/workers/stop',
      method: 'POST'
    })
    if( error ) throw new Error( message )
  }

  async stats(): Promise<PipelineWorkerStatsValidation['response']> {
    return await this.http.request<PipelineWorkerStatsValidation['response']>({
      url: '/pipelines/workers/stats',
      method: 'GET'
    })
  }

  async statsByName( name: string ): Promise<PipelineWorkerStatsByNameValidation['response']> {
    return await this.http.request<PipelineWorkerStatsByNameValidation['response']>({
      url: `/pipelines/workers/stats/${name}`,
      method: 'GET'
    })
  }
}
