"use client";

import { useMemo, useState } from "react";
import { BatteryProduct, BatteryList } from "@/constants/Batteries";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import Email from "./email";

const currencyFormatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
});

const BatteryFinal = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const batteryId = searchParams.get("battery") || "";
    const battery = batteryId ? BatteryList.find(b => b.id === batteryId) : undefined;
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
                label: "Retail Price",
                value: currencyFormatter.format(battery.price),
            },
            {
                label: "Government Rebate",
                value: currencyFormatter.format(battery.rebate),
            },
            {
                label: "Indicative Price",
                value: currencyFormatter.format(battery.price - battery.rebate),
            },
        ].filter(Boolean) as { label: string; value: string }[];
    }, [battery]);

    if (!battery) {
        return (
            <section className="space-y-6">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Step 7
                    </p>
                    <h2 className="text-2xl font-bold">
                        Battery summary unavailable
                    </h2>
                    <p className="text-sm text-slate-500">
                        Please head back and choose a battery to see its full
                        details.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => updateParams({ step: 6 })}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back to batteries
                </button>
            </section>
        );
    }

    // Show email form first, battery details only after submission
    if (!emailSubmitted) {
        return (
            <section className="space-y-8">
                <div className="space-y-1 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Step 7
                    </p>
                    <h2 className="text-2xl font-bold">Submit your details</h2>
                    <p className="mx-auto max-w-xl text-sm text-slate-500">
                        Enter your email to view detailed pricing and specifications for your selected battery. We'll send you a personalized quote.
                    </p>
                </div>

                <div className="mx-auto max-w-md">
                    <Email battery={battery} onSubmitSuccess={() => setEmailSubmitted(true)} />
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => updateParams({ step: 6 })}
                        className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                    >
                        Back to batteries
                    </button>
                </div>
            </section>
        );
    }

    // After email submission, show battery details
    return (
        <section className="space-y-8">
            <div className="space-y-1 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 7
                </p>
                <h2 className="text-2xl font-bold">Battery summary</h2>
                <p className="text-sm text-slate-500">
                    Here are the details for your selected battery. A specialist will be in touch shortly.
                </p>
            </div>
            <div className="grid w-full gap-8 md:grid-cols-2 lg:gap-12">
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

                <div className="flex h-full flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-7 text-left shadow-md md:px-8 md:py-9">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            What's next?
                        </p>
                        <h3 className="text-xl font-bold text-slate-900">We'll be in touch soon</h3>
                        <p className="text-sm text-slate-600">
                            A specialist from Equity Solar will reach out with a detailed quote and answer any questions you have about this battery system.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => updateParams({ step: 6 })}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back to batteries
                </button>
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
        </section>
    );
};

export default BatteryFinal;
