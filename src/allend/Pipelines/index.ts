import type { Env, Platform } from '../../types'
import type { AccessOptions } from '../../types/access'
import type {
	PipelineListValidation,
	PipelineRetrieveValidation,
	PipelineDeployValidation,
	PipelineValidateValidation,
	PipelineSimulateValidation,
	PipelineSetStatusValidation
} from '@de./types'
import AccessManager from '../Access'
import { qs, type Res } from '../../utils'
import { PipelinesWorkers } from './workers'
import { PipelinesMonitor } from './monitor'
import { PipelinesQueries } from './queries'
import { PipelinesWebhooks } from './webhooks'
import { PipelinesTemplates } from './templates'
import { PipelinesAnalytics } from './analytics'
import { PipelinesExecutions } from './executions'
import { PipelinesEscalations } from './escalations'
import { PipelinesInterventions } from './interventions'

// ─── Config ───────────────────────────────────────────────────────────────────

export type PipelinesConfig = {
	context: string
	accessToken: string
	env?: Env
	platform?: Platform
	remoteOrigin?: string
	/** Per-request deadline in ms. See `AccessOptions.timeout`. */
	timeout?: number
	/** Explicit service origin, overriding the env table. See `AccessOptions.baseUrl`. */
	baseUrl?: string
	version?: number
}

// ─── Pipelines ────────────────────────────────────────────────────────────────

export default class Pipelines extends AccessManager {
	readonly monitor:       PipelinesMonitor
	readonly queries:       PipelinesQueries
	readonly webhooks:      PipelinesWebhooks
	readonly templates:     PipelinesTemplates
	readonly analytics:     PipelinesAnalytics
	readonly executions:    PipelinesExecutions
	readonly escalations:   PipelinesEscalations
	readonly interventions: PipelinesInterventions
	readonly workers:       PipelinesWorkers

	constructor( config: PipelinesConfig ){
		if( !config )              throw new Error('Undefined config')
		if( !config.context )      throw new Error('Undefined context')
		if( !config.accessToken )  throw new Error('Undefined accessToken')

		const access: AccessOptions = {
			context:      config.context,
			accessToken:  config.accessToken,
			env:          config.env      || 'dev',
			platform:     config.platform || 'proxy',
			remoteOrigin: config.remoteOrigin,
			timeout:      config.timeout,
			baseUrl:      config.baseUrl,
			version:      config.version
		}

		super( access, 'API' )

		this.monitor       = new PipelinesMonitor( this )
		this.queries       = new PipelinesQueries( this )
		this.webhooks      = new PipelinesWebhooks( this )
		this.templates     = new PipelinesTemplates( this )
		this.analytics     = new PipelinesAnalytics( this )
		this.executions    = new PipelinesExecutions( this )
		this.escalations   = new PipelinesEscalations( this )
		this.interventions = new PipelinesInterventions( this )
		this.workers       = new PipelinesWorkers( this )
	}

	// ── Pipeline definitions ──────────────────────────────────────────────────

	async list( querystring?: PipelineListValidation['querystring'] ): Promise<PipelineListValidation['response']> {
		const { error, message, data } = await this.request<Res<PipelineListValidation['response']>>({
			url: `/pipelines${qs( querystring )}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async get( id: string ): Promise<PipelineRetrieveValidation['response']> {
		const { error, message, data } = await this.request<Res<PipelineRetrieveValidation['response']>>({
			url: `/pipelines/${id}`,
			method: 'GET'
		})
		if( error ) throw new Error( message )
		return data
	}

	async deploy( id: string, body?: PipelineDeployValidation['body'] ): Promise<PipelineDeployValidation['response']> {
		const { error, message, data } = await this.request<Res<PipelineDeployValidation['response']>>({
			url: `/pipelines/${id}/deploy`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async validate( id: string ): Promise<PipelineValidateValidation['response']> {
		const { error, message, data } = await this.request<Res<PipelineValidateValidation['response']>>({
			url: `/pipelines/${id}/validate`,
			method: 'POST'
		})
		if( error ) throw new Error( message )
		return data
	}

	async simulate( id: string, body?: PipelineSimulateValidation['body'] ): Promise<PipelineSimulateValidation['response']> {
		const { error, message, data } = await this.request<Res<PipelineSimulateValidation['response']>>({
			url: `/pipelines/${id}/simulate`,
			method: 'POST',
			body
		})
		if( error ) throw new Error( message )
		return data
	}

	async setStatus( id: string, status: string ): Promise<PipelineSetStatusValidation['response']> {
		const { error, message, data } = await this.request<Res<PipelineSetStatusValidation['response']>>({
			url: `/pipelines/${id}/status/${status}`,
			method: 'PATCH'
		})
		if( error ) throw new Error( message )
		return data
	}
}
