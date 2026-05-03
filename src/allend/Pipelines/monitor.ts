import type {
	PipelineMonitorListValidation,
	PipelineMonitorGetValidation,
	PipelineMonitorOverviewValidation
} from '@de./types'
import { qs, type Http, type Res } from '../../utils'

// ─── Monitor ──────────────────────────────────────────────────────────────────

export class PipelinesMonitor {
  constructor( private http: Http ){}

  async list( querystring?: PipelineMonitorListValidation['querystring'] ): Promise<PipelineMonitorListValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineMonitorListValidation['response']>>({
      url: `/pipelines/monitor${qs( querystring )}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async get( executionId: string ): Promise<PipelineMonitorGetValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineMonitorGetValidation['response']>>({
      url: `/pipelines/monitor/${executionId}`,
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }

  async overview(): Promise<PipelineMonitorOverviewValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineMonitorOverviewValidation['response']>>({
      url: '/pipelines/monitor/overview',
      method: 'GET'
    })
    if( error ) throw new Error( message )
    return data
  }
}
