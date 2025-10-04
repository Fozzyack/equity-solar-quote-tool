"use client";
import { useUserChoiceContext } from "@/contexts/UserChoiceContext";
import { SimpleCard } from "@/components/SimpleCard";

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
                    If you already have a target size, choose it here—otherwise
                    pick “Not sure”.
                </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                {preferredSizeOptions.map((option) => (
                    <SimpleCard
                        key={option.id}
                        selected={preferredSystemSize === option.id}
                        onClick={() => setPreferredSystemSize(option.id)}
                        label={option.label}
                    />
                ))}
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
