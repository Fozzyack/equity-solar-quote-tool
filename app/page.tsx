"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Step0 from "./step-0";
import Step1 from "./step-1";
import Batteries from "./battery-list";
import BatteryFinal from "./battery-final";
import Link from "next/link";
import { BatteryProduct, BatteryList } from "@/constants/Batteries";
import { useUpdateParams } from "@/lib/useUpdateParams";

function HomeContent() {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();

    // Read state from URL params
    const step = parseInt(searchParams.get("step") || "0");
    const solution = searchParams.get("solution") || "";
    const tier = searchParams.get("tier") || "";
    const batteryId = searchParams.get("battery") || "";
    const battery = batteryId ? BatteryList.find(b => b.id === batteryId) : undefined;

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
                            Solar Cost Estimator
                        </h1>
                        <p className="mx-auto max-w-sm text-sm font-medium text-slate-500">
                            Pick your system to get started.
                        </p>
                    </div>
                </div>

                <main className="space-y-10">
                    {step === 0 && (
                        <Step0
                            solution={solution}
                            updateParams={updateParams}
                        />
                    )}
                    {step === 1 && solution === "battery" && (
                        <Step1
                            solution={solution}
                            tier={tier}
                            updateParams={updateParams}
                        />
                    )}
                    {step === 6 && solution === "battery" && (
                        <Batteries
                            tier={tier}
                            battery={battery}
                            updateParams={updateParams}
                        />
                    )}
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
                                    onClick={() => updateParams({ step: 0 })}
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
                        <BatteryFinal
                            battery={battery}
                            updateParams={updateParams}
                        />
                    )}
                </main>
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

export default function Home() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white">Loading...</div>}>
            <HomeContent />
        </Suspense>
    );
}
