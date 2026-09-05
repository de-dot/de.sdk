// ─── @de./sdk — platform-neutral core ─────────────────────────────────────────
//
// Everything that runs unchanged on Node, in a browser and in React Native.
//
// The MSI gateway is deliberately absent: it is the one surface that needs a
// host-specific transport and mounting, so each entry point adds its own --
// `./index` (iframe + iframe.io) and `./react-native` (WebView + webview.io).
// Keeping it out of here is what stops the React Native module from being
// pulled into web and server bundles, where `react-native-webview` cannot
// resolve.
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

// Realtime socket client (de.arch / Socket)
export { default as Realtime } from './allend/Realtime'

// Layer 2 — Workflows
export { default as Workflows } from './allend/Workflows'
export type { WorkflowsConfig } from './allend/Workflows'

// Utilities
export { default as Utils } from './utils'

export { default as APIError } from './error'
export { statusOf } from './response'

// ── Client layer (allend) ─────────────────────────────────────────────────────
// DClient ({ Client, Event }), the IoT socket client, and the customer/agent/
// query surfaces.
//
// Imported from their own modules rather than the `./allend` barrel: that
// barrel re-exports the browser MSI, which would pull iframe.io into the React
// Native bundle. `yarn verify:entries` enforces this.
export { default as IoTClient } from './allend/IoTClient'
export type { IoTClientOptions } from './allend/IoTClient'

export { default as Customer } from './allend/Customer'
export type { CustomerConfig } from './allend/Customer'

export { default as Agent } from './allend/Agent'
export type { AgentConfig } from './allend/Agent'
export type { AgentRealtimeContext } from './allend/Agent/realtime'

export { default as Queries } from './allend/Queries'
export type { QueriesConfig } from './allend/Queries'

export { default as Utilities } from './allend/Utilities'
export type { UtilitiesConfig } from './allend/Utilities'

// The MSI control surface is shared by both entry points
export type { default as Controls } from './allend/MSI/Controls'
export type { default as Handles } from './allend/MSI/Handles'
export type { Plugin } from './allend/MSI/Plugins'

// Transport contract the MSI control surface is written against
export type { Channel, Listener, AckFunction } from './types/channel'
export type { AccessOptions, UserSession } from './types/access'

// Public types (domain + SDK config)
export type * from './types'

// ── Namespace of the platform-neutral constructors ────────────────────────────

import Auth      from './backend/Auth'
import OTPAuth   from './allend/OTPAuth'
import Pipelines from './allend/Pipelines'
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
import IoTClient from './allend/IoTClient'
import Customer  from './allend/Customer'
import Agent     from './allend/Agent'
import Queries   from './allend/Queries'
import Utilities from './allend/Utilities'
import Client    from './allend/Workflows/Client'
import Event     from './allend/Realtime'

// DClient groups the workflow client with the realtime event channel
const DClient = { Client, Event }
export { DClient }

export const core = {
	Auth,
	OTPAuth,
	Pipelines,
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
