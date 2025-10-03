# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js route handlers and client components; key steps live in `step-*.tsx`, with `page.tsx` wiring shared context.
- `components/`: Reusable UI primitives such as `SystemCard`.
- `constants/`: Domain data and icons, including `Batteries.ts` and `BatteryCombos.ts` converted from `other/SolarCSV.csv`.
- `contexts/`: React context providers (`UserChoiceContext`) for multi-step state.
- `public/`: Static assets (logos, SVGs). Keep new assets optimized.
- `other/`: Source CSVs and reference material—treat as read-only inputs.

## Build, Test, and Development Commands
- `npm run dev`: Launches the Next.js dev server with Turbopack. Use during feature work.
- `npm run build`: Produces a production bundle; run before release branches.
- `npm run start`: Serves the production build locally for smoke testing.

## Coding Style & Naming Conventions
- Use TypeScript across the repo; keep files `.tsx` for React components.
- Follow Tailwind utility-first styling; prefer descriptive class groupings over custom CSS.
- Maintain 4-space indentation already present in TSX files.
- Data constants should export typed arrays (`BatteryProduct[]`) with camelCase keys.
- Run a formatter (`npx prettier --write`) before committing; align with existing import ordering.

## Testing Guidelines
- Automated tests are not yet implemented. When adding tests, co-locate them under `__tests__/` adjacent to source files.
- Prefer Playwright or React Testing Library for UI flows; name specs `<component>.test.tsx`.
- Manual QA: run `npm run build && npm run start` and complete the quote flow on desktop and mobile widths.

## Commit & Pull Request Guidelines
- Write commits in imperative mood (e.g., `Add battery combo dataset`). Group related changes together.
- Include context in PR descriptions: problem, solution, follow-up tasks, and screenshots for UI updates (desktop + mobile).
- Link to Jira/GitHub issues using `Closes #123` when applicable.
- Ensure `npm run build` passes before requesting review; flag any known limitations in the PR summary.

## Agent-Specific Tips
- When modifying shared data in `constants/`, re-run any dependent steps locally to confirm wizard behavior.
- Coordinate CSV-to-TS conversions through `other/SolarCSV.csv`; document transformations in PRs for traceability.
