// ─── @de./sdk — public type surface ──────────────────────────────────────────
//
// Rule: import from @de./types whenever the type exists there.
// Only define types here that are genuinely SDK-specific (MSI map UI, HTTP
// envelope, constructor configs, realtime session helpers) and have no
// equivalent in de.types.
//
// Consumers can always import domain types directly:
//   import type { Waypoint, OrderPackage } from '@de./types'
// or via the SDK barrel (re-exported below):
//   import type { Waypoint, OrderPackage } from '@de./sdk'
//
// ─────────────────────────────────────────────────────────────────────────────

import type {
	// ── geo ───────────────────────────────────────────────────────────────────
	RTLocation,
	Address,
	Contacts,
	BoundingBox,
	GeoBoundary,

	// ── routing ───────────────────────────────────────────────────────────────
	Waypoint,
	WaypointAction,
	WaypointLocationType,
	Routing,
	RoutingSegment,

	// ── entity ────────────────────────────────────────────────────────────────
	EntityBase,
	EntityType,
	EntityStatus,
	EntityGrade,

	// ── order ─────────────────────────────────────────────────────────────────
	OrderPriority,
	OrderPackage,
	OrderPackageType,
	OrderPackageCategory,
	OrderPackageItem,
	OrderItem,
	OrderItemStatus,
	OrderPayment,
	OrderOperation,
	OrderIntent,
	OrderTracking,
	OrderAssignee,
	OrderException,
	BaseOrder,
	BaseOrderStatus,

	// ── events ────────────────────────────────────────────────────────────────
	OrderEventType,
	OrderTrackingEvent,
	LocationUpdateEvent,
	MessageEvent,
	RouteChangeEvent,
	PresenceEvent,

	// ── AUX customer / order-building ─────────────────────────────────────────
	CustomerOrderIntent,
	CustomerOrderIntentService,
	AddWaypoints,
	AddPackages,
	SubmitIntent
} from '@de./types'

// ─── Re-export domain types ───────────────────────────────────────────────────

export type {
	RTLocation,
	Address,
	Contacts,
	BoundingBox,
	GeoBoundary,

	Waypoint,
	WaypointAction,
	WaypointLocationType,
	Routing,
	RoutingSegment,

	EntityBase,
	EntityType,
	EntityStatus,
	EntityGrade,

	OrderPriority,
	OrderPackage,
	OrderPackageType,
	OrderPackageCategory,
	OrderPackageItem,
	OrderItem,
	OrderItemStatus,
	OrderPayment,
	OrderOperation,
	OrderIntent,
	OrderTracking,
	OrderAssignee,
	OrderException,
	BaseOrder,
	BaseOrderStatus,

	OrderEventType,
	OrderTrackingEvent,
	LocationUpdateEvent,
	MessageEvent,
	RouteChangeEvent,
	PresenceEvent,

	CustomerOrderIntent,
	CustomerOrderIntentService,
	AddWaypoints,
	AddPackages,
	SubmitIntent
}

// ─── HTTP utilities ───────────────────────────────────────────────────────────
//
// APIResponseBase from de.types covers the base error/status fields.
// HTTPResponse<T> adds the generic data wrapper the SDK uses internally.

export type HTTPRequestOptions = {
	url: string
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
	headers?: { [index: string]: string }
	body?: any
}
export type HTTPResponse<T = Record<string, never>> = {
	error: boolean
	message?: string
	data: T
}

// ─── SDK config types ─────────────────────────────────────────────────────────
//
// Constructor option shapes for each named export.
// These are SDK-specific — de.types has no concept of SDK client configs.

export type Env      = 'dev' | 'staging' | 'prod'
export type Platform = 'web' | 'mobile' | 'server' | 'proxy'

export type CoreConfig = {
	context: string
	accessToken: string
	env?: Env
	platform?: Platform
	remoteOrigin?: string
	version?: number
}

