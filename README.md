# Equity Solar Quote Tool

A modern, multi-step configurator for generating solar panel and battery storage quotes. Built with Next.js 15, React 19, and TypeScript.

## Features

- **Interactive Quote Wizard**: Step-by-step flow guides customers through system configuration
- **Flexible Solutions**: Supports solar panels, battery storage, and combination systems
- **Multi-Brand Support**: Sungrow, GoodWe, Bluetti, Anker, Tesla, and Sigenenergy products
- **Smart Phase Selection**: Automatically disables unavailable electrical phases per brand
- **Dynamic Battery Sizing**: Shows only available battery capacities for selected brand/phase combinations
- **Tiered Pricing**: Value, mid-range, and premium battery options
- **Responsive Design**: Mobile-first UI built with Tailwind CSS 4
- **Type-Safe**: Full TypeScript coverage with strict type checking

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Turbopack
- **Package Manager**: bun (recommended) or npm

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm, yarn, pnpm, or bun

### Installation

```bash
# Using npm
npm install

# Or using bun (recommended)
bun install
```

### Development

```bash
# Using npm
npm run dev

# Or using bun
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the configurator.

### Building for Production

```bash
# Using npm
npm run build
npm run start

# Or using bun
bun run build
bun run start
```

### Code Formatting

```bash
npx prettier --write .
```

## Project Structure

```
app/
├── page.tsx              # Main wizard container and routing
├── layout.tsx            # Root layout component
├── not-found.tsx         # Custom 404 page
└── globals.css           # Global styles

sections/
├── solution-select.tsx   # Step 0: System type selection
├── price-range.tsx       # Battery: Step 1 - Price tier selection
├── battery-list.tsx      # Battery: Step 2 - Battery product selection
├── battery-final.tsx     # Battery: Step 3 - Quote summary and email
├── brand-select.tsx      # Combo: Step 1 - Brand selection
├── phase-select.tsx      # Combo: Step 2 - Electrical phase selection
├── combo-battery-size-select.tsx  # Combo: Step 3 - Battery size selection
├── combo-list.tsx        # Combo: Step 4 - Combo product selection
├── combo-final.tsx       # Combo: Step 5 - Quote summary and email
├── existing-system.tsx   # Solar: Step 1 - Existing system check
├── system-size.tsx       # Solar: Step 2 - System size selection
├── panel-list.tsx        # Solar: Step 3 - Solar panel selection
├── inverter-list.tsx     # Solar: Step 4 - Inverter selection
├── panel-final.tsx       # Solar: Step 5 - Quote summary and email
└── email.tsx             # Email form component

components/
├── BackButton.tsx        # Reusable back navigation button
├── ContinueButton.tsx    # Reusable continue button
├── NavigationButtons.tsx # Combined back/continue button group
├── SectionHeader.tsx     # Section title and description
├── LoadingEmail.tsx      # Email sending loading state
├── SystemCard.tsx        # System type selection card
├── OptionCard.tsx        # Generic option card with selection state
├── BatteryCard.tsx       # Battery product display card
├── ComboCard.tsx         # Combo system display card
├── ProductCard.tsx       # Generic product display card
└── SimpleCard.tsx        # Simple information card

lib/
├── useUpdateParams.ts    # Hook for managing URL search params
├── currency.ts           # Currency formatting utilities
└── emailjs.ts            # Email service integration

constants/
├── Batteries.ts          # Battery product catalog
├── BatteryCombos.ts      # Solar + battery combinations
├── ComboList.ts          # Processed combo data with IDs
├── Common.tsx            # Shared types and constants
├── Icons.tsx             # SVG icon components
├── Inverters.ts          # Inverter product catalog
├── Pricing.ts            # Pricing calculation helpers
└── SolarPanels.ts        # Solar panel product catalog

public/
├── images/               # Product images and branding
└── assets/               # Static assets

