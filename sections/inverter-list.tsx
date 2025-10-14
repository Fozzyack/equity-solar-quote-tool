"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import { Inverter, InverterList } from "@/constants/Inverters";

const InverterSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const size = searchParams.get("systemSize") || "";
    const panelId = searchParams.get("panelBrand") || "";
    const inverterId = searchParams.get("inverterId") || "";
    const currentStep = searchParams.get("step") || "";

    const inverters = InverterList.filter(
        (inverter) =>
            (inverter.compatibleSizes.includes(size) || size === "unknown") &&
            inverter.compatiblePanels.includes(panelId),
    );

    const [selectedInverter, setSelectedInverter] = useState<
        Inverter | undefined
    >(inverterId ? inverters.find((i) => i.id == inverterId) : undefined);

    const handleContinue = () => {
        if (selectedInverter) {
            updateParams({
                inverterBrand: selectedInverter.id,
                step: parseInt(currentStep) + 1,
            });
        }
    };

    return (
        <div>
            <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {inverters.map((item) => (
                    <ProductCard
                        key={item.id}
                        panel={item}
                        selected={selectedInverter?.id === item.id}
                        onClick={() => setSelectedInverter(item)}
                    />
                ))}
            </div>
            <NavigationButtons
                backTarget={parseInt(currentStep) - 1}
                onContinue={handleContinue}
                continueDisabled={!selectedInverter}
            />
        </div>
    );
};

export default InverterSelect;
