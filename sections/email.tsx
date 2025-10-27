"use client";

import { FormEvent, useState } from "react";
import { sendEmail } from "@/lib/emailjs";
import { BatteryProduct } from "@/constants/Batteries";
import { SolarPanel } from "@/constants/SolarPanels";
import { Inverter } from "@/constants/Inverters";
import { ComboProduct } from "@/constants/ComboList";

interface EmailProps {
    battery?: BatteryProduct;
    panel?: SolarPanel;
    inverter?: Inverter;
    combo?: ComboProduct;
    systemSize?: string;
    price?: number;
    startLoadingState: () => void;
    finishLoadingState: () => void;
    onSubmitSuccess?: () => void;
}

const Email = ({
    battery,
    panel,
    inverter,
    combo,
    systemSize,
    price,
    onSubmitSuccess,
    startLoadingState,
    finishLoadingState,
}: EmailProps) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLoadingState();
        if (!acceptedTerms) {
            setShowTermsError(true);
            return;
        }

        let lookingAt = "";
        if (battery) {
            lookingAt =
                "Battery: " +
                battery.brand +
                " " +
                battery.sizeKwh +
                "kWh " +
                battery.module;
        } else if (combo) {
            lookingAt =
                "Combo System: " +
                combo.brand +
                " - " +
                combo.batterySizeKwh +
                "kWh Battery + " +
                combo.solarSizeKw +
                "kW Solar (" +
                combo.batteryModule +
                " / " +
                combo.solarPanel +
                " / " +
                combo.inverter +
                ") - Retail: $" +
                combo.retailPrice;
        } else if (panel && inverter && systemSize) {
            lookingAt =
                "Solar System: " +
                systemSize +
                "kW with " +
                panel.brandLabel +
                " " +
                panel.modelRange +
                " and " +
                inverter.brandLabel +
                " " +
                inverter.modelRange +
                (price ? " - $" + price : "");
        }
        console.log(lookingAt);

        sendEmail(email, message, lookingAt);
        setSubmitted(true);
        setEmail("");
        setMessage("");
        setAcceptedTerms(false);
        setShowTermsError(false);

        if (onSubmitSuccess) {
            onSubmitSuccess();
            finishLoadingState();
        }
    };

    return (
        <section className="flex h-full flex-col gap-6 rounded-3xl bg-yellow-400 px-6 py-6 text-left text-slate-900 shadow-2xl md:px-8 md:py-8">
            <header className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-900/70">
                    Equity Solar
                </p>
                <h3 className="text-2xl font-extrabold leading-tight">
                    Unlock your System Price
                </h3>
                <p className="text-sm font-medium text-slate-900/85">
                    Share your contact info so we can send full pricing, specs,
                    and installation guidance for your chosen system. It’s
                    absolutely free.
                </p>
            </header>
            <div className="mt-2 flex-1">
                {submitted ? (
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-yellow-200 bg-white/85 px-4 py-6 text-center text-sm font-semibold text-slate-900 shadow-inner">
                        Thanks! An Equity Solar specialist will reach out with
                        your detailed quote shortly.
                    </div>
                ) : (
                    <form
                        className="flex h-full flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
                        <label className="flex flex-col gap-2 text-left text-sm font-bold uppercase tracking-wide">
                            Email address
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-transparent bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                            />
                        </label>
                        <label className="flex flex-col gap-2 text-left text-sm font-bold uppercase tracking-wide">
                            Optional message
                            <textarea
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                placeholder="Let us know how we can help"
                                rows={3}
                                className="w-full rounded-2xl border border-transparent bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                            />
                        </label>
                        <label className="flex items-start gap-3 rounded-2xl bg-yellow-300/50 px-4 py-3 text-left text-xs font-semibold leading-relaxed text-slate-900">
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(event) => {
                                    setAcceptedTerms(event.target.checked);
                                    setShowTermsError(false);
                                }}
                                className="mt-1 h-4 w-4 rounded border-slate-700 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/40"
                            />
                            <span>
                                I agree and understand
                                that I may receive follow-up updates, offers, or
                                educational materials about solar solutions. I
                                can opt out of marketing at any time.
                            </span>
                        </label>
                        {showTermsError && (
                            <p className="text-xs font-bold uppercase tracking-wide text-red-800">
                                Please agree to the terms before continuing.
                            </p>
                        )}
                        <div className="mt-auto space-y-3">
                            {acceptedTerms ? (
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-bold uppercase tracking-wide text-yellow-200 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-700/40"
                                >
                                    View my free quote
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900/60 px-9 py-3 text-sm font-bold uppercase tracking-wide text-yellow-400 transition focus:outline-none focus:ring-4 focus:ring-slate-700/40"
                                >
                                    View my free quote
                                </button>
                            )}
                            <p className="text-center text-xs font-semibold text-slate-900/75">
                                Your quote stays private and always costs $0. No
                                obligation.
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Email;
