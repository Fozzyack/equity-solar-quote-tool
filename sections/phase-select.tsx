"use client";

import { OptionCard } from "@/components/OptionCard";
import { ContinueButton } from "@/components/ContinueButton";
import { SectionHeader } from "@/components/SectionHeader";
import { useUpdateParams } from "@/lib/useUpdateParams";
import { useSearchParams } from "next/navigation";

const SinglePhaseIcon = () => (
	<svg
		className="h-12 w-12"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
		<path
			d="M24 8v32"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
		/>
		<circle cx="24" cy="24" r="3" fill="currentColor" />
	</svg>
);

const ThreePhaseIcon = () => (
	<svg
		className="h-12 w-12"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="12" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
		<circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
		<circle cx="36" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
		<circle cx="12" cy="24" r="2" fill="currentColor" />
		<circle cx="24" cy="24" r="2" fill="currentColor" />
		<circle cx="36" cy="24" r="2" fill="currentColor" />
	</svg>
);

const phaseOptions = [
	{
		id: "single",
		label: "Single Phase",
		icon: <SinglePhaseIcon />,
	},
	{
		id: "three",
		label: "3 Phase",
		icon: <ThreePhaseIcon />,
	},
];

const PhaseSelect = () => {
	const searchParams = useSearchParams();
	const updateParams = useUpdateParams();
	const phase = searchParams.get("phase") || "";
	const currentStep = searchParams.get("step") || "";

	return (
		<section className="space-y-8">
			<SectionHeader
				title="Select your electrical phase"
				description="Choose whether your home has single phase or 3 phase power."
			/>
			<div className="grid gap-4 sm:grid-cols-2">
				{phaseOptions.map((option) => (
					<OptionCard
						key={option.id}
						selected={phase === option.id}
						onClick={() => updateParams({ phase: option.id })}
						icon={option.icon}
						label={option.label}
					/>
				))}
			</div>
			<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
				<button
					type="button"
					onClick={() => {
						updateParams({
							phase: "",
							step: parseInt(currentStep) - 1,
						});
					}}
					className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
				>
					Back
				</button>
				<ContinueButton
					target={parseInt(currentStep) + 1}
					disabled={!phase}
				/>
			</div>
		</section>
	);
};

export default PhaseSelect;
