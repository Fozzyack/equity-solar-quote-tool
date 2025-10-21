"use client";

import { useUpdateParams } from "@/lib/useUpdateParams";

interface ContinueButtonProps {
    target: number;
    disabled?: boolean;
    label?: string;
    className?: string;
    params?: Record<string, string | number | undefined>;
}

export const ContinueButton = ({
    target,
    disabled = false,
    label = "Continue",
    className,
    params,
}: ContinueButtonProps) => {
    const updateParams = useUpdateParams();

    return (
        <button
            type="button"
            onClick={() => updateParams({ step: target, ...params })}
            disabled={disabled}
            className={
                className ||
                "inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            }
        >
            {label}
        </button>
    );
};
