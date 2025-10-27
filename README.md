# Equity Solar Quote Tool

A modern, multi-step configurator for generating solar panel and battery storage quotes. Built with Next.js 15, React 19, and TypeScript. The application provides an interactive wizard that guides customers through system selection and generates detailed quotes via email.

## Features

- **Interactive Quote Wizard**: Step-by-step flow guides customers through system configuration with URL-based state management
- **Three Solution Types**: 
  - Solar panels only
  - Battery storage only
  - Combined solar + battery systems
- **Multi-Brand Support**: Sungrow, GoodWe, Bluetti, Anker, Tesla, and Sigenenergy products
- **Smart Filtering**: Automatically filters available options based on user selections
  - Phase compatibility (single-phase vs. three-phase)
  - Battery size availability per brand
  - Inverter and panel compatibility
- **Tiered Pricing**: Value, medium, and premium options across all product categories
- **Email Quotes**: EmailJS integration for sending detailed quotes with pricing, rebates, and system specifications
- **Responsive Design**: Mobile-first UI built with Tailwind CSS 4
- **Type-Safe**: Full TypeScript coverage with strict mode enabled
- **URL State Management**: All configuration stored in URL params for shareable links and easy navigation

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 (PostCSS)
- **Build Tool**: Turbopack
- **Email Service**: EmailJS
- **Fonts**: Geist Sans & Geist Mono
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
# Build with Turbopack
npm run build
# Or
bun run build

# Start production server
npm run start
# Or
bun run start
```

### Code Formatting

This project uses Prettier with 4-space indentation and semicolons:

```bash
# Format all files
npx prettier --write .

# Or with bun
bunx prettier --write .
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
├── BackButton.tsx          # Reusable back navigation button
├── ContinueButton.tsx      # Reusable continue button
├── NavigationButtons.tsx   # Combined back/continue button group
├── SectionHeader.tsx       # Section title and description
├── LoadingEmail.tsx        # Email sending loading state
├── InTouchHeader.tsx       # Contact section header
├── SystemCard.tsx          # System type selection card
├── OptionCard.tsx          # Generic option card with selection state
├── BatteryCard.tsx         # Battery product display card
├── ComboCard.tsx           # Combo system display card
├── ProductCard.tsx         # Generic product display card
├── SimpleCard.tsx          # Simple information card
├── ComingSoon.tsx          # Coming soon placeholder
└── EquitySolarButton.tsx   # Link to Equity Solar website

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

The application implements three distinct wizard flows, each optimized for a specific solution type:

#### Battery Only Flow (5 steps)
1. **Step 0** (`solution-select.tsx`): Choose "Battery Storage" system type
2. **Step 1** (`price-range.tsx`): Select price tier (value/medium/premium)
3. **Step 2** (`battery-brand-select.tsx`): Select battery brand
4. **Step 3** (`battery-list.tsx`): Browse and select a specific battery product (filtered by tier and brand)
5. **Step 4** (`battery-final.tsx`): Submit email and receive detailed quote

**Available Brands**: Sungrow, GoodWe, Bluetti, Anker, Tesla, Sigenenergy

#### Combo System Flow (Solar + Battery) (7 steps)
1. **Step 0** (`solution-select.tsx`): Choose "Combo Solar + Battery" system type
2. **Step 1** (`brand-select.tsx`): Select battery brand
3. **Step 2** (`combo-solar-size-select.tsx`): Select solar system size (kW)
4. **Step 3** (`combo-battery-size-select.tsx`): Select battery capacity (kWh) - filtered by brand
5. **Step 4** (`phase-select.tsx`): Select electrical phase (single/three phase)
6. **Step 5** (`combo-list.tsx`): Browse and select specific combo configuration
7. **Step 6** (`combo-final.tsx`): Submit email and receive detailed quote

**Available Solar Sizes**: 6.51 kW, 9.765 kW, 10.23 kW, 13.02 kW, 13.2 kW, 14.88 kW (varies by brand)

