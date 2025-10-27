"use client";
import { useState } from "react";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useSearchParams } from "next/navigation";
import { systemSizeOptions } from "@/constants/Common";

const SystemSize = () => {
    const searchParams = useSearchParams();
    const urlSystemSize = searchParams.get("systemSize") || "";
    const [selectedSystemSize, setSelectedSystemSize] = useState(urlSystemSize);
    const currentStep = searchParams.get("step") || "3";

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Which system size are you looking for?"
                description="Pick the array that best matches your household usage. Not sure is okay too."
            />
            <div className="grid sm:flex sm:items-center sm:justify-center gap-4">
                {systemSizeOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={selectedSystemSize === option.id}
                        onClick={() => setSelectedSystemSize(option.id)}
                        label={option.label}
                        description={
                            option.id !== "unknown"
                                ? `${option.label.replace(" kW", "")} kW array`
                                : "We will help you size it"
                        }
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={["systemSize", "panelBrand", "inverterBrand"]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!selectedSystemSize}
                    params={{ systemSize: selectedSystemSize }}
                />
            </div>
        </section>
    );
};

export default SystemSize;
