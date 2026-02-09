import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'sale' | 'new' | 'featured' | 'stock' | 'default';
    size?: 'sm' | 'md' | 'lg';
}

export default function Badge({
    variant = 'default',
    size = 'md',
    className = '',
    children,
    ...props
}: BadgeProps) {
    // Professional, subtle styling - no bright colors
    const baseStyles = 'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200';

    // Refined variants with neutral backgrounds and subtle borders
    const variants = {
        sale: 'bg-[var(--sale-red)]/10 text-[var(--sale-red)] border border-[var(--sale-red)]/20',

        new: 'bg-amber-50 text-amber-700 border border-amber-200',
        featured: 'bg-green-50 text-green-700 border border-green-200',
        stock: 'bg-green-50 text-green-700 border border-green-200',
        default: 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]',

    };

    // Refined sizes - smaller and more discreet
    const sizes = {
        sm: 'px-2 py-0.5 text-[0.625rem] rounded',
        md: 'px-2.5 py-0.5 text-[0.6875rem] rounded-md',
        lg: 'px-3 py-1 text-xs rounded-lg',
    };

    const fontFamily = 'font-[family-name:var(--font-heading)]';

    return (
        <span
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fontFamily} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
