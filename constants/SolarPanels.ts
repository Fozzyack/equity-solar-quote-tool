export type SolarPanel = {
    id: string;
    brandId: string;
    brandLabel: string;
    modelRange: string;
    tier: string;
    wattageRange: string;
    headline: string;
    strengths: string[];
    considerations: string[];
    image: string;
};

const panelData: Array<Omit<SolarPanel, "id">> = [
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
        image: "/Aiko/Aiko-Panel.png",
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
        image: "/Jinko/Jinko-Panel.webp",
    },
];

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export const SolarPanelList: SolarPanel[] = panelData.map((item) => {
    const slug = slugify(`${item.brandId}`);
    return {
        ...item,
        id: `${slug}`,
    };
});
