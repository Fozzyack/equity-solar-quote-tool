export type Inverter = {
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
    compatibleSizes: string[];
    compatiblePanels: string[];
};

type InverterBase = Omit<Inverter, "id">;
const inverterData: InverterBase[] = [
    {
        brandId: "sungrow",
        brandLabel: "Sungrow",
        modelRange: "SH5.0RS",
        tier: "premium",
        wattageRange: "5.0 kW",
        headline: "High-efficiency hybrid inverter with integrated battery management.",
        strengths: [
            "Seamless integration with battery storage systems",
            "Advanced monitoring and smart energy management",
            "Proven reliability with robust warranty coverage",
        ],
        considerations: [
            "Premium pricing compared to string-only inverters",
            "Requires professional installation and configuration",
        ],
        image: "/Sungrow/Inverter.png",
        compatibleSizes: ["6.6", "7.65", "10.2", "13.2"],
        compatiblePanels: ["aiko", "jinko"],
    },
    {
        brandId: "goodwe",
        brandLabel: "GoodWe",
        modelRange: "GW5K-EH",
        tier: "mainstream",
        wattageRange: "5.0 kW",
        headline: "Reliable hybrid inverter offering excellent value for money.",
        strengths: [
            "Competitive pricing with strong performance",
            "Easy installation and setup process",
            "Wide compatibility with various battery systems",
        ],
        considerations: [
            "Slightly lower efficiency than premium brands",
            "Limited advanced features compared to high-end models",
        ],
        image: "/GoodWe/Inverter.png",
        compatibleSizes: ["6.6", "7.65", "10.2", "13.2"],
        compatiblePanels: ["aiko", "jinko"],
    },
];

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export const InverterList: Inverter[] = inverterData.map((item) => {
    const slug = slugify(`${item.brandId}-${item.modelRange}`);
    return {
        ...item,
        id: `${slug}`,
    };
});
