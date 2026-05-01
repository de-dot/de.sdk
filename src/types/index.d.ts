// ─── @de./sdk — public type definitions ──────────────────────────────────────
//
// SDK-specific types live here. Domain types (orders, waypoints, entities,
// routing, events) are imported from @de./types — the canonical De. types
// package. SDK consumers can import either:
//
//   import type { RTLocation, Waypoint } from '@de./sdk'         // re-exported
//   import type { BaseOrder, OrderPackage } from '@de./types'    // direct
//
// ─────────────────────────────────────────────────────────────────────────────

import type {
	RTLocation,
	Waypoint,
	WaypointAction,
	WaypointLocationType,
	OrderPriority,
	OrderPackage,
	OrderPayment,
	OrderOperation,
	BaseOrderStatus,
	BaseOrder,
	OrderTracking,
	OrderAssignee,
	OrderException,
	OrderItem,
	OrderEventType,
	OrderTrackingEvent,
	LocationUpdateEvent,
	MessageEvent,
	RouteChangeEvent,
	PresenceEvent
} from '@de./types'

// ─── Re-export domain types ───────────────────────────────────────────────────

export type {
	RTLocation,
	Waypoint,
	WaypointAction,
	WaypointLocationType,
	OrderPriority,
	OrderPackage,
	OrderPayment,
	OrderOperation,
	BaseOrderStatus,
	BaseOrder,
	OrderTracking,
	OrderAssignee,
	OrderException,
	OrderItem,
	OrderEventType,
	OrderTrackingEvent,
	LocationUpdateEvent,
	MessageEvent,
	RouteChangeEvent,
	PresenceEvent
}

// ─── HTTP utilities ───────────────────────────────────────────────────────────

export type HTTPRequestOptions = {
	url: string
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
	headers?: { [index: string]: string }
	body?: any
}
export type HTTPResponse<T> = {
	error: boolean
	message?: string
	data: T
}

// ─── Map / MSI coordinate types ───────────────────────────────────────────────
//
// Coordinates here means a {lng, lat} map point (MSI map API convention).
// This is distinct from the @de./types Coordinates tuple [lat, lng] used
// for internal storage. RTLocation (from @de./types) is the realtime shape.

export type LatLng = [number, number]
export type Coordinates = {
	lng: number
	lat: number
}
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

// ─── Animated route ───────────────────────────────────────────────────────────

export type AnimatedRouteNativePathType = 'dot' | 'solid'
export type AnimatedRouteNativeMethods = 'dot:flow'
	| 'dot:fade'
	| 'dot:pulse'
	| 'dot:directional'
	| 'solid:flow'
	| 'solid:fade'
	| 'solid:pulse'
	| 'solid:directional'
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
	handler?: new (engine: Engine, path: Coordinates[], rules?: AnimatedRouteRules) => AnimatedRoute
	method?: string
	rules?: AnimatedRouteRules
}

// ─── Routing (map / directions) ───────────────────────────────────────────────

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

// ─── Place search ─────────────────────────────────────────────────────────────

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

// ─── Workflow waypoint (simplified — client-side create/update form) ───────────────
//
// For the full de. domain Waypoint (server-side canonical type) use the
// Waypoint re-export above from @de./types.

export type WorkflowsWaypointType = 'pickup' | 'dropoff'
export type WorkflowsWaypoint = {
	no: number
	type: WorkflowsWaypointType
	description: string
	coordinates: Coordinates
	address?: string
	contact: {
		type: string
		reference: string
		phone?: string
		email?: string
	}
}
// export type WaypointIndex = 'origin' | 'destination' | number
// export type WaypointOptions = {
// 	no?: number
// 	type?: WorkflowsWaypointType
// 	description?: string
// 	coordinates?: Coordinates
// 	address?: string
// 	'contact.type'?: string
// 	'contact.reference'?: string
// 	'contact.phone'?: string
// 	'contact.email'?: string
// }

// ─── SDK package (simplified — client-side create form) ───────────────────────
//
// For the full OrderPackage type use the re-export above from @de./types.

// export type Package = {
// 	waypointNo: number
// 	careLevel: number
// 	category: string
// 	weight: number
// 	note?: string
// }
// export type PackageOptions = {
// 	waypointNo?: number
// 	careLevel?: number
// 	category?: string
// 	weight?: number
// 	note?: string
// }

// ─── Order service / payment (SDK client-side forms) ─────────────────────────

// export type PaymentMode = 'cash' | 'card' | 'momo' | 'wigo'
// export type OrderService = {
// 	fees: {
// 		total: { amount: number, currency: string },
// 		tax: number
// 		discount: number
// 	}
// 	payment: { mode: PaymentMode, paid: boolean }
// 	xpress: string
// }
// export type OrderServiceOptions = {
// 	'fees.total.amount'?: number
// 	'fees.total.currency'?: string
// 	'fees.tax'?: string
// 	'fees.discount'?: string
// 	'payment.mode'?: PaymentMode
// 	'payment.option'?: string
// 	'payment.paid'?: boolean
// 	xpress?: string
// }
// export type OrderOperator = {}
// export type OrderStage = {
// 	current: string
// 	status: string
// }

// ─── Messaging ────────────────────────────────────────────────────────────────

export type Message = {
	type: 'text' | 'location' | 'media'
	sender: string
	content: string
	timestamp: string
}
export type Caption = {
	duration?: number
	unit?: string
	label?: string
}
export type Peer = {
	utype: string
	id: string
}

// ─── MSI / Map interface ──────────────────────────────────────────────────────

export type MapOptions = {
	element: string
	accessToken: string
	version?: number
	env?: 'dev' | 'prod'
}
export type MapLayerStyle = 'streets' | 'outdoors' | 'light' | 'dark' | 'satellite'
export type MapWaypoint = {
	index?: number
	coords: Coordinates
	caption?: Caption
}

// ─── MSI entity types ─────────────────────────────────────────────────────────

export type MobileEntityType = 'person' | 'moto' | 'car' | 'bus' | 'bike' | 'truck' | 'plane' | 'ship'
export type StaticEntityType = 'restaurant' | 'hotel' | 'store' | 'office' | 'warehouse'
export type MSIEntityType = MobileEntityType | StaticEntityType
export type MSIEntity = {
	id: string
	type: MSIEntityType
	status: 'ACTIVE' | 'BUSY'
	grade: '1H' | '2H' | '3H'
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
export type LRSErrorListener = ( error?: Error | boolean ) => void
export interface LRStreamer {
	live( fn: LRSControlsListener ): Stream
	close( fn?: LRSErrorListener ): void
	pipe( stream: Stream ): void
}

// ─── User location ────────────────────────────────────────────────────────────

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

// ─── Drag-pick ────────────────────────────────────────────────────────────────

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
