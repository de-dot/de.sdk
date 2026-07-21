// ─── @de./sdk ─────────────────────────────────────────────────────────────────
//
// Two-layer architecture:
//
//   Layer 1 — Core   : raw API mirror, 1:1 with de.arch endpoints.
//   Layer 2 — Workflows: use-case composition, many API calls in one.
//
// ─────────────────────────────────────────────────────────────────────────────

// ── Named exports (preferred — tree-shakeable) ────────────────────────────────

// Server-side auth: connector credentials → access token
export { default as Auth } from './backend/Auth'
export type { AuthConfig } from './backend/Auth'

// Client-side OTP auth (de.auth service)
export { default as OTPAuth } from './allend/OTPAuth'

// Shared tracking API (de.arch /tracking)
export { default as Tracking } from './allend/Tracking'
export type { TrackingConfig } from './allend/Tracking'

export { default as Pipelines } from './allend/Pipelines'
export type { PipelinesConfig } from './allend/Pipelines'

export { default as LSP } from './allend/LSP'
export type { LSPConfig } from './allend/LSP'

export { default as CSP } from './allend/CSP'
export type { CSPConfig } from './allend/CSP'

export { default as DEV } from './allend/DEV'
export type { DEVConfig } from './allend/DEV'

// IoT service provider + IoT Backend socket client (de.iotb service)
export { default as IoTSP, Records as IoTBackendRecords } from './allend/IoTSP'
export type { IoTSPConfig } from './allend/IoTSP'

export { default as Workspace } from './allend/Workspace'
export type { WorkspaceConfig } from './allend/Workspace'

// Map Service Interface (de.eui service)
export { default as MSI, type MSIInterface } from './allend/MSI'

// Realtime socket client (de.arch / Socket)
export { default as Realtime } from './allend/Realtime'

// Layer 2 — Workflows
export { default as Workflows } from './allend/Workflows'
export type { WorkflowsConfig } from './allend/Workflows'

// Utilities
export { default as Utils } from './utils'

// ── Client layer (allend) ─────────────────────────────────────────────────────
// DClient ({ Client, Event }), the IoT socket client, and the customer/agent/
// query surfaces. Re-exported here so the package entry point is the complete
// public API (consumers import these from '@de./sdk').
export { DClient, IoTClient, Customer, Agent, Queries, Utilities } from './allend'
export type {
	IoTClientOptions,
	CustomerConfig,
	AgentConfig,
	AgentRealtimeContext,
	QueriesConfig,
	UtilitiesConfig
} from './allend'

// Public types (domain + SDK config)
export type * from './types'

// ── Default export — all constructors under one namespace ─────────────────────
//
//   import De from '@de./sdk'
//   const core = new De.Core({ context, accessToken, env })
//   const msi  = new De.MSI({ element: 'map', accessToken })

import Auth      from './backend/Auth'
import OTPAuth   from './allend/OTPAuth'
import Pipelines  from './allend/Pipelines'
import MSI       from './allend/MSI'
import Realtime  from './allend/Realtime'
import IoT       from './allend/IoTSP/backend'
import LSP       from './allend/LSP'
import CSP       from './allend/CSP'
import DEV       from './allend/DEV'
import IoTSP     from './allend/IoTSP'
import Workspace from './allend/Workspace'
import Workflows from './allend/Workflows'
import Tracking  from './allend/Tracking'
import Utils     from './utils'
import { DClient, IoTClient, Customer, Agent, Queries, Utilities } from './allend'

const De = {
	Auth,
	OTPAuth,
	Pipelines,
	MSI,
	Realtime,
	IoT,
	LSP,
	CSP,
	DEV,
	IoTSP,
	Workspace,
	Workflows,
	Tracking,
	Utils,
	DClient,
	IoTClient,
	Customer,
	Agent,
	Queries,
	Utilities
}

export default De
