# Clocktower Nexus Implementation Task List

This task list translates the approved v1 architecture into implementation-ready work. It is organized so phases represent delivery milestones, epics represent systems, features represent reviewable PRs, and tasks represent commit-sized units that can be executed independently by contributors.

The recommended delivery order is foundation first, then the canonical session engine, then the Storyteller console, then the public display, and finally reliability, packaging, and launch hardening.

# Phase 1: Foundation and repository scaffolding

## Feature 1.1.1: Scaffold monorepo structure

### Task 1.1.1: Initialize workspace tooling

- Estimate: Half day
- Dependencies: None
- Description:
Create the root workspace configuration so the repository can host multiple apps and packages under one consistent toolchain.
    - Choose and configure the package manager and workspace layout.
    - Add root package metadata and shared scripts placeholders.
    - Ensure the workspace can resolve local packages cleanly.
    Success Criteria:
        - The repository installs successfully from the root.
        - Local workspace packages can be referenced without manual path hacks.

### Task 1.1.2: Create app and package directory skeleton

- Estimate: Half day
- Dependencies: 1.1.1
- Description:
Add the top-level app, package, and docs directories that reflect the intended modular monolith architecture.
    - Create `apps/storyteller-console`, `apps/public-square`, and `apps/game-hub`.
    - Create `packages/domain`, `packages/protocol`, and placeholder script-related packages.
    - Add minimal README or placeholder files so empty directories are documented.
    Success Criteria:
        - The repository layout matches the architectural plan.
        - New contributors can understand the intended code placement from the directory structure alone.

### Task 1.1.3: Add shared TypeScript configuration

- Estimate: Half day
- Dependencies: 1.1.1
- Description:
Establish a repo-wide TypeScript baseline that supports shared contracts and isolated package compilation.
    - Add a root TypeScript base config.
    - Add per-app and per-package configs extending the shared base.
    - Define path aliases or package resolution rules that work consistently across the workspace.
    Success Criteria:
        - All apps and packages can typecheck against the shared base configuration.
        - Shared packages can be imported without ad hoc local compiler settings.

## Feature 1.1.2: Establish local development workflows

### Task 1.1.4: Add root development scripts

- Estimate: Half day
- Dependencies: 1.1.1
- Description:
Create the minimal root command surface so contributors have one place to run development and validation workflows.
    - Add `dev`, `build`, `test`, `lint`, and `typecheck` scripts at the repo root.
    - Ensure scripts delegate cleanly to workspace targets.
    - Keep script names stable for future CI use.
    Success Criteria:
        - Contributors can discover the primary workflows from the root manifest.
        - Root-level commands execute without requiring custom local aliases.

### Task 1.1.5: Add formatter and linting baseline

- Estimate: Half day
- Dependencies: 1.1.3
- Description:
Introduce consistent formatting and linting so the codebase does not drift stylistically as multiple contributors begin working.
    - Configure the formatter for the full workspace.
    - Add ESLint or equivalent for TypeScript apps and packages.
    - Add ignore files and baseline rules appropriate for a greenfield monorepo.
    Success Criteria:
        - The workspace has one documented formatting and linting path.
        - Lint and format checks can run from the root without special-case setup.

### Task 1.1.6: Document the local development loop

- Estimate: Half day
- Dependencies: 1.1.4, 1.1.5
- Description:
Write the first contributor-facing workflow notes so the project can be started and validated consistently during early development.
    - Expand the README with setup and common commands.
    - Document expected local prerequisites.
    - Explain how apps and packages are meant to relate at a high level.
    Success Criteria:
        - A new contributor can install dependencies and find the main dev commands from the README.
        - Local setup does not require tribal knowledge.

## Feature 1.1.3: Add CI validation baseline

### Task 1.1.7: Create CI workflow for baseline validation

- Estimate: Half day
- Dependencies: 1.1.4, 1.1.5
- Description:
Set up a minimal continuous integration workflow so the repository enforces basic quality checks from the start.
    - Add a GitHub Actions workflow for install, lint, typecheck, and test.
    - Configure dependency caching where appropriate.
    - Keep the workflow small and predictable for a hobby project.
    Success Criteria:
        - Pull requests can run the core validation pipeline automatically.
        - CI failures point to clear, repeatable local commands.

### Task 1.1.8: Enforce deterministic installs in CI

- Estimate: Half day
- Dependencies: 1.1.7
- Description:
Reduce integration drift by ensuring local and CI dependency resolution behave the same way.
    - Commit and validate the lockfile strategy.
    - Make CI fail on missing or outdated lockfile state.
    - Ensure generated workspace metadata is not silently drifting.
    Success Criteria:
        - CI uses the same dependency graph contributors use locally.
        - Dependency drift is caught before merge.

## Feature 1.2.1: Create domain package skeleton

### Task 1.2.1: Define the domain package structure

- Estimate: Half day
- Dependencies: 1.1.2, 1.1.3
- Description:
Create the internal package layout for canonical game state, commands, events, reducers, and projection helpers.
    - Add folders for state, commands, events, reducers, and projectors.
    - Create package entrypoints and export boundaries.
    - Keep the structure aligned with server-authoritative state management.
    Success Criteria:
        - The domain package has clear internal boundaries.
        - Consumers can import stable domain entrypoints without reaching into internals.

### Task 1.2.2: Define baseline domain entities

- Estimate: 1 day
- Dependencies: 1.2.1
- Description:
Introduce the foundational types that all other gameplay state will build on.
    - Define session, seat, player, and phase entities.
    - Model identifiers and core metadata consistently.
    - Keep the initial types focused on v1 scope only.
    Success Criteria:
        - The base entities are sufficient to represent a live session skeleton.
        - Types reflect the in-person Storyteller-plus-display product shape.

### Task 1.2.3: Establish semantic command naming

- Estimate: Half day
- Dependencies: 1.2.2
- Description:
Define the command vocabulary so future state changes are modeled semantically instead of as UI toggles.
    - Name commands around game intent, such as seat assignment, death marking, and phase changes.
    - Avoid UI-specific verbs in the public command surface.
    - Document naming rules inside the package.
    Success Criteria:
        - Command names describe domain actions instead of component behavior.
        - Future contributors have a clear pattern to follow when adding commands.

