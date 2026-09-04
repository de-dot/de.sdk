import type {
	PipelineMonitorListValidation,
	PipelineMonitorGetValidation,
	PipelineMonitorOverviewValidation
} from '@de./types'
import { qs, type Http, type Res, type Data } from '../../utils'

// ─── Monitor ──────────────────────────────────────────────────────────────────

export class PipelinesMonitor {
  constructor( private http: Http ){}

  async list( querystring?: PipelineMonitorListValidation['querystring'] ): Promise<PipelineMonitorListValidation['response']> {
    return await this.http.request<PipelineMonitorListValidation['response']>({
      url: `/pipelines/monitor${qs( querystring )}`,
      method: 'GET'
    })
  }

  async get( executionId: string ): Promise<PipelineMonitorGetValidation['response']> {
    return await this.http.request<PipelineMonitorGetValidation['response']>({
      url: `/pipelines/monitor/${executionId}`,
      method: 'GET'
    })
  }

  async overview(): Promise<PipelineMonitorOverviewValidation['response']> {
    return await this.http.request<PipelineMonitorOverviewValidation['response']>({
      url: '/pipelines/monitor/overview',
      method: 'GET'
    })
  }
}
