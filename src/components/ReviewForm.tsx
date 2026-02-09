'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import type { ReviewFormData } from '@/types/review';

interface ReviewFormProps {
    productId: string;
    onSubmit: (data: ReviewFormData) => Promise<void>;
}

export default function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setLoading(true);
        try {
            await onSubmit({ rating, title, comment });
            setSubmitted(true);
            setRating(0);
            setTitle('');
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-3 text-lg font-semibold text-green-600 dark:text-green-400">¡Gracias por tu reseña!</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">Tu opinión nos ayuda a mejorar</p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm text-[var(--accent)] underline-offset-4 hover:underline"
                >
                    Escribir otra reseña
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    Calificación <span className="text-red-500">*</span>
                </label>
                <StarRating rating={rating} onRatingChange={setRating} size="lg" />
                {rating === 0 && (
                    <p className="mt-1 text-xs text-[var(--muted)]">Selecciona una calificación</p>
                )}
            </div>

            <div>
                <label htmlFor="review-title" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    Título de la reseña <span className="text-red-500">*</span>
                </label>
                <input
                    id="review-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Resume tu experiencia"
                    className="input-pro w-full rounded-lg px-4 py-2.5"
                    disabled={loading}
                />
            </div>

            <div>
                <label htmlFor="review-comment" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    Tu opinión <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="review-comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos qué te pareció el producto..."
                    rows={4}
                    className="input-pro w-full rounded-lg px-4 py-2.5"
                    disabled={loading}
                />
                <p className="mt-1 text-xs text-[var(--muted)]">{comment.length} / 500 caracteres</p>
            </div>

            <button
                type="submit"
                disabled={loading || rating === 0}
                className="btn-primary w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                    </span>
                ) : (
                    'Publicar reseña'
                )}
            </button>
        </form>
    );
}
