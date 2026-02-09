'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import type { Review } from '@/types/review';

interface ProductReviewProps {
    review: Review;
}

export default function ProductReview({ review }: ProductReviewProps) {
    const [helpful, setHelpful] = useState(review.helpful);
    const [hasVoted, setHasVoted] = useState(false);

    const handleHelpful = () => {
        if (!hasVoted) {
            setHelpful(helpful + 1);
            setHasVoted(true);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="border-b border-[var(--border)] py-6 last:border-0">
            <div className="mb-3 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} readonly size="sm" />
                        {review.verified && (
                            <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Compra verificada
                            </span>
                        )}
                    </div>
                    <h4 className="mt-2 font-semibold text-[var(--foreground)]">{review.title}</h4>
                </div>
            </div>

            <p className="mb-3 text-sm leading-relaxed text-[var(--muted)]">{review.comment}</p>

            {review.images && review.images.length > 0 && (
                <div className="mb-3 flex gap-2">
                    {review.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            className="h-20 w-20 rounded-lg object-cover"
                        />
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <div className="flex items-center gap-3">
                    <span className="font-medium">{review.userName}</span>
                    <span>•</span>
                    <span>{formatDate(review.date)}</span>
                </div>
                <button
                    type="button"
                    onClick={handleHelpful}
                    disabled={hasVoted}
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 transition ${hasVoted
                            ? 'cursor-default text-[var(--accent)]'
                            : 'hover:bg-[var(--background)] hover:text-[var(--accent)]'
                        }`}
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Útil ({helpful})
                </button>
            </div>
        </div>
    );
}
