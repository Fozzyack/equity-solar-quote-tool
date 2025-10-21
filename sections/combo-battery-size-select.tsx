"use client";

import { useSearchParams } from "next/navigation";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { BatteryComboList } from "@/constants/BatteryCombos";

const BatteryIcon = () => (
    <svg
        className="h-12 w-12"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="12"
            y="16"
            width="24"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="2.5"
        />
        <rect
            x="16"
            y="20"
            width="4"
            height="8"
            rx="1"
            fill="currentColor"
        />
        <rect
            x="22"
            y="18"
            width="2"
            height="12"
            rx="1"
            fill="currentColor"
        />
        <rect
            x="26"
            y="20"
            width="6"
            height="8"
            rx="1"
            fill="currentColor"
        />
    </svg>
);

// Group battery sizes into logical ranges
const getBatterySizeGroups = (brand: string, phase: string) => {
    const phaseNumber = phase === "single" ? 1 : phase === "three" ? 3 : 0;

    // Filter combos by brand and phase
    const filteredCombos = BatteryComboList.filter(
        (combo) => combo.brand === brand && combo.phase === (phaseNumber === 1 ? "1/3" : phaseNumber === 3 ? "3" : "")
    );

    // Extract unique battery sizes and sort them
    const uniqueSizes = [...new Set(filteredCombos.map(combo => combo.batterySizeKwh))].sort((a, b) => a - b);

    // Group into ranges
    const groups: { [key: string]: { label: string; sizes: number[]; min: number; max: number } } = {};

    uniqueSizes.forEach(size => {
        let groupKey = "";
        let groupLabel = "";

        if (size >= 8 && size <= 12) {
            groupKey = "small";
            groupLabel = "Small (8-12 kWh)";
        } else if (size >= 13 && size <= 18) {
            groupKey = "medium";
            groupLabel = "Medium (13-18 kWh)";
        } else if (size >= 19 && size <= 25) {
            groupKey = "large";
            groupLabel = "Large (19-25 kWh)";
        } else if (size >= 26 && size <= 35) {
            groupKey = "xlarge";
            groupLabel = "Extra Large (26-35 kWh)";
        } else if (size >= 36) {
            groupKey = "xxlarge";
            groupLabel = "Very Large (36+ kWh)";
        }

        if (groupKey) {
            if (!groups[groupKey]) {
                groups[groupKey] = {
                    label: groupLabel,
                    sizes: [],
                    min: size,
                    max: size
                };
            }
            groups[groupKey].sizes.push(size);
            groups[groupKey].min = Math.min(groups[groupKey].min, size);
            groups[groupKey].max = Math.max(groups[groupKey].max, size);
        }
    });

    return Object.entries(groups).map(([id, group]) => ({
        id,
        label: group.label,
        description: `${group.sizes.length} option${group.sizes.length > 1 ? 's' : ''} available`,
        sizes: group.sizes
    }));
};

const ComboBatterySizeSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const phase = searchParams.get("phase") || "";
    const brand = searchParams.get("brand") || "";
    const batterySize = searchParams.get("batterySize") || "";
    const currentStep = searchParams.get("step") || "";

    const batterySizeGroups = getBatterySizeGroups(brand, phase);

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select battery size range"
                description="Choose the battery capacity range that best fits your energy needs."
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {batterySizeGroups.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={batterySize === option.id}
                        onClick={() => updateParams({ batterySize: option.id })}
                        icon={<BatteryIcon />}
                        label={option.label}
                        description={option.description}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={["batterySize"]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!batterySize}
                />
            </div>
        </section>
    );
};

export default ComboBatterySizeSelect;
