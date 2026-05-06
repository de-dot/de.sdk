import type LSP from '../LSP'
import type MSI from '../MSI'
import Delivery from './Delivery'

// ─── Config ───────────────────────────────────────────────────────────────────

export type WorkflowsConfig = {
	lsp: LSP
	msi?: MSI
}

// ─────────────────────────────────────────────────────────────────────────────
//
// LAYER 2 — Workflows: use-case composition, many API calls in one.
// Sits explicitly on top of Core — the consumer passes core to it,
// making the dependency chain visible and testable.
//
//   const wf = new Workflows({ core })
//   const { jrtoken } = await wf.delivery.pickup({ clientId, from, to, packages })
//
// ─────────────────────────────────────────────────────────────────────────────

export default class Workflows {
	readonly delivery: Delivery

	constructor({ lsp }: WorkflowsConfig ){
		if( !lsp ) throw new Error('<core> instance required. Pass a Core instance to Workflows.')

		this.delivery = new Delivery( lsp )
	}
}
