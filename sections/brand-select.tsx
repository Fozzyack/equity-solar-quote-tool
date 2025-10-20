"use client";

import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BackButton } from "@/components/BackButton";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

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
        id: "Sig Energy",
        label: "Sig Energy",
        image: "/brand_images/sig-energy.webp",
    },
];

const BrandSelect = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    const brand = searchParams.get("brand") || "";
    const currentStep = searchParams.get("step") || "";

    return (
        <section className="space-y-8">
            <SectionHeader
                title="Select your preferred brand"
                description="Choose the battery and solar brand for your combo system."
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {brandOptions.map((option) => (
                    <OptionCard
                        key={option.id}
                        selected={brand === option.id}
                        onClick={() => updateParams({ brand: option.id })}
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
                    disabled={!brand}
                />
            </div>
        </section>
    );
};

export default BrandSelect;
