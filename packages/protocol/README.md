# Protocol

This workspace will hold typed request, response, and WebSocket message contracts shared across the backend and clients.

It should become the single source of truth for transport shapes and runtime-compatible contract definitions.

Current stable HTTP imports are:

- `@clocktower-nexus/protocol`
- `@clocktower-nexus/protocol/http`

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
