"use client";

import { useState } from "react";
import { SolarPanelList, SolarPanel } from "@/constants/SolarPanels";
import { SolarPanelCard } from "@/components/SolarPanelCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";

const PanelSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const panelId = searchParams.get("panelBrand") || "";
    const currentStep = searchParams.get("step") || "";

    const [selectedPanel, setSelectedPanel] = useState<SolarPanel | undefined>(
        panelId ? SolarPanelList.find((p) => p.id === panelId) : undefined,
    );

    const handleContinue = () => {
        if (selectedPanel) {
            updateParams({ panelBrand: selectedPanel.id, step: parseInt(currentStep) + 1 });
        }
    };

    return (
        <div className="space-y-6">
            <SectionHeader

                step={parseInt(currentStep)}
                title="Select Your Panels"
                description="Have a look at the panels we are currently installing"
            />
            <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {SolarPanelList.map((item) => (
                    <SolarPanelCard
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
            />
        </div>
    );
};

export default PanelSelect;
