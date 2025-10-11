"use client";

import { useMemo, useState } from "react";
import { BatteryList } from "@/constants/Batteries";
import { BackButton } from "@/components/BackButton";
import { InTouchHeader } from "@/components/InTouchHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import Email from "@sections/email";

const currencyFormatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
});

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
                <SectionHeader
                    step={7}
                    title="Battery summary unavailable"
                    description="Please head back and choose a battery to see its full details."
                />
                <BackButton target={2} label="Back to batteries" />
            </section>
        );
    }

    if (emailLoading) {
        return (
            <section className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex gap-4 items-center justify-center">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-300 animate-spin dark:text-gray-300 fill-yellow-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <p> Sending Email ... </p>
                    </div>
                </div>
            </section>
        );
    }

    // Show email form first, battery details only after submission
    if (!emailSubmitted) {
        return (
            <section className="space-y-8">
                <div className="text-center">
                    <SectionHeader
                        step={3}
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
                    <BackButton target={2} label="Back to batteries" />
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
                <BackButton target={2} label="Back to batteries" />
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
