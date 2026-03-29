# clocktower-nexus

Clocktower Nexus is a self-hosted web application for running _Blood on the
Clocktower_ in person with a private Storyteller console and a shared public
Town Square display.

The repository is currently moving out of the foundation phase. Workspace
tooling, TypeScript, formatting, and linting are in place, the initial Fastify
game-hub scaffold has been added, and the React client runtime scaffolds are
still pending later app tasks.

## Project Overview

This repository is organized as an `npm` workspace monorepo.

- Workspace layout: `apps/*` and `packages/*`
- Internal package scope: `@clocktower-nexus/<package>`
- Local workspace dependency convention: exact unpublished versions such as
  `0.0.0`

## Local Prerequisites

Use the versions already enforced by the repository:

- Node.js `22.x`
- npm `10.x`

## Initial Setup

1. Clone the repository.
2. Install dependencies from the repository root:

   ```bash
   npm install
   ```

3. Run all workspace commands from the repository root.

## Common Root Commands

### Active Validation Commands

These commands are fully useful today:

- `npm run lint`
  Runs ESLint across the workspace through the existing workspace script
  delegation.
- `npm run typecheck`
  Runs TypeScript checks across all apps and packages.
- `npm run format`
  Applies the shared Prettier formatting baseline across the repository.
- `npm run format:check`
  Verifies the repository already matches the shared Prettier formatting
  baseline.

### Stable Placeholder Workflow Commands

These commands are intentionally present now so the command surface stays
stable, but they currently delegate to placeholder workspace scripts until
later scaffold tasks land:

- `npm run dev`
- `npm run build`
- `npm run test`

At this stage, the validation commands are more useful than the runtime
commands.

For the backend specifically, the game hub now has a real local dev entrypoint:

- `npm run dev --workspace @clocktower-nexus/game-hub`
  Starts the Fastify backend in watch mode for local development.

## Workspace Layout

### Apps

- `apps/storyteller-console`
  Private Storyteller UI for setup, control, and monitoring workflows.
- `apps/public-square`
  Public read-only Town Square display for shared game state.
- `apps/game-hub`
  Server-authoritative backend for state, sync, persistence, and APIs.

### Packages

- `packages/domain`
  Canonical game model, commands, reducers, and projection logic.
- `packages/protocol`
  Shared request, response, and WebSocket contracts.
- `packages/script-import`
  Script ingestion helpers.
- `packages/script-normalization`
  Normalized internal script model helpers.
- `packages/script-compatibility`
  Compatibility helpers for external or community script formats.

## Current Development Status

The repository already includes:

- npm workspace wiring
- shared TypeScript configuration
- root development script delegation
- Prettier formatting
- ESLint linting

The repository does not yet include:

- React app runtime scaffolds for the Storyteller console or public square
- real build or test implementations behind every workspace command

## Related Docs

- `docs/project-overview.md`
  Product vision, architecture, and design principles.
- `docs/task-list.md`
  Delivery plan and implementation backlog.
- `docs/decisions.md`
  Cross-task design decisions that future work should inherit.

## Agent Guidance

- Review `docs/decisions.md` before planning or implementing work that may be
  affected by earlier design choices.
- Review `AGENTS.md` for repository-wide guidance intended for coding agents and
  future LLM-assisted implementation work.
- Exported shared-package APIs should carry doc comments, while inline comments
  are reserved for non-obvious logic rather than boilerplate narration.
- Lint enforces the structural part of this policy for shared packages, while
  qualitative “comment only when helpful” judgment remains a review and agent
  guidance standard.
