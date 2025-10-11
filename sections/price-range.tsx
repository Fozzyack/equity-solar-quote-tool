"use client";

import { MidRangeIcon, PremiumIcon, ValueIcon } from "@/constants/Icons";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import { parse } from "path";

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
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {currentStep}
                </p>
                <h2 className="text-2xl font-bold">
                    Choose battery price range
                </h2>
                <p className="text-sm text-slate-500">
                    Select the performance tier that best matches your storage
                    goals.
                </p>
            </div>
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
                <button
                    type="button"
                    onClick={() => {
                        updateParams({
                            tier: "",
                            step: parseInt(currentStep) - 1,
                        });
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!tier}
                />
            </div>
        </section>
    );
};

export default PriceRange;
