import type {
	PipelineQueriesSearchValidation,
	PipelineQueriesRecommendValidation
} from '@de./types'
import { type Http, type Res } from './utils'

// ─── Queries ──────────────────────────────────────────────────────────────────

export class PipelinesQueries {
  constructor( private http: Http ){}

  async search( body: PipelineQueriesSearchValidation['body'] ): Promise<PipelineQueriesSearchValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineQueriesSearchValidation['response']>>({
      url: '/pipelines/queries/search',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }

  async recommend( body: PipelineQueriesRecommendValidation['body'] ): Promise<PipelineQueriesRecommendValidation['response']> {
    const { error, message, data } = await this.http.request<Res<PipelineQueriesRecommendValidation['response']>>({
      url: '/pipelines/queries/recommend',
      method: 'POST',
      body
    })
    if( error ) throw new Error( message )
    return data
  }
}
