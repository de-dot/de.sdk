# De. Platform Developer Documentation

## Overview

De. (Dedot) is a supply chain coordination platform that connects all the moving pieces of delivery—logistics companies, commerce platforms, developers, and end users—through one unified system. This documentation covers the complete SDK for integrating De.'s mapping, routing, and logistics coordination capabilities into your applications.

**Think of De. as the operating system for logistics** - similar to how Stripe revolutionized payments or how electrical wiring connects all appliances in a house, De. provides the invisible backbone that makes delivery and logistics work seamlessly.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture Overview](#architecture-overview)
3. [Installation & Setup](#installation--setup)
4. [Core Components](#core-components)
5. [API Reference](#api-reference)
6. [Code Examples](#code-examples)
7. [Plugin Development](#plugin-development)
8. [Advanced Usage Patterns](#advanced-usage-patterns)
9. [Error Handling](#error-handling)
10. [Performance Optimization](#performance-optimization)
11. [Testing](#testing)

---

## Getting Started

The De. SDK provides three main modules:

- **MSI (Map System Interface)**: Complete map integration with iframe-based communication for visual delivery tracking
- **DClient**: Client-side operations for orders, events, and customer management
- **Access**: API authentication and HTTP request management

### Who Uses De.?

**Logistics Service Providers (LSP)**
- Carriers, 3PLs, 4PLs, Forwarders, Brokers
- Get better coordination tools, more business opportunities
- Real-time fleet tracking and route optimization

**Commerce Service Providers (CSP)**
- Retailers, Manufacturers, E-commerce platforms
- Seamless delivery integration for customers
- Multi-carrier coordination without building from scratch

**Developers (DEV)**
- Build delivery features into applications
- Access comprehensive logistics network
- Extensible plugin system for custom functionality

**End User Service (EUS)**
- Customers tracking their deliveries
- Real-time visibility into package location
- Delivery preference management

### Prerequisites

- Node.js 14+ or modern browser environment
- TypeScript 4.0+ (recommended)
- Valid De. workspace and access token
- Basic understanding of Promises and async/await

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Your Application                       │
│  (E-commerce, Logistics Dashboard, Mobile App, etc.)    │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴───────────────┐
        │       De. SDK              │
        ├────────────────────────────┤
        │                            │
        │  ┌──────────────────────┐  │
        │  │   MSI (Map System)   │  │
        │  │  ┌────────────────┐  │  │
        │  │  │   Controls     │  │  │  ← Promise-based direct operations
        │  │  ├────────────────┤  │  │
        │  │  │   Handles      │  │  │  ← Stream-based high-level API
        │  │  ├────────────────┤  │  │
        │  │  │   Plugins      │  │  │  ← Extensibility system
        │  │  └────────────────┘  │  │
        │  └──────────────────────┘  │
        │                            │
        │  ┌──────────────────────┐  │
        │  │   DClient            │  │
        │  │  - Order             │  │  ← Order management
        │  │  - Event             │  │  ← Event tracking
        │  │  - Client            │  │  ← Customer operations
        │  └──────────────────────┘  │
        │                            │
        │  ┌──────────────────────┐  │
        │  │   Access             │  │  ← API authentication
        │  └──────────────────────┘  │
        │                            │
        │  ┌──────────────────────┐  │
        │  │   Utils              │  │  ← Utility functions
        │  └──────────────────────┘  │
        └────────────────────────────┘
                     │
                     ▼
          ┌──────────────────┐
          │  Iframe (MSI)    │
          │  Map Engine      │  ← Isolated rendering environment
          │  (MapBox/Google) │
          └──────────────────┘
                     │
                     ▼
          ┌──────────────────┐
          │  De. Platform    │
          │  - Logistics API │
          │  - Route Engine  │
          │  - Coordination  │
          └──────────────────┘
```

### Component Responsibilities

| Component | Purpose | Use Cases |
|-----------|---------|-----------|
| **MSI** | Map visualization & interaction | Delivery tracking, route planning, location selection |
| **Controls** | Direct map manipulation (Promise-based) | Set routes, update markers, control navigation |
| **Handles** | High-level workflows (Stream-based) | Real-time tracking, fleet management, live updates |
| **Plugins** | Custom extensions | Analytics, custom markers, third-party integrations |
| **DClient** | Order & customer management | Create orders, track status, manage clients |
| **Access** | API communication | Authenticated requests, token management |
| **Utils** | Helper functions | Distance calculation, formatting, validation |

### Communication Flow

```
Your App → Access → De. API → Backend Services
    ↓
Your App → MSI → Iframe → Map Engine
    ↓              ↓
Your App ← Controls/Handles ← Map Events
```

---

## Installation & Setup

### NPM Installation

```bash
npm install @dedot/sdk iframe.io
```

### CDN Installation

```html
<script src="https://cdn.dedot.io/sdk/v2/dedot.min.js"></script>
<script src="https://cdn.dedot.io/iframe.io/v1/iframe.io.min.js"></script>
```

### Basic Initialization

```typescript
import De from '@dedot/sdk';

// Initialize MSI for map visualization
const msi = new De.MSI({
  element: 'map-container',        // DOM element ID
  accessToken: 'your-access-token',
  workspace: 'your-workspace-id',
  env: 'prod'                      // or 'dev'
});

// Load and get access to all components
const { controls, handles, plugins } = await msi.load();

console.log('De. SDK initialized successfully!');
```

### Full Stack Setup

```typescript
import De from '@dedot/sdk';

// 1. Initialize Access for API operations
const access = new De.Access({
  workspace: 'your-workspace-id',
  accessToken: 'your-access-token',
  remoteOrigin: window.location.origin,
  env: 'prod',
  version: 1
});

// 2. Initialize MSI for map interface
const msi = new De.MSI({
  element: 'map-container',
  accessToken: 'your-access-token',
  workspace: 'your-workspace-id',
  env: 'prod'
});

// 3. Load MSI components
const { controls, handles, plugins } = await msi.load();

// 4. Initialize DClient for order management
const { Client, Order, Event } = De.DClient;

// Now you have full access to:
// - controls: Direct map operations
// - handles: Stream-based high-level API
// - plugins: Custom extensions
// - access: Authenticated API calls
// - DClient: Order/customer management
```

### Configuration Options

```typescript
interface MapOptions {
  element: string;              // Required: DOM element ID
  accessToken: string;          // Required: Authentication token
  workspace?: string;           // Workspace identifier
  env?: 'dev' | 'prod';        // Environment (default: 'prod')
  
  // Optional map settings
  style?: MapLayerStyle;        // Initial map style
  center?: Coordinates;         // Initial map center
  zoom?: number;                // Initial zoom level (0-22)
  bearing?: number;             // Map rotation (0-360)
  pitch?: number;               // 3D tilt (0-60)
}
```

### Quick Start Example

```typescript
// Initialize
const msi = new De.MSI({
  element: 'map-container',
  accessToken: 'your-token',
  workspace: 'your-workspace'
});

const { controls, handles } = await msi.load();

// Set delivery route
await handles.pickupPoint(
  [40.7128, -74.0060],
  { label: 'Warehouse A', description: '123 Main St' }
);

await handles.dropoffPoint(
  [40.7580, -73.9855],
  { label: 'Customer', description: '456 Park Ave' }
);

// Track delivery vehicle
const vehicleStream = handles.nearby([{
  id: 'vehicle-1',
  type: 'delivery-van',
  position: [40.7200, -74.0050],
  caption: { label: 'Driver: John Doe' }
}]);

console.log('Delivery tracking active!');
```

---

## Core Components

### 1. MSI (Map System Interface)

The main orchestrator that embeds the map interface via iframe and provides access to all sub-components.

#### Constructor

```typescript
const msi = new De.MSI(options: MapOptions);
```

#### Key Methods

**`load(): Promise<MSIInterface>`**

Initializes the iframe, establishes communication, and returns all components.

```typescript
const { controls, handles, plugins } = await msi.load();

// Returns:
interface MSIInterface {
  controls: Controls;   // Direct map operations
  handles: Handles;     // Stream-based workflows
  plugins: Plugins;     // Extension system
}
```

**`isReady(): boolean`**

Check if MSI is loaded and ready for operations.

```typescript
if (msi.isReady()) {
  await controls.getCurrentLocation();
}
```

**`plugin<T>(name: string, fn: Plugin<T>)`**

Register custom plugins before loading MSI.

```typescript
// Register plugin
msi.plugin('deliveryAnalytics', (hooks, options) => {
  return {
    trackDelivery: (orderId) => {
      // Implementation
    }
  };
});

// Use after loading
const { plugins } = await msi.load();
const analytics = plugins.use('deliveryAnalytics');
await analytics.trackDelivery('order-123');
```

#### Events

```typescript
// Listen to MSI lifecycle events
msi.on('ready', () => {
  console.log('MSI is ready for interaction');
});

msi.on('error', (error: Error) => {
  console.error('MSI error:', error);
  // Handle initialization errors
});

msi.on('loaded', (channel: IOF) => {
  console.log('Iframe loaded and communication established');
});
```

#### Best Practices

1. **Always wait for load** before using controls/handles
2. **Handle errors** during initialization
3. **Register plugins** before calling `load()`
4. **Clean up** on component unmount

```typescript
// React example
useEffect(() => {
  const msi = new De.MSI(config);
  let api: MSIInterface;

  msi.on('error', handleError);
  
  msi.load()
    .then(loadedApi => {
      api = loadedApi;
      // Use controls, handles, plugins
    })
    .catch(handleError);

  return () => {
    // Cleanup
    api?.handles.removeListeners();
  };
}, []);
```

---

### 2. Controls

Promise-based API for direct map manipulation. All operations return Promises with 12-second timeout protection.

#### Location Services

**`getCurrentLocation(): Promise<RTLocation | null>`**

Get user's current GPS location with accuracy, heading, and speed.

```typescript
const location = await controls.getCurrentLocation();
console.log(location);
// {
//   latitude: 40.7128,
//   longitude: -74.0060,
//   accuracy: 10,    // meters
//   heading: 180,    // degrees (0-360)
//   speed: 15        // meters/second
// }
```

**`pinCurrentLocation(): Promise<Coordinates | null>`**

Display user's location on map with a marker.

```typescript
const coords = await controls.pinCurrentLocation();
// Returns: [latitude, longitude] or null
```

**`trackLiveLocation(): Promise<void>`**

Start continuous location tracking.

```typescript
// Configure tracking
await controls.setLiveLocationOptions({
  accuracy: 'high',           // 'high' | 'medium' | 'low'
  updateInterval: 5000,       // milliseconds
  showAccuracyCircle: true
});

// Start tracking
await controls.trackLiveLocation();

// Stop when done
await controls.untrackLiveLocation();
```

#### Map Styling

**`setMapStyle(style: MapLayerStyle): Promise<void>`**

Change map appearance.

```typescript
await controls.setMapStyle('dark');
// Options: 'streets' | 'satellite' | 'dark' | 'light'
```

#### Search & Geocoding

**`searchQuery(input: string): Promise<string[]>`**

Search for places or addresses.

```typescript
const suggestions = await controls.searchQuery('coffee shops near me');
// Returns: ['Starbucks - 123 Main St', 'Dunkin - 456 Park Ave', ...]
```

**`searchSelect(index: number): Promise<SearchPlace | null>`**

Get details of a search result.

```typescript
const place = await controls.searchSelect(0);
console.log(place);
// {
//   id: 'place-xyz',
//   name: 'Starbucks',
//   coordinates: [lat, lng],
//   address: '123 Main St, New York, NY',
//   category: 'cafe'
// }
```

**`resolvePlace(name: string): Promise<Coordinates | null>`**

Get coordinates from place name (geocoding).

```typescript
const coords = await controls.resolvePlace('Empire State Building');
// Returns: [40.748817, -73.985428]
```

**`resolveCoordinates(coords: Coordinates): Promise<any | null>`**

Get place details from coordinates (reverse geocoding).

```typescript
const place = await controls.resolveCoordinates([40.7128, -74.0060]);
console.log(place);
// {
//   name: 'Lower Manhattan',
//   address: 'Manhattan, New York, NY',
//   postalCode: '10007',
//   ...
// }
```

#### Drag & Pick Location

**`enableDragPickLocation(initialLocation?: Coordinates): Promise<void>`**

Enable interactive location picker.

```typescript
// Enable with initial position
await controls.enableDragPickLocation([40.7128, -74.0060]);

// Listen for picked location (using handles)
handles.onPickLocation((location) => {
  console.log('User picked:', location.coordinates);
  console.log('Address:', location.address);
});

// Disable when done
await controls.disableDragPickLocation();
```

**`setDragPickContent(type: DragPickContentType, content: DragPickContent): Promise<void>`**

Customize the drag picker appearance.

```typescript
await controls.setDragPickContent('custom', {
  icon: 'pin',
  color: '#FF6B6B',
  size: 40
});
```

#### Route Management

**`setRoute(journey: Journey): Promise<void>`**

Create a complete route with origin, waypoints, and destination.

```typescript
await controls.setRoute({
  routeId: 'delivery-route-1',
  origin: {
    coords: [40.7128, -74.0060],
    caption: {
      label: 'Warehouse',
      sublabel: 'Brooklyn Distribution Center',
      description: '123 Industrial Blvd'
    }
  },
  destination: {
    coords: [40.7580, -73.9855],
    caption: {
      label: 'Customer',
      sublabel: 'John Smith',
      description: '456 Park Ave, Apt 12B'
    }
  },
  waypoints: [
    {
      coords: [40.7489, -73.9680],
      caption: { label: 'Stop 1: Package Pickup' },
      index: 0
    }
  ],
  options: {
    mode: 'driving',
    avoidTolls: false,
    avoidHighways: false,
    optimize: true
  }
});
```

**`setRouteOrigin(routeId: string, point: MapWaypoint): Promise<void>`**

Set or update route starting point.

```typescript
await controls.setRouteOrigin('route-1', {
  coords: [40.7128, -74.0060],
  caption: { label: 'Warehouse A' }
});
```

**`setRouteDestination(routeId: string, point: MapWaypoint): Promise<void>`**

Set or update route ending point.

```typescript
await controls.setRouteDestination('route-1', {
  coords: [40.7580, -73.9855],
  caption: { label: 'Customer Delivery' }
});
```

**`addRouteWaypoint(routeId: string, point: MapWaypoint): Promise<void>`**

Add stop to existing route.

```typescript
await controls.addRouteWaypoint('route-1', {
  coords: [40.7489, -73.9680],
  caption: {
    label: 'Additional Stop',
    description: 'Package pickup at retail store'
  }
});
```

**`updateRouteWaypoint(routeId: string, point: MapWaypoint): Promise<void>`**

Update existing waypoint.

```typescript
await controls.updateRouteWaypoint('route-1', {
  index: 0,
  coords: [40.7500, -73.9700],
  caption: { label: 'Updated Stop Location' }
});
```

**`removeRouteWaypoint(routeId: string, index: number): Promise<void>`**

Remove waypoint from route.

```typescript
await controls.removeRouteWaypoint('route-1', 0);
```

**`fitRouteBounds(routeId: string, margin?: number): Promise<void>`**

Adjust map view to show entire route.

```typescript
await controls.fitRouteBounds('route-1', 100); // 100px margin
```

**`fitRoutesBounds(options: RoutesFitBoundsOptions): Promise<void>`**

Fit multiple routes in view simultaneously.

```typescript
await controls.fitRoutesBounds({
  routeIds: ['route-1', 'route-2', 'route-3'],
  margin: 80
});
```

#### Nearby Entities

**`showNearby(entities: EntitySpecs[]): Promise<void>`**

Display multiple entities (vehicles, warehouses, etc.) on map.

```typescript
await controls.showNearby([
  {
    id: 'vehicle-1',
    type: 'delivery-van',
    position: [40.7128, -74.0060],
    caption: { label: 'Van #101', sublabel: 'Driver: John' }
  },
  {
    id: 'warehouse-1',
    type: 'warehouse',
    position: [40.7200, -74.0100],
    caption: { label: 'Distribution Center A' }
  }
]);
```

**`addNearbyEntity(entity: EntitySpecs): Promise<void>`**

Add single entity to map.

```typescript
await controls.addNearbyEntity({
  id: 'truck-5',
  type: 'freight-truck',
  position: [40.7300, -74.0200],
  caption: { label: 'Truck #505', description: '18-wheeler' }
});
```

**`moveNearbyEntity(update: ActivePosition): Promise<void>`**

Update entity's position (for real-time tracking).

```typescript
await controls.moveNearbyEntity({
  id: 'vehicle-1',
  position: [40.7130, -74.0065]
});
```

**`removeNearbyEntity(id: string): Promise<void>`**

Remove specific entity from map.

```typescript
await controls.removeNearbyEntity('vehicle-1');
```

**`removeNearby(): Promise<void>`**

Clear all nearby entities.

```typescript
await controls.removeNearby();
```

#### Navigation

**`mountNavigation(routeId: string): Promise<void>`**

Prepare route for turn-by-turn navigation.

```typescript
await controls.mountNavigation('delivery-route-1');
```

**`loadNavigation(): Promise<void>`**

Load navigation instructions and UI.

```typescript
await controls.loadNavigation();
```

**`setInitialNavigationPosition(position: RTLocation): Promise<void>`**

Set starting position for navigation.

```typescript
await controls.setInitialNavigationPosition({
  latitude: 40.7128,
  longitude: -74.0060,
  accuracy: 10,
  heading: 90,
  speed: 0
});
```

**`navigate(position: RTLocation): Promise<void>`**

Update navigation with current position.

```typescript
// In GPS update loop
await controls.navigate({
  latitude: 40.7130,
  longitude: -74.0062,
  accuracy: 8,
  heading: 95,
  speed: 15
});
```

**`casting(routeId: string, direction: any, position?: RTLocation, options?: RouteOptions): Promise<void>`**

Upsert navigation direction data (for receiving external navigation).

```typescript
await controls.casting(
  'route-1',
  externalNavigationData,
  currentPosition,
  { mode: 'driving' }
);
```

**`dismissNavigation(): Promise<void>`**

End navigation session.

```typescript
await controls.dismissNavigation();
```

**`unmountNavigation(): Promise<void>`**

Remove navigation from route.

```typescript
await controls.unmountNavigation();
```

#### Waypoint Captions

**`setWaypointCaption(routeId: string, id: string | number, caption: Caption): Promise<void>`**

Add caption to waypoint.

```typescript
await controls.setWaypointCaption('route-1', 0, {
  label: 'Priority Delivery',
  sublabel: 'Fragile items',
  description: 'Handle with care - Glass contents'
});
```

**`updateWaypointCaption(routeId: string, id: string | number, caption: Caption): Promise<void>`**

Update existing waypoint caption.

```typescript
await controls.updateWaypointCaption('route-1', 0, {
  label: 'Completed',
  sublabel: 'Delivered at 2:30 PM'
});
```

**`removeWaypointCaption(routeId: string, id: string | number): Promise<void>`**

Remove waypoint caption.

```typescript
await controls.removeWaypointCaption('route-1', 0);
```

#### Event Listeners

**`on(event: string, listener: Function)`**

Subscribe to map events.

```typescript
controls.on('route:updated', (data) => {
  console.log('Route updated:', data);
});
```

**`off(event: string, listener: Function)`**

Unsubscribe from specific event.

```typescript
const handler = (data) => console.log(data);
controls.on('route:updated', handler);
controls.off('route:updated', handler);
```

**`removeListeners(listener: Function)`**

Remove all instances of a listener.

```typescript
controls.removeListeners(myHandler);
```

---

### 3. Handles

High-level, stream-based API for real-time data workflows. Handles abstract complex operations into simple, composable streams.

#### Location Streams

**`myLocation(usertype?: 'client' | 'agent'): Stream`**

Create stream of user's current location with continuous updates.

```typescript
const locationStream = handles.myLocation('agent');

// Listen to location updates
locationStream.pipe(location => {
  console.log('Current position:', location.latitude, location.longitude);
  console.log('Speed:', location.speed, 'm/s');
  console.log('Heading:', location.heading, 'degrees');
});

// Handle errors
locationStream.onerror(error => {
  console.error('Location error:', error);
});

// Clean up when done
locationStream.onclose(() => {
  console.log('Location tracking stopped');
});

// Stop tracking
locationStream.close();
```

**`peerLocation(position: RTLocation, caption?: Caption): Stream`**

Stream for displaying peer's location (e.g., driver tracking for customer).

```typescript
const driverStream = handles.peerLocation(
  {
    latitude: 40.7128,
    longitude: -74.0060,
    accuracy: 10,
    heading: 180,
    speed: 25
  },
  {
    label: 'Your Driver',
    sublabel: 'Mike Johnson',
    description: 'White Ford Transit - ABC-123'
  }
);

// Update driver position
driverStream.write({
  position: {
    latitude: 40.7130,
    longitude: -74.0062,
    accuracy: 8,
    heading: 175,
    speed: 30
  },
  caption: {
    label: 'Your Driver',
    sublabel: 'Mike Johnson',
    description: '5 minutes away'
  }
});

// Close when delivery complete
driverStream.close();
```

**`onPickLocation(fn: (location: PickedLocation) => void)`**

Listen for user-selected locations on map.

```typescript
handles.onPickLocation(location => {
  console.log('Coordinates:', location.coordinates);
  console.log('Address:', location.address);
  console.log('Place:', location.placeName);
  
  // Use the picked location
  saveDeliveryAddress(location);
});
```

#### Entity Management

**`nearby(entities: Entity[]): NearbyStream`**

Create live stream for managing fleet/nearby entities with real-time controls.

```typescript
// Initialize with current fleet
const fleetStream = handles.nearby([
  {
    id: 'van-1',
    type: 'delivery-van',
    position: [40.7128, -74.0060],
    caption: { label: 'Van #101', sublabel: '5 deliveries pending' }
  },
  {
    id: 'truck-1',
    type: 'freight-truck',
    position: [40.7200, -74.0100],
    caption: { label: 'Truck #201', sublabel: '2 pickups remaining' }
  }
]);

// Get live control interface
fleetStream.live(async controls => {
  // Add new vehicle
  await controls.add({
    id: 'van-2',
    type: 'delivery-van',
    position: [40.7300, -74.0150],
    caption: { label: 'Van #102', sublabel: 'Just dispatched' }
  });
  
  // Update vehicle position (real-time tracking)
  setInterval(async () => {
    await controls.move({
      id: 'van-1',
      position: getLatestVehiclePosition('van-1')
    });
  }, 5000);
  
  // Remove vehicle when done
  await controls.remove('truck-1');
});

// Monitor all fleet changes
fleetStream.pipe(update => {
  console.log(`Fleet ${update.action}:`, update.dataset);
  console.log('Total vehicles:', update.list.length);
  
  // Update dashboard
  updateFleetDashboard(update.list);
});

// Close stream
fleetStream.close();
```

#### Route Helpers

**`pickupPoint(location: Coordinates, caption?: Caption): Promise<void>`**

Set pickup location with visual marker.

```typescript
await handles.pickupPoint(
  [40.7128, -74.0060],
  {
    label: 'Warehouse A',
    sublabel: 'Brooklyn Distribution Center',
    description: '123 Industrial Blvd'
  }
);
```

**`dropoffPoint(location: Coordinates, caption?: Caption): Promise<void>`**

Set delivery destination with marker.

```typescript
await handles.dropoffPoint(
  [40.7580, -73.9855],
  {
    label: 'Customer Address',
    sublabel: 'John Smith',
    description: '456 Park Ave, Apt 12B - Use front entrance'
  }
);
```

#### Navigation Streams

**`navigation(journey: Journey): Promise<Stream>`**

Start turn-by-turn navigation with real-time position updates.

```typescript
// Start navigation
const navStream = await handles.navigation({
  routeId: 'delivery-route-1',
  origin: {
    coords: await controls.getCurrentLocation(),
    caption: { label: 'Current Location' }
  },
  destination: {
    coords: [40.7580, -73.9855],
    caption: { label: 'Delivery Address' }
  },
  waypoints: [
    {
      coords: [40.7489, -73.9680],
      caption: { label: 'Package Pickup' },
      index: 0
    }
  ],
  options: {
    mode: 'driving',
    avoidTolls: false
  }
});

// Update with GPS positions
const locationStream = handles.myLocation('agent');
locationStream.pipe(location => {
  navStream.write({ position: location });
});

// Listen for navigation events
handles.on('pe:started', () => console.log('Navigation started'));
handles.on('pe:nearby', () => console.log('Approaching destination'));
handles.on('pe:arrived', () => {
  console.log('Arrived at destination!');
  navStream.close();
  locationStream.close();
});

// Handle navigation errors
handles.on('pe:closed', () => {
  console.log('Navigation ended');
});
```

**`peerDirection(options?: RouteOptions): Stream`**

Stream for displaying peer's navigation (e.g., showing driver's route to customer).

```typescript
const driverNavStream = handles.peerDirection({
  mode: 'driving',
  avoidTolls: false,
  announceInstructions: false
});

// Receive driver navigation updates from backend
websocket.onmessage = (event) => {
  const { status, direction, position } = JSON.parse(event.data);
  
  driverNavStream.write({
    status,
    direction,
    position
  });
};

// Listen to driver proximity events
handles.on('pe:nearby', () => {
  notifyCustomer('Driver is nearby!');
});

handles.on('pe:arrived', () => {
  notifyCustomer('Driver has arrived!');
  driverNavStream.close();
});
```

#### Navigation Status Events

```typescript
// All available navigation events
handles.on('pe:started', () => {});        // Navigation began
handles.on('pe:stale', () => {});          // No movement detected
handles.on('pe:long_stop', () => {});      // Stopped for extended period
handles.on('pe:low_traffic', () => {});    // Light traffic conditions
handles.on('pe:moderate_traffic', () => {}); // Moderate traffic
handles.on('pe:high_traffic', () => {});   // Heavy traffic
handles.on('pe:speed_warning', () => {});  // Speeding detected
handles.on('pe:nearby', () => {});         // Approaching destination
handles.on('pe:arrived', () => {});        // Reached destination
handles.on('pe:closed', () => {});         // Navigation ended
```

---

### 4. Plugins

Extensible system for adding custom functionality with access to all SDK hooks.

#### Plugin Architecture

```typescript
type Plugin<API, Options = {}> = (
  hooks: PluginHook,
  options?: Options
) => API;

interface PluginHook {
  handles: Handles;      // Stream-based operations
  controls: Controls;    // Direct map operations
  map: MapOptions;       // Map configuration
  utils: typeof Utils;   // Utility functions
}
```

#### Creating a Plugin

```typescript
// Define plugin interface
interface DeliveryAnalyticsAPI {
  trackRoute: (routeId: string) => Promise<void>;
  getRouteMetrics: (routeId: string) => Promise<RouteMetrics>;
  exportData: () => Promise<string>;
}

interface DeliveryAnalyticsOptions {
  apiKey?: string;
  debug?: boolean;
}

// Implement plugin
const deliveryAnalyticsPlugin: Plugin<DeliveryAnalyticsAPI, DeliveryAnalyticsOptions> = (
  hooks,
  options
) => {
  const { controls, handles, map, utils } = hooks;
  const routeData = new Map();
  
  return {
    async trackRoute(routeId: string) {
      const startTime = Date.now();
      
      // Use handles to listen for completion
      handles.on('pe:arrived', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        routeData.set(routeId, {
          duration,
          timestamp: new Date(),
          distance: calculateDistance()
        });
        
        if (options?.debug) {
          console.log(`Route ${routeId} completed in ${duration}ms`);
        }
      });
    },
    
    async getRouteMetrics(routeId: string) {
      const data = routeData.get(routeId);
      if (!data) throw new Error('Route not tracked');
      
      return {
        duration: data.duration,
        distance: data.distance,
        averageSpeed: data.distance / (data.duration / 1000)
      };
    },
    
    async exportData() {
      return JSON.stringify(Array.from(routeData.entries()));
    }
  };
};

// Register plugin
msi.plugin('deliveryAnalytics', deliveryAnalyticsPlugin);

// Use plugin after MSI loads
const { plugins } = await msi.load();
const analytics = plugins.use('deliveryAnalytics', { 
  apiKey: 'your-api-key',
  debug: true 
});

await analytics.trackRoute('route-123');
```

#### Plugin Methods

**`plugins.mount(list: Record<string, Plugin<any>>)`**

Mount multiple plugins at once.

```typescript
plugins.mount({
  analytics: deliveryAnalyticsPlugin,
  notifications: deliveryNotificationsPlugin,
  customMarkers: customMarkersPlugin
});
```

**`plugins.use<API, Options>(name: string, options?: Options): API`**

Activate and get plugin interface.

```typescript
const analytics = plugins.use('analytics', { debug: true });
const notifications = plugins.use('notifications');
```

#### Example: Fleet Management Plugin

```typescript
const fleetManagementPlugin = (hooks, options) => {
  const { controls, handles, utils } = hooks;
  const vehicles = new Map();
  
  return {
    async registerVehicle(vehicle) {
      vehicles.set(vehicle.id, {
        ...vehicle,
        lastUpdate: Date.now()
      });
      
      await controls.addNearbyEntity({
        id: vehicle.id,
        type: 'vehicle',
        position: vehicle.position,
        caption: {
          label: vehicle.name,
          sublabel: `${vehicle.capacity} capacity`
        }
      });
    },
    
    async updateVehiclePosition(vehicleId, position) {
      const vehicle = vehicles.get(vehicleId);
      if (!vehicle) throw new Error('Vehicle not found');
      
      vehicle.position = position;
      vehicle.lastUpdate = Date.now();
      
      await controls.moveNearbyEntity({
        id: vehicleId,
        position
      });
    },
    
    async getVehicleStatus(vehicleId) {
      const vehicle = vehicles.get(vehicleId);
      return vehicle || null;
    },
    
    async optimizeRoutes(vehicleIds) {
      // Use controls to calculate optimal routes
      const routes = [];
      
      for (const id of vehicleIds) {
        const vehicle = vehicles.get(id);
        if (vehicle && vehicle.destination) {
          routes.push({
            vehicleId: id,
            route: await calculateOptimalRoute(
              vehicle.position,
              vehicle.destination
            )
          });
        }
      }
      
      return routes;
    },
    
    getFleetSummary() {
      return {
        totalVehicles: vehicles.size,
        activeVehicles: Array.from(vehicles.values()).filter(
          v => Date.now() - v.lastUpdate < 60000
        ).length
      };
    }
  };
};

// Usage
msi.plugin('fleetManagement', fleetManagementPlugin);
const { plugins } = await msi.load();
const fleet = plugins.use('fleetManagement');

await fleet.registerVehicle({
  id: 'van-1',
  name: 'Delivery Van #101',
  position: [40.7128, -74.0060],
  capacity: '1500kg'
});

const summary = fleet.getFleetSummary();
console.log('Fleet summary:', summary);
```

---

### 5. Access

Manages authentication and HTTP requests to De. platform API.

#### Constructor

```typescript
const access = new De.Access({
  workspace: 'your-workspace-id',    // Required
  accessToken: 'your-access-token',  // Required
  remoteOrigin: window.location.origin,
  env: 'prod',                       // 'dev' | 'prod'
  version: 1                         // API version
});
```

#### Making Requests

**`request<Response>(options: HTTPRequestOptions): Promise<Response>`**

Execute authenticated HTTP request.

```typescript
// GET request
const vehicles = await access.request<VehicleResponse[]>({
  url: '/fleet/vehicles',
  method: 'GET'
});

// POST request
const order = await access.request<OrderResponse>({
  url: '/orders',
  method: 'POST',
  body: {
    pickupLocation: [40.7128, -74.0060],
    deliveryLocation: [40.7580, -73.9855],
    items: [
      { name: 'Package A', weight: 5 }
    ]
  }
});

// PUT request
const updated = await access.request({
  url: '/orders/order-123',
  method: 'PUT',
  body: { status: 'in-transit' }
});

// DELETE request
await access.request({
  url: '/orders/order-123',
  method: 'DELETE'
});

// Custom headers
const data = await access.request({
  url: '/analytics/reports',
  method: 'GET',
  headers: {
    'X-Report-Format': 'json',
    'X-Include-Metrics': 'true'
  }
});
```

#### Token Management

**`setToken(token: string): void`**

Update access token (e.g., after refresh).

```typescript
// Refresh token flow
const newToken = await refreshAuthToken();
access.setToken(newToken);

// Also update MSI if needed
controls.refreshToken(newToken);
```

#### Request Configuration

```typescript
interface HTTPRequestOptions {
  url: string;                              // API endpoint
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;                               // Auto-stringified if object
  headers?: Record<string, string>;         // Custom headers
}
```

#### Best Practices

```typescript
class DeliveryService {
  private access: De.Access;
  
  constructor(config) {
    this.access = new De.Access(config);
  }
  
  async createOrder(orderData) {
    try {
      const order = await this.access.request({
        url: '/orders',
        method: 'POST',
        body: orderData
      });
      
      return order;
    } catch (error) {
      console.error('Order creation failed:', error);
      throw error;
    }
  }
  
  async getOrderStatus(orderId) {
    return await this.access.request({
      url: `/orders/${orderId}/status`,
      method: 'GET'
    });
  }
  
  async updateOrderLocation(orderId, location) {
    return await this.access.request({
      url: `/orders/${orderId}/location`,
      method: 'PATCH',
      body: { location }
    });
  }
}
```

---

### 6. DClient

Client-side operations for orders, events, and customer management (separate from MSI).

```typescript
import De from '@dedot/sdk';

const { Client, Order, Event } = De.DClient;

// Client management
const client = new Client(accessConfig);

// Order management
const order = new Order(accessConfig);

// Event tracking
const event = new Event(accessConfig);
```

**Note**: DClient documentation is maintained separately. See the DClient API reference at https://docs.dedot.io/dclient

---

## Code Examples

### Example 1: Complete E-commerce Delivery Integration

```typescript
import De from '@dedot/sdk';

class EcommerceDeliveryIntegration {
  private msi: De.MSI;
  private access: De.Access;
  private controls?: De.Controls;
  private handles?: De.Handles;
  
  constructor(config) {
    this.access = new De.Access(config);
    this.msi = new De.MSI(config);
  }
  
  async initialize() {
    const api = await this.msi.load();
    this.controls = api.controls;
    this.handles = api.handles;
  }
  
  async processCheckout(cartItems, customerAddress) {
    // 1. Create order via API
    const order = await this.access.request({
      url: '/orders',
      method: 'POST',
      body: {
        items: cartItems,
        deliveryAddress: customerAddress,
        timestamp: Date.now()
      }
    });
    
    // 2. Get warehouse location
    const warehouse = await this.access.request({
      url: '/warehouses/nearest',
      method: 'POST',
      body: { address: customerAddress }
    });
    
    // 3. Display route on map
    await this.handles.pickupPoint(
      warehouse.location,
      { 
        label: warehouse.name,
        description: `Order #${order.id} origin`
      }
    );
    
    await this.handles.dropoffPoint(
      customerAddress.coordinates,
      {
        label: 'Your Address',
        sublabel: customerAddress.street,
        description: `Delivery for order #${order.id}`
      }
    );
    
    // 4. Assign delivery vehicle
    const vehicle = await this.assignVehicle(order.id);
    
    // 5. Track vehicle in real-time
    const trackingStream = this.trackDeliveryVehicle(vehicle);
    
    return {
      order,
      warehouse,
      vehicle,
      trackingStream
    };
  }
  
  async assignVehicle(orderId) {
    return await this.access.request({
      url: `/orders/${orderId}/assign-vehicle`,
      method: 'POST'
    });
  }
  
  trackDeliveryVehicle(vehicle) {
    const vehicleStream = this.handles.peerLocation(
      vehicle.currentLocation,
      {
        label: 'Your Delivery',
        sublabel: `Driver: ${vehicle.driverName}`,
        description: `${vehicle.vehicleType} - ETA: ${vehicle.eta}`
      }
    );
    
    // Connect to real-time updates
    const ws = new WebSocket(`wss://api.dedot.io/vehicles/${vehicle.id}`);
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      vehicleStream.write({
        position: update.location,
        caption: {
          label: 'Your Delivery',
          sublabel: `Driver: ${vehicle.driverName}`,
          description: `${update.distance} away - ETA: ${update.eta}`
        }
      });
    };
    
    // Listen for delivery events
    this.handles.on('pe:nearby', () => {
      this.notifyCustomer('Driver is nearby!', 'warning');
    });
    
    this.handles.on('pe:arrived', () => {
      this.notifyCustomer('Driver has arrived!', 'success');
      vehicleStream.close();
      ws.close();
    });
    
    return vehicleStream;
  }
  
  notifyCustomer(message, type) {
    // Send push notification, SMS, etc.
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}

// Usage
const delivery = new EcommerceDeliveryIntegration({
  element: 'map-container',
  accessToken: 'your-token',
  workspace: 'your-workspace',
  env: 'prod'
});

await delivery.initialize();

const result = await delivery.processCheckout(
  [{ id: 'item-1', name: 'Product A', quantity: 2 }],
  {
    street: '456 Park Ave, Apt 12B',
    coordinates: [40.7580, -73.9855]
  }
);

console.log('Order created:', result.order.id);
```

### Example 2: Fleet Management Dashboard

```typescript
class FleetManagementDashboard {
  private msi: De.MSI;
  private access: De.Access;
  private fleetStream?: any;
  private wsConnection?: WebSocket;
  
  constructor(config) {
    this.msi = new De.MSI(config);
    this.access = new De.Access(config);
  }
  
  async initialize() {
    const { controls, handles } = await this.msi.load();
    
    // Get all active vehicles from API
    const { vehicles } = await this.access.request({
      url: '/fleet/active',
      method: 'GET'
    });
    
    // Display vehicles on map
    this.fleetStream = handles.nearby(
      vehicles.map(v => ({
        id: v.id,
        type: v.vehicleType,
        position: v.currentLocation,
        caption: {
          label: v.name,
          sublabel: `Driver: ${v.driverName}`,
          description: `Status: ${v.status} | Speed: ${v.speed}km/h`
        }
      }))
    );
    
    // Setup real-time updates
    this.setupRealtimeTracking();
    
    // Monitor fleet changes
    this.fleetStream.pipe(update => {
      this.updateDashboardStats(update.list);
    });
    
    return { controls, handles };
  }
  
  setupRealtimeTracking() {
    this.wsConnection = new WebSocket('wss://api.dedot.io/fleet/live');
    
    this.wsConnection.onmessage = async (event) => {
      const update = JSON.parse(event.data);
      
      this.fleetStream.live(async controls => {
        switch (update.type) {
          case 'position_update':
            await controls.move({
              id: update.vehicleId,
              position: update.location
            });
            break;
          
          case 'vehicle_online':
            await controls.add({
              id: update.vehicle.id,
              type: update.vehicle.type,
              position: update.vehicle.location,
              caption: {
                label: update.vehicle.name,
                sublabel: `Driver: ${update.vehicle.driverName}`
              }
            });
            break;
          
          case 'vehicle_offline':
            await controls.remove(update.vehicleId);
            break;
        }
      });
    };
    
    this.wsConnection.onerror = () => {
      console.error('WebSocket connection lost, reconnecting...');
      setTimeout(() => this.setupRealtimeTracking(), 5000);
    };
  }
  
  updateDashboardStats(vehicles) {
    const stats = {
      total: vehicles.length,
      active: vehicles.filter(v => v.status === 'active').length,
      idle: vehicles.filter(v => v.status === 'idle').length,
      offline: vehicles.filter(v => v.status === 'offline').length
    };
    
    // Update UI
    this.renderDashboardStats(stats);
  }
  
  renderDashboardStats(stats) {
    document.getElementById('total-vehicles').textContent = stats.total;
    document.getElementById('active-vehicles').textContent = stats.active;
    document.getElementById('idle-vehicles').textContent = stats.idle;
    document.getElementById('offline-vehicles').textContent = stats.offline;
  }
  
  async optimizeRoutes() {
    const { routes } = await this.access.request({
      url: '/fleet/optimize-routes',
      method: 'POST'
    });
    
    console.log('Routes optimized:', routes);
    return routes;
  }
  
  cleanup() {
    this.wsConnection?.close();
    this.fleetStream?.close();
  }
}

// Usage
const dashboard = new FleetManagementDashboard({
  element: 'map-container',
  accessToken: 'your-token',
  workspace: 'your-workspace'
});

await dashboard.initialize();
```

### Example 3: Multi-Stop Route Planning

```typescript
async function planMultiStopDeliveryRoute() {
  const msi = new De.MSI({
    element: 'map-container',
    accessToken: 'your-token',
    workspace: 'your-workspace'
  });
  
  const { controls, handles } = await msi.load();
  
  // Define delivery stops
  const stops = [
    {
      address: 'Warehouse - 123 Industrial Blvd',
      coords: [40.7128, -74.0060],
      type: 'pickup',
      items: ['Package A', 'Package B', 'Package C']
    },
    {
      address: 'Customer 1 - 456 Park Ave',
      coords: [40.7489, -73.9680],
      type: 'delivery',
      items: ['Package A']
    },
    {
      address: 'Customer 2 - 789 Broadway',
      coords: [40.7300, -73.9950],
      type: 'delivery',
      items: ['Package B']
    },
    {
      address: 'Customer 3 - 321 5th Ave',
      coords: [40.7580, -73.9855],
      type: 'delivery',
      items: ['Package C']
    }
  ];
  
  // Create route with all stops
  await controls.setRoute({
    routeId: 'multi-stop-delivery',
    origin: {
      coords: stops[0].coords,
      caption: {
        label: stops[0].address,
        sublabel: 'Pickup Point',
        description: stops[0].items.join(', ')
      }
    },
    destination: {
      coords: stops[stops.length - 1].coords,
      caption: {
        label: stops[stops.length - 1].address,
        sublabel: 'Final Delivery',
        description: `Items: ${stops[stops.length - 1].items.join(', ')}`
      }
    },
    waypoints: stops.slice(1, -1).map((stop, index) => ({
      coords: stop.coords,
      caption: {
        label: `Stop ${index + 1}`,
        sublabel: stop.address,
        description: `Deliver: ${stop.items.join(', ')}`
      },
      index
    })),
    options: {
      mode: 'driving',
      optimize: true,
      avoidTolls: false
    }
  });
  
  // Fit all stops in view
  await controls.fitRouteBounds('multi-stop-delivery', 80);
  
  // Start navigation
  const navStream = await handles.navigation({
    routeId: 'multi-stop-delivery',
    origin: {
      coords: stops[0].coords,
      caption: { label: 'Start' }
    },
    destination: {
      coords: stops[stops.length - 1].coords,
      caption: { label: 'End' }
    },
    waypoints: stops.slice(1, -1).map((stop, index) => ({
      coords: stop.coords,
      caption: { label: `Stop ${index + 1}` },
      index
    }))
  });
  
  // Track progress
  let currentStop = 0;
  handles.on('pe:arrived', async () => {
    currentStop++;
    console.log(`Arrived at stop ${currentStop} of ${stops.length}`);
    
    if (currentStop < stops.length) {
      // Update waypoint caption to mark as completed
      await controls.updateWaypointCaption(
        'multi-stop-delivery',
        currentStop - 1,
        {
          label: `Stop ${currentStop} - Completed ✓`,
          sublabel: stops[currentStop].address
        }
      );
    } else {
      console.log('All deliveries completed!');
      navStream.close();
    }
  });
  
  return { navStream, stops };
}

// Usage
const { navStream, stops } = await planMultiStopDeliveryRoute();
console.log(`Route planned with ${stops.length} stops`);
```

### Example 4: Real-time Order Tracking for Customers

```typescript
class CustomerOrderTracking {
  private msi: De.MSI;
  private access: De.Access;
  
  constructor(config) {
    this.msi = new De.MSI(config);
    this.access = new De.Access(config);
  }
  
  async trackOrder(orderId: string) {
    // Initialize MSI
    const { controls, handles } = await this.msi.load();
    
    // Get order details
    const order = await this.access.request({
      url: `/orders/${orderId}`,
      method: 'GET'
    });
    
    // Show delivery route
    await handles.pickupPoint(
      order.pickupLocation,
      { label: 'Pickup', description: order.originName }
    );
    
    await handles.dropoffPoint(
      order.deliveryLocation,
      { label: 'Your Address', description: order.deliveryAddress }
    );
    
    // Show delivery vehicle if assigned
    if (order.vehicleId) {
      const vehicle = await this.access.request({
        url: `/vehicles/${order.vehicleId}`,
        method: 'GET'
      });
      
      // Track driver's location
      const driverStream = handles.peerLocation(
        vehicle.currentLocation,
        {
          label: 'Your Driver',
          sublabel: `${vehicle.driverName} - ${vehicle.vehicleModel}`,
          description: `ETA: ${vehicle.eta}`
        }
      );
      
      // Show driver's navigation
      const driverNavStream = handles.peerDirection({
        mode: 'driving'
      });
      
      // Connect to real-time updates
      const ws = new WebSocket(`wss://api.dedot.io/orders/${orderId}/live`);
      
      ws.onmessage = (event) => {
        const update = JSON.parse(event.data);
        
        // Update driver position
        driverStream.write({
          position: update.vehicleLocation,
          caption: {
            label: 'Your Driver',
            sublabel: `${vehicle.driverName} - ${vehicle.vehicleModel}`,
            description: `${update.distanceToDelivery} away - ETA: ${update.eta}`
          }
        });
        
        // Update driver's navigation
        if (update.navigationData) {
          driverNavStream.write({
            status: update.status,
            direction: update.navigationData,
            position: update.vehicleLocation
          });
        }
      };
      
      // Listen for proximity alerts
      handles.on('pe:nearby', () => {
        this.showNotification('Driver is nearby! Prepare to receive your delivery.');
      });
      
      handles.on('pe:arrived', () => {
        this.showNotification('Driver has arrived at your location!');
        ws.close();
        driverStream.close();
        driverNavStream.close();
      });
      
      return {
        order,
        vehicle,
        streams: { driverStream, driverNavStream },
        websocket: ws
      };
    }
    
    return { order };
  }
  
  showNotification(message: string) {
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('De. Delivery', {
        body: message,
        icon: '/delivery-icon.png'
      });
    }
    
    // Also show in-app notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 5000);
  }
}

// Usage
const tracking = new CustomerOrderTracking({
  element: 'map-container',
  accessToken: 'customer-token',
  workspace: 'your-workspace'
});

const result = await tracking.trackOrder('order-12345');
console.log('Tracking order:', result.order.id);
```

### Example 5: Warehouse Management Plugin

```typescript
const warehouseManagementPlugin = (hooks, options) => {
  const { controls, handles, utils } = hooks;
  const warehouses = new Map();
  const inventory = new Map();
  
  return {
    async registerWarehouse(warehouse) {
      warehouses.set(warehouse.id, warehouse);
      
      await controls.addNearbyEntity({
        id: warehouse.id,
        type: 'warehouse',
        position: warehouse.location,
        caption: {
          label: warehouse.name,
          sublabel: `Capacity: ${warehouse.capacity}`,
          description: `Items: ${warehouse.currentStock}`
        }
      });
      
      return warehouse.id;
    },
    
    async updateInventory(warehouseId, items) {
      inventory.set(warehouseId, items);
      
      const warehouse = warehouses.get(warehouseId);
      if (warehouse) {
        await controls.moveNearbyEntity({
          id: warehouseId,
          position: warehouse.location
        });
      }
    },
    
    async findNearestWarehouse(location, itemsNeeded) {
      let nearest = null;
      let minDistance = Infinity;
      
      for (const [id, warehouse] of warehouses) {
        const items = inventory.get(id) || [];
        const hasAllItems = itemsNeeded.every(item => 
          items.some(i => i.id === item.id && i.quantity >= item.quantity)
        );
        
        if (hasAllItems) {
          const distance = utils.calculateDistance(
            location,
            warehouse.location
          );
          
          if (distance < minDistance) {
            minDistance = distance;
            nearest = { warehouse, distance };
          }
        }
      }
      
      return nearest;
    },
    
    async optimizeStockDistribution() {
      const distributionPlan = [];
      
      for (const [id, warehouse] of warehouses) {
        const items = inventory.get(id) || [];
        const lowStock = items.filter(i => i.quantity < i.minQuantity);
        
        if (lowStock.length > 0) {
          distributionPlan.push({
            warehouseId: id,
            warehouse: warehouse.name,
            needsRestocking: lowStock
          });
        }
      }
      
      return distributionPlan;
    },
    
    getWarehouseStats() {
      return {
        total: warehouses.size,
        averageCapacity: Array.from(warehouses.values())
          .reduce((sum, w) => sum + w.capacity, 0) / warehouses.size,
        totalItems: Array.from(inventory.values())
          .reduce((sum, items) => sum + items.length, 0)
      };
    }
  };
};

// Usage
msi.plugin('warehouseManagement', warehouseManagementPlugin);

const { plugins } = await msi.load();
const wms = plugins.use('warehouseManagement');

// Register warehouses
await wms.registerWarehouse({
  id: 'wh-001',
  name: 'Brooklyn Distribution Center',
  location: [40.7128, -74.0060],
  capacity: 10000,
  currentStock: 7500
});

// Find nearest warehouse with items
const nearest = await wms.findNearestWarehouse(
  [40.7580, -73.9855],
  [{ id: 'item-a', quantity: 5 }]
);

console.log('Nearest warehouse:', nearest.warehouse.name);
console.log('Distance:', nearest.distance, 'km');
```

---

## Advanced Usage Patterns

### Pattern 1: Dynamic Route Optimization

```typescript
class DynamicRouteOptimizer {
  private controls: De.Controls;
  private access: De.Access;
  
  constructor(controls: De.Controls, access: De.Access) {
    this.controls = controls;
    this.access = access;
  }
  
  async optimizeDeliveryRoute(deliveries: Delivery[]) {
    // Get traffic data from API
    const trafficData = await this.access.request({
      url: '/traffic/current',
      method: 'POST',
      body: {
        locations: deliveries.map(d => d.location)
      }
    });
    
    // Sort deliveries by priority and traffic conditions
    const optimized = this.sortByOptimalSequence(
      deliveries,
      trafficData
    );
    
    // Create route with optimized stops
    await this.controls.setRoute({
      routeId: 'optimized-route',
      origin: {
        coords: optimized[0].location,
        caption: { label: 'Start' }
      },
      destination: {
        coords: optimized[optimized.length - 1].location,
        caption: { label: 'End' }
      },
      waypoints: optimized.slice(1, -1).map((delivery, index) => ({
        coords: delivery.location,
        caption: {
          label: `Stop ${index + 1}`,
          description: `Priority: ${delivery.priority}`
        },
        index
      })),
      options: {
        mode: 'driving',
        optimize: true,
        avoidHighTraffic: true
      }
    });
    
    return optimized;
  }
  
  private sortByOptimalSequence(
    deliveries: Delivery[],
    trafficData: any
  ): Delivery[] {
    // Complex optimization algorithm
    // Consider: priority, traffic, distance, time windows
    
    return deliveries.sort((a, b) => {
      const scoreA = this.calculateDeliveryScore(a, trafficData);
      const scoreB = this.calculateDeliveryScore(b, trafficData);
      return scoreB - scoreA; // Higher score = higher priority
    });
  }
  
  private calculateDeliveryScore(delivery: Delivery, trafficData: any): number {
    let score = 0;
    
    // Priority weight (0-100)
    score += delivery.priority * 10;
    
    // Traffic conditions (lower traffic = higher score)
    const traffic = trafficData.find(t => 
      t.location[0] === delivery.location[0] && 
      t.location[1] === delivery.location[1]
    );
    if (traffic) {
      score += (100 - traffic.congestionLevel);
    }
    
    // Time window urgency
    const timeToDeadline = delivery.deadline - Date.now();
    if (timeToDeadline < 3600000) { // Less than 1 hour
      score += 50;
    }
    
    return score;
  }
}

// Usage
const optimizer = new DynamicRouteOptimizer(controls, access);

const deliveries = [
  { location: [40.7128, -74.0060], priority: 8, deadline: Date.now() + 7200000 },
  { location: [40.7580, -73.9855], priority: 10, deadline: Date.now() + 3600000 },
  { location: [40.7489, -73.9680], priority: 5, deadline: Date.now() + 14400000 }
];

const optimized = await optimizer.optimizeDeliveryRoute(deliveries);
console.log('Optimized delivery sequence:', optimized);
```

### Pattern 2: Real-time Fleet Coordination

```typescript
class FleetCoordinator {
  private handles: De.Handles;
  private access: De.Access;
  private activeVehicles: Map<string, VehicleState> = new Map();
  private orders: Map<string, Order> = new Map();
  
  constructor(handles: De.Handles, access: De.Access) {
    this.handles = handles;
    this.access = access;
  }
  
  async initialize() {
    // Get all active vehicles
    const { vehicles } = await this.access.request({
      url: '/fleet/active',
      method: 'GET'
    });
    
    // Display vehicles on map
    const fleetStream = this.handles.nearby(
      vehicles.map(v => this.formatVehicleEntity(v))
    );
    
    // Setup real-time coordination
    fleetStream.live(async controls => {
      this.setupWebSocketConnection(controls);
      this.monitorVehicleStatus();
    });
    
    return fleetStream;
  }
  
  private formatVehicleEntity(vehicle: any) {
    return {
      id: vehicle.id,
      type: vehicle.type,
      position: vehicle.currentLocation,
      caption: {
        label: vehicle.name,
        sublabel: `Status: ${vehicle.status}`,
        description: vehicle.currentOrder 
          ? `Delivering order #${vehicle.currentOrder}`
          : 'Available'
      }
    };
  }
  
  private setupWebSocketConnection(controls: any) {
    const ws = new WebSocket('wss://api.dedot.io/fleet/coordination');
    
    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'vehicle_update':
          await this.handleVehicleUpdate(controls, message.data);
          break;
        
        case 'new_order':
          await this.handleNewOrder(controls, message.data);
          break;
        
        case 'order_completed':
          await this.handleOrderCompletion(controls, message.data);
          break;
      }
    };
  }
  
  private async handleVehicleUpdate(controls: any, data: any) {
    this.activeVehicles.set(data.vehicleId, {
      location: data.location,
      status: data.status,
      lastUpdate: Date.now()
    });
    
    await controls.move({
      id: data.vehicleId,
      position: data.location
    });
  }
  
  private async handleNewOrder(controls: any, order: Order) {
    this.orders.set(order.id, order);
    
    // Find best vehicle for this order
    const vehicle = await this.assignBestVehicle(order);
    
    if (vehicle) {
      console.log(`Assigned order ${order.id} to vehicle ${vehicle.id}`);
      
      // Notify vehicle via API
      await this.access.request({
        url: `/vehicles/${vehicle.id}/assign-order`,
        method: 'POST',
        body: { orderId: order.id }
      });
    }
  }
  
  private async handleOrderCompletion(controls: any, data: any) {
    this.orders.delete(data.orderId);
    
    // Update vehicle status
    const vehicle = this.activeVehicles.get(data.vehicleId);
    if (vehicle) {
      vehicle.status = 'available';
      this.activeVehicles.set(data.vehicleId, vehicle);
    }
  }
  
  private async assignBestVehicle(order: Order): Promise<any | null> {
    let bestVehicle = null;
    let minDistance = Infinity;
    
    for (const [id, state] of this.activeVehicles) {
      if (state.status === 'available') {
        const distance = this.calculateDistance(
          state.location,
          order.pickupLocation
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          bestVehicle = { id, ...state };
        }
      }
    }
    
    return bestVehicle;
  }
  
  private monitorVehicleStatus() {
    setInterval(() => {
      const now = Date.now();
      
      for (const [id, state] of this.activeVehicles) {
        const timeSinceUpdate = now - state.lastUpdate;
        
        // Alert if vehicle hasn't updated in 5 minutes
        if (timeSinceUpdate > 300000) {
          console.warn(`Vehicle ${id} connection lost`);
          this.alertDispatcher(`Vehicle ${id} offline`);
        }
      }
    }, 60000); // Check every minute
  }
  
  private calculateDistance(from: number[], to: number[]): number {
    const R = 6371; // Earth radius in km
    const dLat = this.toRad(to[0] - from[0]);
    const dLon = this.toRad(to[1] - from[1]);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(from[0])) * Math.cos(this.toRad(to[0])) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  
  private alertDispatcher(message: string) {
    console.log('[ALERT]', message);
    // Send notification to dispatcher
  }
  
  getFleetMetrics() {
    const available = Array.from(this.activeVehicles.values())
      .filter(v => v.status === 'available').length;
    
    return {
      totalVehicles: this.activeVehicles.size,
      available,
      busy: this.activeVehicles.size - available,
      pendingOrders: this.orders.size
    };
  }
}

// Usage
const coordinator = new FleetCoordinator(handles, access);
const fleetStream = await coordinator.initialize();

setInterval(() => {
  const metrics = coordinator.getFleetMetrics();
  console.log('Fleet metrics:', metrics);
}, 30000); // Every 30 seconds
```

### Pattern 3: Geofencing and Zone Management

```typescript
class GeofenceManager {
  private controls: De.Controls;
  private handles: De.Handles;
  private zones: Map<string, Zone> = new Map();
  
  constructor(controls: De.Controls, handles: De.Handles) {
    this.controls = controls;
    this.handles = handles;
  }
  
  async createDeliveryZone(zone: Zone) {
    this.zones.set(zone.id, zone);
    
    // Display zone on map
    await this.controls.addNearbyEntity({
      id: zone.id,
      type: 'zone',
      position: zone.center,
      radius: zone.radius,
      caption: {
        label: zone.name,
        description: `Delivery zone - ${zone.restrictions || 'No restrictions'}`
      }
    });
  }
  
  async monitorVehicleInZones(vehicleId: string) {
    const locationStream = this.handles.myLocation('agent');
    
    locationStream.pipe(location => {
      for (const [zoneId, zone] of this.zones) {
        const isInside = this.isLocationInZone(location, zone);
        
        if (isInside && !zone.activeVehicles?.includes(vehicleId)) {
          this.handleVehicleEnterZone(vehicleId, zone);
        } else if (!isInside && zone.activeVehicles?.includes(vehicleId)) {
          this.handleVehicleExitZone(vehicleId, zone);
        }
      }
    });
    
    return locationStream;
  }
  
  private isLocationInZone(location: RTLocation, zone: Zone): boolean {
    const distance = this.calculateDistance(
      [location.latitude, location.longitude],
      zone.center
    );
    
    return distance <= zone.radius;
  }
  
  private handleVehicleEnterZone(vehicleId: string, zone: Zone) {
    console.log(`Vehicle ${vehicleId} entered zone ${zone.name}`);
    
    if (!zone.activeVehicles) {
      zone.activeVehicles = [];
    }
    zone.activeVehicles.push(vehicleId);
    
    // Apply zone restrictions
    if (zone.speedLimit) {
      this.notifyDriver(vehicleId, `Speed limit: ${zone.speedLimit}km/h`);
    }
    
    if (zone.restrictions) {
      this.notifyDriver(vehicleId, `Zone restrictions: ${zone.restrictions}`);
    }
  }
  
  private handleVehicleExitZone(vehicleId: string, zone: Zone) {
    console.log(`Vehicle ${vehicleId} exited zone ${zone.name}`);
    
    if (zone.activeVehicles) {
      zone.activeVehicles = zone.activeVehicles.filter(id => id !== vehicleId);
    }
  }
  
  private calculateDistance(from: number[], to: number[]): number {
    const R = 6371000; // Earth radius in meters
    const dLat = this.toRad(to[0] - from[0]);
    const dLon = this.toRad(to[1] - from[1]);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(from[0])) * Math.cos(this.toRad(to[0])) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  
  private notifyDriver(vehicleId: string, message: string) {
    console.log(`[Notification to ${vehicleId}]: ${message}`);
    // Send push notification or in-app message
  }
  
  getZoneStatistics(zoneId: string) {
    const zone = this.zones.get(zoneId);
    if (!zone) return null;
    
    return {
      name: zone.name,
      activeVehicles: zone.activeVehicles?.length || 0,
      capacity: zone.capacity,
      utilization: ((zone.activeVehicles?.length || 0) / zone.capacity) * 100
    };
  }
}

// Usage
const geofence = new GeofenceManager(controls, handles);

// Create delivery zones
await geofence.createDeliveryZone({
  id: 'zone-downtown',
  name: 'Downtown District',
  center: [40.7128, -74.0060],
  radius: 2000, // meters
  speedLimit: 40,
  restrictions: 'No large trucks between 7AM-9AM',
  capacity: 50
});

await geofence.createDeliveryZone({
  id: 'zone-residential',
  name: 'Residential Area',
  center: [40.7580, -73.9855],
  radius: 1500,
  speedLimit: 30,
  restrictions: 'Quiet zone - No honking',
  capacity: 30
});

// Monitor vehicle
const vehicleStream = await geofence.monitorVehicleInZones('vehicle-123');
```

---

## Plugin Development

### Plugin Best Practices

1. **Use hooks efficiently** - Cache expensive operations

```typescript
const efficientPlugin = (hooks, options) => {
  const { controls, handles, utils } = hooks;
  const cache = new Map();
  
  return {
    async getDataWithCache(key: string) {
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const data = await controls.someExpensiveOperation(key);
      cache.set(key, data);
      
      // Auto-expire after 5 minutes
      setTimeout(() => cache.delete(key), 300000);
      
      return data;
    }
  };
};
```

2. **Clean up resources** - Always remove listeners and close streams

```typescript
const cleanupPlugin = (hooks, options) => {
  const { handles } = hooks;
  const listeners = new Map();
  
  return {
    startMonitoring(eventName: string, handler: Function) {
      handles.on(eventName, handler);
      listeners.set(eventName, handler);
    },
    
    stopMonitoring(eventName: string) {
      const handler = listeners.get(eventName);
      if (handler) {
        handles.off(eventName, handler);
        listeners.delete(eventName);
      }
    },
    
    cleanup() {
      for (const [event, handler] of listeners) {
        handles.off(event, handler);
      }
      listeners.clear();
    }
  };
};
```

3. **Handle errors gracefully** - Never let plugin errors crash the app

```typescript
const safePlugin = (hooks, options) => {
  const { controls } = hooks;
  
  return {
    async safeOperation(params: any) {
      try {
        const result = await controls.performOperation(params);
        return { success: true, data: result };
      } catch (error) {
        console.error('[Plugin Error]', error);
        return { success: false, error: error.message };
      }
    }
  };
};
```

4. **Provide configuration options** - Make plugins flexible

```typescript
interface AnalyticsPluginOptions {
  trackingId: string;
  debug?: boolean;
  sampleRate?: number;
  endpoint?: string;
}

const analyticsPlugin = (hooks, options: AnalyticsPluginOptions) => {
  const debug = options.debug ?? false;
  const sampleRate = options.sampleRate ?? 1.0;
  
  const log = (...args: any[]) => {
    if (debug) console.log('[Analytics]', ...args);
  };
  
  return {
    track(event: string, data: any) {
      if (Math.random() > sampleRate) return; // Sampling
      
      log('Tracking event:', event, data);
      
      // Send to analytics endpoint
      fetch(options.endpoint || 'https://analytics.dedot.io', {
        method: 'POST',
        body: JSON.stringify({
          trackingId: options.trackingId,
          event,
          data,
          timestamp: Date.now()
        })
      }).catch(error => log('Failed to send event:', error));
    }
  };
};
```

### Complete Plugin Template

```typescript
import type { Plugin, PluginHook } from '@dedot/sdk';

/**
 * Plugin Configuration Options
 */
interface MyPluginOptions {
  apiKey?: string;
  endpoint?: string;
  debug?: boolean;
  retries?: number;
}

/**
 * Plugin Public API
 */
interface MyPluginAPI {
  initialize: () => Promise<void>;
  performAction: (params: any) => Promise<any>;
  getStatus: () => PluginStatus;
  cleanup: () => void;
}

interface PluginStatus {
  initialized: boolean;
  activeOperations: number;
  lastError?: string;
}

/**
 * My Custom Plugin
 */
const myCustomPlugin: Plugin<MyPluginAPI, MyPluginOptions> = (
  hooks: PluginHook,
  options?: MyPluginOptions
) => {
  // Destructure hooks
  const { controls, handles, map, utils } = hooks;
  
  // Plugin configuration with defaults
  const config = {
    apiKey: options?.apiKey || '',
    endpoint: options?.endpoint || 'https://api.example.com',
    debug: options?.debug ?? false,
    retries: options?.retries ?? 3
  };
  
  // Plugin state
  let initialized = false;
  let activeOperations = 0;
  let lastError: string | undefined;
  
  // Internal logging
  const log = (...args: any[]) => {
    if (config.debug) {
      console.log('[MyPlugin]', ...args);
    }
  };
  
  // Internal error handling
  const handleError = (error: any, context: string) => {
    lastError = error.message || String(error);
    log('Error in', context, ':', error);
  };
  
  // Return public API
  return {
    async initialize() {
      if (initialized) {
        log('Already initialized');
        return;
      }
      
      try {
        log('Initializing plugin...');
        
        // Setup plugin (e.g., fetch config, register handlers)
        await controls.setMapStyle('streets');
        
        handles.on('pe:arrived', () => {
          log('Arrival event detected');
        });
        
        initialized = true;
        log('Plugin initialized successfully');
      } catch (error) {
        handleError(error, 'initialize');
        throw error;
      }
    },
    
    async performAction(params: any) {
      if (!initialized) {
        throw new Error('Plugin not initialized');
      }
      
      activeOperations++;
      
      try {
        log('Performing action with params:', params);
        
        // Implement your plugin logic here
        const result = await someAsyncOperation(params);
        
        return result;
      } catch (error) {
        handleError(error, 'performAction');
        throw error;
      } finally {
        activeOperations--;
      }
    },
    
    getStatus(): PluginStatus {
      return {
        initialized,
        activeOperations,
        lastError
      };
    },
    
    cleanup() {
      log('Cleaning up plugin resources');
      
      // Remove event listeners
      handles.removeListeners(() => {});
      
      // Clear state
      initialized = false;
      activeOperations = 0;
      lastError = undefined;
      
      log('Plugin cleanup complete');
    }
  };
};

// Helper function (not exposed in API)
async function someAsyncOperation(params: any): Promise<any> {
  // Implementation
  return { success: true };
}

export default myCustomPlugin;
```

---

## Error Handling

### Common Errors and Solutions

#### 1. Timeout Errors

All Controls methods have a 12-second timeout.

```typescript
try {
  await controls.setRoute(journey);
} catch (error) {
  if (error === 'Event timeout') {
    console.error('Operation timed out after 12 seconds');
    
    // Retry with exponential backoff
    await retryWithBackoff(() => controls.setRoute(journey));
  }
}

async function retryWithBackoff(
  operation: () => Promise<any>,
  maxRetries: number = 3,
  baseDelay: number = 1000
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

#### 2. Location Permission Errors

```typescript
try {
  const location = await controls.getCurrentLocation();
} catch (error) {
  console.error('Location access denied:', error);
  
  // Show UI prompt
  showLocationPermissionDialog({
    title: 'Location Access Required',
    message: 'Please enable location services to continue',
    onEnable: async () => {
      // Retry after user enables location
      const location = await controls.getCurrentLocation();
      handleLocation(location);
    }
  });
}
```

#### 3. Invalid Coordinates

```typescript
function validateCoordinates(coords: [number, number]): boolean {
  const [lat, lng] = coords;
  
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return false;
  }
  
  if (lat < -90 || lat > 90) {
    return false;
  }
  
  if (lng < -180 || lng > 180) {
    return false;
  }
  
  return true;
}

// Usage
if (!validateCoordinates(userCoords)) {
  throw new Error(`Invalid coordinates: ${userCoords}`);
}

await controls.pinCurrentLocation();
```

#### 4. Stream Errors

```typescript
const stream = handles.myLocation('agent');

stream
  .pipe(location => {
    // Process location
    updateDriverPosition(location);
  })
  .onerror(error => {
    console.error('Stream error:', error);
    
    // Attempt to restart stream
    setTimeout(() => {
      const newStream = handles.myLocation('agent');
      setupStreamHandlers(newStream);
    }, 5000);
  })
  .onclose(() => {
    console.log('Stream closed gracefully');
  });

// Always close streams when component unmounts
onComponentUnmount(() => {
  if (stream.isActive()) {
    stream.close();
  }
});
```

#### 5. API Request Errors

```typescript
async function makeRequest<T>(
  access: De.Access,
  options: any
): Promise<T> {
  try {
    return await access.request<T>(options);
  } catch (error) {
    // Handle specific HTTP errors
    if (error.status === 401) {
      console.error('Unauthorized - refresh token');
      const newToken = await refreshAccessToken();
      access.setToken(newToken);
      
      // Retry request
      return await access.request<T>(options);
    }
    
    if (error.status === 429) {
      console.error('Rate limited - wait and retry');
      await new Promise(resolve => setTimeout(resolve, 5000));
      return await access.request<T>(options);
    }
    
    if (error.status >= 500) {
      console.error('Server error - retry later');
      throw new Error('Service temporarily unavailable');
    }
    
    throw error;
  }
}

// Usage
const vehicles = await makeRequest<Vehicle[]>(access, {
  url: '/fleet/vehicles',
  method: 'GET'
});
```

#### 6. MSI Load Errors

```typescript
const msi = new De.MSI({
  element: 'map-container',
  accessToken: 'your-token',
  workspace: 'your-workspace',
  env: 'prod'
});

// Handle MSI errors
msi.on('error', (error: Error) => {
  console.error('MSI initialization error:', error);
  
  if (error.message.includes('Element')) {
    showError('Map container not found. Please check your HTML.');
  } else if (error.message.includes('network')) {
    showError('Network error. Please check your internet connection.');
  } else {
    showError('Failed to load map. Please refresh the page.');
  }
});

try {
  const { controls, handles, plugins } = await msi.load();
  console.log('MSI loaded successfully');
} catch (error) {
  console.error('Failed to load MSI:', error);
  
  // Show user-friendly error message
  showErrorDialog({
    title: 'Map Loading Failed',
    message: 'Unable to load the map interface. Please try again.',
    actions: [
      { label: 'Retry', onClick: () => window.location.reload() },
      { label: 'Contact Support', onClick: () => openSupportChat() }
    ]
  });
}
```

### Error Handling Best Practices

#### 1. Always Use Try-Catch with Async Operations

```typescript
async function setupDeliveryRoute() {
  try {
    await controls.setRoute(journey);
    await controls.fitRouteBounds('route-1');
    console.log('Route setup successful');
  } catch (error) {
    console.error('Route setup failed:', error);
    notifyUser('Unable to setup route. Please try again.');
  }
}
```

#### 2. Handle Stream Lifecycle Properly

```typescript
function setupLocationTracking() {
  const stream = handles.myLocation('agent');
  
  // Always attach error handler
  stream.onerror(error => {
    console.error('Location tracking error:', error);
    // Attempt recovery
    attemptStreamRecovery();
  });
  
  // Always attach close handler
  stream.onclose(() => {
    console.log('Location tracking stopped');
    cleanupResources();
  });
  
  // Process data
  stream.pipe(location => {
    updateUI(location);
  });
  
  // Return cleanup function
  return () => {
    if (stream.isActive()) {
      stream.close();
    }
  };
}

// In React/Vue/Angular
useEffect(() => {
  const cleanup = setupLocationTracking();
  return cleanup; // Cleanup on unmount
}, []);
```

#### 3. Validate Input Before API Calls

```typescript
function validateJourney(journey: Journey): string[] {
  const errors: string[] = [];
  
  if (!journey.origin) {
    errors.push('Origin is required');
  } else if (!validateCoordinates(journey.origin.coords)) {
    errors.push('Invalid origin coordinates');
  }
  
  if (!journey.destination) {
    errors.push('Destination is required');
  } else if (!validateCoordinates(journey.destination.coords)) {
    errors.push('Invalid destination coordinates');
  }
  
  if (journey.waypoints) {
    journey.waypoints.forEach((wp, index) => {
      if (!validateCoordinates(wp.coords)) {
        errors.push(`Invalid coordinates for waypoint ${index + 1}`);
      }
    });
  }
  
  return errors;
}

// Usage
const errors = validateJourney(myJourney);
if (errors.length > 0) {
  console.error('Journey validation failed:', errors);
  showValidationErrors(errors);
} else {
  await controls.setRoute(myJourney);
}
```

#### 4. Implement Retry Logic for Critical Operations

```typescript
async function retryOperation<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoff?: boolean;
    onRetry?: (attempt: number, error: any) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoff = true,
    onRetry
  } = options;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      
      if (onRetry) {
        onRetry(attempt, error);
      }
      
      console.log(`Retry ${attempt}/${maxRetries} after ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw new Error('Max retries exceeded');
}

// Usage
const location = await retryOperation(
  () => controls.getCurrentLocation(),
  {
    maxRetries: 3,
    delay: 2000,
    backoff: true,
    onRetry: (attempt, error) => {
      console.log(`Attempt ${attempt} failed:`, error.message);
    }
  }
);
```

#### 5. Proactive Token Refresh

```typescript
class TokenManager {
  private access: De.Access;
  private controls?: De.Controls;
  private refreshInterval?: NodeJS.Timeout;
  private tokenExpiryTime: number;
  
  constructor(access: De.Access, tokenExpiryTime: number) {
    this.access = access;
    this.tokenExpiryTime = tokenExpiryTime;
  }
  
  setControls(controls: De.Controls) {
    this.controls = controls;
  }
  
  startAutoRefresh() {
    // Refresh token 5 minutes before expiry
    const refreshTime = this.tokenExpiryTime - 300000;
    
    this.refreshInterval = setInterval(async () => {
      try {
        console.log('Refreshing access token...');
        const newToken = await this.fetchNewToken();
        
        // Update token in both access and controls
        this.access.setToken(newToken);
        if (this.controls) {
          this.controls.refreshToken(newToken);
        }
        
        console.log('Token refreshed successfully');
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.handleRefreshFailure(error);
      }
    }, refreshTime);
  }
  
  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = undefined;
    }
  }
  
  private async fetchNewToken(): Promise<string> {
    const response = await fetch('https://api.dedot.io/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Refresh token payload
      })
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    const data = await response.json();
    return data.accessToken;
  }
  
  private handleRefreshFailure(error: any) {
    // Log user out or redirect to login
    console.error('Unable to refresh token. User needs to re-authenticate.');
    redirectToLogin();
  }
}

// Usage
const tokenManager = new TokenManager(access, 3600000); // 1 hour expiry
tokenManager.setControls(controls);
tokenManager.startAutoRefresh();

// Cleanup on app exit
onAppExit(() => {
  tokenManager.stopAutoRefresh();
});
```

---

## Performance Optimization

### 1. Batch Operations

Avoid multiple individual operations when you can batch them.

```typescript
// ❌ Bad: Multiple individual operations
for (const vehicle of vehicles) {
  await controls.addNearbyEntity(vehicle);
}

// ✅ Good: Single batch operation
await controls.showNearby(vehicles);
```

### 2. Debounce Frequent Updates

```typescript
import { debounce } from 'lodash';

// Debounce vehicle position updates
const debouncedUpdatePosition = debounce(
  async (vehicleId: string, position: Coordinates) => {
    await controls.moveNearbyEntity({ id: vehicleId, position });
  },
  500, // Update at most every 500ms
  { leading: true, trailing: true }
);

// In WebSocket message handler
websocket.onmessage = (event) => {
  const { vehicleId, position } = JSON.parse(event.data);
  debouncedUpdatePosition(vehicleId, position);
};
```

### 3. Throttle High-Frequency Events

```typescript
import { throttle } from 'lodash';

// Throttle navigation updates
const throttledNavigate = throttle(
  async (position: RTLocation) => {
    await controls.navigate(position);
  },
  1000, // At most once per second
  { leading: true, trailing: false }
);

// In GPS update loop
gpsStream.pipe(position => {
  throttledNavigate(position);
});
```

### 4. Cleanup Streams Properly

```typescript
class StreamManager {
  private streams: Map<string, Stream> = new Map();
  
  registerStream(id: string, stream: Stream) {
    this.streams.set(id, stream);
    
    // Auto-cleanup on close
    stream.onclose(() => {
      this.streams.delete(id);
    });
  }
  
  closeStream(id: string) {
    const stream = this.streams.get(id);
    if (stream && stream.isActive()) {
      stream.close();
    }
    this.streams.delete(id);
  }
  
  closeAllStreams() {
    for (const [id, stream] of this.streams) {
      if (stream.isActive()) {
        stream.close();
      }
    }
    this.streams.clear();
  }
  
  getActiveStreamCount(): number {
    return Array.from(this.streams.values())
      .filter(s => s.isActive()).length;
  }
}

// Usage
const streamManager = new StreamManager();

const locationStream = handles.myLocation('agent');
streamManager.registerStream('location', locationStream);

// Cleanup on component unmount
onComponentUnmount(() => {
  streamManager.closeAllStreams();
});
```

### 5. Cache Expensive Operations

```typescript
class LocationCache {
  private cache = new Map<string, {
    data: any;
    timestamp: number;
  }>();
  private ttl: number = 300000; // 5 minutes
  
  async get<T>(
    key: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    // Check cache
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      console.log(`Cache hit for ${key}`);
      return cached.data as T;
    }
    
    // Fetch and cache
    console.log(`Cache miss for ${key}, fetching...`);
    const data = await fetcher();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  invalidate(key: string) {
    this.cache.delete(key);
  }
  
  clear() {
    this.cache.clear();
  }
  
  // Auto-cleanup expired entries
  startAutoCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.cache) {
        if (now - value.timestamp > this.ttl) {
          this.cache.delete(key);
        }
      }
    }, 60000); // Every minute
  }
}

