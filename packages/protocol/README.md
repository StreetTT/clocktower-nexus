# Protocol

This workspace will hold typed request, response, and WebSocket message contracts shared across the backend and clients.

It should become the single source of truth for transport shapes and runtime-compatible contract definitions.

Current stable HTTP imports are:

- `@clocktower-nexus/protocol`
- `@clocktower-nexus/protocol/http`
- `@clocktower-nexus/protocol/websocket`

The package now defines shared HTTP envelope primitives for both client apps and
the backend:

- success responses use `ok: true` with payloads under `data`
- error responses use `ok: false` with failures under `error`
- response metadata may include `requestId` for correlation and `revision` for
  revision-aware server state

Requests remain endpoint-specific shapes in this task. Use `ApiRequestShape` to
compose typed `params`, `query`, and `body` fields where helpful, but do not
wrap request bodies in a global transport envelope yet.

The package also defines shared WebSocket contracts for realtime sync between
the backend and both clients:

- client messages cover `connect` and `subscribe`
- server messages cover `connected`, `subscribed`, `projection_update`, and
  `socket_error`
- realtime audience and stream labels use `storyteller | public`
- revision-aware fields use numeric values such as `lastKnownRevision`,
  `sinceRevision`, `currentRevision`, and `revision`

WebSocket contracts in this task remain transport-only:

- runtime schemas cover the shared transport message shapes in this package
- no token or authorization payload shapes yet
- no heartbeat or disconnect messages yet
- no concrete storyteller or public projection payload types yet

The package now also exports runtime Zod schemas and schema builders for these
shared transport contracts. The schemas are the runtime source of truth, while
the exported TypeScript types stay aligned with those schema shapes.

Use the protocol package for:

- concrete schemas such as `connectMessageSchema` and `socketErrorMessageSchema`
- reusable schema builders such as `createApiResponseEnvelopeSchema` and
  `createProjectionUpdateMessageSchema`
- thin validation helpers such as `parseWithSchema` and `safeParseWithSchema`

Endpoint-specific HTTP payload schemas and concrete storyteller or public
projection schemas should plug into those builders from the backend or clients
that own those payloads.

Runtime validation lands in this task, but later work still owns:

- Task 1.3.3 for transport and backend error conventions
- Task 1.3.5 for role-aware socket authorization
- Task 1.2.8 and Task 1.2.9 for concrete storyteller and public projection
  payload shapes
