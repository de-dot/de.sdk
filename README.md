# Mijo Platform Developer Documentation

## Overview

Mijo is a mobile-first bus hailing platform that connects passengers with bus services through real-time tracking, digital payments, and subscription-based travel plans. This documentation covers the complete SDK for integrating Mijo's mapping, routing, and navigation capabilities into your applications.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture Overview](#architecture-overview)
3. [Installation & Setup](#installation--setup)
4. [Core Components](#core-components)
5. [API Reference](#api-reference)
6. [Code Examples](#code-examples)
7. [Plugin Development](#plugin-development)
8. [Error Handling](#error-handling)

---

## Getting Started

The Mijo SDK provides three main components:

- **MSI (Map System Interface)**: Complete map integration with iframe-based communication
- **Controls**: Direct map manipulation (styling, routes, navigation)
- **Handles**: High-level abstractions for common workflows (streams, nearby entities)
- **Plugins**: Extensible plugin system for custom functionality
- **Access**: API authentication and HTTP request management
- **DClient**: Client/order/event management (separate from MSI)

### Prerequisites

- Node.js 14+ or modern browser environment
- TypeScript 4.0+ (recommended)
- Valid Mijo workspace and access token

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│           Your Application              │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │   MSI    │  │ DClient  │  │Utils │ │
│  └────┬─────┘  └──────────┘  └──────┘ │
│       │                                 │
│  ┌────┴──────────────────────┐         │
│  │    ┌──────────┐           │         │
│  │    │ Controls │◄──────────┤         │
│  │    └──────────┘           │         │
│  │    ┌──────────┐           │         │
│  │    │ Handles  │◄──────────┤         │
│  │    └──────────┘           │         │
│  │    ┌──────────┐           │         │
│  │    │ Plugins  │◄──────────┤         │
│  │    └──────────┘           │         │
│  └───────────────────────────┘         │
└─────────────────────────────────────────┘
              │
              ▼
      ┌──────────────┐
      │ Iframe (MSI) │
      │  Map Engine  │
      └──────────────┘
```

**Component Responsibilities:**

- **MSI**: Initializes iframe, manages connection, provides access to all sub-components
- **Controls**: Low-level API for direct map operations (Promise-based)
- **Handles**: High-level API with streaming support for real-time data
- **Plugins**: Custom extensions with access to all hooks
- **Access**: Backend API communication with authentication

---

## Installation & Setup

```bash
npm install @mijo/sdk iframe.io
```

### Basic Initialization

```typescript
import SDK from '@mijo/sdk';

// Initialize MSI
const msi = new SDK.MSI({
  element: 'map-container',
  accessToken: 'your-access-token',
  workspace: 'your-workspace-id',
  env: 'prod' // or 'dev'
});

// Load and get access to controls, handles, plugins
const { controls, handles, plugins } = await msi.load();

console.log('Map loaded successfully!');
```

### With Access Client

```typescript
import SDK from '@mijo/sdk';
import Access from '@mijo/sdk/Access';

// Initialize Access for API calls
const access = new Access({
  workspace: 'your-workspace-id',
  accessToken: 'your-access-token',
  remoteOrigin: window.location.origin,
  env: 'prod',
  version: 1
});

// Make authenticated requests
const response = await access.request({
  url: '/buses/nearby',
  method: 'GET'
});
```

---

## Core Components

### 1. MSI (Map System Interface)

The main class that orchestrates the entire map integration through an iframe.

#### Constructor Options

```typescript
interface MapOptions {
  element: string;           // DOM element ID for map container
  accessToken: string;       // Mijo access token
  workspace?: string;        // Workspace identifier
  env?: 'dev' | 'prod';     // Environment
  // ... additional map configuration
}
```

#### Key Methods

**`load(): Promise<MSIInterface>`**

Loads the map iframe and returns initialized components.

```typescript
const { controls, handles, plugins } = await msi.load();
```

**`isReady(): boolean`**

Check if map is loaded and ready for interaction.

```typescript
if (msi.isReady()) {
  console.log('Map is ready!');
}
```

**`plugin<T>(name: string, fn: Plugin<T>)`**

Register a plugin before loading MSI.

```typescript
msi.plugin('busTracker', (hooks, options) => {
  return {
    trackBus: (busId) => {
      // Plugin implementation
    }
  };
});

const { plugins } = await msi.load();
const busTracker = plugins.use('busTracker');
```

#### Events

```typescript
msi.on('ready', () => console.log('Map ready'));
msi.on('error', (error) => console.error('Map error:', error));
msi.on('loaded', (channel) => console.log('Iframe loaded'));
```

---

### 2. Controls

Direct, Promise-based API for map manipulation. See [Controls API Reference](#controls-api) for complete documentation.

**Key Features:**
- Map styling and view control
- Location services (GPS, tracking)
- Geocoding and search
- Route management
- Turn-by-turn navigation
- Waypoint captions

---

### 3. Handles

High-level abstractions with streaming support for real-time data flows.

#### Key Methods

**`myLocation(usertype?: 'client' | 'agent'): Stream`**

Creates a stream of user's current location updates.

```typescript
const locationStream = handles.myLocation('client');

locationStream
  .on('data', (location) => {
    console.log('Current location:', location);
  })
  .onerror((error) => console.error(error))
  .onclose(() => console.log('Stream closed'));

// Close stream when done
locationStream.close();
```

**`peerLocation(position: RTLocation, caption?: Caption): Stream`**

Stream for displaying peer's (e.g., driver's) location.

```typescript
const peerStream = handles.peerLocation({
  latitude: 5.6037,
  longitude: -0.1870,
  accuracy: 10,
  heading: 180,
  speed: 25
}, {
  label: 'Driver John',
  sublabel: 'Toyota Hiace - GS 1234'
});

// Update peer location
peerStream.write({
  position: {
    latitude: 5.6040,
    longitude: -0.1872,
    accuracy: 8,
    heading: 175,
    speed: 30
  }
});

// Close when done
peerStream.close();
```

**`nearby(list: Entity[]): NearbyStream`**

Stream for managing nearby entities (buses, stops) with live controls.

```typescript
const nearbyStream = handles.nearby([
  {
    id: 'bus-001',
    type: 'bus',
    position: { latitude: 5.6037, longitude: -0.1870 },
    caption: { label: 'Bus MJ-001' }
  }
]);

// Get live controls
nearbyStream.live(async (controls) => {
  // Add new bus
  await controls.add({
    id: 'bus-002',
    type: 'bus',
    position: { latitude: 5.6050, longitude: -0.1880 },
    caption: { label: 'Bus MJ-002' }
  });

  // Move existing bus
  await controls.move({
    id: 'bus-001',
    position: { latitude: 5.6040, longitude: -0.1875 }
  });

  // Remove bus
  await controls.remove('bus-002');
});

// Listen to stream updates
nearbyStream.pipe((data) => {
  console.log('Nearby update:', data.action, data.dataset);
});

// Close stream
nearbyStream.close();
```

**`pickupPoint(location: Coordinates, caption?: Caption): Promise<void>`**

Set pickup location with visual marker.

```typescript
await handles.pickupPoint(
  { latitude: 5.7635, longitude: -0.1843 },
  { label: 'Oyarifa Terminal', sublabel: 'Gate 2' }
);
```

**`dropoffPoint(location: Coordinates, caption?: Caption): Promise<void>`**

Set dropoff/destination location.

```typescript
await handles.dropoffPoint(
  { latitude: 5.6037, longitude: -0.1870 },
  { label: 'Makola Market', sublabel: 'Main Entrance' }
);
```

**`peerDirection(options?: RouteOptions): Stream`**

Stream for displaying peer's navigation directions (e.g., showing driver's route to passenger).

```typescript
const peerDirectionStream = handles.peerDirection({
  mode: 'driving',
  avoidTolls: false
});

peerDirectionStream
  .write({
    status: 'STARTED',
    direction: routeDirectionData,
    position: driverLocation
  })
  .on('data', (update) => {
    console.log('Peer navigation update:', update);
  });

// Listen to peer events
handles.on('pe:nearby', () => console.log('Driver nearby!'));
handles.on('pe:arrived', () => console.log('Driver arrived!'));
```

**`navigation(journey: Journey): Promise<Stream>`**

Initiates turn-by-turn navigation and returns stream for position updates.

```typescript
const navStream = await handles.navigation({
  routeId: 'route-001',
  origin: {
    coords: { latitude: 5.7635, longitude: -0.1843 },
    caption: { label: 'Oyarifa' }
  },
  destination: {
    coords: { latitude: 5.6037, longitude: -0.1870 },
    caption: { label: 'Makola' }
  },
  waypoints: [
    {
      coords: { latitude: 5.6892, longitude: -0.2054 },
      caption: { label: 'Dome' },
      index: 0
    }
  ],
  options: {
    mode: 'driving'
  }
});

// Update position as user moves
navStream.write({
  position: {
    latitude: 5.7640,
    longitude: -0.1845,
    accuracy: 10,
    heading: 180,
    speed: 40
  }
});

// Listen to navigation events
handles.on('pe:started', () => console.log('Navigation started'));
handles.on('pe:nearby', () => console.log('Approaching destination'));
handles.on('pe:arrived', () => console.log('Arrived at destination'));

// Close navigation
navStream.close();
```

**`onPickLocation(fn: (location: PickedLocation) => void)`**

Listen for user manually picking location on map.

```typescript
handles.onPickLocation((location) => {
  console.log('User picked:', location.coordinates);
  console.log('Address:', location.address);
});
```

#### Handle Events

```typescript
// Navigation status events
handles.on('pe:started', () => {});
handles.on('pe:stale', () => {});
handles.on('pe:long_stop', () => {});
handles.on('pe:low_traffic', () => {});
handles.on('pe:moderate_traffic', () => {});
handles.on('pe:high_traffic', () => {});
handles.on('pe:speed_warning', () => {});
handles.on('pe:nearby', () => {});
handles.on('pe:arrived', () => {});
handles.on('pe:closed', () => {});
```

---

### 4. Plugins

Extensible system for adding custom functionality.

#### Plugin Structure

```typescript
type Plugin<API, Options = {}> = (
  hooks: PluginHook,
  options?: Options
) => API;

interface PluginHook {
  handles: Handles;
  controls: Controls;
  map: MapOptions;
  utils: typeof Utils;
}
```

#### Creating a Plugin

```typescript
// Define plugin
const routeAnalyticsPlugin = (hooks, options) => {
  const { controls, handles, utils } = hooks;

  return {
    async analyzeRoute(routeId: string) {
      // Access controls
      const route = await controls.getRoute(routeId);
      
      // Use utils
      const distance = utils.calculateDistance(
        route.origin,
        route.destination
      );

      return {
        distance,
        estimatedTime: distance / options.averageSpeed
      };
    },

    trackRouteUsage(routeId: string) {
      // Use handles for streaming
      handles.on('route:completed', (data) => {
        if (data.routeId === routeId) {
          console.log('Route completed:', data);
        }
      });
    }
  };
};

// Register plugin
msi.plugin('routeAnalytics', routeAnalyticsPlugin);

// Use plugin
const { plugins } = await msi.load();
const analytics = plugins.use('routeAnalytics', { averageSpeed: 40 });

const analysis = await analytics.analyzeRoute('route-001');
console.log('Route analysis:', analysis);
```

#### Built-in Plugin Hooks

Plugins have access to:
- **handles**: All handle methods and events
- **controls**: All control methods
- **map**: Current map configuration
- **utils**: Utility functions (distance calculation, formatting, etc.)

---

### 5. Access

Manages API authentication and HTTP requests.

#### Constructor Options

```typescript
interface AccessOptions {
  workspace: string;         // Required: Workspace ID
  accessToken: string;       // Required: Auth token
  remoteOrigin?: string;     // Optional: Origin for CORS
  env?: 'dev' | 'prod';     // Optional: Environment
  version?: number;          // Optional: API version (default: 1)
}
```

#### Methods

**`request<Response>(options: HTTPRequestOptions): Promise<Response>`**

Make authenticated HTTP request to Mijo API.

```typescript
// GET request
const buses = await access.request<BusResponse>({
  url: '/buses/nearby',
  method: 'GET'
});

// POST request
const booking = await access.request<BookingResponse>({
  url: '/bookings',
  method: 'POST',
  body: {
    busId: 'bus-001',
    seats: 2,
    route: 'oyarifa-makola'
  }
});

// With custom headers
const response = await access.request({
  url: '/routes/analytics',
  method: 'GET',
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

**`setToken(token: string): void`**

Update access token (e.g., after refresh).

```typescript
access.setToken('new-access-token-xyz');
```

#### Request Options

```typescript
interface HTTPRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;  // Automatically stringified if object
  headers?: Record<string, string>;
}
```

---

## API Reference

### Controls API

All methods return Promises and have 12-second timeout protection.

#### Authentication

**`refreshToken(token: string)`**
```typescript
controls.refreshToken('new-token');
```

#### Event Listeners

**`on(event: string, listener: Listener)`**
**`off(event: string, listener: Listener)`**
**`removeListeners(listener: Listener)`**

#### Map Styling

**`setMapStyle(style: MapLayerStyle): Promise<void>`**

Options: `'streets'`, `'satellite'`, `'dark'`, `'light'`

#### Location Services

**`getCurrentLocation(): Promise<RTLocation | null>`**
**`pinCurrentLocation(): Promise<Coordinates | null>`**
**`trackLiveLocation(): Promise<void>`**
**`untrackLiveLocation(): Promise<void>`**
**`setLiveLocationOptions(options: UserLocationOptions): Promise<void>`**

#### Drag & Pick

**`enableDragPickLocation(location: Coordinates): Promise<void>`**
**`disableDragPickLocation(): Promise<void>`**
**`setDragPickContent(type: DragPickContentType, content: DragPickContent): Promise<void>`**

#### Geocoding

**`resolvePlace(name: string): Promise<Coordinates | null>`**
**`resolveCoordinates(coords: Coordinates | string): Promise<any | null>`**

#### Search

**`searchQuery(input: string): Promise<string[]>`**
**`searchSelect(index: number): Promise<SearchPlace | null>`**

#### Nearby Entities

**`showNearby(list: EntitySpecs[]): Promise<void>`**
**`addNearbyEntity(entity: EntitySpecs): Promise<void>`**
**`moveNearbyEntity(activePosition: ActivePosition): Promise<void>`**
**`removeNearbyEntity(id: string): Promise<void>`**
**`removeNearby(): Promise<void>`**

#### Routes

**`setRoute(journey: Journey): Promise<void>`**
**`setRouteOrigin(routeId: string, point: MapWaypoint): Promise<void>`**
**`setRouteDestination(routeId: string, point: MapWaypoint): Promise<void>`**
**`removeRouteOrigin(routeId: string): Promise<void>`**
**`removeRouteDestination(routeId: string): Promise<void>`**
**`addRouteWaypoint(routeId: string, point: MapWaypoint): Promise<void>`**
**`updateRouteWaypoint(routeId: string, point: MapWaypoint): Promise<void>`**
**`removeRouteWaypoint(routeId: string, index: number): Promise<void>`**
**`fitRouteBounds(routeId: string, margin?: number): Promise<void>`**
**`fitRoutesBounds(options: RoutesFitBoundsOptions): Promise<void>`**

#### Waypoint Captions

**`setWaypointCaption(routeId: string, id: string | number, caption: Caption): Promise<void>`**
**`updateWaypointCaption(routeId: string, id: string | number, caption: Caption): Promise<void>`**
**`removeWaypointCaption(routeId: string, id: string | number): Promise<void>`**

#### Navigation

**`mountNavigation(routeId: string | number): Promise<void>`**
**`unmountNavigation(): Promise<void>`**
**`loadNavigation(): Promise<void>`**
**`setInitialNavigationPosition(position: RTLocation): Promise<void>`**
**`navigate(position: RTLocation): Promise<void>`**
**`casting(routeId: string | number, direction: any, position?: RTLocation, options?: RouteOptions): Promise<void>`**
**`dismissNavigation(): Promise<void>`**

---

## Code Examples

### Example 1: Complete Bus Booking Flow

```typescript
import SDK from '@mijo/sdk';

async function bookBusJourney() {
  // Initialize MSI
  const msi = new SDK.MSI({
    element: 'map-container',
    accessToken: 'your-token',
    env: 'prod'
  });

  const { controls, handles } = await msi.load();

  try {
    // Set pickup and dropoff
    await handles.pickupPoint(
      { latitude: 5.7635, longitude: -0.1843 },
      { label: 'Oyarifa Terminal' }
    );

    await handles.dropoffPoint(
      { latitude: 5.6037, longitude: -0.1870 },
      { label: 'Makola Market' }
    );

    // Show available buses nearby
    const nearbyBuses = handles.nearby([
      {
        id: 'bus-001',
        type: 'bus',
        position: { latitude: 5.7640, longitude: -0.1845 },
        caption: {
          label: 'MJ-001',
          sublabel: 'Toyota Hiace',
          description: '4 seats available'
        }
      }
    ]);

    // Track selected bus
    nearbyBuses.live(async (controls) => {
      // Simulate bus movement
      setInterval(async () => {
        await controls.move({
          id: 'bus-001',
          position: { 
            latitude: 5.7640 + Math.random() * 0.001, 
            longitude: -0.1845 + Math.random() * 0.001 
          }
        });
      }, 3000);
    });

    console.log('Booking flow setup complete');
  } catch (error) {
    console.error('Booking error:', error);
  }
}
```

### Example 2: Driver Navigation with Passenger Tracking

```typescript
async function driverNavigationFlow() {
  const { controls, handles } = await msi.load();

  // Start navigation to pickup
  const navStream = await handles.navigation({
    routeId: 'pickup-route',
    origin: {
      coords: await controls.getCurrentLocation(),
      caption: { label: 'Current Location' }
    },
    destination: {
      coords: { latitude: 5.7635, longitude: -0.1843 },
      caption: { label: 'Pickup: Oyarifa Terminal' }
    }
  });

  // Show passenger location
  const passengerStream = handles.peerLocation(
    {
      latitude: 5.7635,
      longitude: -0.1843,
      accuracy: 5,
      heading: 0,
      speed: 0
    },
    {
      label: 'Passenger: John Doe',
      sublabel: 'Waiting at terminal'
    }
  );

  // Track driver position and update navigation
  const locationStream = handles.myLocation('agent');
  
  locationStream.on('data', (location) => {
    // Update navigation with current position
    navStream.write({ position: location });
  });

  // Listen for arrival
  handles.once('pe:arrived', () => {
    console.log('Arrived at pickup location!');
    navStream.close();
    locationStream.close();
  });
}
```

### Example 3: Multi-Route Bus Tracking

```typescript
async function trackMultipleBuses() {
  const { controls, handles } = await msi.load();

  // Show multiple buses on different routes
  const buses = [
    {
      id: 'bus-oyarifa-01',
      type: 'bus',
      position: { latitude: 5.7635, longitude: -0.1843 },
      caption: { label: 'Oyarifa Route' }
    },
    {
      id: 'bus-dome-01',
      type: 'bus',
      position: { latitude: 5.6892, longitude: -0.2054 },
      caption: { label: 'Dome Route' }
    }
  ];

  const nearbyStream = handles.nearby(buses);

  // Update bus positions in real-time
  nearbyStream.live(async (busControls) => {
    // Simulate real-time updates from backend
    const ws = new WebSocket('wss://api.mijo.com/bus-positions');
    
    ws.onmessage = async (event) => {
      const update = JSON.parse(event.data);
      
      await busControls.move({
        id: update.busId,
        position: update.location
      });
    };
  });

  // Listen to nearby updates
  nearbyStream.pipe((data) => {
    console.log(`Bus ${data.action}:`, data.dataset);
  });
}
```

### Example 4: Custom Route Analytics Plugin

```typescript
// Define plugin
const routeAnalyticsPlugin = (hooks, options) => {
  const { controls, handles, utils } = hooks;
  const routeStats = new Map();

  return {
    async startTracking(routeId: string) {
      const startTime = Date.now();
      
      handles.on('pe:arrived', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        routeStats.set(routeId, {
          duration,
          timestamp: new Date()
        });
      });
    },

    getStats(routeId: string) {
      return routeStats.get(routeId);
    },

    async optimizeRoute(journey: Journey) {
      // Use controls to set route
      await controls.setRoute(journey);
      
      // Fit bounds for best view
      await controls.fitRouteBounds(journey.routeId);
      
      return {
        routeId: journey.routeId,
        optimized: true
      };
    }
  };
};

// Usage
msi.plugin('analytics', routeAnalyticsPlugin);

const { plugins } = await msi.load();
const analytics = plugins.use('analytics');

await analytics.startTracking('route-001');
await analytics.optimizeRoute(myJourney);
```

### Example 5: API Integration with Access

```typescript
import SDK from '@mijo/sdk';
import Access from '@mijo/sdk/Access';

async function integratedBookingSystem() {
  // Initialize Access client
  const access = new Access({
    workspace: 'mijo-workspace',
    accessToken: 'your-token',
    env: 'prod'
  });

  // Initialize MSI
  const msi = new SDK.MSI({
    element: 'map-container',
    accessToken: 'your-token',
    env: 'prod'
  });

  const { controls, handles } = await msi.load();

  // Get available buses from API
  const { buses } = await access.request<{buses: any[]}>({
    url: '/buses/nearby',
    method: 'GET'
  });

  // Show buses on map
  const nearbyStream = handles.nearby(
    buses.map(bus => ({
      id: bus.id,
      type: 'bus',
      position: bus.currentLocation,
      caption: {
        label: bus.registrationNumber,
        sublabel: `${bus.availableSeats} seats`,
        description: bus.route
      }
    }))
  );

  // Book a seat
  async function bookSeat(busId: string, seats: number) {
    try {
      const booking = await access.request({
        url: '/bookings',
        method: 'POST',
        body: {
          busId,
          seats,
          pickupLocation: { latitude: 5.7635, longitude: -0.1843 },
          dropoffLocation: { latitude: 5.6037, longitude: -0.1870 }
        }
      });

      console.log('Booking confirmed:', booking);
      
      // Update UI with booking details
      await handles.pickupPoint(
        booking.pickupLocation,
        { label: `Pickup - Booking #${booking.id}` }
      );

      return booking;
    } catch (error) {
      console.error('Booking failed:', error);
      throw error;
    }
  }

  return { bookSeat };
}
```

---

## Plugin Development

### Plugin Best Practices

1. **Use hooks efficiently**
   ```typescript
   const myPlugin = (hooks) => {
     const { controls, handles, map, utils } = hooks;
     
     // Good: Cache expensive operations
     const cachedData = new Map();
     
     return {
       async getData(key) {
         if (cachedData.has(key)) {
           return cachedData.get(key);
         }
         
         const data = await controls.someExpensiveOperation();
         cachedData.set(key, data);
         return data;
       }
     };
   };
   ```

2. **Clean up resources**
   ```typescript
   const cleanupPlugin = (hooks) => {
     const { handles } = hooks;
     const listeners = [];
     
     return {
       start() {
         const listener = (data) => console.log(data);
         handles.on('event', listener);
         listeners.push({ event: 'event', listener });
       },
       
       stop() {
         // Clean up all listeners
         listeners.forEach(({ event, listener }) => {
           handles.off(event, listener);
         });
         listeners.length = 0;
       }
     };
   };
   ```

3. **Handle errors gracefully**
   ```typescript
   const safePlugin = (hooks) => {
     return {
       async safeOperation() {
         try {
           return await hooks.controls.someOperation();
         } catch (error) {
           console.error('Plugin error:', error);
           return null;
         }
       }
     };
   };
   ```

### Plugin Template

```typescript
import type { Plugin, PluginHook } from '@mijo/sdk';

interface MyPluginOptions {
  debug?: boolean;
  apiKey?: string;
}

interface MyPluginAPI {
  initialize: () => Promise<void>;
  cleanup: () => void;
}

const myPlugin: Plugin<MyPluginAPI, MyPluginOptions> = (
  hooks: PluginHook,
  options?: MyPluginOptions
) => {
  const { controls, handles, map, utils } = hooks;
  const debug = options?.debug ?? false;

  let initialized = false;

  const log = (...args: any[]) => {
    if (debug) console.log('[MyPlugin]', ...args);
  };

  return {
    async initialize() {
      if (initialized) {
        log('Already initialized');
        return;
      }

      log('Initializing plugin...');
      
      // Setup plugin
      await controls.setMapStyle('streets');
      
      initialized = true;
      log('Plugin initialized');
    },

    cleanup() {
      log('Cleaning up plugin...');
      initialized = false;
    }
  };
};

export default myPlugin;
```

---

## Error Handling

### Common Errors

**1. Timeout Errors**
```typescript
try {
  await controls.setRoute(journey);
} catch (error) {
  if (error === 'Event timeout') {
    console.error('Operation timed out (12s limit exceeded)');
    // Retry or show user message
  }
}
```

**2. Location Permission Errors**
```typescript
try {
  const location = await controls.getCurrentLocation();
} catch (error) {
  console.error('Location access denied');
  // Show UI prompt to enable location
}
```

**3. Invalid Coordinates**
```typescript
function validateCoordinates(coords: Coordinates): boolean {
  return (
    coords.latitude >= -90 && coords.latitude <= 90 &&
    coords.longitude >= -180 && coords.longitude <= 180
  );
}

if (!validateCoordinates(userCoords)) {
  throw new Error('Invalid coordinates');
}
```

**4. Stream Errors**
```typescript
const stream = handles.myLocation();

stream
  .on('data', (location) => {
    // Process location
  })
  .onerror((error) => {
    console.error('Stream error:', error);
    // Handle error, possibly restart stream
  })
  .onclose(() => {
    console.log('Stream closed');
  });
```

**5. API Request Errors**
```typescript
try {
  const response = await access.request({
    url: '/buses/nearby',
    method: 'GET'
  });
} catch (error) {
  console.error('API request failed:', error);
  // Handle network error, show retry option
}
```

**6. MSI Load Errors**
```typescript
const msi = new SDK.MSI({
  element: 'map-container',
  accessToken: 'your-token',
  env: 'prod'
});

msi.on('error', (error) => {
  console.error('MSI error:', error);
});

try {
  const { controls, handles, plugins } = await msi.load();
} catch (error) {
  console.error('Failed to load MSI:', error);
  // Show error UI to user
}
```

### Best Practices for Error Handling

1. **Always use try-catch with async operations**
   ```typescript
   async function safeOperation() {
     try {
       await controls.setRoute(journey);
     } catch (error) {
       console.error('Route setup failed:', error);
       // Provide fallback or user feedback
     }
   }
   ```

2. **Handle stream lifecycle properly**
   ```typescript
   const stream = handles.myLocation();
   
   // Always attach error handler
   stream.onerror((error) => {
     console.error('Stream error:', error);
   });
   
   // Always clean up
   stream.onclose(() => {
     console.log('Stream cleaned up');
   });
   
   // Close when component unmounts
   onUnmount(() => {
     stream.close();
   });
   ```

3. **Validate input before API calls**
   ```typescript
   function validateJourney(journey: Journey): boolean {
     if (!journey.origin || !journey.destination) {
       console.error('Missing origin or destination');
       return false;
     }
     
     if (!validateCoordinates(journey.origin.coords)) {
       console.error('Invalid origin coordinates');
       return false;
     }
     
     return true;
   }
   
   if (validateJourney(myJourney)) {
     await controls.setRoute(myJourney);
   }
   ```

4. **Implement retry logic for critical operations**
   ```typescript
   async function retryOperation<T>(
     operation: () => Promise<T>,
     maxRetries: number = 3,
     delay: number = 1000
   ): Promise<T> {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await operation();
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         
         console.log(`Retry ${i + 1}/${maxRetries}...`);
         await new Promise(resolve => setTimeout(resolve, delay));
       }
     }
     throw new Error('Max retries exceeded');
   }
   
   // Usage
   const location = await retryOperation(
     () => controls.getCurrentLocation(),
     3,
     2000
   );
   ```

5. **Refresh tokens proactively**
   ```typescript
   // Refresh token before expiry
   let tokenRefreshInterval: NodeJS.Timeout;
   
   function startTokenRefresh(access: Access) {
     tokenRefreshInterval = setInterval(async () => {
       try {
         const newToken = await getRefreshedToken();
         access.setToken(newToken);
         controls.refreshToken(newToken);
         console.log('Token refreshed successfully');
       } catch (error) {
         console.error('Token refresh failed:', error);
       }
     }, 3600000); // Every hour
   }
   
   function stopTokenRefresh() {
     clearInterval(tokenRefreshInterval);
   }
   ```

---

## TypeScript Types Reference

### Core Types

```typescript
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface RTLocation extends Coordinates {
  accuracy: number;
  heading?: number;  // Degrees (0-360)
  speed?: number;    // Meters per second
}

interface Caption {
  label: string;
  sublabel?: string;
  description?: string;
}

interface MapWaypoint {
  coords: Coordinates;
  caption?: Caption;
  index?: number;
}

interface Journey {
  routeId: string;
  origin: MapWaypoint;
  destination: MapWaypoint;
  waypoints?: MapWaypoint[];
  options?: RouteOptions;
}

interface RouteOptions {
  mode?: 'driving' | 'walking' | 'cycling';
  avoidTolls?: boolean;
  avoidHighways?: boolean;
  announceInstructions?: boolean;
}

interface Entity {
  id: string;
  type: 'bus' | 'stop' | 'station' | string;
  position: Coordinates;
  caption?: Caption;
  metadata?: Record<string, any>;
}

interface ActivePosition {
  id: string;
  position: Coordinates;
}

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

interface EntitySpecs {
  id?: string;
  type: string;
  radius?: number;
  coordinates?: Coordinates;
  label?: string;
}

interface RoutesFitBoundsOptions {
  routeIds: string[];
  margin?: number;
}

interface UserLocationOptions {
  accuracy?: 'high' | 'medium' | 'low';
  updateInterval?: number;  // Milliseconds
  showAccuracyCircle?: boolean;
}

type MapLayerStyle = 'streets' | 'satellite' | 'dark' | 'light';

type DragPickContentType = 'marker' | 'pin' | 'custom';

interface DragPickContent {
  icon?: string;
  color?: string;
  size?: number;
}
```

### Stream Types

```typescript
interface Stream {
  on(event: 'data', handler: (data: any) => void): Stream;
  write(data: any): Stream;
  sync(data: any): void;
  error(error: Error): void;
  close(): void;
  isActive(): boolean;
  onerror(handler: (error: Error) => void): Stream;
  onclose(handler: () => void): Stream;
  pipe(handler: (data: any) => void): Stream;
}

interface NearbyStream {
  live: (fn: (controls: ControlEntity) => void) => Stream;
  pipe: (handler: (data: any) => void) => void;
  close: (fn?: (error?: Error) => void) => void;
}

interface ControlEntity {
  add: (entity: Entity) => Promise<void>;
  remove: (id: string) => Promise<void>;
  move: (update: ActivePosition) => Promise<void>;
}
```

### Plugin Types

```typescript
interface PluginHook {
  handles: Handles;
  controls: Controls;
  map: MapOptions;
  utils: typeof Utils;
}

type Plugin<API, Options = {}> = (
  hooks: PluginHook,
  options?: Options
) => API;
```

### Access Types

```typescript
interface AccessOptions {
  workspace: string;
  accessToken: string;
  remoteOrigin?: string;
  env?: 'dev' | 'prod';
  version?: number;
}

interface HTTPRequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}
```

---

## Advanced Usage Patterns

### Pattern 1: Real-Time Bus Tracking System

```typescript
class BusTrackingSystem {
  private msi: MSI;
  private access: Access;
  private nearbyStream?: NearbyStream;
  private wsConnection?: WebSocket;
  
  constructor(msiInstance: MSI, accessInstance: Access) {
    this.msi = msiInstance;
    this.access = accessInstance;
  }
  
  async initialize() {
    const { handles } = await this.msi.load();
    
    // Get initial bus positions from API
    const { buses } = await this.access.request<{buses: any[]}>({
      url: '/buses/active',
      method: 'GET'
    });
    
    // Display buses on map
    this.nearbyStream = handles.nearby(
      buses.map(bus => ({
        id: bus.id,
        type: 'bus',
        position: bus.currentLocation,
        caption: {
          label: bus.registrationNumber,
          sublabel: `${bus.route}`,
          description: `${bus.availableSeats} seats available`
        }
      }))
    );
    
    // Setup WebSocket for real-time updates
    this.setupWebSocket();
  }
  
  private setupWebSocket() {
    this.wsConnection = new WebSocket('wss://api.mijo.com/ws/buses');
    
    this.wsConnection.onmessage = async (event) => {
      const update = JSON.parse(event.data);
      
      if (!this.nearbyStream) return;
      
      this.nearbyStream.live(async (controls) => {
        switch (update.type) {
          case 'position':
            await controls.move({
              id: update.busId,
              position: update.location
            });
            break;
          
          case 'new_bus':
            await controls.add({
              id: update.bus.id,
              type: 'bus',
              position: update.bus.location,
              caption: {
                label: update.bus.registrationNumber,
                sublabel: update.bus.route
              }
            });
            break;
          
          case 'bus_offline':
            await controls.remove(update.busId);
            break;
        }
      });
    };
    
    this.wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Implement reconnection logic
      setTimeout(() => this.setupWebSocket(), 5000);
    };
  }
  
  cleanup() {
    this.wsConnection?.close();
    this.nearbyStream?.close();
  }
}

