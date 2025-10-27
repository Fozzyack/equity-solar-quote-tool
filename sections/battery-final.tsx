"use client";

import { useMemo, useState } from "react";
import { BatteryList } from "@/constants/Batteries";
import { BackButton } from "@/components/BackButton";
import { InTouchHeader } from "@/components/InTouchHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import Email from "@sections/email";
import { formatCurrency } from "@/lib/currency";
import LoadingEmail from "@/components/LoadingEmail";
import EquitySolarButton from "@/components/EquitySolarButton";

const BatteryFinal = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const batteryId = searchParams.get("battery") || "";
    const battery = batteryId
        ? BatteryList.find((b) => b.id === batteryId)
        : undefined;
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const batteryDetails = useMemo(() => {
        if (!battery) {
            return [];
        }
        return [
            { label: "Brand", value: battery.brand },
            battery.series
                ? { label: "Series", value: battery.series }
                : undefined,
            { label: "Capacity", value: `${battery.sizeKwh} kWh` },
            { label: "Inverter", value: battery.inverter },
            { label: "System Type", value: battery.systemType },
            { label: "Phase", value: battery.phase },
            {
                label: "Estimated Retail Price",
                value: formatCurrency(battery.price),
            },
            {
                label: "Government Rebate",
                value: formatCurrency(battery.rebate),
            },
            {
                label: "Net Price",
                value: formatCurrency(battery.price - battery.rebate),
            },
        ].filter(Boolean) as { label: string; value: string }[];
    }, [battery]);

    if (!battery) {
        return (
            <section className="space-y-6">
                <SectionHeader
                    title="Battery summary unavailable"
                    description="Please head back and choose a battery to see its full details."
                />
                <BackButton target={2} label="Back to batteries" />
            </section>
        );
    }

    if (emailLoading) {
        return <LoadingEmail />;
    }

    // Show email form first, battery details only after submission
    if (!emailSubmitted) {
        return (
            <section className="space-y-8">
                <div className="text-center">
                    <SectionHeader
                        title="Submit your details"
                        description="Enter your email to view detailed pricing and specifications for your selected battery. We'll send you a personalized quote."
                    />
                </div>

                <div className="mx-auto max-w-md">
                    <Email
                        battery={battery}
                        onSubmitSuccess={() => setEmailSubmitted(true)}
                        startLoadingState={() => setEmailLoading(true)}
                        finishLoadingState={() => setEmailLoading(false)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <BackButton
                        target={2}
                        label="Back to batteries"
                        clearParams={["battery"]}
                    />
                </div>
            </section>
        );
    }

    // After email submission, show battery details
    return (
        <section className="space-y-8">
            <InTouchHeader />

            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white px-6 py-7 text-left shadow-md md:px-8 md:py-9">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex-1 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            Selected battery
                        </p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {battery.module}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500">
                            {battery.brand}
                            {battery.series
                                ? ` • ${battery.series} series`
                                : ""}
                        </p>
                    </div>
                    {battery.image && (
                        <div className="flex h-36 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 sm:h-40 sm:w-48">
                            <img
                                src={battery.image}
                                alt={battery.module}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {batteryDetails.map((detail) => (
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
                    target={2}
                    label="Back to batteries"
                    clearParams={["battery"]}
                />
                <button
                    type="button"
                    onClick={() => {
                        updateParams({ battery: "", step: 0 });
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-slate-700"
                >
                    Start over
                </button>
            </div>
            <EquitySolarButton />
        </section>
    );
};

export default BatteryFinal;
