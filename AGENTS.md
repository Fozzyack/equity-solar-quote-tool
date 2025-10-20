# Agentic Coding Guidelines

## Build & Test Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Format: `npx prettier --write <file>`
- No automated tests yet; manual QA by running through wizard on desktop + mobile
- When tests added: use Playwright/React Testing Library in `__tests__/<Component>.test.tsx`
- Run single test: `npx playwright test <test-file>` (when tests exist)

## Code Style
- **TypeScript**: Strict mode enabled; always define interface types for props
- **Imports**: Use `@/` alias for root, `@sections/*` for sections; group stdlib → third-party → local
- **Components**: Named exports (`export const ComponentName`), props via interfaces
- **Naming**: camelCase for variables/functions, PascalCase for components/types, UPPER_SNAKE for constants
- **Tailwind**: Prefer utility classes; avoid custom CSS unless necessary; use `className` with template literals for conditionals
- **Types**: Export types from constants (e.g., `export type BatteryProduct`); leverage strict TypeScript
- **Error Handling**: No explicit patterns yet; handle edge cases in component logic
- **No comments**: Code should be self-documenting unless complexity requires explanation

## Project Structure & Domain Rules
- `app/`: Next.js 15 routes, `page.tsx` orchestrates multi-step wizard via URL params
- `components/`: Reusable UI (cards, buttons); check before adding new components
- `constants/`: Domain data (`Batteries.ts`, `SolarPanels.ts`, `Inverters.ts`, `Pricing.ts`); must mirror `other/SolarCSV.csv`
- `sections/`: Step-specific screens (e.g., `battery-list.tsx`, `solution-select.tsx`)
- `lib/`: Hooks and utilities (e.g., `useUpdateParams.ts` for URL state management)
- `public/`: Static assets (images, logos); optimize before committing
- **Solar Panels**: Include `compatibleSizes` array
- **Inverters**: Include `compatibleSizes` and `compatiblePanels` arrays for filtering
- **Pricing**: Use pricing matrix in `Pricing.ts` with key format `${systemSize}-${panelId}-${inverterId}`
- **Filtering**: Components filter by URL params using `.filter()` before rendering
- **Price Lookup**: Use `getSolarPrice(systemSize, panelId, inverterId)` helper function
=======
## Build & Lint Commands
- `npm run dev` - Turbopack dev server (Next.js 15 App Router)
- `npm run build` - Production build (must succeed before PRs)
- `npm run start` - Serve built app for smoke testing
- `npx prettier --write .` - Format with 4-space tabs & semicolons
- **No automated tests**; manual QA via wizard on desktop + mobile

## Code Style
- **Indentation**: 4 spaces (Prettier enforces)
- **TypeScript**: Strict mode; always define interface types for props; use `export const ComponentName` for components
- **Imports**: `@/` alias for root (`@/components`, `@/lib`, `@/sections`); group stdlib → third-party → local
- **Naming**: camelCase vars/functions, PascalCase components/types, UPPER_SNAKE constants
- **Tailwind**: Utility classes only; template literals for conditionals (no inline CSS)
- **Types**: Export from constants (`export type BatteryProduct`); strict TypeScript throughout
- **Error Handling**: Edge cases in component logic; no explicit error boundary pattern yet
- **Comments**: None—code should be self-documenting

## Project Structure
- `app/`: Next.js routes; `page.tsx` orchestrates multi-step wizard via URL params
- `components/`: Reusable UI blocks (check before adding new components)
- `constants/`: Product data (`Batteries.ts`, `SolarPanels.ts`, `Inverters.ts`, `Pricing.ts`); mirrors `other/SolarCSV.csv`
- `sections/`: Step-specific screens (rendered conditionally in app/page.tsx)
- `lib/`: Hooks (`useUpdateParams`) & utilities; state via URL search params only

## Key Details
- URL params: `step`, `solution`, `phase`, `tier`, `battery` (all state managed in URL)
- Phase options: `"single"` or `"three"` for electrical phase selection
- Pricing key format: `${systemSize}-${panelId}-${inverterId}` → use `getSolarPrice()` helper
- Solar panels need `compatibleSizes` array; inverters need `compatibleSizes` & `compatiblePanels`
- Source data in `other/SolarCSV.csv`—regenerate TypeScript constants when updated
