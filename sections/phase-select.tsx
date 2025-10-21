"use client";

import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import { ComboList as ComboData } from "@/constants/ComboList";

const SinglePhaseIcon = () => (
    <svg
        className="h-12 w-12"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="2.5"
        />
        <path
            d="M24 8v32"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
);

const ThreePhaseIcon = () => (
    <svg
        className="h-12 w-12"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="12" cy="24" r="2" fill="currentColor" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <circle cx="36" cy="24" r="2" fill="currentColor" />
    </svg>
);

const phaseOptions = [
    {
        id: "single",
        label: "Single Phase",
        icon: <SinglePhaseIcon />,
    },
    {
        id: "three",
        label: "3 Phase",
        icon: <ThreePhaseIcon />,
    },
];

const PhaseSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const phase = searchParams.get("phase") || "";
    const brand = searchParams.get("brand") || "";
    const currentStep = searchParams.get("step") || "";

    // Check which phases have available combos for the selected brand
    const hasSinglePhaseCombos = ComboData.some(
        (combo) => combo.brand === brand && combo.phase === 1
    );
    const hasThreePhaseCombos = ComboData.some(
        (combo) => combo.brand === brand && combo.phase === 3
    );

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select your electrical phase"
                description="Choose whether your home has single phase or 3 phase power."
            />
            <div className="grid gap-4 sm:grid-cols-2">
                {phaseOptions.map((option) => {
                    const isDisabled = option.id === "single" ? !hasSinglePhaseCombos : !hasThreePhaseCombos;
                    return (
                        <OptionCard
                            key={option.id}
                            selected={phase === option.id}
                            onClick={() => !isDisabled && updateParams({ phase: option.id })}
                            icon={option.icon}
                            label={option.label}
                            disabled={isDisabled}
                            description={isDisabled ? "No options available" : undefined}
                        />
                    );
                })}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={["phase"]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!phase || (phase === "single" && !hasSinglePhaseCombos) || (phase === "three" && !hasThreePhaseCombos)}
                />
            </div>
        </section>
    );
};

export default PhaseSelect;
