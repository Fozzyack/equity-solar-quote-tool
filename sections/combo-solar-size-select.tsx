"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { ComboList as ComboData } from "@/constants/ComboList";

const SolarIcon = () => (
    <svg
        className="h-12 w-12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const getSolarSizeOptions = (brand: string) => {
    const filteredCombos = ComboData.filter(
        (combo) =>
            combo.brand === brand
    );

    const sizeCounts: { [key: number]: number } = {};
    filteredCombos.forEach((combo) => {
        sizeCounts[combo.solarSizeKw] = (sizeCounts[combo.solarSizeKw] || 0) + 1;
    });

    return Object.entries(sizeCounts)
        .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
        .map(([size, count]) => ({
            id: size.toString(),
            label: `${size} kW`,
            size: parseFloat(size),
        }));
};

const ComboSolarSizeSelect = () => {
    const searchParams = useSearchParams();
    const brand = searchParams.get("brand") || "";
    const urlSolarSize = searchParams.get("solarSize") || "";
    const [selectedSolarSize, setSelectedSolarSize] = useState(urlSolarSize);
    const currentStep = searchParams.get("step") || "";

    const solarSizeOptions = getSolarSizeOptions(brand);

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select solar system size"
                description="Choose the solar panel capacity that best fits your energy needs."
            />
            <div className="grid gap-4 sm:flex sm:items-center sm:justify-center">
                {solarSizeOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={selectedSolarSize === option.id}
                        onClick={() => setSelectedSolarSize(option.id)}
                        icon={<SolarIcon />}
                        label={option.label}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={["solarSize"]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!selectedSolarSize}
                    params={{ solarSize: selectedSolarSize }}
                />
            </div>
        </section>
    );
};

export default ComboSolarSizeSelect;
