"use client";

import { useState } from "react";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
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

const NotSureIcon = () => (
    <svg
        className="text-slate-800 fill-slate-800 h-12 w-12"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
    >
        <g>
            <circle cx="128" cy="22.4" r="21.1" />
            <path
                d="M223,51.5c-3.6-3.6-9.5-3.6-13.1,0l-23.3,23.3c0,0-18.1-18.2-18.3-18.3c-5.2-5.2-11.9-7.7-18.7-7.7H128h0h-21.6
		c-6.8,0-13.5,2.6-18.7,7.7c-0.2,0.2-18.3,18.3-18.3,18.3L46.1,51.5c-3.6-3.6-9.5-3.6-13.1,0c-3.6,3.6-3.6,9.5,0,13.1l29.9,29.9
		c3.6,3.6,9.5,3.6,13.1,0l18.4-18.5c0.5-0.5,1.1-0.8,1.9-0.8c1.5,0,2.6,1.2,2.6,2.6v23.8v44.9v95.1c0,0.5,0,0.9,0.1,1.4
		c0.3,3.1,1.7,5.9,3.8,8c2.4,2.4,5.7,3.9,9.3,3.9c3.6,0,6.9-1.5,9.3-3.9c2.1-2.1,3.5-4.9,3.8-8c0-0.4,0.1-0.9,0.1-1.4v-92.4
		c0-1.5,1.2-2.6,2.6-2.6s2.6,1.2,2.6,2.6v92.4c0,0.5,0,0.9,0.1,1.4c0.3,3.1,1.7,5.9,3.8,8c2.4,2.4,5.7,3.9,9.3,3.9s6.9-1.5,9.3-3.9
		c2.1-2.1,3.5-4.9,3.8-8c0-0.4,0.1-0.9,0.1-1.4v-95.1h0V77.8c0-1.5,1.2-2.6,2.6-2.6c0.7,0,1.4,0.3,1.9,0.8L180,94.4
		c3.6,3.6,9.5,3.6,13.1,0L223,64.5C226.6,60.9,226.6,55.1,223,51.5z"
            />
        </g>
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
    {
        id: "unknown",
        label: "Not Sure",
        icon: <NotSureIcon />
    },
];

const PhaseSelect = () => {
    const searchParams = useSearchParams();
    const urlPhase = searchParams.get("phase") || "";
    const [selectedPhase, setSelectedPhase] = useState(urlPhase);
    const brand = searchParams.get("brand") || "";
    const currentStep = searchParams.get("step") || "";

    const hasSinglePhaseCombos = ComboData.some(
        (combo) => combo.brand === brand && combo.phase === 1,
    );
    const hasThreePhaseCombos = ComboData.some(
        (combo) => combo.brand === brand && combo.phase === 3,
    );

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select your electrical phase"
                description="Choose whether your home has single phase or 3 phase power."
            />
            <div className="grid gap-4 sm:grid-cols-3">
                {phaseOptions.map((option) => {
                    let isDisabled = true;
                    if (option.id === "single" && hasSinglePhaseCombos)
                        isDisabled = false;
                    else if (option.id === "three" && hasThreePhaseCombos)
                        isDisabled = false;
                    else if (option.id === "unknown") isDisabled = false;

                    return (
                        <OptionCard
                            key={option.id}
                            selected={selectedPhase === option.id}
                            onClick={() =>
                                !isDisabled && setSelectedPhase(option.id)
                            }
                            icon={option.icon}
                            label={option.label}
                            disabled={isDisabled}
                            description={
                                isDisabled ? "No options available" : undefined
                            }
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
                    disabled={
                        !selectedPhase ||
                        (selectedPhase === "single" && !hasSinglePhaseCombos) ||
                        (selectedPhase === "three" && !hasThreePhaseCombos)
                    }
                    params={{ phase: selectedPhase }}
                />
            </div>
        </section>
    );
};

export default PhaseSelect;
