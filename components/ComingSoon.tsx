import { useUpdateParams } from "@/lib/useUpdateParams";

const ComingSoon = () => {
    const updateParams = useUpdateParams();
    return (
        <section className="space-y-6 rounded-3xl border-2 border-slate-200 bg-slate-50 px-8 py-10 shadow-md">
            <h2 className="text-2xl font-bold">Configurator coming soon</h2>
            <p className="mx-auto max-w-xl text-sm font-semibold text-slate-500">
                We are polishing this step right now.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() =>
                        updateParams({
                            step: 0,
                            solution: "",
                            tier: "",
                            battery: "",
                            existingSystem: "",
                            systemSize: "",
                        })
                    }
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back to systems
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-slate-700"
                >
                    Download overview
                </button>
            </div>
        </section>
    );
};

export default ComingSoon;
