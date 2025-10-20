"use client";
import { SystemCard } from "@/components/SystemCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import { solutions } from "@/constants/Common";

const SolutionSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const solution = searchParams.get("solution") || "";
    const handleSelectSolution = (id: string) => {
        updateParams({
            solution: id,
            tier: "",
            battery: "",
            existingSystem: "",
            panelBrand: "",
            systemSize: "",
        });
    };
    return (
        <section className="space-y-6">
            <SectionHeader title="Choose your system" />
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
                            existingSystem: "",
                            panelBrand: "",
                            systemSize: "",
                        });
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Reset
                </button>
                <ContinueButton target={1} disabled={!solution} />
            </div>
        </section>
    );
};
export default SolutionSelect;
