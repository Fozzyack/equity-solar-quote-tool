import { ComboProduct } from "@/constants/ComboList";

interface ComboCardProps {
    combo: ComboProduct;
    selected: boolean;
    onClick: () => void;
}

export const ComboCard = ({ combo, selected, onClick }: ComboCardProps) => {
    const brandImages: Record<string, string> = {
        Sungrow: "/brand_images/sungrow.webp",
        GoodWe: "/brand_images/goodwe.png",
        Anker: "/brand_images/anker.png",
        Tesla: "/brand_images/tesla.png",
        "Sig Energy": "/brand_images/sig-energy.webp",
    };

    return (
        <button
            type="button"
            aria-pressed={selected}
            className={`relative flex h-full flex-col gap-5 rounded-2xl border-2 p-6 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
                selected
                    ? "border-yellow-400 bg-yellow-400 text-slate-900 shadow-xl scale-[1.02]"
                    : "border-slate-200 bg-white text-slate-900 hover:border-yellow-300 hover:shadow-lg hover:-translate-y-1"
            }`}
            onClick={onClick}
        >
            <span
                className={`absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-900 bg-white text-slate-900 shadow-sm transition-opacity ${
                    selected ? "opacity-100" : "opacity-0"
                }`}
            >
                <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 8.5l2.5 2.5L12 5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                        <h2 className="text-xl font-extrabold leading-tight">
                            {combo.brand}
                        </h2>
                    </div>
                    {brandImages[combo.brand] && (
                        <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5">
                            <img
                                src={brandImages[combo.brand]}
                                alt={combo.brand}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                </div>
                <div className="space-y-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-600">
                            Battery Size
                        </span>
                        <span className="text-base text-slate-900">
                            {combo.batterySizeKwh} kWh
                        </span>
                    </div>
                    <div className="h-px bg-slate-200"></div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-600">
                            Solar System
                        </span>
                        <span className="text-base text-slate-900">
                            {combo.solarSizeKw} kW
                        </span>
                    </div>
                    <div className="h-px bg-slate-200"></div>
                    <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-600">
                            Inverter
                        </span>
                        <span className="text-right text-sm text-slate-900">
                            {combo.inverter}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
};
