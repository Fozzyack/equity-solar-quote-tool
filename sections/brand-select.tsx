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
        icon: (
            <svg
                className="h-12 w-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="24"
                    cy="24"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                />
                <path
                    d="M24 12v24M18 18l12 12M30 18L18 30"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        id: "GoodWe",
        label: "GoodWe",
        icon: (
            <svg
                className="h-12 w-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="8"
                    y="12"
                    width="32"
                    height="24"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                />
                <path
                    d="M18 22l4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        id: "Anker",
        label: "Anker",
        icon: (
            <svg
                className="h-12 w-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M24 8L32 16L24 24L16 16L24 8Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
                <path
                    d="M24 24L32 32L24 40L16 32L24 24Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        id: "Tesla",
        label: "Tesla",
        icon: (
            <svg
                className="h-12 w-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 14h24v20H12V14z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                />
                <path
                    d="M18 24h12M24 18v12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        id: "Sig Energy",
        label: "Sig Energy",
        icon: (
            <svg
                className="h-12 w-12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M24 10v28M14 20l10-6 10 6M14 28l10 6 10-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
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
                        icon={option.icon}
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
