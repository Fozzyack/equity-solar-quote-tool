"use client";
import { SystemCard } from "@/components/SystemCard";
import { SolarPanelsIcon, ComboIcon, BatteryIcon } from "@/constants/Icons";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const solutions = [
    {
        id: "solar-panels",
        title: "Solar Only",
        icon: <SolarPanelsIcon />,
    },
    {
        id: "combo",
        title: "Solar + Battery Combo",
        icon: <ComboIcon />,
    },
    {
        id: "battery",
        title: "Battery Only",
        icon: <BatteryIcon />,
    },
];

const Step0 = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const solution = searchParams.get("solution") || "";
    const handleSelectSolution = (id: string) => {
        updateParams({
            solution: id,
            tier: "",
            battery: "",
        });
    };

    const handleContinue = () => {
        if (!solution) {
            return;
        }
        updateParams({ step: 1 });
    };
    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 0
                </p>
                <h2 className="text-2xl font-bold">Choose your system</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                {solutions.map((item) => (
                    <SystemCard
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        selected={solution === item.id}
                        onClick={() => handleSelectSolution(item.id)}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row">
                <button
                    type="button"
                    onClick={() => {
                        updateParams({
                            solution: "",
                            tier: "",
                            battery: "",
                        });
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Reset
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!solution}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </section>
    );
};
export default Step0;
