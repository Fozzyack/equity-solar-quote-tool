"use client";
import { useUserChoiceContext } from "@/contexts/UserChoiceContext";

const houseStoriesOptions = [
    { id: "single", label: "Single" },
    { id: "double", label: "Double" },
    { id: "multi", label: "Multi" },
];

const Step5 = () => {
    const { houseStories, setHouseStories, setStep } = useUserChoiceContext();

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 5
                </p>
                <h2 className="text-2xl font-bold">Home layout</h2>
                <p className="text-sm text-slate-500">
                    How many stories does your home have?
                </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                {houseStoriesOptions.map((option) => {
                    const selected = houseStories === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setHouseStories(option.id)}
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
                    onClick={() => setStep(4)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => setStep(6)}
                    disabled={!houseStories}
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                    Continue
                </button>
            </div>
        </section>
    );
};

export default Step5;
