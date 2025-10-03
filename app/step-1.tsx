"use client";
import { useEffect } from "react";

import { MidRangeIcon, PremiumIcon, ValueIcon } from "@/constants/Icons";
import { useUserChoiceContext } from "@/contexts/UserChoiceContext";

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

const Step1 = () => {
    const { solution, setStep, tier, setTier } = useUserChoiceContext();

    const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (solution == "battery") {
            setStep(6);
        } else {
            setStep(2);
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
                {batteryPriceRanges.map((option) => {
                    const selected = tier === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setTier(option.id)}
                            className={`flex h-full flex-col items-center gap-4 rounded-3xl border-2 px-6 py-7 text-sm font-bold uppercase tracking-wide transition ${
                                selected
                                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50"
                            }`}
                        >
                            <span className="transition-colors text-current">
                                {option.icon}
                            </span>
                            <span>{option.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => {
                        setTier("");
                        setStep(0);
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
