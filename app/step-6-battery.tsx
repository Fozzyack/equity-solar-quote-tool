"use client";

import { useUserChoiceContext } from "@/contexts/UserChoiceContext";
import { BatteryList } from "@/constants/Batteries";

const Batteries = () => {
    const { setStep, tier, battery, setBattery } = useUserChoiceContext();
    const filteredBatteries = BatteryList.filter(
        (batteryItem) => batteryItem.tier === tier,
    );
    return (
        <div>
            <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBatteries.map((item) => {
                    const selected = battery?.id === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            aria-pressed={selected}
                            className={`flex h-full flex-col gap-4 rounded-2xl border-2 p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
                                selected
                                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
                                    : "border-slate-200 bg-white text-slate-900 hover:border-yellow-300 hover:bg-yellow-50"
                            }`}
                            onClick={() => setBattery(item)}
                        >
                            {item.image ? (
                                <div className="flex h-32 w-full items-center bg-white justify-center rounded-xl border border-slate-300">
                                    <img
                                        src={item.image}
                                        alt={item.module}
                                        className="h-full w-full rounded-xl object-contain p-2"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-32 w-full items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Image coming soon
                                </div>
                            )}
                            <div className="space-y-1">
                                <p
                                    className={`text-xs font-semibold uppercase tracking-[0.3em] ${selected ? "text-black" : "text-slate-400"}`}
                                >
                                    {item.brand}
                                </p>
                                <h2 className="text-lg font-bold leading-tight">
                                    {item.module}
                                </h2>
                                <p className="text-sm font-semibold text-slate-600">
                                    {item.sizeKwh} kWh
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="flex items-center justify-center gap-5">
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => setStep(7)}
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
