/**
 * Transport-agnostic message channel.
 *
 * The MSI control surface (Controls, Handles, Plugins) talks to the gateway
 * exclusively through this contract, so the same logic drives a browser iframe
 * and a React Native WebView without a per-platform copy.
 *
 * Both transports satisfy it structurally, with no adapter: `iframe.io` (IOF)
 * and `webview.io` (WIO) declare identical `Listener` / `AckFunction` types and
 * identical signatures for every method below. They diverge only at connection
 * setup -- `initiate()` takes a `Window` on web and a `WebView` ref on native,
 * and WIO adds `handleMessage()` / `getInjectedJavaScript()`. Those live in the
 * platform entry points, which hold the concrete transport type and so keep
 * full access to it; deliberately none of them appear here.
 */

export type AckFunction = ( error: boolean | string, ...args: any[] ) => void
export type Listener = ( payload?: any, ack?: AckFunction ) => void

export interface Channel {
  /**
   * Send an event to the peer, optionally with an acknowledgement callback.
   */
  emit<T = any>( _event: string, payload?: T | AckFunction, fn?: AckFunction ): Channel

  /**
   * Subscribe to an event from the peer.
   */
  on( _event: string, fn: Listener ): Channel

  /**
   * Subscribe to the next occurrence of an event only.
   */
  once( _event: string, fn: Listener ): Channel

  /**
   * Unsubscribe a listener, or every listener for the event when none is given.
   */
  off( _event: string, fn?: Listener ): Channel

  /**
   * Remove all registered listeners.
   */
  removeListeners( fn?: Listener ): Channel
}
