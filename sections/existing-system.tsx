"use client";

import { useState } from "react";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useSearchParams } from "next/navigation";

const existingSystemOptions = [
    {
        id: "yes",
        label: "Yes, upgrading an existing system",
    },
    {
        id: "no",
        label: "No, starting from scratch",
    },
];

const ExistingSystem = () => {
    const searchParams = useSearchParams();
    const urlExistingSystem = searchParams.get("existingSystem") || "";
    const [selectedExistingSystem, setSelectedExistingSystem] = useState(urlExistingSystem);
    const currentStep = searchParams.get("step") || "";

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Do you have an existing solar system?"
                description="This helps us tailor the right upgrade or new install path."
            />
            <div className="grid gap-4 sm:grid-cols-2">
                {existingSystemOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={selectedExistingSystem === option.id}
                        onClick={() => setSelectedExistingSystem(option.id)}
                        label={option.label}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={[
                        "existingSystem",
                        "panelBrand",
                        "systemSize",
                        "inverterBrand",
                    ]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!selectedExistingSystem}
                    params={{ existingSystem: selectedExistingSystem }}
                />
            </div>
        </section>
    );
};

export default ExistingSystem;
