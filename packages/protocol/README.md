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

Runtime schemas and validation are intentionally deferred to Task 1.2.7.

The package also defines shared WebSocket contracts for realtime sync between
the backend and both clients:

- client messages cover `connect` and `subscribe`
- server messages cover `connected`, `subscribed`, `projection_update`, and
  `socket_error`
- realtime audience and stream labels use `storyteller | public`
- revision-aware fields use numeric values such as `lastKnownRevision`,
  `sinceRevision`, `currentRevision`, and `revision`

WebSocket contracts in this task remain transport-only:

- no runtime schemas yet
- no token or authorization payload shapes yet
- no heartbeat or disconnect messages yet
- no concrete storyteller or public projection payload types yet

Runtime validation is intentionally deferred to Task 1.2.7. Role-aware socket
authorization lands later in Task 1.3.5.
