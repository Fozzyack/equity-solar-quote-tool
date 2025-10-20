"use client";
import { useSearchParams } from "next/navigation";

interface SectionHeaderProps {
    title: string;
    description?: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
    const searchParams = useSearchParams();
    const currentStep = searchParams.get("step") || "0";
    let step = parseInt(currentStep) + 1;

    return (
        <div className="space-y-1">
            {step && (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {step}
                </p>
            )}
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && (
                <p className="text-sm text-slate-500">{description}</p>
            )}
        </div>
    );
};