// Usage
const trackingSystem = new BusTrackingSystem(msi, access);
await trackingSystem.initialize();
```

### Pattern 2: Multi-Stop Route Pricing Calculator

```typescript
class RoutePricingCalculator {
  private controls: Controls;
  
  // Mijo pricing structure from business model
  private priceSegments = [
    { from: 'Oyarifa', to: 'Dome', price: 10 },
    { from: 'Dome', to: 'Achimota', price: 8 },
    { from: 'Achimota', to: 'Circle', price: 7 },
    { from: 'Circle', to: 'Makola', price: 5 }
  ];
  
  constructor(controls: Controls) {
    this.controls = controls;
  }
  
  async calculateFare(
    pickup: string,
    dropoff: string
  ): Promise<number> {
    const pickupIndex = this.findStopIndex(pickup);
    const dropoffIndex = this.findStopIndex(dropoff);
    
    if (pickupIndex === -1 || dropoffIndex === -1) {
      throw new Error('Invalid stop names');
    }
    
    let totalFare = 0;
    for (let i = pickupIndex; i < dropoffIndex; i++) {
      totalFare += this.priceSegments[i].price;
    }
    
    return totalFare;
  }
  
  private findStopIndex(stopName: string): number {
    return this.priceSegments.findIndex(
      segment => segment.from.toLowerCase() === stopName.toLowerCase()
    );
  }
  
