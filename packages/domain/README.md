# Domain

This workspace holds the canonical game state, semantic commands, events, reducers, and projection helpers for the server-authoritative game model.

It is the shared core of the system and keeps gameplay rules, visibility boundaries, and state transitions outside the UI.

## Internal Layout

- `src/state`
  Canonical state types and state-shape helpers.
- `src/commands`
  Semantic command contracts that describe Storyteller intent.
- `src/events`
  Domain event shapes emitted from canonical state transitions.
- `src/reducers`
  Pure state transition helpers for server-authoritative updates.
- `src/projectors`
  Projection helpers that derive audience-specific read models.

## Public Import Surface

Consumers should import only from the stable package entrypoints:

- `@clocktower-nexus/domain`
- `@clocktower-nexus/domain/state`
- `@clocktower-nexus/domain/commands`
- `@clocktower-nexus/domain/events`
- `@clocktower-nexus/domain/reducers`
- `@clocktower-nexus/domain/projectors`

Paths under `src/**` are internal implementation details and are not part of the stable consumer API.

## Baseline Entity Set

The baseline state surface currently defines:

- object-wrapped identifiers for sessions, seats, and players
- numeric session revision metadata
- JSON-safe timestamp strings for canonical session metadata
- a `PhaseState` with `setup`, `day`, and `night`
- standalone `Seat` and `Player` entities with stable identity only
- a canonical `GameSession` root entity containing phase, timestamps, revision, seats, and players

## Deferred For Later Tasks

This task intentionally does not model:

- seat occupancy or player naming
- alive or dead state and ghost-vote availability
- nominations, votes, or timers
- role assignments, reminders, or private notes
- archive status, access metadata, or projection-specific fields

Those concerns land in their dedicated state, command, and projector tasks.
