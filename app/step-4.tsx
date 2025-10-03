import { useUserChoiceContext } from "@/contexts/UserChoiceContext";

const preferredSizeOptions = [
    { id: "6.4kw", label: "6.4kW" },
    { id: "7.48kw", label: "7.48kW" },
    { id: "10kw", label: "10kW" },
    { id: "13kw", label: "13kW" },
    { id: "not-sure", label: "Not sure" },
];

const Step4 = () => {
    const { preferredSystemSize, setPreferredSystemSize, setStep } =
        useUserChoiceContext();

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 4
                </p>
                <h2 className="text-2xl font-bold">Preferred system size</h2>
                <p className="text-sm text-slate-500">
                    If you already have a target size, choose it here—otherwise pick “Not sure”.
                </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                {preferredSizeOptions.map((option) => {
                    const selected = preferredSystemSize === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setPreferredSystemSize(option.id)}
                            className={`flex h-full flex-col items-center gap-3 rounded-2xl border-2 px-5 py-6 text-sm font-bold uppercase tracking-wide text-center transition ${
                                selected
                                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-[0_16px_30px_-18px_rgba(234,179,8,0.6)]"
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
                    onClick={() => setStep(3)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => setStep(5)}
                    disabled={!preferredSystemSize}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </section>
    );
};

export default Step4;