  async displayRouteWithPricing(
    routeId: string,
    pickup: string,
    dropoff: string
  ) {
    const fare = await this.calculateFare(pickup, dropoff);
    
    // Resolve stop locations
    const pickupCoords = await this.controls.resolvePlace(pickup);
    const dropoffCoords = await this.controls.resolvePlace(dropoff);
    
    if (!pickupCoords || !dropoffCoords) {
      throw new Error('Could not resolve stop locations');
    }
    
    // Set route
    await this.controls.setRoute({
      routeId,
      origin: {
        coords: pickupCoords,
        caption: {
          label: pickup,
          sublabel: 'Pickup Point'
        }
      },
      destination: {
        coords: dropoffCoords,
        caption: {
          label: dropoff,
          sublabel: `Total Fare: ${fare} GHS`
        }
      }
    });
    
    await this.controls.fitRouteBounds(routeId, 60);
    
    return { fare, routeId };
  }
}

// Usage
const calculator = new RoutePricingCalculator(controls);
const { fare } = await calculator.displayRouteWithPricing(
  'route-001',
  'Oyarifa',
  'Achimota'
);
console.log(`Fare: ${fare} GHS`); // Output: Fare: 18 GHS
```

### Pattern 3: Subscription Management Integration

```typescript
class SubscriptionManager {
  private access: Access;
  private handles: Handles;
  
