"use client";

import { useMemo, useState } from "react";
import { SolarPanelList } from "@/constants/SolarPanels";
import { InverterList } from "@/constants/Inverters";
import { getSolarPrice } from "@/constants/Pricing";
import { BackButton } from "@/components/BackButton";
import { InTouchHeader } from "@/components/InTouchHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";
import Email from "@sections/email";
import { formatCurrency } from "@/lib/currency";
import LoadingEmail from "@/components/LoadingEmail";

const PanelFinal = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const systemSize = searchParams.get("systemSize") || "";
    const panelId = searchParams.get("panelBrand") || "";
    const inverterId = searchParams.get("inverterBrand") || "";

    const panel = panelId
        ? SolarPanelList.find((p) => p.id === panelId)
        : undefined;
    const inverter = inverterId
        ? InverterList.find((i) => i.id === inverterId)
        : undefined;

    const price =
        systemSize === "unknown"
            ? null
            : getSolarPrice(systemSize, panelId, inverterId);

    const [emailLoading, setEmailLoading] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const systemDetails = useMemo(() => {
        if (!panel || !inverter) {
            return [];
        }
        return [
            systemSize !== "unknown"
                ? { label: "System Size", value: `${systemSize} kW` }
                : undefined,
            { label: "Panel Brand", value: panel.brandLabel },
            { label: "Panel Model", value: panel.modelRange },
            { label: "Inverter Brand", value: inverter.brandLabel },
            { label: "Inverter Model", value: inverter.modelRange },
            price
                ? {
                      label: "Retail Price",
                      value: formatCurrency(price),
                  }
                : undefined,
        ].filter(Boolean) as { label: string; value: string }[];
    }, [panel, inverter, price, systemSize]);

    if (!panel || !inverter) {
        return (
            <section className="space-y-6">
                <SectionHeader
                    title="System summary unavailable"
                    description="Please head back and choose a system to see its full details."
                />
                <BackButton target={2} label="Back to panels" />
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
                        description="Enter your email to view detailed pricing and specifications for your selected solar system. We'll send you a personalized quote."
                    />
                </div>

                <div className="mx-auto max-w-md">
                    <Email
                        panel={panel}
                        inverter={inverter}
                        systemSize={systemSize}
                        price={price ?? undefined}
                        onSubmitSuccess={() => setEmailSubmitted(true)}
                        startLoadingState={() => setEmailLoading(true)}
                        finishLoadingState={() => setEmailLoading(false)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={4}
                    label="Back to inverters"
                    clearParams={["inverterBrand"]}
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
                            Selected solar system
                        </p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {systemSize !== "unknown"
                                ? `${systemSize} kW Solar System`
                                : "Solar System"}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500">
                            {panel.brandLabel} • {inverter.brandLabel}
                        </p>
                    </div>
                    {panel.image && (
                        <div className="flex h-36 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 sm:h-40 sm:w-48">
                            <img
                                src={panel.image}
                                alt={panel.modelRange}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                    {inverter.image && (
                        <div className="flex h-36 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 sm:h-40 sm:w-48">
                            <img
                                src={inverter.image}
                                alt={inverter.modelRange}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    {systemDetails.map((detail) => (
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
                <BackButton target={4} label="Back to inverters" />
                <button
                    type="button"
                    onClick={() => {
                        updateParams({
                            systemSize: "",
                            panelBrand: "",
                            inverterBrand: "",
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

export default PanelFinal;