### Task 1.2.4: Add pure domain test harness

- Estimate: Half day
- Dependencies: 1.2.1
- Description:
Set up a lightweight testing pattern for reducers and projectors so domain correctness can be validated outside the UI.
    - Add test tooling for the domain package.
    - Add sample tests around simple state construction.
    - Establish fixture and helper conventions for later gameplay tests.
    Success Criteria:
        - The domain package has runnable automated tests.
        - Reducer and projector tests can be added without frontend or server bootstrapping.

## Feature 1.2.2: Create protocol package skeleton

### Task 1.2.5: Define API envelope contracts

- Estimate: Half day
- Dependencies: 1.1.2, 1.1.3
- Description:
Create a shared request and response contract pattern for HTTP APIs used by the server and both client surfaces.
    - Define success and error envelope shapes.
    - Standardize response metadata such as revision or request context where needed.
    - Export contracts for frontend consumption.
    Success Criteria:
        - API contracts are shared from a single package.
        - Both clients can build against the same typed HTTP envelope definitions.

### Task 1.2.6: Define WebSocket message contracts

- Estimate: Half day
- Dependencies: 1.2.5
- Description:
Define the realtime message shapes used for connection lifecycle, subscriptions, and projection updates.
    - Add message types for connect, subscribe, projection update, and error flows.
    - Keep the message model compatible with revision-based sync.
    - Export contracts for server and clients.
    Success Criteria:
        - WebSocket payloads have one shared typed contract source.
        - Realtime message handling can be implemented without local shape duplication.

### Task 1.2.7: Add runtime schema validation

- Estimate: Half day
- Dependencies: 1.2.5, 1.2.6
- Description:
Back the shared contracts with runtime validation so malformed payloads are rejected consistently across the system.
    - Add schema definitions for HTTP and WebSocket messages.
    - Export inferred types from the runtime schemas.
    - Organize validation helpers for reuse in the backend.
    Success Criteria:
        - Contracts can be validated at runtime before reaching core handlers.
        - Frontend and backend types stay aligned with the runtime schemas.

## Feature 1.2.3: Establish projection and redaction boundaries

### Task 1.2.8: Define storyteller projection shape

- Estimate: Half day
- Dependencies: 1.2.2, 1.2.3
- Description:
Specify the private projection the Storyteller console will consume so hidden state is modeled intentionally.
    - Include private gameplay data needed for control workflows.
    - Separate projection fields from canonical state where useful.
    - Keep the projection focused on actual console needs.
    Success Criteria:
        - The Storyteller console has a well-defined private read model.
        - Hidden data requirements are explicit instead of implied.

### Task 1.2.9: Define public projection shape

- Estimate: Half day
- Dependencies: 1.2.2, 1.2.3
- Description:
Specify the read-only projection the public display will render so safe public state is a first-class concept.
    - Include only information intended for shared display.
    - Model alive, ghost vote, vote state, phase, timer, and seat visibility explicitly.
    - Exclude all role, reminder, and note information by design.
    Success Criteria:
        - The public display has a fully typed public read model.
        - No private Storyteller-only fields appear in the public projection contract.

### Task 1.2.10: Add projection redaction tests

- Estimate: Half day
- Dependencies: 1.2.8, 1.2.9, 1.2.4
- Description:
Lock in the privacy boundary with tests that make accidental hidden-state leakage visible immediately.
    - Add tests that compare private and public projection outputs from the same state.
    - Assert that reminders, notes, role assignments, and equivalent private fields never appear publicly.
    - Make these tests easy to extend as new fields are added.
    Success Criteria:
        - Projection tests fail if a private field is exposed publicly.
        - Contributors have a clear place to add visibility regression coverage.

## Feature 1.3.1: Bootstrap the game hub service

### Task 1.3.1: Create the Fastify server entrypoint

- Estimate: Half day
- Dependencies: 1.1.2, 1.1.3
- Description:
Bootstrap the backend application so all future APIs, realtime wiring, and persistence can be composed in one place.
    - Add the main server entrypoint.
    - Organize plugin or module registration structure.
    - Prepare the app for local development and test startup.
    Success Criteria:
        - The backend service can start successfully in development.
        - New routes and modules can be registered without restructuring the app.

### Task 1.3.2: Add configuration loading and health checks

- Estimate: Half day
- Dependencies: 1.3.1
- Description:
Add minimal operational structure so the server can validate its environment and advertise its readiness.
    - Introduce typed configuration loading.
    - Add a health endpoint for local and container checks.
    - Fail fast on invalid required settings.
    Success Criteria:
        - The service reports health predictably.
        - Invalid startup configuration is caught immediately.

### Task 1.3.3: Add structured logging and error conventions

- Estimate: Half day
- Dependencies: 1.3.1
- Description:
Establish consistent server-side logging and error handling early so failures remain diagnosable as the app grows.
    - Add structured request and system logging.
    - Define how domain, validation, and transport errors are represented.
    - Wire shared error handling into the server stack.
    Success Criteria:
        - Server logs are machine-readable and useful during development.
        - API and socket failures follow a consistent error shape.

## Feature 1.3.2: Add WebSocket gateway foundation

### Task 1.3.4: Implement socket connection manager

- Estimate: 1 day
- Dependencies: 1.3.1, 1.2.6, 1.2.7
- Description:
Create the realtime connection layer that will manage client sockets and their session-scoped subscriptions.
    - Add socket server wiring to the backend.
    - Track active connections and connection metadata.
    - Prepare room or session subscription mechanics.
    Success Criteria:
        - Clients can establish socket connections to the backend.
        - The server can track which connections belong to which session context.

### Task 1.3.5: Add socket roles and subscription flow

- Estimate: 1 day
- Dependencies: 1.3.4
- Description:
Support the distinction between privileged Storyteller connections and read-only public display connections at the realtime layer.
    - Add role-aware socket subscription handling.
    - Validate session-scoped subscription requests.
    - Reject invalid or unauthorized subscription attempts.
    Success Criteria:
        - Storyteller and public display sockets can subscribe with different permissions.
        - Invalid room or role requests are rejected cleanly.

