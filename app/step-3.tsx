"use client";
import { useUserChoiceContext } from "@/contexts/UserChoiceContext";

const existingSystemOptions = [
    { id: "no-solar", label: "Don't have solar" },
    { id: "need-more-panels", label: "Need more panels" },
    { id: "replace-system", label: "Replace system" },
];

const Step3 = () => {
    const { existingSystem, setExistingSystem, setStep } =
        useUserChoiceContext();

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 3
                </p>
                <h2 className="text-2xl font-bold">Existing system</h2>
                <p className="text-sm text-slate-500">
                    Tell us where you are starting from so we can tailor the
                    quote.
                </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                {existingSystemOptions.map((option) => {
                    const selected = existingSystem === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setExistingSystem(option.id)}
                            className={`flex h-full flex-col items-center gap-3 rounded-2xl border-2 px-5 py-6 text-sm font-bold uppercase tracking-wide text-center transition ${
                                selected
                                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-lg"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-yellow-300 hover:bg-yellow-50"
                            }`}
                        >
                            <span>{option.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => setStep(4)}
                    disabled={!existingSystem}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </section>
    );
};

export default Step3;
