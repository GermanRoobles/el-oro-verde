'use client';

import { useState } from 'react';
import ProductReview from './ProductReview';
import type { Review } from '@/types/review';

interface ReviewListProps {
    reviews: Review[];
    totalReviews: number;
}

export default function ReviewList({ reviews, totalReviews }: ReviewListProps) {
    const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');
    const [filterRating, setFilterRating] = useState<number | null>(null);

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'recent') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === 'helpful') {
            return b.helpful - a.helpful;
        }
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        }
        return 0;
    });

    const filteredReviews = filterRating
        ? sortedReviews.filter((r) => r.rating === filterRating)
        : sortedReviews;

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    Reseñas de clientes ({totalReviews})
                </h3>
                <div className="flex flex-wrap gap-3">
                    <select
                        value={filterRating || ''}
                        onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                        className="input-pro rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">Todas las estrellas</option>
                        <option value="5">5 estrellas</option>
                        <option value="4">4 estrellas</option>
                        <option value="3">3 estrellas</option>
                        <option value="2">2 estrellas</option>
                        <option value="1">1 estrella</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful' | 'rating')}
                        className="input-pro rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="recent">Más recientes</option>
                        <option value="helpful">Más útiles</option>
                        <option value="rating">Mejor valoradas</option>
                    </select>
                </div>
            </div>

            {filteredReviews.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-[var(--muted)]">
                        {filterRating
                            ? `No hay reseñas con ${filterRating} estrella${filterRating > 1 ? 's' : ''}`
                            : 'Aún no hay reseñas para este producto'}
                    </p>
                </div>
            ) : (
                <div>
                    {filteredReviews.map((review) => (
                        <ProductReview key={review.id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
}