### Task 1.3.6: Add heartbeat and disconnect handling

- Estimate: Half day
- Dependencies: 1.3.4
- Description:
Make realtime connectivity more robust by explicitly handling stale or dropped socket connections.
    - Add ping or heartbeat support.
    - Clean up disconnected connections reliably.
    - Surface disconnect events in a way clients can respond to later.
    Success Criteria:
        - Dead connections are cleaned up automatically.
        - The socket layer can distinguish between active and stale clients.

## Feature 1.4.1: Add SQLite persistence layer

### Task 1.4.1: Initialize the database package and tooling

- Estimate: Half day
- Dependencies: 1.1.2, 1.1.3
- Description:
Set up the persistence layer around SQLite so the project has a simple, self-host-friendly datastore from the outset.
    - Choose the ORM or query approach.
    - Create the database package or server persistence module.
    - Add local configuration for database file storage.
    Success Criteria:
        - The backend can initialize a SQLite-backed data layer.
        - Persistence configuration fits the self-hosted single-service model.

### Task 1.4.2: Create baseline schema and migrations

- Estimate: 1 day
- Dependencies: 1.4.1
- Description:
Add the first durable schema for session storage and evolve it through explicit migrations.
    - Create tables for sessions, snapshots, events, and access tokens.
    - Add migration commands and storage conventions.
    - Keep the schema focused on v1 session needs.
    Success Criteria:
        - A clean database can be created and migrated automatically.
        - The schema supports canonical session persistence and access control.

### Task 1.4.3: Add persistence integration test setup

- Estimate: Half day
- Dependencies: 1.4.2
- Description:
Create a repeatable way to validate database behavior so persistence changes do not rely on ad hoc manual checks.
    - Add test database setup and teardown helpers.
    - Support isolated integration tests against SQLite.
    - Document test conventions for repository-level persistence tests.
    Success Criteria:
        - Persistence tests can run in isolation against a temporary SQLite database.
        - Future repository tests have a stable integration harness.

## Feature 1.4.2: Implement repository boundaries

### Task 1.4.4: Add session and snapshot repositories

- Estimate: 1 day
- Dependencies: 1.4.2, 1.4.3
- Description:
Introduce a repository layer for loading and storing durable session state without exposing raw database details to handlers.
    - Add repositories for sessions and snapshots.
    - Define load and save methods aligned to canonical state usage.
    - Keep repository interfaces small and explicit.
    Success Criteria:
        - The backend can persist and retrieve session records through repository interfaces.
        - Application code does not need direct SQL awareness for common session operations.

### Task 1.4.5: Add event and token repositories

- Estimate: 1 day
- Dependencies: 1.4.2, 1.4.3
- Description:
Add repositories for append-style event history and role-scoped access tokens used by session entry flows.
    - Implement event append and query operations.
    - Implement token creation and validation storage paths.
    - Keep token storage compatible with read-only and privileged roles.
    Success Criteria:
        - Event history and access tokens can be persisted and retrieved reliably.
        - The persistence layer supports upcoming session recovery and pairing flows.

# Phase 2: Playable session core

## Feature 2.1.1: Create session setup flow

### Task 2.1.1: Implement create-session command handling

- Estimate: 1 day
- Dependencies: 1.2.2, 1.4.4
- Description:
Add the backend path for creating a brand-new game session with valid default state and durable storage.
    - Create the create-session command and handler.
    - Build initial canonical session state.
    - Persist the new session through the repository layer.
    Success Criteria:
        - The server can create and store a valid new session.
        - Newly created sessions have a predictable default state shape.

### Task 2.1.2: Expose session bootstrap APIs

- Estimate: 1 day
- Dependencies: 2.1.1, 1.2.5
- Description:
Add the initial HTTP endpoints clients will use to create, load, and bootstrap session views.
    - Add create-session and load-session endpoints.
    - Return appropriate storyteller or public bootstrap data.
    - Validate requests and error conditions through shared contracts.
    Success Criteria:
        - Clients can bootstrap a session over HTTP.
        - Invalid session lookups return contract-compliant errors.

### Task 2.1.3: Generate session access tokens

- Estimate: Half day
- Dependencies: 1.4.5, 2.1.1
- Description:
Create the role-scoped token mechanism that allows Storyteller and public display clients to enter the correct session safely.
    - Generate privileged and read-only token types.
    - Associate tokens with session scope and intended role.
    - Add expiry or lifecycle behavior appropriate for v1.
    Success Criteria:
        - Sessions can issue separate Storyteller and public-display access tokens.
        - Tokens are scoped so one session cannot access another accidentally.

## Feature 2.1.2: Implement session resume and archive flow

### Task 2.1.4: Implement load-session query path

- Estimate: Half day
- Dependencies: 1.4.4, 2.1.1
- Description:
Add the backend query path for loading an existing session snapshot and its current revision.
    - Load session metadata and canonical state snapshot.
    - Handle missing or archived sessions cleanly.
    - Return revision information needed for realtime sync.
    Success Criteria:
        - Existing sessions can be reloaded after refresh or restart.
        - Missing sessions fail in a predictable, typed way.

### Task 2.1.5: Implement archive and soft-close behavior

- Estimate: Half day
- Dependencies: 2.1.4
- Description:
Add a simple lifecycle state for retiring sessions without deleting them outright.
    - Model active vs archived session status.
    - Add archive command and persistence update path.
    - Prevent archived sessions from being treated as active game sessions by default.
    Success Criteria:
        - Sessions can be archived without destructive deletion.
        - Archived sessions no longer behave like active play sessions unless explicitly reloaded.

## Feature 2.2.1: Add seating and player state model

### Task 2.2.1: Model seats and player occupancy

- Estimate: 1 day
- Dependencies: 1.2.2
- Description:
Represent seat ordering, occupancy, and player naming in canonical state so both Storyteller and public display flows can depend on stable seat identity.
    - Define seat count, seat id, and ordering rules.
    - Model player names and seat occupancy separately where useful.
    - Keep the model flexible for setup-time edits.
    Success Criteria:
        - Canonical state can represent a table of ordered seats and assigned names.
        - The model supports reordering and editing without losing seat identity.