other/
└── SolarCSV.csv          # Source data (read-only)
```

## How It Works

### Wizard Flows

#### Battery Only Flow
1. **Step 0** (`solution-select.tsx`): Choose system type
2. **Step 1** (`price-range.tsx`): Select price tier (value/medium/premium)
3. **Step 2** (`battery-list.tsx`): Browse and select a specific battery product
4. **Step 3** (`battery-final.tsx`): Submit email and view detailed quote

#### Combo System Flow
1. **Step 0** (`solution-select.tsx`): Choose system type
2. **Step 1** (`brand-select.tsx`): Select battery brand (Sungrow, GoodWe, Bluetti, Anker, Tesla, Sigenenergy)
3. **Step 2** (`phase-select.tsx`): Select electrical phase (single/three phase) - unavailable options disabled
4. **Step 3** (`combo-battery-size-select.tsx`): Select battery capacity (shows only available sizes)
5. **Step 4** (`combo-list.tsx`): Browse and select a specific combo system
6. **Step 5** (`combo-final.tsx`): Submit email and view detailed quote

#### Solar Panels Flow
1. **Step 0** (`solution-select.tsx`): Choose system type
2. **Step 1** (`existing-system.tsx`): Check for existing solar system
3. **Step 2** (`system-size.tsx`): Select system size requirements
4. **Step 3** (`panel-list.tsx`): Select solar panel configuration
5. **Step 4** (`inverter-list.tsx`): Select inverter configuration
6. **Step 5** (`panel-final.tsx`): Submit email and view detailed quote

### State Management

State is managed via URL search params using the `useUpdateParams` hook. This allows for easy navigation and shareable URLs:

```typescript
// URL params
{
  step: string           // Current step (0-5)
  solution: string       // "solar-panels" | "combo" | "battery"

  // Battery flow
  tier: string          // "value" | "medium" | "premium"
  battery: string       // Selected battery ID

  // Combo flow
  brand: string         // Selected brand (e.g., "Sungrow", "Tesla")
  phase: string         // "single" | "three"
  batterySize: string   // Selected battery size (e.g., "13.5", "10")
  combo: string         // Selected combo system ID

  // Solar flow
  systemSize: string    // Selected system size
  panel: string         // Selected panel configuration
  inverter: string      // Selected inverter configuration
}
```

### Navigation Components

- **BackButton**: Navigates to a target step
  ```tsx
  <BackButton target={1} label="Back" />
  ```

- **ContinueButton**: Navigates to the next step
  ```tsx
  <ContinueButton target={2} disabled={!selection} />
  ```

### Product Data

Product data is sourced from CSV files and processed into TypeScript constants:

**Battery Products** (`constants/Batteries.ts`):
```typescript
{
  brand: string
  series: string
  sizeKwh: number
  inverter: string
  systemType: string
  module: string
  phase: string
  price: number
  rebate: number
  netPrice: number
  tier: "value" | "medium" | "premium"
  notes?: string
}
```

**Combo Systems** (`constants/BatteryCombos.ts` & `constants/ComboList.ts`):
```typescript
{
  brand: string
  batterySizeKwh: number
  solarSizeKw: number
  batteryModule: string
  solarModule: string
  inverter: string
  phase: string | number  // "1/3", "3", "1" or 1, 3
  price: number
  rebate: number
  netPrice: number
  tier: "value" | "medium" | "premium"
  notes?: string
}
```

**Solar Products** (`constants/SolarPanels.ts` & `constants/Inverters.ts`):
Panel and inverter specifications with compatibility matrices and pricing.

## Development Guidelines

- Use the `@/*` path alias for imports (e.g., `@/components/BackButton`, `@/sections/ComboList`)
- Step-specific components live in `sections/` directory
- Reusable UI components live in `components/` directory
- Business logic and utilities live in `lib/` directory
- Product data and constants live in `constants/` directory
- Follow 4-space indentation (enforced by Prettier)
- Yellow accent color (#EAB308) for primary actions and selections
- Use `useUpdateParams()` hook for navigation and state updates
- Use `NavigationButtons` component for back/continue button groups
- All state is stored in URL search params for easy sharing and navigation
- Components filter data based on URL params before rendering
- Use TypeScript interfaces exported from constants for type safety
- Test builds with `npm run build` before committing changes

## Contributing

1. Run `bun run build` to ensure your changes compile successfully
2. Format code with `npx prettier --write .` before committing
3. Follow existing patterns in section components
4. Update AGENTS.md if adding new build/lint commands or code style guidelines
5. Test all three flows (battery, combo, solar) when making UI changes
6. Ensure combo phase selection properly disables unavailable options

## License

Private project for Equity Solar.
