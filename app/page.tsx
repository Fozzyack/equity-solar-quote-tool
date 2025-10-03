"use client";
import Image from "next/image";
import { useState } from "react";

import { UserChoiceContext } from "@/contexts/UserChoiceContext";
import Step0 from "./step-0";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import Step5 from "./step-5";
import Batteries from "./step-6-battery";
import Step7Battery from "./step-7-battery";
import Link from "next/link";
import { BatteryProduct } from "@/constants/Batteries";

export default function Home() {
    const [step, setStep] = useState<number>(0);
    const [solution, setSolution] = useState<string>("");
    const [tier, setTier] = useState<string>("");
    const [averageBill, setAverageBill] = useState<string>("");
    const [existingSystem, setExistingSystem] = useState<string>("");
    const [preferredSystemSize, setPreferredSystemSize] = useState<string>("");
    const [houseStories, setHouseStories] = useState<string>("");
    const [battery, setBattery] = useState<BatteryProduct | undefined>();

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 text-slate-900">
            <div
                className={`w-full md:px-20 lg:px-40 space-y-10 text-center ${step >= 6 ? "max-w-7xl" : "max-w-6xl"}`}
            >
                <div className="flex flex-col items-center space-y-5">
                    <div className="relative h-36 w-36 sm:h-48 sm:w-48">
                        <Image
                            src="/eqSolarLogo.jpg"
                            alt="Equity Solar Logo"
                            fill
                            priority
                            className="rounded-3xl object-contain"
                        />
                    </div>
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                            Equity Solar
                        </p>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Build Your Quote
                        </h1>
                        <p className="mx-auto max-w-sm text-sm font-medium text-slate-500">
                            Pick your system to get started.
                        </p>
                    </div>
                </div>

                <UserChoiceContext.Provider
                    value={{
                        step,
                        setStep,
                        solution,
                        setSolution,
                        tier,
                        setTier,
                        averageBill,
                        setAverageBill,
                        existingSystem,
                        setExistingSystem,
                        preferredSystemSize,
                        setPreferredSystemSize,
                        houseStories,
                        setHouseStories,
                        battery,
                        setBattery,
                    }}
                >
                    <main className="space-y-10">
                        {step === 0 && <Step0 />}
                        {step === 1 && <Step1 />}
                        {step === 2 && <Step2 />}
                        {step === 3 && <Step3 />}
                        {step === 4 && <Step4 />}
                        {step === 5 && <Step5 />}
                        {step === 6 && solution === "battery" && <Batteries />}
                        {step === 6 && solution !== "battery" && (
                            <section className="space-y-6 rounded-3xl border-2 border-slate-200 bg-slate-50 px-8 py-10 shadow-md">
                                <h2 className="text-2xl font-bold">
                                    Configurator coming soon
                                </h2>
                                <p className="mx-auto max-w-xl text-sm font-semibold text-slate-500">
                                    We are polishing this step right now.
                                </p>
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setStep(0)}
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
                        )}
                        {step === 7 && solution === "battery" && (
                            <Step7Battery />
                        )}
                    </main>
                </UserChoiceContext.Provider>
                <div className="flex items-center justify-center">
                    <Link href="https://equitysolar.com.au">
                        <div className="px-4 py-2 rounded-full hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500 border border-slate-300 group transition-all duration-150 ease-in-out">
                            <p className="font-bold">
                                Go Back to{" "}
                                <span className="text-yellow-500">
                                    Equity Solar
                                </span>
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
