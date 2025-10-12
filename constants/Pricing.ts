export type PricingKey = `${string}-${string}-${string}`;

export const SolarPricing: Record<PricingKey, number> = {
    "6.6-aiko-goodwe-gw5k-eh": 4190,
    "6.6-jinko-goodwe-gw5k-eh": 4190,
    "7.65-aiko-goodwe-gw5k-eh": 5490,
    "7.65-aiko-sungrow-sh5-0rs": 5890,
    "7.65-jinko-goodwe-gw5k-eh": 5490,
    "7.65-jinko-sungrow-sh5-0rs": 5890,
    "10.2-aiko-goodwe-gw5k-eh": 6790,
    "10.2-aiko-sungrow-sh5-0rs": 7390,
    "10.2-jinko-goodwe-gw5k-eh": 6790,
    "10.2-jinko-sungrow-sh5-0rs": 7390,
    "13.2-aiko-goodwe-gw5k-eh": 7690,
    "13.2-aiko-sungrow-sh5-0rs": 7990,
    "13.2-jinko-goodwe-gw5k-eh": 7690,
    "13.2-jinko-sungrow-sh5-0rs": 7990,
};

export const getSolarPrice = (
    systemSize: string,
    panelId: string,
    inverterId: string,
): number | null => {
    const key: PricingKey = `${systemSize}-${panelId}-${inverterId}`;
    return SolarPricing[key] ?? null;
};
