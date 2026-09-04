import type {
	PipelineWorkerInitializeValidation,
	PipelineWorkerStatsValidation,
	PipelineWorkerStatsByNameValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Workers ──────────────────────────────────────────────────────────────────

export class PipelinesWorkers {
  constructor( private http: Http ){}

  async initialize(): Promise<Data<PipelineWorkerInitializeValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineWorkerInitializeValidation['response']>>>({
      url: '/pipelines/workers/initialize',
      method: 'POST'
    })
    if( error ) throw new Error( message )
    return data
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

  async stats(): Promise<Data<PipelineWorkerStatsValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineWorkerStatsValidation['response']>>>({
      url: '/pipelines/workers/stats',
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async statsByName( name: string ): Promise<Data<PipelineWorkerStatsByNameValidation['response']>> {
    const { error, message, data } = await this.http.request<Res<Data<PipelineWorkerStatsByNameValidation['response']>>>({
      url: `/pipelines/workers/stats/${name}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }
}
