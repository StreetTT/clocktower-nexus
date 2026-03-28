# AGENTS.md

## Scope

This file covers the whole `clocktower-nexus` repository.
It applies to root-level planning and implementation work across `apps/*`,
`packages/*`, and `docs/*`.
Its purpose is to give coding agents a compact project-wide operating guide,
including where long-lived design decisions are recorded.

## Architecture and boundaries

The repository is an `npm` workspace monorepo with three app workspaces and
multiple shared packages.
`apps/storyteller-console` is the private Storyteller client,
`apps/public-square` is the public read-only display, and
`apps/game-hub` is the server-authoritative backend.
`packages/domain` owns canonical state, semantic commands, reducers, and
projectors; `packages/protocol` owns transport contracts; `packages/script-*`
own script ingestion, normalization, and compatibility concerns.
Product and architecture intent live in `docs/project-overview.md`.
Backlog sequencing lives in `docs/task-list.md`.
Cross-task design decisions that should influence future work live in
`docs/decisions.md` and should be reviewed before planning or implementing.

## Commands

- `npm install` installs all workspace dependencies from the repo root.
- `npm run lint` runs ESLint across all workspaces.
- `npm run typecheck` runs TypeScript checks across all workspaces.
- `npm run format` applies Prettier formatting across the repo.
- `npm run format:check` verifies formatting without rewriting files.
- `npm run dev`, `npm run build`, and `npm run test` exist at the root, but
  some workspace implementations are still placeholders during early scaffold
  tasks.
- For package-scoped validation, prefer targeted checks such as
  `npm exec -- tsc -p packages/domain/tsconfig.json` when only one workspace is
  affected.

## Code style and conventions

Use TypeScript and the existing ESM-first workspace setup.
Prefer stable package entrypoints like `@clocktower-nexus/domain` or
`@clocktower-nexus/domain/state` instead of deep imports into `src/**`.
Keep domain behavior semantic and server-authoritative: commands should be
named around game intent, and public/private boundaries should be explicit.
Follow the shared formatting and linting setup already configured in the repo.
When a design decision will affect later tasks, record it in
`docs/decisions.md` with affected feature or task references instead of leaving
it only in commit history or chat context.

## Change rules

Keep changes local to the workspace or doc area that owns the behavior.
Do not move domain logic into app placeholders or UI scaffolds.
Preserve stable root script names and workspace entrypoints unless a task
explicitly changes the public tooling surface.
If a task changes a long-lived design choice, update `docs/decisions.md` in the
same change.
If completing a task surfaces an important decision that sits outside the
current task's implementation scope, record that decision in
`docs/decisions.md` with affected feature or task references instead of
silently implementing around it. Treat those entries as decisions that should
come into effect when the relevant later tasks are reached, even if the current
task does not implement them yet.
Prefer additive groundwork over speculative abstraction; if later tasks already
own a concern, avoid fully implementing it early.

## Testing and validation

Run targeted checks for the touched workspace first, then run relevant root
checks before finishing.
For most repo changes, `npm run typecheck` and `npm run lint` are the baseline.
Run `npm run format:check` when editing docs, config, or multiple packages.
When changing package exports or public types, validate at least one consumer
import path in an existing workspace placeholder when practical.

## File and module guidance

`README.md` is the contributor-facing onboarding doc.
`docs/project-overview.md` is the source of truth for product and architecture
direction.
`docs/task-list.md` is the implementation roadmap and feature/task reference.
`docs/decisions.md` is the standing log for cross-task design decisions.
`packages/domain` is the canonical place for state, command, reducer, and
projection semantics.
`packages/protocol` should stay focused on HTTP and WebSocket contract shapes,
not canonical game rules.

## Coordination with parent and child scopes

This is the root scope file, so it acts as the default guidance unless a more
specific child `AGENTS.md` is added later.
Child scope files should inherit this guidance and only add or override what is
locally necessary.
If a package or app grows more complex, add a nested `AGENTS.md` there rather
than bloating this root file.
