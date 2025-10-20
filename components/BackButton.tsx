"use client";

import { useUpdateParams } from "@/lib/useUpdateParams";

interface BackButtonProps {
    target: number;
    label?: string;
    className?: string;
    clearParams?: string[];
}

export const BackButton = ({
    target,
    label = "Back",
    className,
    clearParams = [],
}: BackButtonProps) => {
    const updateParams = useUpdateParams();

    const handleClick = () => {
        const params: Record<string, string | number> = { step: target };
        clearParams.forEach((param) => {
            params[param] = "";
        });
        updateParams(params);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={
                className ||
                "inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
            }
        >
            {label}
        </button>
    );
};
