"use client";

import { useState } from "react";
import { BatteryList, BatteryProduct } from "@/constants/Batteries";
import { BatteryCard } from "@/components/BatteryCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const Batteries = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const tier = searchParams.get("tier") || "";
    const phase = searchParams.get("phase") || "";
    const phaseSelect = phase === "three" ? 3 : 1;
    const brand = searchParams.get("brand") || "";
    const batteryId = searchParams.get("battery") || "";
    const currentStep = searchParams.get("step") || "";

    const [selectedBattery, setSelectedBattery] = useState<
        BatteryProduct | undefined
    >(batteryId ? BatteryList.find((b) => b.id === batteryId) : undefined);

    const filteredBatteries = BatteryList.filter(
        (batteryItem) => batteryItem.tier === tier && batteryItem.brand === brand && batteryItem.phase === phaseSelect,
    );

    console.log(filteredBatteries)

    const handleContinue = () => {
        if (selectedBattery) {
            updateParams({ battery: selectedBattery.id, step: parseInt(currentStep) + 1 });
        }
    };

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Choose your battery system"
                description="Select the battery capacity and configuration that best matches your energy storage needs."
            />
            <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBatteries.map((item) => (
                    <BatteryCard
                        key={item.id}
                        battery={item}
                        selected={selectedBattery?.id === item.id}
                        onClick={() => setSelectedBattery(item)}
                    />
                ))}
            </div>
            <NavigationButtons
                backTarget={parseInt(currentStep) - 1}
                onContinue={handleContinue}
                continueDisabled={!selectedBattery}
                clearParams={["battery"]}
            />
        </div>
    );
};

export default Batteries;
