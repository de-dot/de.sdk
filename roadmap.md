# de.sdk Roadmap

> Audit date: 2026-04-27 | Current version: 1.0.4

---

## Audit Summary

`de.sdk` is meant to be the single integration surface for everything De. offers — auth, access, API, realtime, MSI, LSP, CSP, IoTSP, Workspace, REALM, etc. After comparing the current implementation against `de.arch`, `de.auth`, `de.iotb`, and the usage examples in `de.docs`, the SDK covers only a narrow slice of the platform.

### What's Actually Implemented Today

| Module | File | Coverage |
|--------|------|----------|
| `Auth` | `backend/Auth.ts` | Server-to-server token get/rotate/revoke lifecycle ✅ |
| `DAuth` | `allend/DAuth/index.ts` | User signin only (phone-based, ASI) ⚠️ |
| `AccessManager` | `allend/Access.ts` | Base HTTP client (inherited, not exported directly) ✅ |
| `MSI` | `allend/MSI/` | Map iframe embed + Controls/Handles/Plugins ✅ |
| `IoTClient` | `allend/IoTClient.ts` | Socket.io connect + record CRUD ⚠️ |
| `DClient.Client` | `allend/DClient/Client.ts` | Active orders, order history, nearby search ✅ |
| `DClient.Order` | `allend/DClient/Order.ts` | Full order lifecycle (intent → waypoints → packages → service → stage) ✅ |
| `DClient.Event` | `allend/DClient/Event.ts` | Realtime socket events (location, stage, route, message) ✅ |
| `Utils` | `utils/index.ts` | Only exposes `Stream` — nothing else ❌ |

---

## Gap Analysis

### 1. `De.Access` class — **MISSING**

The docs ([`sdk/web/access.md`](../de.docs/sdk/web/access.md)) show a primary `De.Access` class with:
- `new De.Access({ workspace, accessToken, env, timeout, retries, headers })`
- `access.request({ url, method, query, body, headers })`
- `access.setAccessToken(token)`

The SDK exports no such class. `AccessManager` is an internal base class only. Integrators following the docs will hit `De.Access is not a constructor`.

### 2. `DClient` API shape mismatch — **CRITICAL**

Docs show:
```ts
const dclient = new De.DClient({ workspace, accessToken, env })
dclient.orders.create(...)
dclient.orders.list(...)
dclient.orders.get(id)
dclient.packages.add(orderId, ...)
dclient.waypoints.add(orderId, ...)
dclient.waypoints.reorder(orderId, [...])
dclient.customers.create(...)
dclient.preferences.set(...)
dclient.intents.create(...)
dclient.events.filter(...)
```

Actual SDK exports `DClient = { Client, Order, Event }` — three separate classes needing independent instantiation. There is no top-level `DClient` constructor, no `.orders`, `.packages`, `.waypoints`, `.customers`, `.preferences`, `.intents`, or `.events` namespace.

### 3. `Utils` — almost entirely missing

Docs promise 15+ utility functions: `calculateDistance`, `formatCoordinates`, `parseCoordinates`, `calculateBounds`, `validateCoordinates`, `formatDistance`, `formatDuration`, `formatTimestamp`, `relativeTime`, `parseDate`, `timeDifference`, `chunk`, `unique`, `groupBy`, `extractCoordinates`, `formatAddress`. The SDK only exports `{ Stream }`.

### 4. `MSI` options surface mismatch

Docs show extended `MapOptions`:
```ts
{ element, accessToken, mapEngine, mapStyle, center, zoom, plugins, locale, units, debug }
```

Actual `MapOptions` type only has `{ element, accessToken, version, env }`. `mapEngine`, `mapStyle`, `center`, `zoom`, `locale`, `units`, `debug`, and `plugins[]` are missing from the type and the implementation.

`msi.destroy()` is referenced in all framework integration examples (React, Vue, Next.js) but not implemented.

### 5. `DAuth` — only signin implemented

Docs reference user auth flow but `DAuth` only has `signin()`. Missing: `register()`, `refresh()`, `profile()`, `updateSettings()`. The `/auth/register` and `/auth/refresh` routes exist in `de.auth`.

