# Agentic Coding Guidelines

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
