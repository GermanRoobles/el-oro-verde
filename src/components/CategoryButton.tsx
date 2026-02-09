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
    const baseClasses = 'flex w-full items-center gap-3 rounded-lg border-2 px-4 py-2.5 text-left text-sm font-medium transition-all duration-200';

    // Neutral outline with green hover - professional and clean
    const defaultClasses = active
        ? 'border-green-600 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/30 dark:text-green-400'
        : 'border-neutral-300 bg-transparent text-neutral-700 hover:border-green-600 hover:bg-green-50/50 hover:text-green-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-green-500 dark:hover:bg-green-900/20 dark:hover:text-green-400';

    return (
        <button
            className={`${baseClasses} ${defaultClasses} ${className}`}
            {...props}
        >
            {/* Icon - smaller and more subtle */}
            <span className="text-lg text-neutral-600 dark:text-neutral-400" role="img" aria-hidden="true">
                {icon}
            </span>
            <span className="flex-1">{children}</span>
            {count !== undefined && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                    {count}
                </span>
            )}
        </button>
    );
}