// Usage
const cache = new LocationCache();
cache.startAutoCleanup();

// Cache geocoding results
const location = await cache.get(
  `geocode:${address}`,
  () => controls.resolvePlace(address)
);

// Cache route calculations
const route = await cache.get(
  `route:${origin}-${destination}`,
  () => calculateRoute(origin, destination)
);
```

### 6. Lazy Load Components

```typescript
// Only load MSI when needed
class LazyMapLoader {
  private msiPromise?: Promise<any>;
  
  async loadWhenNeeded() {
    if (this.msiPromise) {
      return this.msiPromise;
    }
    
    this.msiPromise = this.initializeMSI();
    return this.msiPromise;
  }
  
  private async initializeMSI() {
    console.log('Initializing MSI...');
    
    const msi = new De.MSI({
      element: 'map-container',
      accessToken: 'your-token',
      workspace: 'your-workspace'
    });
    
    return await msi.load();
  }
}

// Usage
const mapLoader = new LazyMapLoader();

// Only load map when user clicks "Track Delivery"
button.onclick = async () => {
  const { controls, handles } = await mapLoader.loadWhenNeeded();
  // Use controls and handles
};
```

### 7. Optimize WebSocket Connections

```typescript
class OptimizedWebSocket {
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageQueue: any[] = [];
  
  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      
      // Send queued messages
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        this.send(message);
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.attemptReconnect(url);
    };
  }
  
  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message for later
      this.messageQueue.push(message);
    }
  }
  
  private attemptReconnect(url: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      this.connect(url);
    }, delay);
  }
  
  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
  }
}

