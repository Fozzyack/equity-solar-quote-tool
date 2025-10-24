"use client";

import { useMemo, useState } from "react";
import { ComboList } from "@/constants/ComboList";
import { BackButton } from "@/components/BackButton";
import { InTouchHeader } from "@/components/InTouchHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import Email from "@sections/email";
import { formatCurrency } from "@/lib/currency";
import LoadingEmail from "@/components/LoadingEmail";

const ComboFinal = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const currentStep = searchParams.get("step") || "";
    const comboId = searchParams.get("combo") || "";
    const combo = comboId ? ComboList.find((c) => c.id === comboId) : undefined;
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const comboDetails = useMemo(() => {
        if (!combo) {
            return [];
        }
        return [
            { label: "Brand", value: combo.brand },
            { label: "Battery Module", value: combo.batteryModule },
            { label: "Battery Size", value: `${combo.batterySizeKwh} kWh` },
            { label: "Solar Size", value: `${combo.solarSizeKw} kW` },
            { label: "Solar Panel", value: combo.solarPanel },
            { label: "Inverter", value: combo.inverter },
            {
                label: "Phase",
                value: combo.phase === 1 ? "Single Phase" : "Three Phase",
            },
            {
                label: "Retail Price",
                value: formatCurrency(combo.retailPrice),
            },
        ];
    }, [combo]);

    if (!combo) {
        return (
            <section className="space-y-6">
                <SectionHeader
                    title="Combo system summary unavailable"
                    description="Please head back and choose a combo system to see its full details."
                />
                <BackButton target={3} label="Back to combos" />
            </section>
        );
    }

    if (emailLoading) {
        return <LoadingEmail />;
    }

    if (!emailSubmitted) {
        return (
            <section className="space-y-8">
                <div className="text-center">
                    <SectionHeader
                        title="Submit your details"
                        description="Enter your email to view detailed pricing and specifications for your selected combo system. We'll send you a personalized quote."
                    />
                </div>

                <div className="mx-auto max-w-md">
                    <Email
                        combo={combo}
                        onSubmitSuccess={() => setEmailSubmitted(true)}
                        startLoadingState={() => setEmailLoading(true)}
                        finishLoadingState={() => setEmailLoading(false)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <BackButton
                        target={parseInt(currentStep) - 1}
                        label="Back to combos"
                        clearParams={["combo"]}
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-8">
            <InTouchHeader />

            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-7 text-left shadow-md md:px-8 md:py-9">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex-1 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            Selected combo system
                        </p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {combo.batteryModule}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500">
                            {combo.brand} • {combo.batterySizeKwh} kWh Battery +{" "}
                            {combo.solarSizeKw} kW Solar
                        </p>
                    </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {comboDetails.map((detail) => (
                        <div
                            key={detail.label}
                            className="space-y-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                        >
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                                {detail.label}
                            </p>
                            <p className="text-sm font-semibold text-slate-800">
                                {detail.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    label="Back to combos"
                    clearParams={["combo"]}
                />
                <button
                    type="button"
                    onClick={() => {
                        updateParams({
                            combo: "",
                            brand: "",
                            phase: "",
                            step: 0,
                        });
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-slate-700"
                >
                    Start over
                </button>
            </div>
        </section>
    );
};

export default ComboFinal;