  constructor(access: Access, handles: Handles) {
    this.access = access;
    this.handles = handles;
  }
  
  async validateQRCode(qrCode: string): Promise<boolean> {
    try {
      const response = await this.access.request<{valid: boolean}>({
        url: '/subscriptions/validate-qr',
        method: 'POST',
        body: { qrCode }
      });
      
      return response.valid;
    } catch (error) {
      console.error('QR validation failed:', error);
      return false;
    }
  }
  
  async validatePhysicalCard(cardId: string): Promise<boolean> {
    try {
      const response = await this.access.request<{valid: boolean}>({
        url: '/subscriptions/validate-card',
        method: 'POST',
        body: { cardId }
      });
      
      return response.valid;
    } catch (error) {
      console.error('Card validation failed:', error);
      return false;
    }
  }
  
  async purchaseSubscription(
    type: 'weekly' | 'monthly' | 'yearly',
    routes: string[]
  ) {
    const response = await this.access.request({
      url: '/subscriptions/purchase',
      method: 'POST',
      body: {
        subscriptionType: type,
        routes,
        timestamp: Date.now()
      }
    });
    
    return response;
  }
  
  async getSubscriptionStatus(userId: string) {
    const subscription = await this.access.request<any>({
      url: `/subscriptions/${userId}`,
      method: 'GET'
    });
    
    return {
      isActive: subscription.status === 'active',
      type: subscription.type,
      remainingCredits: subscription.credits,
      expiryDate: new Date(subscription.expiresAt)
    };
  }
}