// Usage
const ws = new OptimizedWebSocket();
ws.connect('wss://api.dedot.io/fleet/live');
```

---

## Testing

### Unit Testing with Jest

```typescript
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import De from '@dedot/sdk';

describe('De. SDK - MSI', () => {
  let msi: De.MSI;
  
  beforeEach(() => {
    // Mock DOM element
    document.body.innerHTML = '<div id="map-container"></div>';
    
    // Mock fetch for iframe loading
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      } as Response)
    );
    
    msi = new De.MSI({
      element: 'map-container',
      accessToken: 'test-token',
      workspace: 'test-workspace',
      env: 'dev'
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should initialize MSI with correct options', () => {
    expect(msi).toBeDefined();
    expect(msi.isReady()).toBe(false);
  });
  
  it('should load MSI and return API components', async () => {
    const api = await msi.load();
    
    expect(api.controls).toBeDefined();
    expect(api.handles).toBeDefined();
    expect(api.plugins).toBeDefined();
  });
  
  it('should emit error event on initialization failure', (done) => {
    const failingMsi = new De.MSI({
      element: 'non-existent',
      accessToken: 'test-token',
      workspace: 'test-workspace'
    });
    
    failingMsi.on('error', (error) => {
      expect(error).toBeDefined();
      expect(error.message).toContain('Not Found');
      done();
    });
    
    failingMsi.load().catch(() => {});
  });
});