#### Solar Panels Only Flow (6 steps)
1. **Step 0** (`solution-select.tsx`): Choose "Solar Panels" system type
2. **Step 1** (`existing-system.tsx`): Indicate if existing solar system is present
3. **Step 2** (`panel-system-size.tsx`): Select system size (6.6 kW, 7.65 kW, 10.2 kW, 13.2 kW)
4. **Step 3** (`panel-list.tsx`): Select solar panel brand (Aiko or Jinko)
5. **Step 4** (`panel-inverter-list.tsx`): Select inverter brand (GoodWe or Sungrow)
6. **Step 5** (`panel-final.tsx`): Submit email and receive detailed quote

**Panel Options**:
- **Aiko ABC Series**: Premium N-Type panels (22.5% efficiency, 430-480W)
- **Jinko Tiger Pro**: Mainstream Tier 1 panels (415-470W)

**Inverter Options**:
- **GoodWe GW5K-EH**: Value option
- **Sungrow SH5.0RS**: Premium option

### State Management

All application state is managed via URL search parameters using the custom `useUpdateParams` hook. This provides several benefits:
- **Shareable URLs**: Users can bookmark or share their exact configuration
- **Browser Navigation**: Native back/forward buttons work correctly
- **No External State**: No Redux, Context, or other state management needed
- **Type-Safe**: URL params are parsed and validated at each step

```typescript
// URL parameters
interface URLParams {
  step: string              // Current step number (0-7)
  solution: string          // "solar-panels" | "combo" | "battery"

  // Battery flow params
  tier?: string            // "value" | "medium" | "premium"
  batteryBrand?: string    // Selected brand for battery flow
  battery?: string         // Selected battery product ID

  // Combo flow params
  brand?: string           // Selected brand (Sungrow, GoodWe, Bluetti, Anker, Tesla, Sigenenergy)
  solarSize?: string       // Selected solar size (6.51, 9.765, 10.23, 13.02, etc.)
  batterySize?: string     // Selected battery size in kWh (10, 13.5, 25.6, etc.)
  phase?: string           // "single" | "three"
  combo?: string           // Selected combo system ID

  // Solar flow params
  existingSystem?: string  // "yes" | "no"
  systemSize?: string      // Selected system size (6.6, 7.65, 10.2, 13.2)
  panelBrand?: string      // Selected panel brand (aiko, jinko)
  inverterId?: string      // Selected inverter ID
}
```

#### useUpdateParams Hook

The `useUpdateParams` hook provides a simple API for updating URL parameters:

