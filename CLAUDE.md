# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build production bundle (must pass before PRs)
- `npm run start` - Serve production build locally

**Formatting:**
- `npx prettier --write .` - Format code before committing

## Architecture

This is a Next.js 15 app using the App Router, React 19, TypeScript, and Tailwind CSS 4. It's a multi-step solar/battery quote configurator for Equity Solar.

### Core Flow

The app uses a step-based wizard pattern managed by `UserChoiceContext`:

1. **Step 0** (`step-0.tsx`): Choose system type (solar panels, combo, battery only)
2. **Step 1** (`step-1.tsx`): Select battery price tier (value/mid-range/premium)
3. **Steps 2-5**: Additional configuration questions (average bill, existing system, system size, house stories)
4. **Step 6**: Final configurator (in progress)

All steps are rendered conditionally in `app/page.tsx` based on `step` state.

### State Management

`contexts/UserChoiceContext` provides shared state across all steps:
- `step` - Current step number (0-6)
- `solution` - Selected system type ("solar-panels", "combo", "battery")
- `priceRange` - Battery tier ("value", "mid-range", "premium")
- `averageBill`, `existingSystem`, `preferredSystemSize`, `houseStories` - User responses

All step components must call `useUserChoiceContext()` to access/update state.

### Data Structure

`constants/Batteries.ts` contains the product catalog as typed `BatteryProduct[]` arrays:
- Imported from CSV in `other/SolarCSV.csv`
- Each product has: brand, series, sizeKwh, inverter, systemType, module, phase, price, rebate, netPrice, tier, notes
- Filter products by `tier` field ("value" | "medium" | "premium")

`constants/BatteryCombos.ts` contains solar panel + battery combinations.

### Styling

- Uses Tailwind utility classes throughout
- Yellow accent color (#EAB308 / yellow-400) for primary actions
- Slate gray palette for backgrounds and text
- 4-space indentation in all files
- Responsive design with mobile-first breakpoints (sm:, md:)

### Path Aliases

TypeScript configured with `@/*` alias mapping to project root - use `@/components/*`, `@/contexts/*`, etc.

## Important Notes

- Step components live in `app/` directory (not `components/`)
- No test infrastructure yet - manual QA required
- Source data lives in `other/SolarCSV.csv` - treat as read-only
- When updating battery data, regenerate the TypeScript constants from CSV