describe('De. SDK - Controls', () => {
  let controls: De.Controls;
  
  beforeEach(async () => {
    document.body.innerHTML = '<div id="map-container"></div>';
    
    const msi = new De.MSI({
      element: 'map-container',
      accessToken: 'test-token',
      workspace: 'test-workspace',
      env: 'dev'
    });
    
    const api = await msi.load();
    controls = api.controls;
  });
  
  it('should get current location', async () => {
    // Mock getCurrentLocation
    const mockLocation = {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10,
      heading: 180,
      speed: 0
    };
    
    jest.spyOn(controls, 'getCurrentLocation')
      .mockResolvedValue(mockLocation);
    
    const location = await controls.getCurrentLocation();
    
    expect(location).toEqual(mockLocation);
    expect(location?.latitude).toBe(40.7128);
  });
  
  it('should set route with journey', async () => {
    const journey: De.Journey = {
      routeId: 'test-route',
      origin: {
        coords: [40.7128, -74.0060],
        caption: { label: 'Origin' }
      },
      destination: {
        coords: [40.7580, -73.9855],
        caption: { label: 'Destination' }
      }
    };
    
    jest.spyOn(controls, 'setRoute').mockResolvedValue();
    
    await controls.setRoute(journey);
    
    expect(controls.setRoute).toHaveBeenCalledWith(journey);
  });
});

