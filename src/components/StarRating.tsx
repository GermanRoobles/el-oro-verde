'use client';

import { useState } from 'react';

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    size?: 'sm' | 'md' | 'lg';
    readonly?: boolean;
    showCount?: boolean;
    count?: number;
}

export default function StarRating({
    rating,
    onRatingChange,
    size = 'md',
    readonly = false,
    showCount = false,
    count = 0,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    const handleClick = (value: number) => {
        if (!readonly && onRatingChange) {
            onRatingChange(value);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !readonly && setHoverRating(star)}
                    onMouseLeave={() => !readonly && setHoverRating(0)}
                    disabled={readonly}
                    className={`${readonly ? 'cursor-default' : 'cursor-pointer transition hover:scale-110'} focus:outline-none`}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                    <svg
                        className={`${sizeClasses[size]} ${star <= displayRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-none text-[var(--border)]'

                            } transition-colors`}
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                    </svg>
                </button>
            ))}
            {showCount && count > 0 && (
                <span className="ml-1 text-sm text-[var(--muted)]">({count})</span>
            )}
        </div>
    );
}
