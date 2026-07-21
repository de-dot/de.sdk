// ─── @de./sdk — web & server entry point ──────────────────────────────────────
//
// The platform-neutral core plus the browser MSI gateway (iframe + iframe.io).
//
// React Native consumers import '@de./sdk/react-native' instead, which pairs
// the same core with a WebView gateway. This module must never reference that
// one: it would drag react-native-webview into web and server bundles.
//
//   import De from '@de./sdk'
//   const msi = new De.MSI({ element: 'map', accessToken })
//
// ─────────────────────────────────────────────────────────────────────────────

export * from './core'

// Map Service Interface (de.eui service) — browser gateway
export { default as MSI, type MSIInterface } from './allend/MSI'

import MSI from './allend/MSI'
import { core } from './core'

const De = {
	...core,
	MSI
}

export default De
