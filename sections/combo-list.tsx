"use client";

import { useState } from "react";
import { ComboList as ComboData, ComboProduct } from "@/constants/ComboList";
import { ComboCard } from "@/components/ComboCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const ComboList = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const phase = searchParams.get("phase") || "";
    const brand = searchParams.get("brand") || "";
    const comboId = searchParams.get("combo") || "";
    const currentStep = searchParams.get("step") || "";

    const [selectedCombo, setSelectedCombo] = useState<ComboProduct | undefined>(
        comboId ? ComboData.find((c) => c.id === comboId) : undefined,
    );

    const phaseNumber = phase === "single" ? 1 : phase === "three" ? 3 : 0;

    const filteredCombos = ComboData.filter(
        (combo) => combo.phase === phaseNumber && combo.brand === brand,
    );

    const handleContinue = () => {
        if (selectedCombo) {
            updateParams({ combo: selectedCombo.id, step: parseInt(currentStep) + 1 });
        }
    };

    return (
        <div>
            <div className="mb-20 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filteredCombos.map((item) => (
                    <ComboCard
                        key={item.id}
                        combo={item}
                        selected={selectedCombo?.id === item.id}
                        onClick={() => setSelectedCombo(item)}
                    />
                ))}
            </div>
            <NavigationButtons
                backTarget={parseInt(currentStep) - 1}
                onContinue={handleContinue}
                continueDisabled={!selectedCombo}
                clearParams={["combo"]}
            />
        </div>
    );
};

export default ComboList;
