import { BatteryIcon, ComboIcon, SolarPanelsIcon } from "./Icons";

export const systemSizeOptions = [
    {
        id: "6.6",
        label: "6.6 kW",
    },
    {
        id: "7.65",
        label: "7.65 kW",
    },
    {
        id: "10.2",
        label: "10.2 kW",
    },
    {
        id: "13.2",
        label: "13.2 kW",
    },
    /*
    {
        id: "unknown",
        label: "Not sure yet",
    },
    */
];

export const solutions = [
    {
        id: "solar-panels",
        title: "Solar Only",
        icon: <SolarPanelsIcon />,
    },
    {
        id: "combo",
        title: "Solar + Battery Combo",
        icon: <ComboIcon />,
    },
    {
        id: "battery",
        title: "Battery Only",
        icon: <BatteryIcon />,
    },
];