### 6. Staging environment — undeclared

`baseUrl.ts` only defines `dev` and `prod`. Docs show `env: 'staging'` as a valid option. `AccessOptions` type has `env: 'dev' | 'prod'` — staging is dropped silently.

### 7. Token revocation — no SDK method

`/v1/access/token/revoke` exists in `de.arch` and is documented, but `Auth` class has no `revokeToken()` method.

### 8. LSP SDK — entirely absent

`de.arch` exposes ~80 LSP endpoints across: Fleet, Carriers, Hubs, Warehouses, Terminals, Agents, Pricing (16 endpoints), Coverage (15 endpoints), Buckets (10 endpoints), Orders, FAQs, Invitation, Users, Operators. No SDK module exists.

### 9. CSP SDK — entirely absent

`de.arch` exposes CSP endpoints for inventory (availability, bulk, reservations, sync), orders, analytics, webhooks, users, operators, invitation. No SDK module exists.

### 10. IoTSP HTTP management SDK — absent

`IoTClient` only covers the socket/realtime layer for IoT data. The full IoTSP management API (Devices CRUD, Topics management, Rules engine — 27 documented endpoints) has no SDK abstraction.

### 11. Workspace SDK — entirely absent

Workspace is the root integration surface — create/manage workspaces, provision LSP/CSP/IoTSP/DEV service instances, manage connectors, admins, users, invitations. 10 connector endpoints, 6 service-type endpoints per service type. No SDK module.

### 12. REALM SDK — entirely absent

REALM covers: Pipelines (templates, executions, escalations, interventions, monitor, webhooks, workers), Queries (capacity, discovery, matching, performance, pricing), Utilities (fares, nearby, common). No SDK coverage.

### 13. DEV / Marketplace SDK — absent

Developer portal and marketplace APIs have no SDK representation.

### 14. AUX (Agents + Customer) SDK — absent

Agent-side operations (dispatch, navigation, rides, tasks, orders, reallocation) and Customer-side operations (intents, orders, rides) have no dedicated SDK modules.

### 15. Global event bus / `dclient.on()` patterns — absent

Docs show `dclient.on('order:created', ...)`, `dclient.on('order:*', ...)`, `dclient.events.filter(...)`. `DClient.Event` handles socket events for a single connected session but there is no workspace-wide event subscription bus.

---

## Roadmap

### Phase 1 — Fix Docs/SDK Contract Mismatches `v1.1.0`

These are breaking discrepancies between documented API and actual implementation. Fixes here unblock integrators trying to follow the docs today.

#### 1.1 Implement `De.Access` class
- New file: `src/allend/Access/index.ts`
- Public constructor: `new Access({ workspace, accessToken, env, timeout, retries, headers })`
- `.request({ url, method, query, body, headers, timeout, retries })` with query-string serialization
- `.setAccessToken(token)` method
- Built on top of existing `AccessManager` base
- Export as `Access` from `src/index.ts`

#### 1.2 Refactor `DClient` to documented shape
- New file: `src/allend/DClient/index.ts` — top-level `DClient` class
- Constructor: `new DClient({ workspace, accessToken, env })`
- Namespaces: `.orders`, `.packages`, `.waypoints`, `.customers`, `.preferences`, `.intents`, `.events`
- Wire existing `Order`, `Client`, `Event` classes into these namespaces
- Add missing methods: `orders.create()`, `orders.list()`, `orders.get()`, `orders.cancel()`, `orders.assign()`, `orders.autoAssign()`, `orders.updateStatus()`, `waypoints.complete()`, `waypoints.skip()`, `waypoints.reorder()`, `customers.create()`, `customers.update()`, `customers.getOrders()`, `preferences.set()`, `preferences.get()`, `intents.create()`, `intents.resolve()`
- Export updated `DClient` from `src/index.ts`

#### 1.3 Implement `Utils`
- New directory: `src/utils/`
- Implement: `calculateDistance`, `formatCoordinates`, `parseCoordinates`, `calculateBounds`, `validateCoordinates`, `validateBounds`, `formatDistance`, `formatDuration`, `formatTimestamp`, `relativeTime`, `parseDate`, `timeDifference`, `extractCoordinates`, `formatAddress`, `chunk`, `unique`, `groupBy`
- Keep existing `Stream` utility
- Export full utils object from `src/index.ts`

