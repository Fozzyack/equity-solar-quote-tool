"use client";

import { MidRangeIcon, PremiumIcon, ValueIcon } from "@/constants/Icons";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
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
    const updateParams = useUpdateParams();
    const tier = searchParams.get("tier") || "";
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
                        selected={tier === option.id}
                        onClick={() => updateParams({ tier: option.id })}
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
                    disabled={!tier}
                />
            </div>
        </section>
    );
};

export default PriceRange;
