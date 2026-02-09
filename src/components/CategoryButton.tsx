'use client';

import { ButtonHTMLAttributes } from 'react';

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    color?: 'green' | 'purple' | 'orange' | 'blue' | 'default';
    active?: boolean;
    count?: number;
}

export default function CategoryButton({
    icon,
    color = 'default',
    active = false,
    count,
    children,
    className = '',
    ...props
}: CategoryButtonProps) {
    // Professional outline style - no bright backgrounds
    const baseClasses = 'flex w-full items-center gap-3 rounded-sm border px-4 py-2.5 text-left text-sm font-medium transition-all duration-200';

    // Neutral outline with green hover - professional and clean
    const defaultClasses = active
        ? 'border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)] dark:border-green-400 dark:bg-green-400/10 dark:text-green-400 dark:shadow-[0_0_15px_rgba(74,222,128,0.15)]'
        : 'border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent-glow)]';


    return (
        <button
            className={`${baseClasses} ${defaultClasses} ${className}`}
            {...props}
        >
            {/* Icon - smaller and more subtle */}
            <span className="text-lg text-[var(--muted)]" role="img" aria-hidden="true">

                {icon}
            </span>
            <span className="flex-1 tracking-tight">{children}</span>
            {count !== undefined && (
                <span className="font-mono-tech text-xs text-[var(--muted)]">

                    [{count}]
                </span>
            )}
        </button>
    );

}