```typescript
const updateParams = useUpdateParams();

// Update multiple params at once
updateParams({ 
  step: 2, 
  brand: "Sungrow",
  phase: "single" 
});

// Clear a param by setting to undefined or empty string
updateParams({ battery: undefined });
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

Product data is structured in TypeScript constant files with exported types for type safety. The source data is maintained in `other/SolarCSV.csv` and manually synchronized with the TypeScript constants.

#### Battery Products (`constants/Batteries.ts`)

667 lines of battery configurations across 6 brands:

```typescript
export type BatteryProduct = {
  id: string              // Auto-generated from module name and size
  brand: string           // "Sungrow" | "GoodWe" | "Bluetti" | "Anker" | "Tesla" | "Sigenenergy"
  series?: string         // e.g., "SBR", "SBH", "Solix"
  sizeKwh: number         // Battery capacity in kWh
  inverter: string        // Inverter model included
  systemType: string      // e.g., "AC-coupled 5 kW - 1p"
  module: string          // Battery module name
  phase: string           // "1", "3", or "1/3" (both)
  price: number           // Full price before rebates
  rebate: number          // Federal rebate amount
  notes?: string          // Additional information
  tier: "value" | "medium" | "premium"
  image?: string          // Product image path
}
```

**Brands & Series**:
- **Sungrow**: SBR (9.6-25.6 kWh), SBH (10-40 kWh)
- **GoodWe**: LX F series (9.6-25.6 kWh)
- **Bluetti**: EP760 with B500 modules (9.9-29.7 kWh)
- **Anker Solix**: X1-B5-H (10-45 kWh)
- **Tesla**: Powerwall 3 (13.5, 27 kWh)
- **Sigenenergy**: SigenStor BAT 8.0 (8.06-40.3 kWh)

#### Combo Systems (`constants/BatteryCombos.ts` & `constants/ComboList.ts`)

Pre-configured solar + battery packages:

```typescript
export type BatteryComboProduct = {
  brand: string
  batterySeries?: string
  batterySizeKwh: number      // Battery capacity
  solarSizeKw: number         // Solar array size
  batteryModule: string       // Battery model
  solarModule: string         // Solar panel model (JKM510N)
  inverter: string
  phase: string               // "1/3", "1", or "3"
  price: number
  rebate: number
  netPrice: number            // price - rebate
  tier: "value" | "medium" | "premium"
  notes?: string
}
```

**Total Combos**: 234 pre-configured packages
- Solar sizes: 6.51 kW to 14.88 kW
- Battery sizes: 9.6 kWh to 45 kWh
- All combos use Jinko JKM510N solar panels

#### Solar Panels (`constants/SolarPanels.ts`)

```typescript
export type SolarPanel = {
  id: string                  // Brand slug (aiko, jinko)
  brandId: string
  brandLabel: string
  modelRange: string
  tier: string                // "premium" | "mainstream"
  wattageRange: string        // e.g., "430 W – 480 W"
  headline: string
  strengths: string[]         // 3 key benefits
  considerations: string[]    // 2 considerations
  image: string
  compatibleSizes: string[]   // ["6.6", "7.65", "10.2", "13.2"]
}
```

**Available Panels**:
1. **Aiko ABC Series**: Premium N-Type panels (22.5% efficiency)
2. **Jinko Tiger Pro**: Mainstream Tier 1 panels

#### Pricing (`constants/Pricing.ts`)

Solar system pricing is stored in a lookup table:

```typescript
export type PricingKey = `${string}-${string}-${string}`;
// Format: "${systemSize}-${panelId}-${inverterId}"

