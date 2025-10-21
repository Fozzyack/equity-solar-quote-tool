"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import SolutionSelect from "@sections/solution-select";
import PriceRange from "@sections/price-range";
import Batteries from "@sections/battery-list";
import BatteryFinal from "@sections/battery-final";
import Link from "next/link";
import ComingSoon from "@/components/ComingSoon";
import ExistingSystem from "@sections/existing-system";
import SystemSize from "@sections/system-size";
import PanelSelect from "@/sections/panel-list";
import InverterSelect from "@/sections/inverter-list";
import PanelFinal from "@/sections/panel-final";
import PhaseSelect from "@/sections/phase-select";
import ComboList from "@/sections/combo-list";
import BrandSelect from "@/sections/brand-select";
import BatteryBrandSelect from "@/sections/battery-brand-select";
import ComboFinal from "@/sections/combo-final";
import ComboBatterySizeSelect from "@/sections/combo-battery-size-select";

function HomeContent() {
    const searchParams = useSearchParams();

    // Read state from URL params
    const step = parseInt(searchParams.get("step") || "0");
    const solution = searchParams.get("solution") || "";
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 text-slate-900">
            <div
                className={`w-full md:px-20 lg:px-40 space-y-10 text-center ${step >= 6 ? "max-w-7xl" : "max-w-6xl"}`}
            >
                <div className="flex flex-col items-center space-y-5">
                <div className="bg-yellow-400 text-slate-800 font-bold px-6 py-4 rounded-3xl shadow-xl">
                    <p className="uppercase">
                        Currently Under Development
                    </p>
                </div>
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
                    {step === 0 && <SolutionSelect />}

                    {/* SOLAR SECTION */}
                    {step === 1 && solution === "solar-panels" && <ExistingSystem />}
                    {step === 2 && solution === "solar-panels" && <SystemSize />}
                    {step === 3 && solution === "solar-panels" && <PanelSelect/>}
                    {step === 4 && solution === "solar-panels" && <InverterSelect />}
                    {step === 5 && solution === "solar-panels" && <PanelFinal/>}
                    {step >= 6 && solution === "solar-panels" && <ComingSoon />}

                     {/* COMBO */}
                     {step === 1 && solution === "combo" && <BrandSelect />}
                     {step === 2 && solution === "combo" && <ComboBatterySizeSelect />}
                     {step === 3 && solution === "combo" && <PhaseSelect />}
                     {step === 4 && solution === "combo" && <ComboList />}
                     {step === 5 && solution === "combo" && <ComboFinal />}
                     {step >= 6 && solution === "combo" && <ComingSoon />}

                    {/* BATTERY SECTION */}
                    {step === 1 && solution === "battery" && <PriceRange />}
                    {step === 2 && solution === "battery" && <BatteryBrandSelect />}
                    {step === 3 && solution === "battery" && <Batteries />}
                    {step === 4 && solution === "battery" && <BatteryFinal />}
                    {step >= 5 && solution === "battery" && <ComingSoon />}
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
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-white">
                    Loading...
                </div>
            }
        >
            <HomeContent />
        </Suspense>
    );
}
