import { SolarPanel } from "@/constants/SolarPanels";

interface SolarPanelCardProps {
    panel: SolarPanel;
}

export const SolarPanelCard = ({ panel }: SolarPanelCardProps) => {
    return (
        <article
            tabIndex={0}
            className="group relative flex h-full flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg focus:outline-none focus-visible:-translate-y-1 focus-visible:border-yellow-400 focus-visible:shadow-lg"
        >
            <header className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {panel.brandLabel} · {panel.modelRange}
                </p>
                <h3 className="text-lg font-bold">{panel.headline}</h3>
                <p className="text-sm font-semibold text-slate-600">
                    Output range: {panel.wattageRange}
                </p>
            </header>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Hover or focus for strengths & considerations
            </p>
            <div className="hidden gap-4 pt-2 text-sm group-hover:grid group-focus:grid sm:grid-cols-2">
                <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                        Strengths
                    </h4>
                    <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                        {panel.strengths.map((strength) => (
                            <li key={strength} className="flex gap-2">
                                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                <span>{strength}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                        Considerations
                    </h4>
                    <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                        {panel.considerations.map((consideration) => (
                            <li key={consideration} className="flex gap-2">
                                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-slate-300" />
                                <span>{consideration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-yellow-400 opacity-0 transition duration-200 group-hover:opacity-100 group-focus:opacity-100" />
        </article>
    );
};