#### 1.4 Align `MSI` options and add `destroy()`
- Extend `MapOptions` type: add `mapEngine`, `mapStyle`, `center`, `zoom`, `plugins[]`, `locale`, `units`, `debug`
- Implement `msi.destroy()` — disconnect iframe channel, remove iframe, clear listeners
- Pass through `mapEngine` and `mapStyle` to the embedded iframe bind payload

#### 1.5 Fix `DAuth` — complete user auth surface
- Add `register(body)` → `POST /auth/register`
- Add `refresh(token)` → `POST /auth/refresh`
- Add `profile()` → `GET /user/profile`
- Add `updateSettings(updates)` → `PATCH /user/settings`

#### 1.6 Add staging environment + token revocation
- `baseUrl.ts`: add `staging` entries for `ASI_SERVER_BASEURL` and `API_SERVER_BASEURL`
- Update `AccessOptions` env type: `'dev' | 'staging' | 'prod'`
- `Auth.revokeToken()` → `PATCH /access/token/revoke`

---

### Phase 2 — Service Provider SDK Modules `v2.0.0`

Introduce dedicated SDK modules for each De. service provider type. Each follows the same pattern: typed HTTP client + optional realtime layer.

#### 2.1 `LSP` — Logistics Service Provider SDK
- New directory: `src/allend/LSP/`
- Class: `new LSP({ workspace, xcode, accessToken, env })`
- Namespaces mirroring `de.arch` LSP routes:
  - `.fleet` — vehicles, maintenance, parking
  - `.carriers` — carrier network, capabilities
  - `.hubs` — hub management, capacities
  - `.warehouses` — storage, inventory
  - `.agents` — agent CRUD, vehicle assignment
  - `.pricing` — pricing rules (16 endpoints)
  - `.coverage` — coverage areas (15 endpoints)
  - `.buckets` — bucket management (10 endpoints)
  - `.orders` — order fetch, assign/unassign, cancel
  - `.faqs` — FAQ CRUD + search
  - `.users` / `.operators` — user and operator management

#### 2.2 `CSP` — Commerce Service Provider SDK
- New directory: `src/allend/CSP/`
- Class: `new CSP({ workspace, xcode, accessToken, env })`
- Namespaces:
  - `.inventory` — availability, bulk ops, reservations, sync
  - `.orders` — order fetch, assign, cancel
  - `.analytics` — reporting
  - `.webhooks` — webhook dispatcher management
  - `.users` / `.operators` — access management

#### 2.3 `IoTSP` — IoT Service Provider SDK (HTTP + Realtime)
- New directory: `src/allend/IoTSP/`
- Class: `new IoTSP({ workspace, xcode, accessToken, env })`
- HTTP namespaces:
  - `.devices` — device CRUD, find (7 endpoints)
  - `.topics` — topic register, find, update (10 endpoints)
  - `.rules` — rule CRUD, find (10 endpoints)
- Realtime: absorb existing `IoTClient` socket layer as `.connect(channel)` → `{ socket, records }`
- Export `IoTSP` from `src/index.ts`, deprecate bare `IoTClient` export

---

### Phase 3 — Workspace SDK `v2.1.0`

Workspace is the provisioning and management layer that sits above all service providers.

#### 3.1 `Workspace` class
- New directory: `src/allend/Workspace/`
- Class: `new Workspace({ accessToken, env })`
- Namespaces:
  - `.workspace` — setup, get, update, delete (`/v1/workspace/...`)
  - `.account` — retrieve account, cross-service account check
  - `.users` — user fetch/remove
  - `.admins` — admin CRUD
  - `.invitation` — invite/cancel/accept
  - `.services.lsp` — provision, get, list, context, update LSP service instances
  - `.services.csp` — provision, get, list, context, update CSP service instances
  - `.services.iotsp` — provision, get, list, context, update IoTSP service instances
  - `.services.dev` — provision, get, list, context, update DEV service instances
  - `.connectors` — full connector CRUD (10 endpoints): create, get, list, update, enable/disable, access control, secret rotation, config set/update, delete

