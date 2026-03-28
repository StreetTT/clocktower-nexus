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

This task establishes the structural boundaries only. Concrete domain entities, command vocabulary, reducer behavior, and projection contracts arrive in later tasks.