export const getSolarPrice = (
  systemSize: string,
  panelId: string,
  inverterId: string
): number | null => {
  const key: PricingKey = `${systemSize}-${panelId}-${inverterId}`;
  return SolarPricing[key] ?? null;
}
```

**Example keys**:
- `"6.6-aiko-goodwe-gw5k-eh"`: $4,190
- `"13.2-jinko-sungrow-sh5-0rs"`: $7,990

## Development Guidelines

### Code Organization

- **Path Aliases**: 
  - `@/*` - Root directory (e.g., `@/components/BackButton`)
  - `@sections/*` - Sections directory (e.g., `@sections/solution-select`)
- **Directory Structure**:
  - `app/` - Next.js routes and layout (page.tsx orchestrates wizard)
  - `sections/` - Step-specific wizard screens
  - `components/` - Reusable UI components
  - `lib/` - Hooks and utilities
  - `constants/` - Product data and types
  - `public/` - Static assets (images, logos)

### Code Style

All code style rules are enforced via Prettier (`.prettierrc`):

```json
{
  "tabWidth": 4,
  "semi": true
}
```

**TypeScript**:
- Strict mode enabled in `tsconfig.json`
- Always define interface types for component props
- Use `export const ComponentName` for components
- Export types from constants for reuse

**Naming Conventions**:
- Components: PascalCase (`BatteryCard`, `SolutionSelect`)
- Variables/Functions: camelCase (`updateParams`, `selectedBrand`)
- Constants: UPPER_SNAKE_CASE for true constants
- Files: kebab-case for sections, PascalCase for components

**Styling**:
- Tailwind utility classes only (no inline CSS)
- Template literals for conditional classes
- Yellow accent color (`yellow-500`, `#EAB308`) for selections
- Mobile-first responsive design

**Imports**:
- Group: stdlib → third-party → local
- Use path aliases consistently
- No relative imports outside immediate directory

### Key Patterns

**State Management**:
```typescript
const searchParams = useSearchParams();
const updateParams = useUpdateParams();

// Read from URL
const brand = searchParams.get("brand") || "";

// Update URL
updateParams({ brand: "Sungrow", step: 2 });
```

**Data Filtering**:
```typescript
// Filter products based on URL params
const filteredProducts = BatteryList.filter(
  (battery) => battery.tier === tier && battery.brand === brand
);
```

**Navigation**:
```typescript
// Use ContinueButton for forward navigation
<ContinueButton 
  target={3} 
  disabled={!selection}
  params={{ battery: selectedId }}
/>

// Use BackButton for backward navigation
<BackButton target={1} />
```

### Environment Variables

Create `.env.local` for local development:

```bash
NEXT_PUBLIC_EMAILJS_API_KEY=your_emailjs_public_key
```

The email service requires EmailJS configuration with:
- Service ID: `service_2ne33wk`
- Template ID: `template_qg03z8u`

### Testing

**No automated tests** are currently implemented. Manual QA is performed via:
- Desktop browser testing (Chrome, Firefox, Safari)
- Mobile browser testing (iOS Safari, Android Chrome)
- All three wizard flows (battery, combo, solar)
- Edge cases (phase compatibility, filtering, navigation)

**Build verification**:
```bash
bun run build  # Must succeed before committing
```

## Data Synchronization

Product data is maintained in two places:
1. **Source**: `other/SolarCSV.csv` (read-only reference)
2. **Application**: TypeScript constants in `constants/` directory

When updating product data:
1. Update the CSV file first
2. Manually regenerate TypeScript constants
3. Ensure type consistency across all files
4. Test affected wizard flows

**Affected Files**:
- `constants/Batteries.ts` - Battery products
- `constants/BatteryCombos.ts` - Combo packages
- `constants/ComboList.ts` - Processed combos with IDs
- `constants/SolarPanels.ts` - Solar panel catalog
- `constants/Pricing.ts` - Price lookup table

## Contributing

### Before Committing

1. **Build Check**: Run `bun run build` to ensure compilation succeeds
2. **Format Code**: Run `bunx prettier --write .` to format all files
3. **Manual Testing**: Test all affected wizard flows
4. **Type Safety**: Ensure no TypeScript errors in editor

### Development Workflow

1. Create a feature branch
2. Make changes following code style guidelines
3. Test on desktop and mobile browsers
4. Verify all three flows (battery, combo, solar)
5. Ensure phase selection and filtering work correctly
6. Build and test production build locally
7. Format code with Prettier
8. Commit with descriptive message

### Documentation Updates

- Update `README.md` when adding features or changing architecture
- Update `AGENTS.md` when adding build commands or code style rules
- Keep product counts and examples current
- Document any new URL parameters

## Deployment

This is a Next.js application that can be deployed to:
- **Vercel** (recommended - zero config)
- **Netlify**
- Any Node.js hosting platform
- Docker container

**Environment Variables Required**:
- `NEXT_PUBLIC_EMAILJS_API_KEY` - EmailJS public API key

**Build Command**: `npm run build` or `bun run build`  
**Start Command**: `npm run start` or `bun run start`  
**Node Version**: 20+ recommended

## Project Status

**Current Version**: 0.1.0  
**Status**: Active Development  
**License**: Private project for Equity Solar

### Known Limitations

- No automated tests (manual QA only)
- CSV data must be manually synced to TypeScript
- Email service depends on EmailJS external service
- No backend API (all data is client-side)
- No user authentication or saved quotes

### Future Enhancements

Consider implementing:
- Automated tests (Playwright, React Testing Library)
- CSV-to-TypeScript code generation
- Backend API for quote storage
- User accounts and quote history
- PDF quote generation
- CRM integration