### Task 2.2.2: Implement seat assignment and editing commands

- Estimate: 1 day
- Dependencies: 2.2.1, 1.2.3
- Description:
Add semantic commands for creating and editing the seating arrangement without embedding logic in the UI.
    - Implement commands for add, edit, remove, and assign player names.
    - Validate seat references and input integrity.
    - Keep reducers deterministic and side-effect free.
    Success Criteria:
        - Seat and player updates can be performed through canonical commands.
        - Invalid seating actions are rejected consistently.

### Task 2.2.3: Implement seat reorder commands and tests

- Estimate: Half day
- Dependencies: 2.2.2, 1.2.4
- Description:
Add ordering support so the Storyteller can reorganize the circle while keeping projections stable and testable.
    - Implement seat reorder command handling.
    - Preserve stable seat identity while changing order.
    - Add reducer tests for edge cases such as moving the first or last seat.
    Success Criteria:
        - Seat order can change without corrupting seat identity.
        - Ordering behavior is covered by automated tests.

## Feature 2.2.2: Add public gameplay state model

### Task 2.2.4: Model alive and ghost-vote state

- Estimate: Half day
- Dependencies: 1.2.2
- Description:
Represent public player survival state and ghost-vote availability explicitly as part of the canonical model.
    - Add alive or dead status fields for seats.
    - Add ghost-vote availability state.
    - Keep the model independent from visual affordances like shrouds.
    Success Criteria:
        - Survival and ghost-vote state can be represented directly in canonical state.
        - The model supports public rendering without UI inference.

### Task 2.2.5: Implement death and ghost-vote commands

- Estimate: 1 day
- Dependencies: 2.2.4, 1.2.3
- Description:
Add the semantic command handling that drives the most important public state transitions during play.
    - Implement mark-dead, revive if allowed, and ghost-vote state commands.
    - Validate state transitions appropriately for v1.
    - Add reducer coverage for edge cases and reversal behavior.
    Success Criteria:
        - The server can update life and ghost-vote state through canonical commands.
        - State transitions are consistent and test-covered.

### Task 2.2.6: Model phase, nomination, vote, and timer state

- Estimate: 1 day
- Dependencies: 1.2.2
- Description:
Add the core public game-flow state needed to run an in-person session through day/night cycles and voting.
    - Model day and night state.
    - Model nomination lifecycle and active vote state.
    - Model timer state in a way projections can render consistently.
    Success Criteria:
        - Canonical state can represent the public game-flow concepts required for v1.
        - These concepts are available without requiring client-derived state.

### Task 2.2.7: Implement phase and vote control commands

- Estimate: 1 day
- Dependencies: 2.2.6, 1.2.3
- Description:
Add semantic command handlers for the Storyteller controls that drive phase and vote progression.
    - Implement day or night transition commands.
    - Implement nomination start and close commands.
    - Implement vote start, update, and close commands.
    Success Criteria:
        - The backend can drive core public game flow from canonical commands.
        - Phase and vote transitions are deterministic and testable.

## Feature 2.2.3: Add undo-friendly event history

### Task 2.2.8: Persist state-changing events

- Estimate: 1 day
- Dependencies: 1.4.5, 2.1.1, 2.2.2, 2.2.5, 2.2.7
- Description:
Record canonical state changes as durable events so the system can support recovery, debugging, and basic undo.
    - Append event records for state-changing commands.
    - Store enough metadata to correlate events with sessions and revisions.
    - Keep event persistence separate from projection serialization.
    Success Criteria:
        - State-changing actions create durable event history.
        - Event records can be queried in session order.

### Task 2.2.9: Implement snapshot save strategy

- Estimate: Half day
- Dependencies: 1.4.4, 2.2.8
- Description:
Add a snapshot persistence strategy so sessions can load quickly without replaying their full event history every time.
    - Define when snapshots are written.
    - Store canonical state plus revision metadata.
    - Keep snapshot writes aligned with the self-hosted reliability goals.
    Success Criteria:
        - Sessions can be restored from a durable snapshot.
        - Snapshot writes stay in sync with event history revisions.

### Task 2.2.10: Implement undo-last-action rules

- Estimate: 1 day
- Dependencies: 2.2.8, 2.2.9
- Description:
Add a safe undo mechanism for recent v1 actions to improve live Storyteller recovery from common mistakes.
    - Define which actions are undoable in v1.
    - Implement reversal or rollback behavior against recent event history.
    - Add tests for undoing recent public-state changes safely.
    Success Criteria:
        - The backend can undo the last supported action predictably.
        - Undo behavior does not violate revision ordering or state integrity.

## Feature 2.3.1: Implement Storyteller and public projectors

### Task 2.3.1: Implement the Storyteller projector

- Estimate: 1 day
- Dependencies: 1.2.8, 2.2.1, 2.2.4, 2.2.6
- Description:
Create the private read model transformation that feeds the Storyteller console from canonical session state.
    - Build a projector from canonical state to Storyteller projection.
    - Include role assignments, reminders, and other private fields as they become available.
    - Keep projector output deterministic and revision-aware.
    Success Criteria:
        - Canonical session state can be transformed into a Storyteller-ready projection.
        - Projection output is stable for the same state and revision.

### Task 2.3.2: Implement the public projector

- Estimate: 1 day
- Dependencies: 1.2.9, 2.2.1, 2.2.4, 2.2.6
- Description:
Create the safe public read model that the shared display will render directly.
    - Build a projector from canonical state to public projection.
    - Derive only public fields such as seat order, visible names, life state, votes, phase, and timer.
    - Keep all private state excluded by construction.
    Success Criteria:
        - The public display projection can be generated entirely from canonical state.
        - The projector includes no hidden Storyteller-only information.

### Task 2.3.3: Add projector revisioning and regression tests

