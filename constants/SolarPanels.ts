export type SolarInverterPackage = {
    inverterBrand: "GoodWe" | "Sungrow";
    price?: number;
};

export type SolarPanelSystem = {
    id: string;
    solarSizeKw: number;
    panelBrand: string;
    inverterPackages: SolarInverterPackage[];
};

export const solarPanelSystems: Omit<SolarPanelSystem, "id">[] = [
    {
        solarSizeKw: 6.6,
        panelBrand: "Aiko/Jinko",
        inverterPackages: [
            {
                inverterBrand: "GoodWe",
                price: 4190,
            },
            {
                inverterBrand: "Sungrow",
            },
        ],
    },
    {
        solarSizeKw: 7.65,
        panelBrand: "Aiko/Jinko",
        inverterPackages: [
            {
                inverterBrand: "GoodWe",
                price: 5490,
            },
            {
                inverterBrand: "Sungrow",
                price: 5890,
            },
        ],
    },
    {
        solarSizeKw: 10.2,
        panelBrand: "Aiko/Jinko",
        inverterPackages: [
            {
                inverterBrand: "GoodWe",
                price: 6790,
            },
            {
                inverterBrand: "Sungrow",
                price: 7390,
            },
        ],
    },
    {
        solarSizeKw: 13.2,
        panelBrand: "Aiko/Jinko",
        inverterPackages: [
            {
                inverterBrand: "GoodWe",
                price: 7690,
            },
            {
                inverterBrand: "Sungrow",
                price: 7990,
            },
        ],
    },
];
