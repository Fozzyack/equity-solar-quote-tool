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
    const batterySize = searchParams.get("batterySize") || "";
    const comboId = searchParams.get("combo") || "";
    const currentStep = searchParams.get("step") || "";

    const [selectedCombo, setSelectedCombo] = useState<
        ComboProduct | undefined
    >(comboId ? ComboData.find((c) => c.id === comboId) : undefined);

    const phaseNumber = phase === "single" ? 1 : phase === "three" ? 3 : 0;

    // Filter combos by brand, phase, and battery size range
    let filteredCombos = ComboData.filter(
        (combo) =>
            (phase === "unknown" ? true : combo.phase === phaseNumber) &&
            combo.brand === brand,
    );

    // Apply battery size filtering if selected
    if (batterySize) {
        const selectedSize = parseFloat(batterySize);
        filteredCombos = filteredCombos.filter(
            (combo) => combo.batterySizeKwh === selectedSize,
        );
    }

    filteredCombos = filteredCombos.slice(0,1);

    const handleContinue = () => {
        if (selectedCombo) {
            updateParams({
                combo: selectedCombo.id,
                step: parseInt(currentStep) + 1,
            });
        }
    };

    const phaseLabel = phase === "single" ? "single phase" : "three phase";

    return (
        <div>
            {filteredCombos.length === 0 ? (
                <div className="mb-20 flex min-h-[400px] items-center justify-center">
                    <div className="max-w-md space-y-4 text-center">
                        <p className="text-lg font-bold text-slate-900">
                            No combo systems available
                        </p>
                        <p className="text-sm font-medium text-slate-600">
                            There are no batteries for {phaseLabel} systems with{" "}
                            {brand}. Please go back and select a different phase
                            or brand.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mb-20 gap-6 flex items-center justify-center">
                    {filteredCombos.map((item) => (
                        <ComboCard
                            key={item.id}
                            combo={item}
                            selected={selectedCombo?.id === item.id}
                            onClick={() => setSelectedCombo(item)}
                        />
                    ))}
                </div>
            )}
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
