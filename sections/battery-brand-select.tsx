"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { BatteryList } from "@/constants/Batteries";

const brandOptions = [
    {
        id: "Sungrow",
        label: "Sungrow",
        image: "/brand_images/sungrow.webp",
    },
    {
        id: "GoodWe",
        label: "GoodWe",
        image: "/brand_images/goodwe.png",
    },
    {
        id: "Anker",
        label: "Anker",
        image: "/brand_images/anker.png",
    },
    {
        id: "Tesla",
        label: "Tesla",
        image: "/brand_images/tesla.png",
    },
    {
        id: "Sigenenergy",
        label: "Sig Energy",
        image: "/brand_images/sig-energy.webp",
    },
    {
        id: "Bluetti",
        label: "Bluetti",
        image: "/brand_images/bluetti.jpg",
    },
];

const BatteryBrandSelect = () => {
    const searchParams = useSearchParams();
    const urlBrand = searchParams.get("brand") || "";
    const [selectedBrand, setSelectedBrand] = useState(urlBrand);
    const currentStep = searchParams.get("step") || "";
    const tier = searchParams.get("tier") || "";

    const uniqueBrands = Array.from(
        new Set(BatteryList.filter((b) => b.tier === tier).map((b) => b.brand)),
    );

    const filteredBrands = brandOptions.filter((option) =>
        uniqueBrands.includes(option.id),
    );

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select your preferred brand"
                description="Choose the battery brand that best fits your needs."
            />
            <div className={`flex flex-row items-center justify-center gap-2`}>
                {filteredBrands.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={selectedBrand === option.id}
                        onClick={() => setSelectedBrand(option.id)}
                        icon={
                            <img
                                src={option.image}
                                alt={option.label}
                                className="h-20 w-full object-contain rounded-2xl border-2 border-slate-200 bg-white p-1"
                            />
                        }
                        label={option.label}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BackButton
                    target={parseInt(currentStep) - 1}
                    clearParams={["brand"]}
                />
                <ContinueButton
                    target={parseInt(currentStep) + 1}
                    disabled={!selectedBrand}
                    params={{ brand: selectedBrand }}
                />
            </div>
        </section>
    );
};

export default BatteryBrandSelect;
