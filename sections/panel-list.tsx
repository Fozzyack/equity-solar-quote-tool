"use client";

import { useState } from "react";
import { SolarPanelList, SolarPanel } from "@/constants/SolarPanels";
import { ProductCard } from "@/components/ProductCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";

const PanelSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const panelId = searchParams.get("panelBrand") || "";
    const currentStep = searchParams.get("step") || "";

    const systemSize = searchParams.get("systemSize") || "";

    var panels = SolarPanelList;
    if (systemSize != "" && systemSize != "unknown") {
        panels = panels.filter((item) =>
            item.compatibleSizes.includes(systemSize),
        );
    }
    console.log(systemSize);
    console.log(panels);

    const [selectedPanel, setSelectedPanel] = useState<SolarPanel | undefined>(
        panelId ? SolarPanelList.find((p) => p.id === panelId) : undefined,
    );

    const handleContinue = () => {
        if (selectedPanel) {
            updateParams({
                panelBrand: selectedPanel.id,
                step: parseInt(currentStep) + 1,
            });
        }
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Select Your Panels"
                description="Have a look at the panels we are currently installing"
            />
            <div className="mb-20 grid gap-4 sm:flex sm:items-center sm:justify-center">
                {panels.map((item) => (
                    <ProductCard
                        key={item.id}
                        panel={item}
                        selected={selectedPanel?.id === item.id}
                        onClick={() => setSelectedPanel(item)}
                    />
                ))}
            </div>
            <NavigationButtons
                backTarget={parseInt(currentStep) - 1}
                onContinue={handleContinue}
                continueDisabled={!selectedPanel}
                clearParams={["panelBrand", "inverterBrand"]}
            />
        </div>
    );
};

export default PanelSelect;
