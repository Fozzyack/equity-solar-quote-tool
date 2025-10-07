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

The app uses a step-based wizard pattern managed by URL search params:

1. **Step 0** (`solution-select.tsx`): Choose system type (solar panels, combo, battery only)
2. **Step 1** (`price-range.tsx`): Select battery price tier (value/mid-range/premium)
3. **Step 2** (`battery-list.tsx`): Browse and select a specific battery product
4. **Step 3** (`battery-final.tsx`): Email capture and detailed quote summary

All steps are rendered conditionally in `app/page.tsx` based on `step` URL param.

### State Management

State is stored in URL search params for easy navigation and shareable URLs. Use the `useUpdateParams` hook from `lib/useUpdateParams.ts`:

```typescript
const updateParams = useUpdateParams();
updateParams({ step: 1, solution: "battery" });
```

**URL params:**
- `step` - Current step number (0-3)
- `solution` - Selected system type ("solar-panels", "combo", "battery")
- `tier` - Battery tier ("value", "medium", "premium")
- `battery` - Selected battery ID

All step components must use `useSearchParams()` to read state and `useUpdateParams()` to update state.

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

### Navigation Components

Reusable button components in `components/`:

**BackButton** - Navigate to previous steps:
```tsx
<BackButton target={1} label="Back" />
```

**ContinueButton** - Navigate to next step:
```tsx
<ContinueButton target={2} disabled={!selection} />
```

Both components use `useUpdateParams()` internally. For custom navigation logic (e.g., saving data before navigating), create a custom button instead.

### Path Aliases

TypeScript configured with `@/*` alias mapping to project root - use `@/components/*`, `@/lib/*`, etc.

## Important Notes

- Step components live in `app/` directory (not `components/`)
- Reusable UI components (buttons, cards) live in `components/` directory
- Use `BackButton` and `ContinueButton` for navigation between steps
- Custom buttons with additional logic should be implemented separately (not using the reusable components)
- No test infrastructure yet - manual QA required
- Source data lives in `other/SolarCSV.csv` - treat as read-only
- When updating battery data, regenerate the TypeScript constants from CSV
