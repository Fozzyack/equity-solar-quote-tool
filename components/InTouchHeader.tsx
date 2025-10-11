interface InTouchHeaderProps {
    title?: string;
    description?: string;
}

export const InTouchHeader = ({
    title = "We'll be in touch soon",
    description = "A specialist from Equity Solar will reach out with a detailed quote and answer any questions you have about this battery system."
}: InTouchHeaderProps) => {
    return (
        <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                What's next?
            </p>
            <h3 className="text-xl font-bold text-slate-900">
                {title}
            </h3>
            <p className="text-sm text-slate-600">
                {description}
            </p>
        </div>
    );
};