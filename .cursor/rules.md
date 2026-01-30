# Cursor Project Rules (Summary)

This is a human-readable summary of the project rules. The canonical rules live
in `.cursor/rules/*.mdc`.

## Folder Organization
- Keep all source code in `src/`.
- Use `reference/` for visual references and exported HTML.
- Use `prd/` for core product specs.
- Use `research/` for research documents.

## Workflow
- Use Git for version control and create branches for features/fixes.
- Prefer one source of truth for the codebase.
- Keep design references separate from the application code.

## First Commit Checklist
- Running app
- README with setup steps
- Basic `prd/00-overview.md`
- `.cursor/rules.md`
- `ENV.example` (even if empty) and `.env.local` in `.gitignore`
- Prettier + ESLint configured