describe('De. SDK - Handles', () => {
  let handles: De.Handles;
  
  beforeEach(async () => {
    document.body.innerHTML = '<div id="map-container"></div>';
    
    const msi = new De.MSI({
      element: 'map-container',
      accessToken: 'test-token',
      workspace: 'test-workspace',
      env: 'dev'
    });
    
    const api = await msi.load();
    handles = api.handles;
  });
  
  it('should create location stream', () => {
    const stream = handles.myLocation('agent');
    
    expect(stream).toBeDefined();
    expect(typeof stream.pipe).toBe('function');
    expect(typeof stream.close).toBe('function');
  });
  
  it('should handle location updates in stream', (done) => {
    const stream = handles.myLocation('agent');
    const mockLocation = {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10
    };
    
    stream.pipe(location => {
      expect(location).toEqual(mockLocation);
      stream.close();
      done();
    });
    
    // Simulate location update
    stream.write(mockLocation);
  });
});

describe('De. SDK - Access', () => {
  let access: De.Access;
  
  beforeEach(() => {
    access = new De.Access({
      workspace: 'test-workspace',
      accessToken: 'test-token',
      env: 'dev',
      version: 1
    });
    
    // Mock fetch
    global.fetch = jest.fn();
  });
  
  it('should make GET request', async () => {
    const mockResponse = { vehicles: [] };
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });
    
    const result = await access.request({
      url: '/fleet/vehicles',
      method: 'GET'
    });
    
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/fleet/vehicles'),
      expect.objectContaining({
        method: 'GET'
      })
    );
  });
  
  it('should make POST request with body', async () => {
    const mockBody = { name: 'Test Order' };
    const mockResponse = { id: 'order-123' };
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });
    
    const result = await access.request({
      url: '/orders',
      method: 'POST',
      body: mockBody
    });
    
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockBody)
      })
    );
  });
  
  it('should update access token', () => {
    const newToken = 'new-test-token';
    access.setToken(newToken);
    
    // Verify token was updated (implementation-specific test)
    expect(access).toBeDefined();
  });
});
```

### Integration Testing

```typescript
describe('De. SDK - Integration Tests', () => {
  let msi: De.MSI;
  let access: De.Access;
  let controls: De.Controls;
  let handles: De.Handles;
  
  beforeAll(async () => {
    // Setup full environment
    document.body.innerHTML = '<div id="map-container"></div>';
    
    access = new De.Access({
      workspace: 'test-workspace',
      accessToken: 'test-token',
      env: 'dev'
    });
    
    msi = new De.MSI({
      element: 'map-container',
      accessToken: 'test-token',
      workspace: 'test-workspace',
      env: 'dev'
    });
    
    const api = await msi.load();
    controls = api.controls;
    handles = api.handles;
  });
  
  it('should complete full delivery flow', async () => {
    // 1. Create order via API
    const order = await access.request({
      url: '/orders',
      method: 'POST',
      body: {
        pickupLocation: [40.7128, -74.0060],
        deliveryLocation: [40.7580, -73.9855]
      }
    });
    
    expect(order).toBeDefined();
    
    // 2. Set route on map
    await handles.pickupPoint(
      [40.7128, -74.0060],
      { label: 'Pickup' }
    );
    
    await handles.dropoffPoint(
      [40.7580, -73.9855],
      { label: 'Delivery' }
    );
    
    // 3. Track vehicle
    const vehicle = { id: 'test-vehicle', location: [40.7128, -74.0060] };
    const vehicleStream = handles.peerLocation(
      vehicle.location,
      { label: 'Driver' }
    );
    
    expect(vehicleStream).toBeDefined();
    
    // Cleanup
    vehicleStream.close();
  });
  
  afterAll(() => {
    // Cleanup
    if (msi) {
      // Close all streams and cleanup
    }
  });
});
```

---

## TypeScript Types Reference

### Core Types

```typescript
// Coordinates
type Coordinates = [number, number]; // [latitude, longitude]

