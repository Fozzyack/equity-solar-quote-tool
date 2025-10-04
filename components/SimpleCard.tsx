interface SimpleCardProps {
    selected: boolean;
    onClick: () => void;
    label: string;
}

export const SimpleCard = ({ selected, onClick, label }: SimpleCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative flex h-full flex-col items-center gap-3 rounded-2xl border-2 px-5 py-6 text-sm font-bold uppercase tracking-wide text-center transition ${
                selected
                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
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
            <span>{label}</span>
        </button>
    );
};
