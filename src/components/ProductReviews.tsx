'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { getReviewsByProductId, getProductRating } from '@/data/mockReviews';
import type { ReviewFormData } from '@/types/review';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(getReviewsByProductId(productId));
  const [showForm, setShowForm] = useState(false);
  const rating = getProductRating(productId);

  const handleSubmitReview = async (data: ReviewFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newReview = {
      id: `review-${Date.now()}`,
      productId,
      userId: 'current-user',
      userName: 'Usuario Actual',
      rating: data.rating as 1 | 2 | 3 | 4 | 5,
      title: data.title,
      comment: data.comment,
      date: new Date().toISOString(),
      verified: false,
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setShowForm(false);
  };

  if (!rating) {
    return (
      <section className="mt-16 border-t border-[var(--border)] pt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Reseñas de clientes</h2>
          <p className="mt-4 text-[var(--muted)]">Sé el primero en dejar una reseña</p>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn-primary mt-6 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            Escribir reseña
          </button>
          {showForm && (
            <div className="mx-auto mt-8 max-w-2xl text-left">
              <ReviewForm productId={productId} onSubmit={handleSubmitReview} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 border-t border-[var(--border)] pt-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Valoraciones</h2>
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-[var(--foreground)]">{rating.averageRating.toFixed(1)}</p>
              <div className="mt-2 flex justify-center">
                <StarRating rating={rating.averageRating} readonly size="md" />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Basado en {rating.totalReviews} reseña{rating.totalReviews !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = rating.ratingDistribution[stars as keyof typeof rating.ratingDistribution];
                const percentage = rating.totalReviews > 0 ? (count / rating.totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-8 text-sm text-[var(--muted)]">{stars}★</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--background)]">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm text-[var(--muted)]">{count}</span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="btn-primary mt-6 w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              {showForm ? 'Cancelar' : 'Escribir reseña'}
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {showForm && (
            <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Escribe tu reseña</h3>
              <ReviewForm productId={productId} onSubmit={handleSubmitReview} />
            </div>
          )}
          <ReviewList reviews={reviews} totalReviews={rating.totalReviews} />
        </div>
      </div>
    </section>
  );
}