interface RTLocation {
  latitude: number;
  longitude: number;
  accuracy: number;      // meters
  heading?: number;      // degrees (0-360)
  speed?: number;        // meters/second
}

// Captions
interface Caption {
  label: string;
  sublabel?: string;
  description?: string;
}

// Waypoints
interface MapWaypoint {
  coords: Coordinates;
  caption?: Caption;
  index?: number;
}

// Journey
interface Journey {
  routeId: string;
  origin: MapWaypoint | RTLocation;
  destination: MapWaypoint;
  waypoints?: MapWaypoint[];
  options?: RouteOptions;
}

interface RouteOptions {
  mode?: 'driving' | 'walking' | 'cycling';
  avoidTolls?: boolean;
  avoidHighways?: boolean;
  optimize?: boolean;
  announceInstructions?: boolean;
}

// Entities
interface Entity {
  id: string;
  type: string;
  position: Coordinates | RTLocation;
  caption?: Caption;
  metadata?: Record<string, any>;
}

interface EntitySpecs {
  id?: string;
  type: string;
  position?: Coordinates;
  radius?: number;
  coordinates?: Coordinates;
  label?: string;
  caption?: Caption;
}

interface ActivePosition {
  id: string;
  position: Coordinates;
}

// Locations
interface PickedLocation {
  coordinates: Coordinates;
  address?: string;
  placeName?: string;
}

