"use client";

import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const existingSystemOptions = [
    {
        id: "true",
        label: "Yes, upgrading an existing system",
    },
    {
        id: "false",
        label: "No, starting from scratch",
    },
];

const ExistingSystem = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();

    const existingSystem = searchParams.get("existingSystem") || "";
    const currentStep = searchParams.get("step") || "";

    return (
        <section className="space-y-8">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {currentStep}
                </p>
                <h2 className="text-2xl font-bold">
                    Do you have an existing solar system?
                </h2>
                <p className="text-sm text-slate-500">
                    This helps us tailor the right upgrade or new install path.
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {existingSystemOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={existingSystem === option.id}
                        onClick={() =>
                            updateParams({
                                existingSystem: option.id,
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
                            existingSystem: "",
                            systemSize: "",
                            step: parseInt(currentStep) - 1,
                        });
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!existingSystem}
                />
            </div>
        </section>
    );
};

export default ExistingSystem;
