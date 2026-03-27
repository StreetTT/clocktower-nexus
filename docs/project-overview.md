# Clocktower Nexus Project Overview

## Purpose of this document

This document is the project-level overview for `clocktower-nexus`. It exists to keep product, architecture, and implementation decisions aligned as the repository grows from planning into active development.

Use this document as a grounding reference when:

- deciding whether a feature belongs in v1
- evaluating tradeoffs between simplicity and flexibility
- choosing where code should live
- reviewing proposals that affect architecture, hosting, or state visibility
- onboarding contributors who need the "why" behind the project shape

This overview is intentionally opinionated. It is meant to reduce drift, not just describe possibilities.

## Project summary

`clocktower-nexus` is a new self-hosted web application for running _Blood on the Clocktower_ in person with a private Storyteller console and a shared public Town Square display.

The project is inspired by tools such as Townsquare and Pocket Grimoire, but it is not designed as a direct integration of those codebases. Instead, it is a fresh system built around the specific product shape we want:

- in-person-first
- LAN-first
- self-host-friendly
- Storyteller-assisted
- server-authoritative
- safe by default with respect to hidden game information

The system should help a Storyteller run a smooth game, reduce bookkeeping, and keep the public display in sync without trying to become a fully automated game engine.

## Product vision

The product should feel like a dependable digital table companion for live play:

- The Storyteller has a fast, private control surface that works well on tablet or laptop.
- The public display is legible at distance and updates instantly when public game state changes.
- Setup should be simple enough for hobby groups to self-host without needing cloud infrastructure or complex operations knowledge.
- The application should improve game flow without replacing Storyteller judgment.

The ideal v1 experience is:

1. A host starts the app locally on a laptop, mini PC, or home server.
2. The Storyteller opens the private console on a tablet or laptop.
3. A TV or projector opens the public display in a browser.
4. The Storyteller controls the game from the console.
5. The public display updates automatically and only shows information that should be public.

## Goals

### Primary goals

- Provide a high-quality private Storyteller console for running in-person games.
- Provide a high-quality shared public Town Square display.
- Keep Storyteller and public display state synchronized in real time.
- Make self-hosting easy for hobby groups.
- Preserve hidden information by construction.
- Support official and homebrew/custom scripts in a structured way.
- Keep the product useful even when the Storyteller is still making the actual game decisions.

### Secondary goals

- Establish a clean architecture that can support future expansion.
- Make it easy for contributors to work on frontend, backend, and domain layers independently.
- Support undo, reload, reconnect, and session recovery reliably.
- Keep deployment simple enough that users can run the app with minimal setup.

## Non-goals for v1

The following are explicitly out of scope unless requirements change:

- full remote-play-first architecture
- private player apps or individualized player views
- full automation of character abilities or night actions
- replacing Storyteller judgment with game-engine enforcement
- cloud-first multi-tenant SaaS infrastructure
- peer-to-peer synchronization
- direct dependency on Townsquare or Pocket Grimoire internals

These may be future opportunities, but they should not shape v1 architecture in ways that make the product harder to build or self-host.

## Target users and use context

### Primary users

- Storytellers running in-person games
- groups hosting local game nights
- hobbyists who are comfortable running a Docker container or simple local service

### Use environment

- one private Storyteller device, usually a tablet or laptop
- one shared public display, usually a TV, monitor, or projector
- both devices on the same local network
- internet access optional, not required for normal play

### Success criteria

The project is succeeding if a Storyteller can:

- set up a session quickly
- manage seats, names, roles, reminders, deaths, and ghost votes without friction
- run nominations, votes, and day/night transitions smoothly
- trust that the public display will update correctly
- self-host the system without needing a separate database or multiple services

## Product principles

The following principles should guide feature and implementation decisions:

### 1. The server is the source of truth

Clients render and issue commands. They do not own game truth.

### 2. Public information must be safe by construction

The public display must receive only a redacted public projection. Hidden state should not be sent and then hidden in the UI.

### 3. Storyteller assistance beats over-automation

The system should reduce bookkeeping and improve visibility, but the Storyteller remains in control of interpretation and resolution.

### 4. Self-host simplicity matters

A feature that materially complicates self-hosting needs a strong justification.

### 5. LAN-first beats cloud-first

The default deployment should work well on a local network with a small number of devices and low operational overhead.

### 6. Architecture should be extensible, not speculative

