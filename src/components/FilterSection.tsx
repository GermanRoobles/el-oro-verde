'use client';

import { ReactNode } from 'react';

interface FilterSectionProps {
    title: string;
    icon?: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export default function FilterSection({
    title,
    icon,
    children,
    defaultOpen = true,
}: FilterSectionProps) {
    return (
        <div className="border-b border-neutral-200 pb-4 last:border-0 dark:border-neutral-700">
            <h3 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
                {title}
            </h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}
