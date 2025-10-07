"use client";

import { BatteryList, BatteryProduct } from "@/constants/Batteries";
import { BatteryCard } from "@/components/BatteryCard";

interface BatteriesProps {
    tier: string;
    battery: BatteryProduct | undefined;
    updateParams: (updates: Record<string, string | number | undefined>) => void;
}

const Batteries = ({ tier, battery, updateParams }: BatteriesProps) => {
    const filteredBatteries = BatteryList.filter(
        (batteryItem) => batteryItem.tier === tier,
    );
    return (
        <div>
            <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBatteries.map((item) => (
                    <BatteryCard
                        key={item.id}
                        battery={item}
                        selected={battery?.id === item.id}
                        onClick={() => updateParams({ battery: item.id })}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center gap-5">
                <button
                    type="button"
                    onClick={() => updateParams({ step: 1 })}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => updateParams({ step: 7 })}
                    disabled={!battery}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Batteries;
