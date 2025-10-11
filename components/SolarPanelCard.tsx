import { SolarPanel } from "@/constants/SolarPanels";

interface SolarPanelCardProps {
    panel: SolarPanel;
    selected: boolean;
    onClick: () => void;
}

export const SolarPanelCard = ({
    panel,
    selected,
    onClick,
}: SolarPanelCardProps) => {
    return (
        <div className="group relative h-full">
            <button
                type="button"
                aria-pressed={selected}
                className={`relative flex h-full w-full flex-col gap-4 rounded-2xl border-2 p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
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
                {panel.image ? (
                    <div className="flex h-32 w-full items-center bg-white justify-center rounded-xl border border-slate-300">
                        <img
                            src={panel.image}
                            alt={panel.modelRange}
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
                        {panel.brandLabel}
                    </p>
                    <h2 className="text-lg font-bold leading-tight">
                        {panel.modelRange}
                    </h2>
                    <p className="text-sm font-semibold text-slate-600">
                        {panel.wattageRange}
                    </p>
                </div>
            </button>

            <div className="pointer-events-none absolute left-full top-0 z-50 ml-4 w-80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                <div className="flex flex-col gap-4 rounded-2xl border-2 border-yellow-500 bg-yellow-400 p-5 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.25)]">
                    <div className="space-y-2 border-b border-yellow-200 pb-2">
                        <div className="py-2 px-4 bg-black rounded-full">
                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-yellow-500">
                                {panel.brandLabel}
                            </p>
                        </div>
                        <h3 className="text-xl font-extrabold leading-tight">
                            {panel.modelRange}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900/75">
                            {panel.wattageRange}
                        </p>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="rounded-xl bg-yellow-200 px-3 py-2 text-xs font-semibold leading-relaxed text-slate-900">
                            {panel.headline}
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wide">
                                Strengths
                            </p>
                            <ul className="space-y-2 text-xs leading-relaxed text-slate-900/85">
                                {panel.strengths.map((strength) => (
                                    <li key={strength} className="flex gap-2">
                                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900/70" />
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-wide">
                                Considerations
                            </p>
                            <ul className="space-y-2 text-xs leading-relaxed text-slate-900/85">
                                {panel.considerations.map((consideration) => (
                                    <li
                                        key={consideration}
                                        className="flex gap-2"
                                    >
                                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-900/70" />
                                        <span>{consideration}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
