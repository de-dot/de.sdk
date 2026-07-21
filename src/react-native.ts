// ─── @de./sdk/react-native — React Native entry point ─────────────────────────
//
// The platform-neutral core plus the native MSI gateway (WebView + webview.io).
//
// Everything outside the gateway is the same code the web entry uses -- the MSI
// control surface (Controls, Handles, Plugins) is written against a transport
// contract both iframe.io and webview.io satisfy, so there is no native copy of
// it to drift.
//
//   import De, { MSI } from '@de./sdk/react-native'
//
//   <MSI
//     env="dev"
//     getAccessToken={() => token}
//     onLoaded={({ controls, handles }) => …}
//   />
//
// Requires react, react-native and react-native-webview in the host app; they
// are declared as optional peer dependencies so web and server installs are not
// asked for them.
//
// ─────────────────────────────────────────────────────────────────────────────

export * from './core'

// Map Service Interface (de.eui service) — WebView gateway
export {
	default as MSI,
	plugin,
	type MSIInterface,
	type MSIProps,
	type MSIRef
} from './allend/MSI/native'

import MSI from './allend/MSI/native'
import { core } from './core'

const De = {
	...core,
	MSI
}

export default De