export type AuthConfig = {
	context: string
	cid: string
	secret: string
	remoteOrigin?: string
	env?: Env
	version?: number
	autorefresh?: boolean
	onNewToken?: ( token: string ) => void
}

export type OTPAuthConfig = {
	context: string
	accessToken: string
	env?: Env
	platform?: Platform
	remoteOrigin?: string
}

export type IoTConfig = {
	channel: string
	accessToken: string
	env?: Env
}

export type WorkflowsConfig = {
	core: { orders: any, request: Function }
	msi?: any
}

// ─── MSI map coordinate types ─────────────────────────────────────────────────
//
// de.types Coordinates is a readonly [lat, lng] tuple (internal storage).
// MSI uses { lng, lat } map-point objects — a different shape and convention.
// LngLat = [number, number] is the MSI polyline/route-path coordinate array.

export type LngLat      = [number, number]
export type Coordinates = { lng: number, lat: number }

export type PickedLocation = {
	point: { x: number, y: number }
	coordinates: Coordinates
}
export type ActivePosition = {
	id: string
	position: RTLocation
	caption?: Caption
	focus?: boolean
}

// ─── MSI animated route ───────────────────────────────────────────────────────

export type AnimatedRouteNativePathType = 'dot' | 'solid'
export type AnimatedRouteNativeMethods =
	| 'dot:flow' | 'dot:fade' | 'dot:pulse' | 'dot:directional'
	| 'solid:flow' | 'solid:fade' | 'solid:pulse' | 'solid:directional'
export interface AnimatedRouteRules {
	styles?: any
	speed?: number
	fadeLength?: number
}
export interface AnimatedRoute {
	key: number | null
	currentOffset: number
	rules: Required<AnimatedRouteRules>
	startTime?: number
	polyline?: any
	engine: any
	path: Coordinates[]
	create( pathType?: AnimatedRouteNativePathType ): void
	apply: Record<string, () => void>
	stop(): void
	remove(): void
}
export type AnimatedRouteOptions = AnimatedRouteNativeMethods | {
	handler?: new ( engine: Engine, path: Coordinates[], rules?: AnimatedRouteRules ) => AnimatedRoute
	method?: string
	rules?: AnimatedRouteRules
}

// ─── MSI routing / directions ─────────────────────────────────────────────────

export type MapWaypoint = {
	index?: number
	coords: Coordinates
	caption?: Caption
}
export type Journey = {
	routeId: string | number
	origin?: MapWaypoint
	destination?: MapWaypoint
	waypoints?: MapWaypoint[]
	options?: RouteOptions
}
export type ActiveDirection<RouteSpec> = {
	routeId: string | number
	profile: string
	origin?: Coordinates
	destination?: Coordinates
	waypoints: Coordinates[]
	route: RouteSpec | null
}
export type RouteID = string | number
export type RoutesFitBoundsOptions = {
	includes?: RouteID[]
	margin?: number
}
export type RouteOptions = {
	id?: string | number
	mode?: 'default' | 'navigation'
	profile?: 'driving-traffic' | 'driving' | 'cycling' | 'biking' | 'walking' | 'transit'
	unit?: 'metric' | 'imperial'
	preference?: 'TRAFFIC_AWARE' | 'TRAFFIC_UNAWARE'
	pointless?: boolean
	styles?: any
	animation?: AnimatedRouteOptions
}

// ─── MSI place search ─────────────────────────────────────────────────────────

export type SearchPlaceSuggestion = {
	id: string
	name: string
	description: string
	distance: number | null
}
export type SearchPlace = {
	name: string
	location: Coordinates
	address: string
}

// ─── MSI entity display types ─────────────────────────────────────────────────
//
// MSIEntity is the MSI map-layer entity shape used to display and move markers.
// It is intentionally simpler than de.types EntityBase:
//   - adds 'person' and 'bus' vehicle types not in de.types EntityType
//   - status narrows to the two states MSI renders ('ACTIVE' | 'BUSY')
//   - grade reuses de.types EntityGrade

