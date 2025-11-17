Price Update Guide

This guide explains how to update prices for batteries, solar panels, and combo systems in the quote tool.

Overview

Prices are stored in three main files within the /constants directory:
- Batteries.ts - Battery-only pricing
- Pricing.ts - Solar panel + inverter combinations
- BatteryCombos.ts - Solar + battery combo packages

1. Updating Battery Prices

File: constants/Batteries.ts

Battery prices are defined in the batteryData array. Each battery has a price and rebate field.

Steps:
1. Open constants/Batteries.ts
2. Find the battery you want to update by searching for the brand and size
3. Update the price field (in dollars)
4. Update the rebate field if applicable

Example:

{
    brand: "Sungrow",
    series: "SBR",
    sizeKwh: 9.6,
    inverter: "SH5.0RS-ADA",
    systemType: "AC-coupled 5 kW - 1p",
    module: "Sungrow SBR096 (9.6 kWh)",
    phase: 1,
    price: 10970,  // ← Update this
    rebate: 3168,  // ← And this if needed
    tier: "premium",
},

2. Updating Solar Panel Prices

File: constants/Pricing.ts

Solar prices are based on combinations of system size, panel brand, and inverter model.

Steps:
1. Open constants/Pricing.ts
2. Find the SolarPricing object
3. Update the price for the specific combination using the format: "systemSize-panelId-inverterId"

Example:

export const SolarPricing: Record<PricingKey, number> = {
    "6.6-aiko-goodwe-gw5k-eh": 4190,     // ← Update these values
    "6.6-jinko-goodwe-gw5k-eh": 4190,
    "7.65-aiko-goodwe-gw5k-eh": 5490,
    // ... etc
};

Key Format:
- System sizes: 6.6, 7.65, 10.2, 13.2
- Panel IDs: aiko, jinko
- Inverter IDs: goodwe-gw5k-eh, sungrow-sh5-0rs

3. Updating Combo Prices

File: constants/BatteryCombos.ts

Combo packages include both solar and battery systems together.

Steps:
1. Open constants/BatteryCombos.ts
2. Find the BatteryComboList array
3. Locate the combo by brand, battery size, and solar size
4. Update the price, rebate, and netPrice fields

Example:

{
    brand: "Sungrow",
    batterySeries: "SBR",
    batterySizeKwh: 9.6,
    batteryModule: "Sungrow SBR096 (9.6 kWh)",
    solarSizeKw: 6.51,
    solarModule: "JKM510N",
    inverter: "SH5.0RS-ADA",
    phase: "1/3",
    price: 14218,      // ← Update total price
    rebate: 3168,      // ← Update rebate
    netPrice: 11100,   // ← Update net price (price - rebate)
    tier: "premium",
},

Important: Make sure netPrice = price - rebate

Quick Reference

What to Update        | File               | Find By                         | Update Fields                 
Battery only          | Batteries.ts       | Brand, series, size, phase      | price, rebate             
Solar only            | Pricing.ts         | System size, panel, inverter    | Price value in object         
Solar + Battery combo | BatteryCombos.ts   | Brand, battery size, solar size | price, rebate, netPrice

Notes

- All prices are in Australian dollars (AUD)
- Rebates are government incentives and should be updated when regulations change
- The tier field ("value", "medium", "premium") affects how products are displayed but doesn't affect pricing calculations
- After updating prices, test the quote tool to ensure calculations are correct
