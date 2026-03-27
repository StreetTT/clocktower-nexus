# clocktower-nexus

Root workspace tooling is managed with `npm` workspaces.

- Workspace layout: `apps/*` and `packages/*`
- Internal package scope: `@clocktower-nexus/<package>`
- Local workspace dependency convention: use exact unpublished versions such as `0.0.0`

Root validation and formatting commands:

- `npm run lint`
- `npm run format`
- `npm run format:check`
