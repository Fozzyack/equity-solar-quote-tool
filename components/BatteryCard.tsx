import { BatteryProduct } from "@/constants/Batteries";

interface BatteryCardProps {
    battery: BatteryProduct;
    selected: boolean;
    onClick: () => void;
}

export const BatteryCard = ({ battery, selected, onClick }: BatteryCardProps) => {
    return (
        <button
            type="button"
            aria-pressed={selected}
            className={`relative flex h-full flex-col gap-4 rounded-2xl border-2 p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
                selected
                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
                    : "border-slate-200 bg-slate-50 text-slate-900 hover:border-yellow-300 hover:bg-yellow-50"
            }`}
            onClick={onClick}
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
            {battery.image ? (
                <div className="flex h-32 w-full items-center bg-white justify-center rounded-xl border border-slate-300">
                    <img
                        src={battery.image}
                        alt={battery.module}
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
                    {battery.module}
                </p>
                <h2 className="text-lg font-bold leading-tight">
                    {battery.brand}
                </h2>
                <p className="text-sm font-semibold text-slate-600">
                    {battery.sizeKwh} kWh
                </p>
            </div>
        </button>
    );
};
