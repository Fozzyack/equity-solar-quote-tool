import { BackButton } from "@/components/BackButton";

interface NavigationButtonsProps {
    backTarget: number;
    backLabel?: string;
    onContinue: () => void;
    continueDisabled?: boolean;
    continueLabel?: string;
    clearParams?: string[];
}

export const NavigationButtons = ({
    backTarget,
    backLabel,
    onContinue,
    continueDisabled,
    continueLabel = "Continue",
    clearParams = [],
}: NavigationButtonsProps) => {
    return (
        <div className="flex items-center justify-center gap-5">
            <BackButton
                target={backTarget}
                label={backLabel}
                clearParams={clearParams}
            />
            <button
                type="button"
                onClick={onContinue}
                disabled={continueDisabled}
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-9 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
                {continueLabel}
            </button>
        </div>
    );
};