// Usage
const subManager = new SubscriptionManager(access, handles);

// Validate QR code at boarding
const isValid = await subManager.validateQRCode('QR12345ABC');
if (isValid) {
  console.log('Passenger authorized to board');
} else {
  console.log('Invalid subscription');
}

// Purchase new subscription
const subscription = await subManager.purchaseSubscription(
  'monthly',
  ['oyarifa-makola', 'dome-circle']
);
console.log('Subscription purchased:', subscription);
```

### Pattern 4: Corporate Transportation Dashboard

```typescript
class CorporateDashboard {
  private msi: MSI;
  private access: Access;
  private activeBuses: Map<string, any> = new Map();
  
  constructor(msi: MSI, access: Access) {
    this.msi = msi;
    this.access = access;
  }
  
  async initialize(companyId: string) {
    const { controls, handles } = await this.msi.load();
    
    // Get company's dedicated buses
    const { buses } = await this.access.request<{buses: any[]}>({
      url: `/corporate/${companyId}/buses`,
      method: 'GET'
    });
    
    // Display all company buses
    const nearbyStream = handles.nearby(
      buses.map(bus => ({
        id: bus.id,
        type: 'bus',
        position: bus.currentLocation,
        caption: {
          label: `Company Bus ${bus.number}`,
          sublabel: `Route: ${bus.assignedRoute}`,
          description: `Passengers: ${bus.currentPassengers}/${bus.capacity}`
        }
      }))
    );
    
    return { controls, handles, nearbyStream };
  }
  
