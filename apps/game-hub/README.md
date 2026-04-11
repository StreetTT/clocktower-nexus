# Game Hub

This workspace will hold the backend service responsible for canonical state, sync, persistence, and APIs.

It is the server-authoritative application that coordinates Storyteller commands and audience-specific projections.

## Current Entrypoint

The initial Fastify scaffold now lives here for Task 1.3.1.

- `src/app.ts`
  Reusable Fastify app factory used by tests and future server composition.
- `src/config.ts`
  Typed runtime config loading for host and port startup settings.
- `src/index.ts`
  Local development process entrypoint that starts the HTTP server.
- `src/modules`
  Central module registration seam for future backend routes and service areas,
  including the bootstrap and health routes.

## Local Development

Start the backend in watch mode with:

```bash
npm run dev --workspace @clocktower-nexus/game-hub
```

The current scaffold supports these startup environment variables:

- `HOST`
  Optional listen host. Defaults to `127.0.0.1`.
- `PORT`
  Optional listen port. Defaults to `3000`.

The service also exposes a basic health endpoint for local and container
checks:

```text
GET /health
```

This scaffold intentionally stays minimal. It now covers server startup, typed
config loading, and a basic health route, but later tasks still own realtime
wiring, persistence integration, and richer readiness checks.

## Logging And Error Handling

The game hub now uses Fastify's structured JSON logger directly.
Request failures and startup failures are logged in machine-readable form
without a separate custom logging layer.

HTTP failures now follow a centralized shared-envelope convention:

- handled errors return `ok: false`
- failure payloads live under `error`
- request correlation is exposed through `meta.requestId`
- unknown failures map to a generic internal server error shape

The backend's thrown error model stays separate from raw transport payloads, so
future HTTP and websocket handling can reuse the same canonical server error
taxonomy.
