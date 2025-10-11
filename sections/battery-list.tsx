"use client";

import { useState } from "react";
import { BatteryList, BatteryProduct } from "@/constants/Batteries";
import { BatteryCard } from "@/components/BatteryCard";
import { BackButton } from "@/components/BackButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const Batteries = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const tier = searchParams.get("tier") || "";
    const batteryId = searchParams.get("battery") || "";

    // Use local state for battery selection, initialized from URL
    const [selectedBattery, setSelectedBattery] = useState<BatteryProduct | undefined>(
        batteryId ? BatteryList.find(b => b.id === batteryId) : undefined
    );

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
            <div className="flex items-center justify-center gap-5">
                <BackButton target={1} />
                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!selectedBattery}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Batteries;