- Estimate: Half day
- Dependencies: 2.3.1, 2.3.2, 1.2.10
- Description:
Stabilize projection behavior with explicit revision handling and regression tests around redaction and shape changes.
    - Attach revision metadata to projector outputs.
    - Add tests around projection version stability.
    - Expand privacy regression coverage as projector fields grow.
    Success Criteria:
        - Projection outputs include revision information suitable for sync.
        - Regression tests protect projection shape and privacy boundaries.

## Feature 2.3.2: Broadcast projection updates in real time

### Task 2.3.4: Broadcast projection updates to subscribed clients

- Estimate: 1 day
- Dependencies: 1.3.5, 2.3.1, 2.3.2
- Description:
Wire canonical state changes into realtime projection fanout so clients stay synchronized during active play.
    - Publish Storyteller projection updates to privileged subscribers.
    - Publish public projection updates to read-only subscribers.
    - Keep fanout scoped to the correct session.
    Success Criteria:
        - Connected clients receive updated projections after canonical state changes.
        - Session isolation is preserved during realtime broadcasts.

### Task 2.3.5: Implement revision-aware reconnect handling

- Estimate: 1 day
- Dependencies: 2.3.4, 2.1.4
- Description:
Add the backend support needed for clients to recover cleanly after a refresh or temporary disconnect.
    - Accept reconnects with last-known revision metadata.
    - Decide whether to send incremental updates or a fresh snapshot path.
    - Keep reconnect behavior predictable for both client roles.
    Success Criteria:
        - Clients can reconnect without manual session repair in normal cases.
        - Reconnect behavior maintains consistent projection state.

# Phase 3: Storyteller console MVP

## Feature 3.1.1: Build Storyteller app scaffold

### Task 3.1.1: Scaffold the Storyteller console app

- Estimate: 1 day
- Dependencies: 1.1.2, 1.1.3, 1.2.5, 1.2.6
- Description:
Create the private frontend application shell that will host setup, control, and monitoring workflows.
    - Initialize the React app with routing and application layout.
    - Add a basic state bootstrap path from the backend.
    - Prepare shared API and socket clients for the private console role.
    Success Criteria:
        - The Storyteller app can start locally and render a basic shell.
        - The app has clear integration points for API bootstrap and realtime updates.

### Task 3.1.2: Build session entry and creation screens

- Estimate: 1 day
- Dependencies: 3.1.1, 2.1.2
- Description:
Add the private entry flow that lets a Storyteller create or resume a game session from the browser.
    - Build a create-session path.
    - Build a load or resume session path.
    - Handle common empty, loading, and error states.
    Success Criteria:
        - A Storyteller can create or open a session through the UI.
        - The console handles invalid or missing session state gracefully.

### Task 3.1.3: Add private API and socket client wiring

- Estimate: Half day
- Dependencies: 3.1.1, 1.3.5, 2.3.4
- Description:
Wire the console app to the typed HTTP and realtime layers so it can bootstrap and stay synchronized with backend state.
    - Add a shared API client for privileged requests.
    - Add a Storyteller socket subscription client.
    - Normalize transport errors into console-friendly state.
    Success Criteria:
        - The console can fetch bootstrap data and receive realtime projection updates.
        - Network failures are visible to the app in a consistent way.

## Feature 3.1.2: Add private session dashboard

### Task 3.1.4: Render session summary and sync status

- Estimate: Half day
- Dependencies: 3.1.2, 3.1.3
- Description:
Create the initial dashboard view that tells the Storyteller what session is active and whether the app is connected and current.
    - Show session metadata and revision state.
    - Show connection health and last sync indicators.
    - Add placeholders for paired public display information.
    Success Criteria:
        - The console clearly communicates the active session and sync state.
        - Connection issues are visible without opening developer tools.

## Feature 3.2.1: Build seat and player management UI

### Task 3.2.1: Render editable seat management UI

- Estimate: 1 day
- Dependencies: 3.1.3, 2.2.1
- Description:
Add the core setup UI for managing the circle of seats that drives both Storyteller and public views.
    - Render seats in a layout suitable for editing.
    - Show seat order and occupancy clearly.
    - Prepare interaction points for seat editing actions.
    Success Criteria:
        - The console shows the current seat structure from canonical state.
        - Seats are visually identifiable and ready for direct editing workflows.

### Task 3.2.2: Add player name and seat editing controls

- Estimate: 1 day
- Dependencies: 3.2.1, 2.2.2
- Description:
Let the Storyteller manage player identities and seat assignments from the console without direct state mutation in the UI.
    - Add controls for editing names and occupancy.
    - Send seat update commands through the backend.
    - Refresh the view from canonical projection results.
    Success Criteria:
        - Storytellers can add and edit player names and seat assignments from the console.
        - UI state reflects confirmed canonical updates instead of local-only changes.

### Task 3.2.3: Add seat reordering interactions

- Estimate: 1 day
- Dependencies: 3.2.1, 2.2.3
- Description:
Allow the Storyteller to reorganize seat order through a usable interaction model while preserving server-authoritative truth.
    - Add drag-and-drop or explicit reorder controls.
    - Send reorder commands through the backend.
    - Handle reorder latency and optimistic affordances carefully.
    Success Criteria:
        - Seat order can be changed from the console.
        - Reordering reflects canonical server state and remains stable after reload.

## Feature 3.2.2: Add script selection and role assignment flow

### Task 3.2.4: Add script selection workflow

- Estimate: 1 day
- Dependencies: 3.1.3
- Description:
Create the console workflow for selecting the active script that will drive role availability and session context.
    - Add a script selection screen or panel.
    - Load available scripts from the backend or local source.
    - Persist active script choice into session state.
    Success Criteria:
        - A Storyteller can choose the active script for a session.
        - Script choice is stored durably and survives reload.

### Task 3.2.5: Model role assignment state and commands

- Estimate: 1 day
- Dependencies: 1.2.2, 1.2.3, 3.2.4
- Description:
Add the domain support for private role assignment without exposing that state to the public side of the application.
    - Define role assignment state on seats or players.
    - Add commands for assigning and changing roles.
    - Keep role data private to the Storyteller projection.
    Success Criteria:
        - Canonical state supports private role assignment for each seat.
        - Role data is absent from the public projection contract and tests.

