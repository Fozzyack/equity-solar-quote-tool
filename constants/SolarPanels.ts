export type SolarPanel = {
    id: string;
    brandId: "aiko" | "jinko";
    brandLabel: string;
    modelRange: string;
    tier: "premium" | "mainstream";
    wattageRange: string;
    headline: string;
    strengths: string[];
    considerations: string[];
    image?: string;
};

type SolarPanelBase = Omit<SolarPanel, "id">;
export const panels: SolarPanelBase[] = [
    {
        brandId: "aiko",
        brandLabel: "Aiko",
        modelRange: "ABC Series N-Type",
        tier: "premium",
        wattageRange: "430 W – 480 W",
        headline: "Ultra-high efficiency panels with premium aesthetics and durable build.",
        strengths: [
            "Up to 22.5% module efficiency for maximum output per square metre",
            "N-type TOPCon cells reduce degradation and boost performance in low light",
            "Sleek all-black finish suits design-led installs",
        ],
        considerations: [
            "Carries a premium price compared with mainstream options",
            "Lead times can stretch in peak season due to demand",
        ],
    },
    {
        brandId: "jinko",
        brandLabel: "Jinko",
        modelRange: "Tiger Pro Series",
        tier: "mainstream",
        wattageRange: "415 W – 470 W",
        headline: "Reliable Tier 1 panel balancing strong performance and value.",
        strengths: [
            "Proven field performance with robust 25-year product warranty",
            "Wide installer network keeps replacements and support simple",
            "Great value-for-money for households focused on ROI",
        ],
        considerations: [
            "Slightly lower peak efficiency than top-tier premium panels",
            "Silver frame aesthetic may not match every roof design",
        ],
    },
];

