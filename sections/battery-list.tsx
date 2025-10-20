"use client";

import { useState } from "react";
import { BatteryList, BatteryProduct } from "@/constants/Batteries";
import { BatteryCard } from "@/components/BatteryCard";
import { NavigationButtons } from "@/components/NavigationButtons";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const Batteries = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const tier = searchParams.get("tier") || "";
    const batteryId = searchParams.get("battery") || "";
    const currentStep = searchParams.get("step") || "";

    // Use local state for battery selection, initialized from URL
    const [selectedBattery, setSelectedBattery] = useState<
        BatteryProduct | undefined
    >(batteryId ? BatteryList.find((b) => b.id === batteryId) : undefined);

    const filteredBatteries = BatteryList.filter(
        (batteryItem) => batteryItem.tier === tier,
    );

    const handleContinue = () => {
        if (selectedBattery) {
            updateParams({ battery: selectedBattery.id, step: 3 });
        }
    };

    return (
        <div>
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