---

### Phase 4 — REALM & AUX SDK `v2.2.0`

#### 4.1 `REALM` — Workflow and Intelligence SDK
- New directory: `src/allend/REALM/`
- `.pipelines` — templates, executions, escalations, interventions, monitor, webhooks, workers
- `.queries` — capacity, discovery, matching, performance, pricing
- `.utilities` — fares calculation, nearby search, common utilities

#### 4.2 `AUX.Agent` — Delivery Agent SDK
- New directory: `src/allend/AUX/Agent/`
- Class: `new AgentClient({ agentId, accessToken, env })`
- Namespaces: `.dispatch`, `.navigation`, `.orders`, `.rides`, `.tasks`, `.reallocation`

#### 4.3 `AUX.Customer` — End-Customer SDK
- New directory: `src/allend/AUX/Customer/`
- Class: `new CustomerClient({ customerId, accessToken, env })`
- Namespaces: `.intents`, `.orders`, `.rides`

#### 4.4 `DEV` — Developer/Marketplace SDK
- New directory: `src/allend/DEV/`
- Developer account management, marketplace listing management

---

### Phase 5 — Platform Hardening `v3.0.0`

#### 5.1 Global event bus
- Implement `EventBus` class powering workspace-wide subscriptions
- Support: `on(event, handler)`, `off(event, handler)`, `removeAllListeners(event)`, `events.filter(criteria, handler)`
- Wire into `DClient`, `LSP`, `CSP`, `AgentClient` as `.events` namespace

#### 5.2 SDK entry point redesign
- Single default export: `De` with all modules as properties
- Named exports for each class and type
- Tree-shakeable sub-path exports: `@de./sdk/lsp`, `@de./sdk/csp`, `@de./sdk/workspace`, etc.
- Full TypeScript strict mode across all modules

#### 5.3 `de.sdk-rn` parity
- Bring React Native SDK to feature parity with web SDK
- Replicate Phase 1–4 modules in `de.sdk-rn`
- Align `webview.io` bridge to support new module namespaces

#### 5.4 Test coverage
- Unit tests for all utility functions
- Integration tests for Auth, DClient, LSP, CSP, IoTSP, Workspace (using test environment)
- Contract tests that run against `de.arch` and `de.auth` routes to catch drift

#### 5.5 SDK versioning & changelog automation
- Enforce semver across phases
- Auto-generate changelog from commits
- Add `CHANGELOG.md`

---

## Summary Table

| Phase | Target Version | Scope | Priority |
|-------|---------------|-------|----------|
| 1 | v1.1.0 | Fix docs/SDK contract gaps: Access, DClient shape, Utils, MSI options, DAuth, staging env | **Critical** |
| 2 | v2.0.0 | LSP, CSP, IoTSP service provider SDK modules | **High** |
| 3 | v2.1.0 | Workspace + Connector management SDK | **High** |
| 4 | v2.2.0 | REALM pipelines/queries, AUX Agent/Customer, DEV/Marketplace | **Medium** |
| 5 | v3.0.0 | Event bus, tree-shaking, RN parity, test coverage | **Medium** |

---

## Are We There Yet?

**No.** The current SDK (`v1.0.4`) covers roughly **15–20% of the De. platform surface**:

- ✅ Server auth token lifecycle
- ✅ Map service embedding (MSI)
- ✅ Delivery order + package + realtime event lifecycle (DClient)
- ✅ IoT socket realtime layer
- ❌ No `De.Access` class (documented primary entry point)
- ❌ No LSP, CSP, IoTSP HTTP management APIs
- ❌ No Workspace or Connector management
- ❌ No REALM, AUX, or DEV APIs
- ❌ `DClient` API shape doesn't match docs
- ❌ `Utils` is nearly empty
- ❌ `MSI` options surface is incomplete
- ❌ No staging env, no token revocation, no full user auth flow

Phase 1 should be tackled immediately — it fixes what's documented but broken. Phases 2–3 deliver the core integration value. Phases 4–5 complete the platform.