We should preserve future options without paying large complexity costs for features that are not in v1.

### 7. Domain logic belongs outside the UI

Rules about game state, visibility, and state transitions should live in shared domain/backend modules, not component code.

## High-level shape

`clocktower-nexus` should be built as a modular monolith:

- one deployable backend application
- one persistence layer
- one shared domain model
- two primary client surfaces for v1

This is intentionally not a microservice architecture. The scale, deployment model, and contributor size do not justify distributed complexity.

## Primary surfaces

### Storyteller console

The private control surface used to:

- create and load sessions
- manage players and seats
- assign roles
- track alive/dead state
- manage ghost votes
- add reminders and private notes
- control day/night phase
- manage nominations and votes
- drive what the public display should show

### Public Town Square

The shared display used to show public game state such as:

- seat order
- player names
- alive/dead state
- ghost vote availability
- nomination or vote state
- day/night state
- timer or other public indicators

The public display should remain read-only in v1.

## Internal architecture modules

The codebase should evolve toward the following responsibilities:

- `apps/storyteller-console`
  - private UI for Storyteller workflows
- `apps/public-square`
  - public read-only display
- `apps/game-hub`
  - server app responsible for state, sync, persistence, and APIs
- `packages/domain`
  - canonical game state, commands, events, reducers, and projection logic
- `packages/protocol`
  - typed request, response, and WebSocket message contracts
- `packages/script-*`
  - script import, normalization, metadata, and compatibility helpers
- `docs/`
  - project guidance, ADRs, operational docs, and planning material

Even if the monorepo is scaffolded in stages, these boundaries should guide where new code lands.

## Recommended technical stack

The default stack for v1 should optimize for one language, fast iteration, and simple self-hosting:

- frontend: React + TypeScript + Vite
- backend: Fastify + TypeScript
- realtime transport: WebSocket
- runtime validation: Zod
- persistence: SQLite
- packaging and deployment: Docker

### Why this stack

- TypeScript across the stack reduces friction and improves shared contracts.
- Fastify is lightweight and well suited to a monolithic app with APIs plus WebSocket support.
- WebSocket is enough for realtime state sync between a small set of local clients.
- SQLite avoids the operational burden of requiring a separate database service.
- Docker makes self-hosting and upgrades more approachable.

Alternative choices are acceptable only if they preserve the same product priorities and simplicity goals.

## State and data model

The system should be modeled in terms of domain concepts rather than UI widgets.

Important concepts include:

- `GameSession`
- `Seat`
- `Player`
- `CharacterAssignment`
- `ReminderMarker`
- `PhaseState`
- `NominationState`
- `VoteState`
- `StorytellerProjection`
- `PublicProjection`
- `SessionEvent`

### Modeling guidance

- Model alive/dead state directly rather than inferring it from visual markers.
- Model ghost vote availability directly rather than as a side effect of unrelated UI state.
- Treat reminders as private Storyteller artifacts unless explicitly designed otherwise.
- Keep projection logic deterministic and testable.
- Prefer semantic commands like `mark_player_dead` over UI-shaped mutations like `toggle_shroud`.

## Command and projection model

The preferred state flow is:

1. The Storyteller performs an action in the console.
2. The client sends a typed command to the server.
3. The server validates the command and updates canonical session state.
4. The server derives audience-specific projections.
5. The server sends the updated public projection to the public display.

This pattern matters because it prevents the UI from becoming the source of truth and keeps redaction enforceable on the server.

## Visibility and privacy model

The most important architecture rule in the project is that hidden information must not leak to the public display.

### Canonical rule

Never send hidden Storyteller data to the public client and rely on the client not to render it.

### Required projections

- `StorytellerProjection`
  - full private state needed for running the game
- `PublicProjection`
  - only data that is intentionally public and safe to display

### Design implications

- visibility concerns should be represented explicitly in code
- projection and redaction logic should be centralized
- tests should verify that public payloads do not contain hidden data
- any feature that changes visibility rules should update projection code and tests together

## Persistence strategy

The default persistence model should prioritize reliability and simple self-hosting.

Recommended baseline:

- SQLite as the primary datastore
- session snapshots for fast loading and recovery
- append-style event history for undo support and debugging

This does not require full event sourcing everywhere, but session history should be preserved well enough to support:

- page reload recovery
- reconnect after temporary disconnects
- basic undo
- post-issue debugging