### Task 3.2.6: Build private role assignment UI

- Estimate: 1 day
- Dependencies: 3.2.4, 3.2.5
- Description:
Add the console interface for assigning roles during setup while keeping the workflow private and easy to manage.
    - Render assignable roles from the active script.
    - Let the Storyteller assign roles per seat.
    - Display assigned roles only within the private console.
    Success Criteria:
        - The Storyteller can assign roles through the UI.
        - Assigned role state is visible privately and persists correctly.

## Feature 3.3.1: Build alive, death, and ghost-vote controls

### Task 3.3.1: Add per-seat alive and death controls

- Estimate: 1 day
- Dependencies: 2.2.5, 3.2.1
- Description:
Create the console controls for marking players alive or dead through semantic backend commands.
    - Add seat-level life-state controls in the Storyteller UI.
    - Call canonical death-related commands instead of local state mutations.
    - Reflect server-confirmed updates in the console.
    Success Criteria:
        - The Storyteller can mark players dead from the console.
        - Life-state updates are driven by canonical state changes and survive reload.

### Task 3.3.2: Add ghost-vote management controls

- Estimate: Half day
- Dependencies: 3.3.1, 2.2.5
- Description:
Add the private controls needed to manage ghost-vote availability as part of the core public game state.
    - Render ghost-vote state per seat.
    - Add controls for consuming or restoring ghost-vote availability where allowed.
    - Keep the UI synchronized with canonical updates.
    Success Criteria:
        - Ghost-vote availability can be updated from the console.
        - Publicly visible ghost-vote state stays in sync after each change.

## Feature 3.3.2: Build day, night, nomination, and vote controls

### Task 3.3.3: Add phase change controls

- Estimate: Half day
- Dependencies: 2.2.7, 3.1.4
- Description:
Add clear Storyteller controls for toggling the session between day and night states.
    - Render the current phase prominently.
    - Add commands for changing the phase.
    - Reflect updates from canonical projection changes.
    Success Criteria:
        - The Storyteller can switch between day and night from the console.
        - Phase state updates propagate reliably through the app.

### Task 3.3.4: Add nomination workflow controls

- Estimate: 1 day
- Dependencies: 2.2.7, 3.2.1
- Description:
Support the nomination lifecycle in the Storyteller console so public-state voting can be managed without manual display edits.
    - Add controls for starting and closing a nomination.
    - Show the currently nominated seat or seats as needed.
    - Drive all nomination state through backend commands.
    Success Criteria:
        - The Storyteller can initiate and close nominations in the console.
        - Nomination state is visible in both private and public projections where appropriate.

### Task 3.3.5: Add live vote tracking controls

- Estimate: 1 day
- Dependencies: 3.3.4, 2.2.7
- Description:
Add the console controls for running live votes and publishing their public state in real time.
    - Add vote start, update, and close actions.
    - Show current vote progress in the private console.
    - Keep updates canonical and sync-safe.
    Success Criteria:
        - The Storyteller can manage a vote end to end from the console.
        - Vote-state changes update the public display without manual refresh.

## Feature 3.3.3: Add timer and announcement controls

### Task 3.3.6: Add timer controls and state wiring

- Estimate: 1 day
- Dependencies: 2.2.6, 3.1.4
- Description:
Create a simple but reliable timer workflow that can be controlled privately and rendered publicly.
    - Add start, stop, reset, and display controls.
    - Wire timer commands through the backend.
    - Ensure timer state is captured in canonical state and projection updates.
    Success Criteria:
        - Timer state can be controlled from the Storyteller console.
        - The public display receives timer updates reliably.

### Task 3.3.7: Add public status banner controls

- Estimate: Half day
- Dependencies: 3.3.6
- Description:
Add a lightweight status or announcement mechanism for communicating brief public information during play.
    - Model a simple public banner or status message.
    - Add console controls for setting and clearing it.
    - Keep it explicitly public and projection-driven.
    Success Criteria:
        - The Storyteller can update a public status banner from the console.
        - Banner content appears only in the public projection where intended.

## Feature 3.4.1: Implement reminder marker workflows

### Task 3.4.1: Model reminder marker state and commands

- Estimate: 1 day
- Dependencies: 1.2.2, 1.2.3, 1.2.10
- Description:
Add the canonical private marker model that supports Storyteller reminders without making them part of public game state.
    - Define reminder marker state attached to seats or session context.
    - Add commands for creating and removing reminders.
    - Keep reminder state private by projection design.
    Success Criteria:
        - Canonical state supports Storyteller reminder markers.
        - Reminder data never appears in public projections.

### Task 3.4.2: Build reminder marker UI

- Estimate: 1 day
- Dependencies: 3.4.1, 3.2.1
- Description:
Add the private UI for placing, viewing, and removing reminder markers during setup and live play.
    - Render reminder controls in seat context.
    - Show current reminders in the console.
    - Persist reminder changes through backend commands.
    Success Criteria:
        - The Storyteller can manage reminders from the console.
        - Reminder UI stays synchronized with private projection updates.

## Feature 3.4.2: Implement private note taking

### Task 3.4.3: Add private session and seat note state

- Estimate: Half day
- Dependencies: 1.2.2, 1.2.10
- Description:
Add canonical support for private notes so the Storyteller can store session-specific information without leaking it publicly.
    - Model session-level and or seat-level notes.
    - Add commands for create and update operations.
    - Keep notes private to the Storyteller projection.
    Success Criteria:
        - Canonical state can store private notes for the Storyteller.
        - Note fields are explicitly excluded from public serialization and tests.

### Task 3.4.4: Build private notes UI

- Estimate: Half day
- Dependencies: 3.4.3, 3.1.4
- Description:
Add a simple Storyteller note-taking workflow that persists with the session and remains private.
    - Render session or seat notes in the console.
    - Save note edits through backend commands.
    - Surface save and sync status clearly for note interactions.
    Success Criteria:
        - The Storyteller can write and persist private notes from the console.
        - Notes remain available after refresh and reload.

# Phase 4: Public display MVP

## Feature 4.1.1: Build public display scaffold

### Task 4.1.1: Scaffold the public display app

