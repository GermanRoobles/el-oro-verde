'use client';

interface FilterChip {
    id: string;
    label: string;
    value: string;
    onRemove: () => void;
}

interface FilterChipsProps {
    filters: FilterChip[];
    onClearAll?: () => void;
}

export default function FilterChips({ filters, onClearAll }: FilterChipsProps) {
    if (filters.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[var(--muted)]">Filtros activos:</span>

            {filters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={filter.onRemove}
                    className="group flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-light)] px-3 py-1.5 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                >
                    <span className="max-w-[150px] truncate">{filter.label}: {filter.value}</span>
                    <svg
                        className="h-4 w-4 shrink-0 transition group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            ))}

            {filters.length > 1 && onClearAll && (
                <button
                    type="button"
                    onClick={onClearAll}
                    className="text-sm font-medium text-[var(--muted)] underline-offset-4 transition hover:text-[var(--accent)] hover:underline"
                >
                    Limpiar todo
                </button>
            )}
        </div>
    );
}