## Networking and deployment model

The application should be LAN-first.

Typical deployment:

- the host runs one service locally or on a home-network machine
- the Storyteller console connects through a browser
- the public display connects through a browser
- both use the same local service endpoint

### Deployment expectations

The "happy path" deployment should be:

- one Docker image
- one persistent storage location
- one documented startup command
- no external services required beyond the host machine

### Nice-to-have deployment support

- optional reverse proxy support
- optional HTTPS when users expose the app beyond the local network
- simple backup and restore documentation

## Storyteller-assisted product boundary

This project is not trying to encode and enforce all game rules automatically.

The system should help the Storyteller by:

- keeping state organized
- reducing repetitive bookkeeping
- making public-state updates immediate
- improving legibility and confidence during live play

The system should avoid trying to:

- fully resolve all night actions automatically
- decide ambiguous rulings
- encode every interaction as a hard rules engine
- replace Storyteller judgment with rigid automation

When choosing between automation and flexibility, default toward Storyteller control unless the automation is simple, clearly correct, and meaningfully reduces friction.

## UX direction

### Storyteller console

The console should prioritize:

- fast access to common actions
- private information density without clutter
- reliable tablet and laptop use
- touch-friendly interactions
- low-friction management of seat state and reminders

### Public display

The public display should prioritize:

- readability at distance
- visual clarity over feature density
- obvious alive/dead and ghost-vote state
- resilient layout on TVs and projectors

The two surfaces do not need to look identical. They should share brand and data language, but their interaction and layout goals are different.

## Compatibility and script support

The project should support scripts and metadata in a normalized internal format.

Where practical, we should preserve compatibility with common community script formats, especially for import and export. However:

- external formats should not dictate the internal domain model
- compatibility code should be isolated in dedicated script modules
- Storyteller workflows should remain usable even if some metadata is incomplete

## Testing and quality expectations

Testing should focus most heavily on correctness in shared state and projection logic.

Priority testing areas:

- reducers and command handlers
- projection and redaction behavior
- persistence and recovery behavior
- reconnect and multi-client sync behavior
- critical Storyteller workflows

Required mindset:

- if a change affects hidden/public visibility, tests should cover it
- if a change affects shared state, it should be validated outside the UI
- if a change affects session recovery or sync, manual verification notes are not enough on their own once automated tooling exists

## Decision framework

When making a significant implementation or product decision, use these questions:

1. Does this keep the server as the source of truth?
2. Does this preserve the boundary between private and public data?
3. Does this make self-hosting easier, harder, or neutral?
4. Is this needed for the in-person Storyteller-plus-display v1?
5. Are we adding extensibility, or are we paying complexity for speculation?
6. Should this logic live in the domain/backend rather than the UI?
7. Will this still make sense for contributors six months from now?

If a proposal scores poorly on simplicity, redaction safety, or v1 alignment, it should probably wait.

## What "good" looks like for v1

By the time v1 is healthy, the project should have:

- a Storyteller console that supports real game flow
- a public display that syncs reliably and safely
- typed command and projection contracts
- a stable shared domain model
- simple Docker-based self-hosting
- clear documentation for setup, backup, and upgrade
- reliable session recovery after refresh or reconnect

## Expected future expansion

The architecture should allow, but not optimize around, future additions such as:

- private player clients
- remote-friendly session support
- assistant Storyteller roles
- richer import/export support
- optional hosted deployment paths

These should be future layers built on top of stable domain and projection boundaries, not concerns that distort v1.

## Risks to watch

The project is especially vulnerable to the following mistakes:

- letting UI behavior define the domain model
- leaking hidden state through public payloads
- overengineering for remote play or SaaS too early
- making self-hosting dependent on multiple infrastructure services
- turning the product into a brittle rules engine instead of a Storyteller tool

When in doubt, choose the simpler design that preserves privacy boundaries and helps actual in-person play.

## Relationship to other project docs

This document is the long-form product and architecture guide.

Related docs should be used as follows:

- `AGENTS.md`
  - repo-wide implementation rules and agent guidance
- `README.md`
  - concise project entry point and setup overview
- future ADRs in `docs/`
  - records of important architecture decisions and why they were made

If this document and other docs drift apart, update them so they remain aligned. This overview should stay stable, but not static; it should evolve when the project direction changes meaningfully.