- Estimate: 1 day
- Dependencies: 1.1.2, 1.1.3, 1.2.5, 1.2.6
- Description:
Create the read-only frontend application that will render the shared Town Square view.
    - Initialize the React app and basic layout.
    - Add display-role API and socket client wiring points.
    - Prepare view states for loading, invalid access, and disconnected modes.
    Success Criteria:
        - The public display app starts locally with a basic shell.
        - The app has integration points for read-only bootstrap and realtime updates.

### Task 4.1.2: Build public session join flow

- Estimate: 1 day
- Dependencies: 4.1.1, 2.1.2, 2.1.3
- Description:
Add the public-display entry path so a shared screen can pair to the correct session safely.
    - Support joining by direct link, token, or code as defined by the backend.
    - Validate read-only access before rendering session state.
    - Handle invalid or expired display access gracefully.
    Success Criteria:
        - A public display can join a specific session in read-only mode.
        - Invalid display access paths fail clearly without exposing session data.

### Task 4.1.3: Wire read-only API and socket clients

- Estimate: Half day
- Dependencies: 4.1.1, 2.3.4
- Description:
Connect the public app to the server-authoritative bootstrap and realtime layers using read-only transport semantics.
    - Add a read-only API client.
    - Add a public-display socket subscription client.
    - Normalize connection and authorization errors into display-friendly state.
    Success Criteria:
        - The public app can fetch bootstrap state and receive public projection updates.
        - Display transport wiring respects read-only access boundaries.

## Feature 4.1.2: Add display pairing flow

### Task 4.1.4: Surface display pairing information in the console

- Estimate: Half day
- Dependencies: 2.1.3, 3.1.4
- Description:
Give the Storyteller an easy way to pair the public display to the active session during local setup.
    - Render pairing token, code, or link in the console.
    - Keep pairing details scoped to the active session.
    - Make the workflow simple for projector or TV setup.
    Success Criteria:
        - The console exposes the correct display pairing information for the active session.
        - Pairing details are easy to use during in-person setup.

### Task 4.1.5: Enforce read-only display access rules

- Estimate: Half day
- Dependencies: 4.1.2, 1.3.5
- Description:
Protect the public display entry path so it cannot accidentally gain access to private session functionality.
    - Validate role-scoped tokens on display bootstrap and socket subscribe.
    - Reject privileged endpoints for read-only clients.
    - Add tests around role separation in public access flows.
    Success Criteria:
        - Public display clients cannot access Storyteller-only APIs or subscriptions.
        - Role-scoped access behavior is covered by automated tests.

## Feature 4.2.1: Render seats and player states

### Task 4.2.1: Build projector-friendly seat layout

- Estimate: 1 day
- Dependencies: 4.1.3, 2.3.2
- Description:
Create the main public display layout for showing the player circle clearly on a shared screen.
    - Render seats in a layout optimized for TV or projector viewing.
    - Use public projection data directly without local derivation of hidden state.
    - Keep the structure adaptable to common seat counts.
    Success Criteria:
        - The public display renders a clear seat layout from projection data.
        - The layout remains usable on common shared-screen aspect ratios.

### Task 4.2.2: Render names, alive state, and ghost-vote state

- Estimate: 1 day
- Dependencies: 4.2.1, 2.3.2
- Description:
Add the primary public player-state visuals that players need to understand the current board state.
    - Render player names.
    - Render alive or dead state prominently.
    - Render ghost-vote availability clearly and consistently.
    Success Criteria:
        - The public display communicates the core visible player state at a glance.
        - All state comes directly from the public projection.

### Task 4.2.3: Make display layout resilient across screen sizes

- Estimate: Half day
- Dependencies: 4.2.1, 4.2.2
- Description:
Improve the public UI so it remains readable across common monitors, TVs, and projector setups used by hobby groups.
    - Tune typography and spacing for distance readability.
    - Handle smaller and larger shared-screen layouts gracefully.
    - Avoid UI density that harms public clarity.
    Success Criteria:
        - The public display remains legible on typical in-person hardware.
        - Layout changes do not require separate display modes for basic use.

## Feature 4.2.2: Render phase and vote state

### Task 4.2.4: Render phase and timer state

- Estimate: Half day
- Dependencies: 4.1.3, 2.3.2
- Description:
Add the public rendering for high-level session flow so players can see whether it is day or night and whether a timer is active.
    - Render phase state prominently.
    - Render timer state and updates.
    - Keep animation or ticking behavior driven by projection updates or safe derived presentation only.
    Success Criteria:
        - Day or night and timer state are visible and easy to interpret.
        - Timer rendering remains synchronized with backend state after refresh.

### Task 4.2.5: Render nomination and vote state

- Estimate: 1 day
- Dependencies: 4.1.3, 2.3.2
- Description:
Add the public visualization for nomination and voting so the shared screen supports the live social flow of the game.
    - Render active nomination context.
    - Render active vote state and final vote outcomes as needed.
    - Keep transitions tied to projection updates rather than local truth.
    Success Criteria:
        - The public display communicates nomination and vote progress clearly.
        - Vote-state changes stay synchronized during active play.

### Task 4.2.6: Render public status banner and transitional states

- Estimate: Half day
- Dependencies: 4.2.4, 4.2.5, 3.3.7
- Description:
Complete the public-state rendering set by supporting simple banner messaging and clear empty or idle states.
    - Render the public status banner when present.
    - Add empty, waiting, or reconnecting display states that still feel coherent on a projector.
    - Keep all banner content sourced from the public projection.
    Success Criteria:
        - Public banner and idle states render cleanly without exposing private data.
        - The display remains useful during session transitions and reconnects.

# Phase 5: Self-hosting, reliability, and release readiness

## Feature 5.1.1: Add Docker-based deployment flow

### Task 5.1.1: Create production build and container strategy

- Estimate: 1 day
- Dependencies: 1.3.2, 4.1.1, 3.1.1
- Description:
Package the application into a self-host-friendly deployment artifact that can serve both frontend surfaces and the backend from one runtime.
    - Define production build outputs for apps and packages.
    - Add a Dockerfile or equivalent build strategy.
    - Ensure the backend can serve the packaged frontend assets.
    Success Criteria:
        - The full app can be built into a deployable single-service container image.
        - Packaged assets support both Storyteller and public display entrypoints.

