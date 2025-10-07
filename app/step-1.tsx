"use client";

import { MidRangeIcon, PremiumIcon, ValueIcon } from "@/constants/Icons";
import { OptionCard } from "@/components/OptionCard";

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

interface Step1Props {
    solution: string;
    tier: string;
    updateParams: (updates: Record<string, string | number | undefined>) => void;
}

const Step1 = ({ solution, tier, updateParams }: Step1Props) => {
    const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (solution == "battery") {
            updateParams({ step: 6 });
        } else {
            updateParams({ step: 2 });
        }
    };

    return (
        <section className="space-y-8">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 1
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
                        updateParams({ tier: "", step: 0 });
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!tier}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </section>
    );
};

export default Step1;
