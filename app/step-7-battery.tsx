"use client";

import { FormEvent, useMemo, useState } from "react";
import { useUserChoiceContext } from "@/contexts/UserChoiceContext";
import { sendEmail } from "@/lib/emailjs";

const currencyFormatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
});

const Step7Battery = () => {
    const { battery, setBattery, setStep } = useUserChoiceContext();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

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
                    onClick={() => setStep(6)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back to batteries
                </button>
            </section>
        );
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const lookingAt =
            "Battery: " +
            battery.brand +
            " " +
            battery.sizeKwh +
            "kWh " +
            battery.module +
            battery.sizeKwh;
        console.log(lookingAt);

        sendEmail(email, message, lookingAt);
        setSubmitted(true);
        setEmail("");
        setMessage("");
    };

    return (
        <section className="space-y-8">
            <div className="space-y-1 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step 7
                </p>
                <h2 className="text-2xl font-bold">Battery summary</h2>
                <p className="text-sm text-slate-500">
                    Review the details for your selected battery. We will follow
                    up shortly, or drop your email below if you need a hand
                    sooner.
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
                                a
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

                <div className="flex h-full flex-col gap-6 rounded-3xl bg-yellow-400 px-6 py-6 text-left shadow-lg md:px-8 md:py-8">
                    <div className="space-y-2 text-slate-900">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900/70">
                            Need help?
                        </p>
                        <h3 className="text-xl font-extrabold">
                            Leave your email
                        </h3>
                        <p className="text-sm font-semibold text-slate-900/80">
                            Share your email and we will reach out with tailored
                            advice or next steps.
                        </p>
                    </div>
                    <div className="text-slate-900">
                        {submitted ? (
                            <div className="rounded-2xl bg-white/85 px-4 py-3 text-sm font-bold text-slate-900 shadow-inner">
                                Thanks! A specialist will be in touch soon.
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <label className="block text-left text-sm font-extrabold uppercase tracking-wide">
                                    Email address
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="you@example.com"
                                        className="mt-2 w-full rounded-xl border border-transparent bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/30"
                                    />
                                </label>
                                <label className="block text-left text-sm font-extrabold uppercase tracking-wide">
                                    Optional message
                                    <textarea
                                        value={message}
                                        onChange={(event) =>
                                            setMessage(event.target.value)
                                        }
                                        placeholder="Let us know how we can help"
                                        rows={3}
                                        className="mt-2 w-full rounded-xl border border-transparent bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/30"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-slate-800"
                                >
                                    Request help
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => setStep(6)}
                    className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                    Back to batteries
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setBattery(undefined);
                        setStep(0);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-slate-700"
                >
                    Start over
                </button>
            </div>
        </section>
    );
};

export default Step7Battery;
