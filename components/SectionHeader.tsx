"use client";
import { stepNumber } from "@/constants/Common";
import { useSearchParams } from "next/navigation";

interface SectionHeaderProps {
    title: string;
    description?: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
    const searchParams = useSearchParams();
    const currentStep = searchParams.get("step") || "0";
    const solution = searchParams.get("solution") || "";
    const totalSteps =
        solution == ""
            ? ""
            : stepNumber.find((stepNumber) => stepNumber.id == solution)?.steps;

    let step = parseInt(currentStep) + 1;
    let lastStep = true;
    if (totalSteps) {
        lastStep = parseInt(currentStep) == totalSteps - 1;
    }

    return (
        <div className="space-y-1">
            {step && (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {step}{" "}
                    {solution != "" &&
                        step != 1 &&
                        !lastStep &&
                        "/ " + totalSteps?.toString()}
                </p>
            )}
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && (
                <p className="text-sm text-slate-500">{description}</p>
            )}
        </div>
    );
};
