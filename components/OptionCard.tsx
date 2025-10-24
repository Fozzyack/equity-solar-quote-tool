import { ReactNode } from "react";

interface OptionCardProps {
    selected: boolean;
    onClick: () => void;
    icon?: ReactNode;
    label: string;
    description?: string;
    disabled?: boolean;
}

export const OptionCard = ({
    selected,
    onClick,
    icon,
    label,
    description,
    disabled = false,
}: OptionCardProps) => {
    return (
        <button
            type="button"
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`relative flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 px-6 py-7 text-sm font-bold uppercase tracking-wide transition ${
                selected
                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
                    : disabled
                      ? "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-yellow-300 hover:bg-yellow-50"
            }`}
        >
            <span
                className={`absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-900 bg-white text-slate-900 transition-opacity ${
                    selected ? "opacity-100" : "opacity-0"
                }`}
            >
                <svg
                    className="h-3 w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 8.5l2.5 2.5L12 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            {icon && (
                <span className="transition-colors text-current">{icon}</span>
            )}
            <span>{label}</span>
            {description && (
                <span className="text-xs font-semibold normal-case text-slate-600">
                    {description}
                </span>
            )}
        </button>
    );
};
