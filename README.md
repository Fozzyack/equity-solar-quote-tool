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
├── step-0.tsx            # System type selection
├── step-1.tsx            # Battery tier selection
├── step-2.tsx            # Average bill input
├── step-3.tsx            # Existing system check
├── step-4.tsx            # System size preferences
├── step-5.tsx            # House stories
└── step-6.tsx            # Final configurator

components/
└── StepContainer.tsx     # Reusable step wrapper

contexts/
└── UserChoiceContext.tsx # Global wizard state

constants/
├── Batteries.ts          # Battery product catalog
└── BatteryCombos.ts      # Solar + battery combinations

other/
└── SolarCSV.csv          # Source data (read-only)
```

## How It Works

### Wizard Flow

1. **Step 0**: Choose between solar panels, combo system, or battery only
2. **Step 1**: Select price tier (value/mid-range/premium)
3. **Steps 2-5**: Answer configuration questions (bill amount, existing system, size, stories)
4. **Step 6**: View final quote and system recommendations

### State Management

The `UserChoiceContext` manages all user selections throughout the wizard:

```typescript
{
  step: number              // Current step (0-6)
  solution: string          // "solar-panels" | "combo" | "battery"
  priceRange: string        // "value" | "mid-range" | "premium"
  averageBill: string       // User's average electricity bill
  existingSystem: string    // Whether they have solar already
  preferredSystemSize: string
  houseStories: string
}
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

- Use the `@/*` path alias for imports (e.g., `@/components/StepContainer`)
- Step components live in `app/` directory
- Follow 4-space indentation
- Yellow accent color (#EAB308) for primary actions
- All components must use `useUserChoiceContext()` for state access

## Contributing

1. Run `npm run build` to ensure your changes compile
2. Format code with `npx prettier --write .` before committing
3. Follow existing patterns in step components

## License

Private project for Equity Solar.
