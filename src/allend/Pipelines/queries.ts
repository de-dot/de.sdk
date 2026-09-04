import type {
	PipelineQueriesSearchValidation,
	PipelineQueriesRecommendValidation
} from '@de./types'
import { type Http, type Res, type Data } from '../../utils'

// ─── Queries ──────────────────────────────────────────────────────────────────

export class PipelinesQueries {
  constructor( private http: Http ){}

  async search( body: PipelineQueriesSearchValidation['body'] ): Promise<PipelineQueriesSearchValidation['response']> {
    return await this.http.request<PipelineQueriesSearchValidation['response']>({
      url: '/pipelines/queries/search',
      method: 'POST',
      body
    })
  }

  async recommend( body: PipelineQueriesRecommendValidation['body'] ): Promise<PipelineQueriesRecommendValidation['response']> {
    return await this.http.request<PipelineQueriesRecommendValidation['response']>({
      url: '/pipelines/queries/recommend',
      method: 'POST',
      body
    })
  }
}