  async getEmployeeUsageReport(
    companyId: string,
    startDate: Date,
    endDate: Date
  ) {
    const report = await this.access.request<any>({
      url: `/corporate/${companyId}/usage-report`,
      method: 'POST',
      body: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
    
    return {
      totalTrips: report.totalTrips,
      totalEmployees: report.uniqueEmployees,
      averageTripsPerDay: report.avgTripsPerDay,
      costSavings: report.estimatedSavings,
      peakUsageHours: report.peakHours
    };
  }
  
  async scheduleDedicatedRoute(
    companyId: string,
    route: Journey,
    schedule: string
  ) {
    const response = await this.access.request({
      url: `/corporate/${companyId}/schedule-route`,
      method: 'POST',
      body: {
        route,
        schedule, // e.g., "Mon-Fri 7:00AM, 5:00PM"
        capacity: 14
      }
    });
    
    return response;
  }
}

// Usage
const dashboard = new CorporateDashboard(msi, access);
await dashboard.initialize('company-123');

const report = await dashboard.getEmployeeUsageReport(
  'company-123',
  new Date('2025-01-01'),
  new Date('2025-01-31')
);
console.log('Monthly usage:', report);
```

---

## Performance Optimization

### 1. Batch Operations

```typescript
// Bad: Multiple individual operations
for (const bus of buses) {
  await controls.addNearbyEntity(bus);
}

// Good: Single batch operation
await controls.showNearby(buses);
```

### 2. Debounce Frequent Updates

```typescript
import { debounce } from 'lodash';

const debouncedMove = debounce(
  async (busId: string, position: Coordinates) => {
    await nearbyStream.live(async (controls) => {
      await controls.move({ id: busId, position });
    });
  },
  500 // Update at most every 500ms
);

// Use debounced function
wsConnection.onmessage = (event) => {
  const { busId, position } = JSON.parse(event.data);
  debouncedMove(busId, position);
};
```

### 3. Cleanup Streams Properly

```typescript
class ComponentWithStreams {
  private streams: Stream[] = [];
  
  async setupStreams() {
    const locationStream = handles.myLocation();
    this.streams.push(locationStream);
    
    const peerStream = handles.peerLocation(driverLocation);
    this.streams.push(peerStream);
  }
  
  cleanup() {
    // Close all streams on component unmount
    this.streams.forEach(stream => {
      if (stream.isActive()) {
        stream.close();
      }
    });
    this.streams = [];
  }
}
```

### 4. Cache Expensive Operations

```typescript
class LocationCache {
  private cache = new Map<string, Coordinates>();
  private ttl = 300000; // 5 minutes
  
  async resolvePlace(
    controls: Controls,
    placeName: string
  ): Promise<Coordinates | null> {
    // Check cache
    if (this.cache.has(placeName)) {
      return this.cache.get(placeName)!;
    }
    
    // Fetch and cache
    const coords = await controls.resolvePlace(placeName);
    if (coords) {
      this.cache.set(placeName, coords);
      
      // Clear cache after TTL
      setTimeout(() => {
        this.cache.delete(placeName);
      }, this.ttl);
    }
    
    return coords;
  }
}
```

---

## Testing

### Unit Testing with Jest

```typescript
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import SDK from '@mijo/sdk';

describe('Mijo SDK', () => {
  let msi: SDK.MSI;
  
  beforeEach(() => {
    // Mock DOM element
    document.body.innerHTML = '<div id="map-container"></div>';
    
    msi = new SDK.MSI({
      element: 'map-container',
      accessToken: 'test-token',
      env: 'dev'
    });
  });
  
  it('should initialize MSI', async () => {
    const api = await msi.load();
    
    expect(api.controls).toBeDefined();
    expect(api.handles).toBeDefined();
    expect(api.plugins).toBeDefined();
  });
  
  it('should handle location updates', async () => {
    const { handles } = await msi.load();
    const locationStream = handles.myLocation();
    
    const locations: any[] = [];
    locationStream.on('data', (location) => {
      locations.push(location);
    });
    
    // Simulate location update
    locationStream.write({
      latitude: 5.6037,
      longitude: -0.1870,
      accuracy: 10
    });
    
    expect(locations).toHaveLength(1);
    expect(locations[0].latitude).toBe(5.6037);
  });
});
```

### Integration Testing

```typescript
describe('Route Management Integration', () => {
  it('should create and display route', async () => {
    const { controls } = await msi.load();
    
    await controls.setRoute({
      routeId: 'test-route',
      origin: {
        coords: { latitude: 5.7635, longitude: -0.1843 },
        caption: { label: 'Start' }
      },
      destination: {
        coords: { latitude: 5.6037, longitude: -0.1870 },
        caption: { label: 'End' }
      }
    });
    
    // Verify route was created
    // (implementation depends on your test setup)
    expect(true).toBe(true);
  });
});
```

---

## Support & Resources

- **API Documentation**: https://docs.mijo.com
- **Support Email**: contact@mijo.com
- **GitHub Issues**: https://github.com/mijo/sdk-issues
- **Phone Support**: +233 050 077 1557 / +233 020 866 7545
- **Website**: https://www.mijo.com

---

## Changelog

### Version 2.0.0 (Current)
- Added Handles API with streaming support
- Introduced Plugin system
- Enhanced Access client with automatic token management
- Added TypeScript type definitions
- Improved error handling with timeout protection
- Added support for multi-stop routes

### Version 1.x
- Initial release with Controls API
- Basic map integration
- Location services

---

*Last Updated: October 2025*  
*SDK Version: 2.0.0*  
*Compatible with: MSI Gateway v3.0+*