### Task 5.1.2: Add one-command local deployment workflow

- Estimate: Half day
- Dependencies: 5.1.1
- Description:
Make local hosting approachable for hobby groups by adding a documented one-command runtime path.
    - Add Docker Compose or equivalent local runtime wiring.
    - Configure persistent storage mounts for SQLite and session data.
    - Keep the runtime shape minimal and easy to understand.
    Success Criteria:
        - A local self-host can start the app with one documented command.
        - Persistent data survives container restarts through the documented workflow.

## Feature 5.1.2: Add self-host setup documentation

### Task 5.1.3: Document first-run self-host setup

- Estimate: Half day
- Dependencies: 5.1.2
- Description:
Write clear setup instructions so hobby groups can get from clone or image pull to a working LAN deployment without guesswork.
    - Document installation and startup steps.
    - Document how to find the app on the local network.
    - Explain the basic data storage and persistence model.
    Success Criteria:
        - A self-hosting user can start the app from documentation alone.
        - Setup instructions match the actual packaged deployment flow.

### Task 5.1.4: Document backup, restore, and upgrade basics

- Estimate: Half day
- Dependencies: 5.1.2, 2.2.9
- Description:
Add the operational guidance needed for users to trust the app during upgrades and session preservation.
    - Document how to back up SQLite and session data safely.
    - Document how to restore from backup.
    - Document any migration or upgrade expectations.
    Success Criteria:
        - Users have a clear documented backup and restore path.
        - Upgrade expectations are explicit rather than implied.

## Feature 5.2.1: Add reconnect and stale-client recovery

### Task 5.2.1: Implement client-side reconnect flows

- Estimate: 1 day
- Dependencies: 2.3.5, 3.1.3, 4.1.3
- Description:
Add reconnect behavior in both frontend apps so temporary network interruptions do not require manual session reconstruction.
    - Reconnect sockets automatically where appropriate.
    - Re-bootstrap state when revision mismatch requires it.
    - Surface reconnect and stale-state status clearly in the UI.
    Success Criteria:
        - Both client surfaces recover cleanly from normal disconnects.
        - Reconnect states are visible and understandable to users.

### Task 5.2.2: Add server-restart and refresh recovery coverage

- Estimate: 1 day
- Dependencies: 5.2.1, 2.2.9
- Description:
Validate and harden the system path for real-world interruptions such as app restart or browser refresh during play.
    - Test restoring from persisted snapshot after server restart.
    - Test browser refresh on both client surfaces.
    - Close the most important gaps exposed by those recovery scenarios.
    Success Criteria:
        - Sessions can be recovered after normal restart and refresh scenarios.
        - Recovery behavior is consistent enough for live in-person use.

## Feature 5.2.2: Add backup and export utilities

### Task 5.2.3: Add session export capability

- Estimate: 1 day
- Dependencies: 2.1.4, 2.2.9
- Description:
Create an export path for troubleshooting and backup scenarios so session state can be captured outside the live runtime.
    - Define a portable session export format.
    - Include the canonical snapshot and relevant metadata.
    - Keep the export safe for self-host operational use.
    Success Criteria:
        - A session can be exported into a stable format for backup or inspection.
        - Export contents are sufficient to preserve the session state meaningfully.

### Task 5.2.4: Add session import or restore path

- Estimate: 1 day
- Dependencies: 5.2.3
- Description:
Provide a recovery path for bringing exported or backed-up session data back into the application when needed.
    - Add import or restore handling for the chosen session format.
    - Validate session structure before restore.
    - Keep restore behavior explicit and operator-driven.
    Success Criteria:
        - Exported session data can be restored into the application successfully.
        - Invalid restore files fail safely with useful feedback.

## Feature 5.3.1: Add cross-surface test coverage

### Task 5.3.1: Expand reducer, projector, and repository tests

- Estimate: 1 day
- Dependencies: 2.2.10, 2.3.3, 1.4.5
- Description:
Broaden core automated coverage around the system pieces most likely to cause hidden-state leaks or gameplay drift.
    - Add reducer tests for key v1 commands.
    - Add projector tests for private vs public behavior.
    - Add repository tests for session persistence flows.
    Success Criteria:
        - Core domain, projection, and persistence paths are covered by automated tests.
        - The highest-risk v1 state transitions have regression protection.

### Task 5.3.2: Add end-to-end sync coverage

- Estimate: 1 day
- Dependencies: 3.3.5, 4.2.5, 5.2.1
- Description:
Validate the essential user promise of the product by testing Storyteller actions driving public display updates across the full stack.
    - Add end-to-end coverage for session creation, seat setup, death changes, and vote flow.
    - Validate cross-surface synchronization over real app boundaries.
    - Include at least one reconnect-sensitive flow.
    Success Criteria:
        - The core Storyteller-to-public-display synchronization path is covered end to end.
        - Regressions in the main v1 workflow are caught automatically.

## Feature 5.3.2: Add observability and error reporting basics

### Task 5.3.3: Add client error boundaries and operator messaging

- Estimate: Half day
- Dependencies: 3.1.4, 4.1.3
- Description:
Improve runtime resilience by making user-facing failures clearer on both the private and public surfaces.
    - Add client error boundaries where appropriate.
    - Show actionable recovery messaging for common failures.
    - Avoid exposing internal debug details on the public display.
    Success Criteria:
        - Client-side failures degrade gracefully instead of crashing silently.
        - Users see clear next steps for common recoverable problems.

### Task 5.3.4: Document live-operation failure modes

- Estimate: Half day
- Dependencies: 5.3.3, 5.2.2
- Description:
Write the operational notes that help a Storyteller or host recover from common issues during a live session.
    - Document common connectivity, pairing, and persistence problems.
    - Document the recommended operator response for each.
    - Keep the notes lightweight and practical for in-person use.
    Success Criteria:
        - The project has a concise operator guide for the most likely live failures.
        - Common recovery steps are written down before release.