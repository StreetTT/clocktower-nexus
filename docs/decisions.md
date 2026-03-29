# Design Decisions

This file records design decisions that should influence future planning and
implementation tasks.

Use it when a choice is likely to affect multiple later tasks, especially when
that choice could otherwise be lost in chat history or commit messages.

## Entry Template

- `Status`: Active, Superseded, or Deferred
- `Date`: when the decision was recorded
- `Decision`: the short statement of what was chosen
- `Reason`: why the decision was made
- `Affects`: feature or task references that should take this into account
- `Notes for future tasks`: practical guidance for later implementation work
- `Revisit when`: the condition or task that may require re-evaluation

## D-0001: Semantic domain commands use snake_case intent names

- `Status`: Active
- `Date`: 2026-03-28
- `Decision`: Domain command `type` values should use semantic snake_case names
  that describe game intent, not UI gestures.
- `Reason`: The architecture is server-authoritative, and the domain layer
  should express state changes like `mark_player_dead` or `set_phase` rather
  than UI actions such as toggles, clicks, or modal openings.
- `Affects`: Feature 1.2.1, Task 1.2.3, Task 2.2.2, Task 2.2.5, Task 2.2.7,
  Task 3.2.5, Task 3.4.1, Task 3.4.3
- `Notes for future tasks`: Prefer verbs such as `create_`, `archive_`,
  `assign_`, `mark_`, `set_`, `start_`, `close_`, `consume_`, `restore_`,
  `add_`, `remove_`, and `clear_`. Avoid UI-shaped names like `toggle_shroud`,
  `click_seat`, or `open_phase_modal`.
- `Revisit when`: command payloads and reducer handlers are implemented in the
  domain package.

## D-0002: Seat and player remain separate until occupancy is modeled

- `Status`: Active
- `Date`: 2026-03-28
- `Decision`: Baseline domain entities should keep `Seat` and `Player`
  separate, without assuming current occupancy or ownership from one side.
- `Reason`: Stable seat identity is foundational, but seat occupancy and player
  assignment have their own modeling task and should not be implied early by
  command or note names.
- `Affects`: Task 1.2.2, Task 2.2.1, Task 2.2.2, Task 3.2.2, Task 3.4.3
- `Notes for future tasks`: Avoid command names or note models that assume a
  seat-player link already exists. Prefer names like `set_player_name` over
  seat-coupled names when the action is about player identity. Later command
  handling may still support seat-addressed convenience by resolving the player
  currently in the addressed seat, but that is payload or handler behavior for
  Tasks 2.2.1 and 2.2.2 rather than a naming rule for Task 1.2.3.
- `Revisit when`: Task 2.2.1 defines canonical occupancy and naming ownership.

## D-0003: Reminders, notes, public status, and timer visibility are separate concerns

- `Status`: Active
- `Date`: 2026-03-28
- `Decision`: Reminder markers, freeform notes, public status banners, and
  timer visibility should be treated as distinct concepts.
- `Reason`: They have different UX intent, projection behavior, and privacy
  expectations. A reminder marker is not the same as a freeform note, and a
  public status banner is not the same as timer visibility.
- `Affects`: Task 1.2.3, Task 3.3.6, Task 3.3.7, Task 3.4.1, Task 3.4.3
- `Notes for future tasks`: Keep reminder commands separate from note commands.
  `set_session_note` and `set_seat_note` imply custom text notes. When player
  notes are introduced, model them separately so player notes move with the
  player while seat notes remain attached to the seat. If timer visibility
  needs explicit control later, model it with its own timer-focused command
  rather than overloading public status.
- `Revisit when`: timer projection behavior and private note/reminder models
  are implemented.

## D-0005: Reorder intent should be preserved without adding a separate swap command

- `Status`: Active
- `Date`: 2026-03-28
- `Decision`: Keep `reorder_seats` as the canonical command name, but preserve
  enough reorder intent metadata or event classification later to distinguish a
  seat swap from a general seat move or reorder.
- `Reason`: Swap is currently a useful interpretation of some reorder actions,
  but it is not yet clearly a distinct business action that needs its own
  canonical command. Future undo, event history, and UI behavior may still need
  to know whether a reorder acted as a swap.
- `Affects`: Task 1.2.3, Task 2.2.3, Task 2.2.8, Task 2.2.10, Task 3.2.3
- `Notes for future tasks`: Do not add `swap_seats` unless future domain rules
  or UX behavior make it materially different from reorder. When implementing
  reorder payloads or events, keep enough information to distinguish swap-like
  intent from general movement.
- `Revisit when`: Task 2.2.3 defines reorder handling and Task 2.2.8 defines
  event history shape.

## D-0004: Script selection can keep a stable command name while payloads evolve

- `Status`: Active
- `Date`: 2026-03-28
- `Decision`: Keep `select_script` as the canonical session action even if the
  payload later expands with richer script metadata.
- `Reason`: The domain action remains “choose the active script for this
  session” even if future workflow details grow. Additional actions like import
  or source registration can be modeled as separate commands later.
- `Affects`: Task 1.2.3, Task 3.2.4, Task 3.2.5
- `Notes for future tasks`: Evolve the payload if needed, but do not rename the
  core selection action unless the underlying domain action changes.
- `Revisit when`: script ingestion and selection workflows become more concrete.

## D-0006: The Storyteller projection is seat-centric overall but keeps hidden artifacts on player views

- `Status`: Active
- `Date`: 2026-03-29
- `Decision`: The private `StorytellerProjection` should be organized around an
  ordered seat layout, while hidden gameplay artifacts such as role
  assignments, reminder markers, and player notes remain attached to player
  views rather than seat views.
- `Reason`: The console's primary interaction model is the seat circle, so the
  projection should be seat-centric overall. At the same time, keeping hidden
  artifacts on player views preserves their ownership semantics more clearly as
  occupancy, reminder, and role workflows evolve.
- `Affects`: Task 1.2.8, Task 1.2.9, Task 1.2.10, Task 2.2.1, Task 2.2.4, Task
  2.2.5, Task 2.2.6, Task 2.3.1, Task 3.1.4, Task 3.2.2, Task 3.2.4, Task
  3.3.6, Task 3.4.3
- `Notes for future tasks`: Keep `seats` as the ordered console layout surface.
  Represent occupancy explicitly through seat-player links. Keep seat notes
  seat-scoped and the session note top-level. Attach roles, reminders, and
  player notes to player views unless a later task establishes a materially
  different ownership rule.
- `Revisit when`: occupancy, role assignment, and reminder models are all
  concrete enough to prove the projection ownership rules need revision.
