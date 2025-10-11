"use client";

import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { useSearchParams } from "next/navigation";
import { useUpdateParams } from "@/lib/useUpdateParams";

const systemSizeOptions = [
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
    {
        id: "unknown",
        label: "Not sure yet",
    },
];

const SystemSize = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const systemSize = searchParams.get("systemSize") || "";
    const currentStep = searchParams.get("currentStep") || "";

    return (
        <section className="space-y-8">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {currentStep}
                </p>
                <h2 className="text-2xl font-bold">
                    Which system size are you looking for?
                </h2>
                <p className="text-sm text-slate-500">
                    Pick the array that best matches your household usage. Not sure is okay too.
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
                {systemSizeOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={systemSize === option.id}
                        onClick={() =>
                            updateParams({
                                systemSize: option.id,
                            })
                        }
                        label={option.label}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => {
                        updateParams({
                            step: 1,
                        });
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <ContinueButton target={3} disabled={!systemSize} />
            </div>
        </section>
    );
};

export default SystemSize;