export type MobileEntityType = 'person' | 'moto' | 'car' | 'bus' | 'bike' | 'truck' | 'plane' | 'ship'
export type StaticEntityType = 'restaurant' | 'hotel' | 'store' | 'office' | 'warehouse'
export type MSIEntityType    = MobileEntityType | StaticEntityType

export type MSIEntity = {
	id: string
	type: MSIEntityType
	status: 'ACTIVE' | 'BUSY'
	grade: EntityGrade
	currentLocation: RTLocation
	static?: boolean
}

export interface ControlEntity {
	add( entity: MSIEntity, callback?: () => void ): void
	remove( id: string, callback?: () => void ): void
	focus( id: string, callback?: () => void ): void
	move( update: ActivePosition, callback?: () => void ): void
}
export type LRSControlsListener = ( controls: ControlEntity ) => void
export type LRSErrorListener    = ( error?: Error | boolean ) => void
export interface LRStreamer {
	live( fn: LRSControlsListener ): Stream
	close( fn?: LRSErrorListener ): void
	pipe( stream: Stream ): void
}

// ─── MSI map interface config ─────────────────────────────────────────────────

export type MapOptions = {
	/**
	 * Id of the container element to mount the gateway into.
	 * Web only -- the React Native entry renders a component instead.
	 */
	element?: string
	/**
	 * Static access token.
	 *
	 * Prefer `getAccessToken` for long-lived sessions: it is read at every bind
	 * and rebind, so a rotated token is picked up without tearing the map down.
	 * Supply one or the other -- both entry points reject when neither yields a
	 * token.
	 */
	accessToken?: string
	getAccessToken?: () => string
	version?: number
	env?: 'dev' | 'prod'
	/**
	 * Host to substitute for `localhost` when `env` is `dev`. Native apps cannot
	 * reach the host machine on localhost.
	 */
	devHostname?: string
}
export type MapLayerStyle = 'streets' | 'outdoors' | 'light' | 'dark' | 'satellite'

// ─── MSI user location display ────────────────────────────────────────────────

export interface UserLocationOptions {
	borderRadius?: number
	borderColor?: string
	borderOpacity?: number
	dotColor?: string
	showInnerDot?: boolean
	noRing?: boolean
	showDirectionArrow?: boolean
	arrowColor?: string
	arrowSize?: number
	pulseAnimation?: boolean
	accuracyCircle?: boolean
	accuracyColor?: string
	accuracyOpacity?: number
	onLocationUpdate?: ( location: RTLocation ) => void
	onLocationError?: ( error: GeolocationPositionError ) => void
}

// ─── MSI drag-pick ────────────────────────────────────────────────────────────

export type DragPickOptions = {
	snapToRoad?: boolean
	pinPoints?: boolean
	pointOptions?: CustomPointOptions
}
export type DragPickContentType = 'duration' | 'distance' | 'preloader'
export type DragPickContent = {
	time?: number
	unit?: 'min' | 'sec' | 'hr' | 'km' | 'mi' | 'm'
	distance?: number
	preloader?: boolean
}
export type DragPickEvent = 'dragstart' | 'dragend' | 'zoom_changed' | 'idle'
export interface DragPickInterface {
	enable( origin?: Coordinates ): void
	disable(): void
	content( type: DragPickContentType, content: DragPickContent ): void
}

// ─── Realtime session helpers ─────────────────────────────────────────────────
//
// Peer: session participant reference (subset of PresenceEvent from de.types).
// Caption: MSI map overlay annotation.
// Message: direct-chat payload (distinct from de.types MessageEvent which is
//          order-tracking scoped; Message here is a generic chat shape).

export type Peer = {
	utype: string
	id: string
}
export type Caption = {
	duration?: number
	unit?: string
	label?: string
}
export type Message = {
	type: 'text' | 'location' | 'media'
	sender: string
	content: string
	timestamp: string
}
