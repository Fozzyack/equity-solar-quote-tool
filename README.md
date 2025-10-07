# Equity Solar Quote Tool

A modern, multi-step configurator for generating solar panel and battery storage quotes. Built with Next.js 15, React 19, and TypeScript.

## Features

- **Interactive Quote Wizard**: Step-by-step flow guides customers through system configuration
- **Flexible Solutions**: Supports solar panels, battery storage, and combination systems
- **Tiered Pricing**: Value, mid-range, and premium battery options
- **Responsive Design**: Mobile-first UI built with Tailwind CSS 4
- **Type-Safe**: Full TypeScript coverage with strict type checking

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the configurator.

### Building for Production

```bash
npm run build
npm run start
```

### Code Formatting

```bash
npx prettier --write .
```

## Project Structure

```
app/
├── page.tsx              # Main wizard container
├── solution-select.tsx   # Step 0: System type selection
├── price-range.tsx       # Step 1: Battery tier selection
├── battery-list.tsx      # Step 2: Battery product selection
├── battery-final.tsx     # Step 3: Quote summary and email capture
├── email.tsx             # Email form component
└── not-found.tsx         # Custom 404 page

components/
├── BackButton.tsx        # Reusable back navigation button
├── ContinueButton.tsx    # Reusable continue button
├── SystemCard.tsx        # System type selection card
├── OptionCard.tsx        # Generic option card
└── BatteryCard.tsx       # Battery product display card

lib/
└── useUpdateParams.ts    # Hook for managing URL search params

constants/
├── Batteries.ts          # Battery product catalog
├── BatteryCombos.ts      # Solar + battery combinations
└── Icons.tsx             # SVG icon components

other/
└── SolarCSV.csv          # Source data (read-only)
```

## How It Works

### Wizard Flow

1. **Step 0** (`solution-select.tsx`): Choose between solar panels, combo system, or battery only
2. **Step 1** (`price-range.tsx`): Select price tier (value/mid-range/premium)
3. **Step 2** (`battery-list.tsx`): Browse and select a specific battery product
4. **Step 3** (`battery-final.tsx`): Submit email and view detailed quote

### State Management

State is managed via URL search params using the `useUpdateParams` hook. This allows for easy navigation and shareable URLs:

```typescript
// URL params
{
  step: string           // Current step (0-3)
  solution: string       // "solar-panels" | "combo" | "battery"
  tier: string          // "value" | "medium" | "premium"
  battery: string       // Selected battery ID
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

Battery and solar products are defined in `constants/Batteries.ts` with structured types:

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

## Development Guidelines

- Use the `@/*` path alias for imports (e.g., `@/components/BackButton`)
- Step components live in `app/` directory
- Reusable UI components live in `components/` directory
- Follow 4-space indentation
- Yellow accent color (#EAB308) for primary actions
- Use `useUpdateParams()` hook for navigation and state updates
- Use `BackButton` and `ContinueButton` components for navigation
- All state is stored in URL search params for easy sharing and navigation

## Contributing

1. Run `npm run build` to ensure your changes compile
2. Format code with `npx prettier --write .` before committing
3. Follow existing patterns in step components

## License

Private project for Equity Solar.
