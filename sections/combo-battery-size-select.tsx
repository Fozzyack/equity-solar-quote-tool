"use client";

import { useSearchParams } from "next/navigation";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { ComboList as ComboData } from "@/constants/ComboList";

const BatteryIcon = () => (
    <svg
        className="h-12 w-12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.5 10V14M11.5 10V14M15.5 10V14M21 13V11M6.2 18H16.8C17.9201 18 18.4802 18 18.908 17.782C19.2843 17.5903 19.5903 17.2843 19.782 16.908C20 16.4802 20 15.9201 20 14.8V9.2C20 8.0799 20 7.51984 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.4802 6 17.9201 6 16.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Get unique battery sizes for the selected brand and phase
const getBatterySizeOptions = (brand: string, phase: string) => {
    // Filter combos by brand and phase
    const filteredCombos = ComboData.filter((combo) => combo.brand === brand);

    // Extract unique battery sizes and count occurrences
    const sizeCounts: { [key: number]: number } = {};
    filteredCombos.forEach((combo) => {
        sizeCounts[combo.batterySizeKwh] =
            (sizeCounts[combo.batterySizeKwh] || 0) + 1;
    });

    // Sort sizes and create options
    return Object.entries(sizeCounts)
        .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
        .map(([size, count]) => ({
            id: size.toString(),
            label: `${size} kWh`,
            description: `${count} option${count > 1 ? "s" : ""} available`,
            size: parseFloat(size),
        }));
};

const ComboBatterySizeSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const phase = searchParams.get("phase") || "";
    const brand = searchParams.get("brand") || "";
    const batterySize = searchParams.get("batterySize") || "";
    const currentStep = searchParams.get("step") || "";

    const batterySizeOptions = getBatterySizeOptions(brand, phase);

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select battery size"
                description="Choose the battery capacity that best fits your energy needs."
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {batterySizeOptions.map((option) => (
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
