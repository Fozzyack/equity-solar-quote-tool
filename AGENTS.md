# Repository Guidelines

## Project Structure & Module Organization
- `app/` hosts Next.js routes and step components; `page.tsx` wires shared state across `step-*.tsx` screens.
- Reusable UI lives in `components/`; check here before adding new cards or buttons.
- Domain constants stay in `constants/` (`Batteries.ts`, `BatteryCombos.ts`) and should mirror `other/SolarCSV.csv`.
- Multi-step state flows through `contexts/UserChoiceContext`.
- Static logos and SVGs belong in `public/`; optimize before committing.
- Co-locate tests under `__tests__/` beside their subjects when added.

## Build, Test, and Development Commands
- `npm run dev` runs the Turbopack dev server—use during iteration.
- `npm run build` creates the production bundle and should succeed before release branches.
- `npm run start` serves the built app for smoke tests at production parity.

## Coding Style & Naming Conventions
- Write TypeScript in `.tsx` files, keeping 4-space indentation already used across the codebase.
- Favor Tailwind utility groupings; avoid new CSS unless Tailwind cannot express the layout.
- Export typed data (e.g., `BatteryProduct[]`) with camelCase keys in `constants/`.
- Format edits with `npx prettier --write`; align imports and whitespace before pushing.

## Testing Guidelines
- No automated suite yet; when adding tests, prefer Playwright or React Testing Library inside `__tests__/`.
- Name specs `<Component>.test.tsx`.
- Manual QA: run `npm run build && npm run start`, then walk the quote wizard on desktop and mobile breakpoints.

## Commit & Pull Request Guidelines
- Use imperative commit subjects (e.g., `Add battery combo dataset`) and group related changes.
- PRs should state problem, solution, follow-up tasks, and include screenshots for UI updates (desktop + mobile).
- Link issues with `Closes #123` when applicable, and flag known limitations before requesting review.

## Agent-Specific Tips
- Treat `other/` as read-only inputs; document any CSV-to-TS conversions.
- After adjusting `constants/`, rerun the wizard locally to confirm data-driven flows stay intact.
