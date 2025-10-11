# Agentic Coding Guidelines

## Build & Test Commands
- Dev: `npm run dev` (Turbopack dev server)
- Build: `npm run build` (production bundle; must succeed before release)
- Start: `npm run start` (serves built app for production smoke tests)
- Format: `npx prettier --write <file>` (align with 4-space tabs, semicolons)
- **No automated tests yet**; manual QA by running through wizard on desktop + mobile
- When tests added: use Playwright/React Testing Library in `__tests__/<Component>.test.tsx`

## Code Style
- **Indentation**: 4 spaces (Prettier config: `tabWidth: 4`)
- **TypeScript**: Strict mode enabled; always define interface types for props
- **Imports**: Use `@/` alias for root, `@sections/*` for sections; group stdlib → third-party → local
- **Components**: Named exports (`export const ComponentName`), props via interfaces
- **Naming**: camelCase for variables/functions, PascalCase for components/types, UPPER_SNAKE for constants
- **Tailwind**: Prefer utility classes; avoid custom CSS unless necessary; use `className` strings with template literals for conditionals
- **Types**: Export types from constants (e.g., `export type BatteryProduct`); leverage strict TypeScript
- **Error Handling**: No explicit patterns yet; handle edge cases in component logic
- **No comments**: Code should be self-documenting unless complexity requires explanation

## Project Structure
- `app/`: Next.js 15 routes, `page.tsx` orchestrates multi-step wizard via URL params
- `components/`: Reusable UI (cards, buttons); check before adding new components
- `constants/`: Domain data (`Batteries.ts`, `SolarPanels.ts`); must mirror `other/SolarCSV.csv`
- `sections/`: Step-specific screens (e.g., `battery-list.tsx`, `solution-select.tsx`)
- `lib/`: Hooks and utilities (e.g., `useUpdateParams.ts` for URL state management)
- `public/`: Static assets (images, logos); optimize before committing
