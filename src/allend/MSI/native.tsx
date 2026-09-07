import type { MapOptions } from '../../types'

import React, { useRef, useEffect, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react'
import { View, StyleSheet, AppState, type AppStateStatus, Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import WIO from 'webview.io'
import Handles from './Handles'
import Controls from './Controls'
import Plugins, { type Plugin } from './Plugins'
import resolveAccessToken from './token'

export interface MSIInterface {
  controls: Controls
  handles: Handles
  plugins: Plugins
}

const
REGISTERED_PLUGINS: Record<string, Plugin<any>> = {},

// Time allowed for the gateway to acknowledge `bind`
BIND_TIMEOUT = 10000,

/**
 * Events the gateway is allowed to send us. Anything else is dropped by the
 * transport before it reaches a listener.
 *
 * Kept identical to the web entry: the gateway speaks one protocol, and the
 * two entries differ only in transport.
 */
ALLOWED_INCOMING_EVENTS = [
  'error',
  'ready',
  'pick:location',
  'current:location',
  'current:location:error',
  'live:location:start',
  'live:location:update',
  'live:location:end',
  'route',
  'navigation:direction'
]

/**
 * Forward the WebView's console into the React Native log.
 *
 * Injected only in dev: in production it turns every gateway log into a bridge
 * message, which is pure overhead on the very traffic the map depends on.
 */
function injectedConsole(): string {
  return `
    (function(){
      var forward = function( level ){
        var original = console[ level ]
        console[ level ] = function(){
          var args = Array.prototype.slice.call( arguments )
          try {
            window.ReactNativeWebView.postMessage( JSON.stringify({
              type: '__console',
              level: level,
              message: args.map( String ).join(' ')
            }) )
          }
          catch( error ){}

          original.apply( console, args )
        }
      }

      forward('log')
      forward('warn')
      forward('error')
    })();
  `
}

/**
 * Resolve the gateway host for the running platform.
 *
 * A native app cannot reach the developer's machine on `localhost`: the Android
 * emulator maps the host to 10.0.2.2, and a physical device needs the LAN
 * address, supplied as `devHostname`.
 */
function gatewayURL({ env, devHostname }: MapOptions ): string {
  if( env !== 'dev' ) return 'https://msi.dedot.io'

  const host = devHostname
        || Platform.select({ android: '10.0.2.2', default: 'localhost' })

  return `http://${host}:4800`
}

export interface MSIProps extends MapOptions {
  onReady?: () => void
  onError?: ( error: Error ) => void
  onLoaded?: ( msi: MSIInterface ) => void
  style?: any
}

export interface MSIRef extends Partial<MSIInterface> {
  isReady: () => boolean
  retry: () => void
}

/**
 * MSI gateway for React Native.
 *
 * Mirrors the web entry: same Controls/Handles/Plugins surface, same protocol,
 * same event allowlist -- only the transport and the mounting differ.
 */
export default forwardRef<MSIRef, MSIProps>( ( props, ref ) => {
  const
  webViewRef = useRef<WebView>( null ),
  wioRef = useRef<WIO | null>( null ),
  apiRef = useRef<MSIInterface | null>( null ),
  isInitializedRef = useRef( false ),

  [ isConnected, setIsConnected ] = useState( false ),
  [ isReady, setIsReady ] = useState( false ),

  baseURL = gatewayURL( props ),

  /**
   * Report an error once, in Error form, whatever shape the transport used.
   */
  reportError = useCallback( ( error: any ) => {
    const normalized = error instanceof Error
          ? error
          : new Error( typeof error === 'string' ? error : error?.error || 'Unknown MSI error')

    props.onError?.( normalized )
  }, [ props.onError ] ),

  initializeConnection = useCallback( () => {
    if( !wioRef.current || !webViewRef.current ) return
    wioRef.current.initiate( webViewRef, baseURL )
  }, [ baseURL ] ),

  /**
   * One options object for both ends of the bridge.
   *
   * `getInjectedJavaScript()` bakes the transport's own configuration into the
   * script the WebView runs — the auth secret, the skew tolerance, the replay
   * window. It used to be called on a throwaway `new WIO({ type: 'WEBVIEW' })`
   * constructed inline in the JSX, which shares nothing with the instance that
   * actually holds the connection: the embedded side would have been handed a
   * null secret and default tolerances no matter what the host was configured
   * with. Nothing configures cryptoAuth today, so it never showed.
   */
  wioOptions = useMemo( () => ({
    type: 'WEBVIEW' as const,
    debug: props.env === 'dev',
    allowedIncomingEvents: ALLOWED_INCOMING_EVENTS,
    maxMessagesPerSecond: 100,
    connectionTimeout: 15000,
    connectionPingInterval: 2000,
    maxConnectionAttempts: 5,
    autoReconnect: true,
    heartbeatInterval: 30000
  }), [ props.env ] ),

  // Rebuilt only when those options change, rather than on every render.
  injectedBridge = useMemo( () => new WIO( wioOptions ).getInjectedJavaScript(), [ wioOptions ] )

  // Expose the control surface to the host
  useImperativeHandle( ref, () => ({
    get controls(){ return apiRef.current?.controls },
    get handles(){ return apiRef.current?.handles },
    get plugins(){ return apiRef.current?.plugins },
    isReady: () => isConnected && isReady,
    retry: () => {
      isInitializedRef.current = false
      initializeConnection()
    }
  }), [ isConnected, isReady, initializeConnection ] )

  useEffect( () => {
    const wio = wioRef.current = new WIO( wioOptions )

    wio
    .on('connect', async () => {
      try {
        /**
         * Resolve the token here rather than at mount, so a reconnect after a
         * backgrounded app or a dropped bridge binds with a current token.
         */
        const { getAccessToken, onReady, onError, onLoaded, style, ...config } = props

        await wio.emitAsync('bind', {
          ...config,
          accessToken: resolveAccessToken( props ),
          origin: 'react-native'
        }, BIND_TIMEOUT )

        setIsConnected( true )
      }
      catch( error ){ reportError( error ) }
    })
    .on('ready', () => {
      setIsReady( true )
      props.onReady?.()
    })
    .on('disconnect', () => {
      setIsConnected( false )
      setIsReady( false )
    })
    .on('reconnecting', () => {
      setIsConnected( false )
      setIsReady( false )
    })
    .on('connect_timeout', ({ attempts }: any ) => reportError( new Error(`Failed to connect after ${attempts} attempts`) ) )
    .on('reconnection_failed', ({ attempts }: any ) => reportError( new Error(`Reconnection failed after ${attempts} attempts`) ) )
    .on('error', ( error: any ) => {
      // Rate limiting is throttling, not a failure of the map
      if( error?.type === 'RATE_LIMIT_EXCEEDED' ) return
      reportError( error )
    })

    /**
     * Pause gateway work while backgrounded, and re-establish the bridge on
     * resume -- iOS in particular tears down the WebView's socket.
     */
    const subscription = AppState.addEventListener('change', ( state: AppStateStatus ) => {
      if( state === 'background' ){
        wio.emit('app:background')
        return
      }

      if( state === 'active' ){
        wio.emit('app:foreground')
        !wio.isConnected() && initializeConnection()
      }
    })

    return () => {
      subscription.remove()
      wio.disconnect()

      apiRef.current = null
      isInitializedRef.current = false
    }
  }, [] )

  // Build the control surface once the bridge is both connected and ready
  useEffect( () => {
    if( isInitializedRef.current || !wioRef.current || !isConnected || !isReady ) return

    const
    chn = wioRef.current,
    controls = new Controls( chn, props ),
    handles = new Handles( chn, controls, props ),
    plugins = new Plugins( chn, handles, controls, props )

    plugins.mount( REGISTERED_PLUGINS )

    apiRef.current = { controls, handles, plugins }
    isInitializedRef.current = true

    props.onLoaded?.( apiRef.current )
  }, [ isConnected, isReady ] )

  const onMessage = ( event: any ) => {
    // Console forwarding rides the same bridge; peel it off before WIO sees it
    try {
      const data = JSON.parse( event.nativeEvent.data )
      if( data?.type === '__console' ){
        const message = `[MSI gateway] ${data.message}`

        switch( data.level ){
          case 'error': console.error( message ); break
          case 'warn': console.warn( message ); break
          default: console.debug( message )
        }

        return
      }
    }
    catch( error ){
      // Not console traffic -- fall through to the transport
    }

    wioRef.current?.handleMessage( event )
  }

  return (
    <View style={[ styles.container, props.style ]}>
      <WebView
        ref={webViewRef}
        source={{ uri: baseURL }}
        style={styles.webview}
        injectedJavaScript={`
          ${props.env === 'dev' ? injectedConsole() : ''}
          ${injectedBridge}
        `}
        javaScriptEnabled
        domStorageEnabled
        geolocationEnabled
        allowsInlineMediaPlayback
        cacheEnabled={props.env !== 'dev'}
        incognito={props.env === 'dev'}
        androidLayerType="hardware"
        allowsBackForwardNavigationGestures={false}
        bounces={false}
        scrollEnabled={false}
        originWhitelist={[ baseURL ]}
        onMessage={onMessage}
        onLoadEnd={initializeConnection}
        onError={( { nativeEvent }: any ) => reportError( new Error( nativeEvent?.description || 'WebView error') )}
      />
    </View>
  )
} )

/**
 * Register a plugin to be mounted on every MSI instance.
 */
export function plugin<T>( name: string, fn: Plugin<T> ){
  REGISTERED_PLUGINS[ name ] = fn
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent'
  }
})
