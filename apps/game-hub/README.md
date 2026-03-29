# Game Hub

This workspace will hold the backend service responsible for canonical state, sync, persistence, and APIs.

It is the server-authoritative application that coordinates Storyteller commands and audience-specific projections.

## Current Entrypoint

The initial Fastify scaffold now lives here for Task 1.3.1.

- `src/app.ts`
  Reusable Fastify app factory used by tests and future server composition.
- `src/index.ts`
  Local development process entrypoint that starts the HTTP server.
- `src/modules`
  Central module registration seam for future backend routes and service areas.

## Local Development

Start the backend in watch mode with:

```bash
npm run dev --workspace @clocktower-nexus/game-hub
```

The current scaffold intentionally stays minimal. It proves server startup and
module registration, but later tasks still own configuration loading, health
checks, logging, realtime wiring, and persistence integration.
