"use client";

import { useState } from "react";
import { MidRangeIcon, PremiumIcon, ValueIcon } from "@/constants/Icons";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useSearchParams } from "next/navigation";

const batteryPriceRanges = [
    {
        id: "value",
        label: "Value",
        icon: <ValueIcon />,
    },
    {
        id: "medium",
        label: "Mid Range",
        icon: <MidRangeIcon />,
    },
    {
        id: "premium",
        label: "Premium",
        icon: <PremiumIcon />,
    },
];

const PriceRange = () => {
    const searchParams = useSearchParams();
    const urlTier = searchParams.get("tier") || "";
    const [selectedTier, setSelectedTier] = useState(urlTier);
    const currentStep = searchParams.get("step") || "";

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Choose battery price range"
                description="Select the performance tier that best matches your storage goals."
            />
            <div className="grid gap-4 sm:grid-cols-3">
                {batteryPriceRanges.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={selectedTier === option.id}
                        onClick={() => setSelectedTier(option.id)}
                        icon={option.icon}
                        label={option.label}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={["tier", "battery"]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!selectedTier}
                    params={{ tier: selectedTier }}
                />
            </div>
        </section>
    );
};

export default PriceRange;
