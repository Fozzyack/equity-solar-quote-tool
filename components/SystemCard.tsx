import { ReactNode } from "react";

export type SystemCardProps = {
    title: string;
    icon: ReactNode;
    selected?: boolean;
    onClick: () => void;
};

export function SystemCard({
    title,
    icon,
    selected = false,
    onClick,
}: SystemCardProps) {
    const baseClasses =
        "group relative flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 px-4 py-5 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400";
    const stateClasses = selected
        ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
        : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-yellow-300 hover:bg-yellow-50";
    const iconClasses = selected ? "text-slate-900" : "text-slate-600";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseClasses} ${stateClasses}`}
            aria-pressed={selected}
        >
            <span
                className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-900 bg-white text-slate-900 transition-opacity ${
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
            <div
                className={`flex h-12 w-12 items-center justify-center transition-colors ${iconClasses}`}
            >
                {icon}
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide">
                {title}
            </h3>
        </button>
    );
}
