interface SectionHeaderProps {
    step?: string | number;
    title: string;
    description?: string;
}

export const SectionHeader = ({
    step,
    title,
    description,
}: SectionHeaderProps) => {
    return (
        <div className="space-y-1">
            {step !== undefined && (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Step {step}
                </p>
            )}
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && (
                <p className="text-sm text-slate-500">{description}</p>
            )}
        </div>
    );
};