interface SearchPlace {
  id: string;
  name: string;
  coordinates: Coordinates;
  address?: string;
  category?: string;
}

// Map
type MapLayerStyle = 'streets' | 'satellite' | 'dark' | 'light';

interface UserLocationOptions {
  accuracy?: 'high' | 'medium' | 'low';
  updateInterval?: number;  // milliseconds
  showAccuracyCircle?: boolean;
}

interface RoutesFitBoundsOptions {
  routeIds: string[];
  margin?: number;
}

// Drag Pick
type DragPickContentType = 'marker' | 'pin' | 'custom' | 'html';

interface DragPickContent {
  icon?: string;
  color?: string;
  size?: number;
  html?: string;
}
```

---

## Support & Resources

- **Official Documentation**: https://docs.dedot.io
- **API Reference**: https://docs.dedot.io/api
- **Developer Portal**: https://developers.dedot.io
- **GitHub**: https://github.com/dedot
- **Community Forum**: https://community.dedot.io
- **Support Email**: support@dedot.io
- **Status Page**: https://status.dedot.io

---

## Changelog

### Version 2.0.0 (Current)
- ✨ Added Handles API with streaming support
- ✨ Introduced comprehensive Plugin system
- ✨ Enhanced Access client with automatic retry and token management
- ✨ Added full TypeScript type definitions
- ✨ Improved error handling with 12-second timeout protection
- ✨ Added support for multi-stop route optimization
- ✨ Enhanced nearby entity management with live controls
- 🐛 Fixed iframe communication stability issues
- 📚 Complete documentation overhaul

### Version 1.x
- 🎉 Initial release with Controls API
- 🗺️ Basic map integration via iframe
- 📍 Location services (GPS, geocoding)
- 🚗 Simple vehicle tracking
- 🛣️ Basic routing capabilities

---

## License

MIT License - See LICENSE file for details

---

*Last Updated: October 2025*  
*SDK Version: 2.0.0*  
*Compatible with: MSI Gateway v3.0+, De. Platform API v1.0+*

---

**Built by the De. Team**

*Making logistics as simple as flipping a switch.*