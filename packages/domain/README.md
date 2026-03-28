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

## Testing

Run domain tests with:

- `npm run test --workspace @clocktower-nexus/domain`

The domain test harness is package-scoped and intentionally independent from
frontend or backend runtime bootstrapping.

### Test Layout

- `tests/state`
  Simple state-construction coverage and other foundational state tests.
- `tests/fixtures`
  Reusable canonical sample data for future domain tests.
- `tests/helpers`
  Test-only builders and utilities for IDs, sessions, and similar helpers.

Future reducer tests should live in `tests/reducers`, and future projector
tests should live in `tests/projectors`.

## Command Naming

Domain commands are part of the server-authoritative state flow. They should describe game intent, not UI gestures.

### Naming Rules

- use lower snake_case command `type` values
- choose verbs that describe domain actions such as `create_`, `archive_`, `assign_`, `mark_`, `set_`, `start_`, `close_`, `consume_`, `restore_`, `add_`, `remove_`, and `clear_`
- name commands around the state change the server should apply, not around the control a user clicked
- name commands after the entity or domain action they affect; for example, player identity commands should be player commands even if a seat-focused UI is the trigger surface
- a seat-driven UI may still invoke a player-oriented command by resolving the occupied player first, but that handler convenience should not distort the canonical command name

### Good Command Names

- `create_session`
- `assign_player_to_seat`
- `set_player_name`
- `mark_player_dead`
- `set_phase`
- `start_nomination`
- `set_public_status`

### Avoid UI-Shaped Names

- `toggle_shroud`
- `click_seat`
- `open_phase_modal`
- `drag_player`
- `show_vote_panel`

The command surface currently establishes naming vocabulary and shared `type`/`sessionId` contract patterns only. Concrete payload shapes, validation rules, reducer behavior, and emitted events are defined in later command and reducer tasks.

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
- concrete command payload shapes, validation rules, reducer behavior, and event emission

Those concerns land in their dedicated state, command, and projector tasks.
