'use client';

import { useState, useCallback, useRef } from 'react';
import { useLocale } from '@/context/LocaleContext';

const SEGMENTS = [
  { key: 'roulette.discount.5' as const, color: '#047857' },
  { key: 'roulette.discount.10' as const, color: '#059669' },
  { key: 'roulette.discount.15' as const, color: '#10b981' },
  { key: 'roulette.discount.shipping' as const, color: '#34d399' },
  { key: 'roulette.discount.try' as const, color: '#6ee7b7' },
  { key: 'roulette.discount.5' as const, color: '#047857' },
];
const SEGMENT_ANGLE = 360 / SEGMENTS.length;
const SPIN_DURATION_MS = 4500;
const EXTRA_TURNS = 6;

export default function Roulette() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const rotationRef = useRef(0);
  const [displayRotation, setDisplayRotation] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = useCallback(() => {
    if (spinning || hasSpun) return;
    setSpinning(true);
    setResultIndex(null);
    const winIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentCenter = winIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const finalAngle = 360 * EXTRA_TURNS + (360 - segmentCenter);
    rotationRef.current += finalAngle;
    setDisplayRotation(rotationRef.current);
    const timer = setTimeout(() => {
      setSpinning(false);
      setHasSpun(true);
      setResultIndex(winIndex);
    }, SPIN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [spinning, hasSpun]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setHasSpun(false);
      setResultIndex(null);
    }, 300);
  }, []);

  const conicGradient = SEGMENTS.map(
    (s, i) => `${s.color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`
  ).join(', ');

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="floating-roulette-btn fixed right-2 bottom-4 z-40 flex flex-col items-center gap-0.5 rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] px-2 py-2 shadow-sm transition hover:border-[var(--accent)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 sm:right-4 sm:gap-1 sm:rounded-xl sm:px-3 sm:py-3"

        aria-label={t('roulette.cta')}
      >
        <svg className="h-5 w-5 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-[var(--foreground)] whitespace-nowrap sm:text-[10px]">

          {t('roulette.cta')}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="roulette-title"
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]"
              aria-label={t('roulette.close')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 id="roulette-title" className="pr-8 text-center text-lg font-bold text-[var(--foreground)]">
              {t('roulette.title')}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--muted)]">
              {hasSpun ? t('roulette.tryAgain') : 'Gira y descubre tu descuento'}
            </p>

            <div className="relative mx-auto mt-6 aspect-square w-64">
              <div
                className="absolute inset-0 rounded-full border-4 border-[var(--foreground)] transition-transform duration-[4500ms] ease-out"
                style={{
                  background: `conic-gradient(${conicGradient})`,
                  transform: `rotate(${displayRotation}deg)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-14 w-14 rounded-full border-4 border-[var(--foreground)] bg-[var(--surface)] shadow-lg" />
              </div>
              <div
                className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-0.5"
                style={{
                  borderLeft: '14px solid transparent',
                  borderRight: '14px solid transparent',
                  borderTop: '28px solid var(--foreground)',
                }}
                aria-hidden
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-[var(--muted)]">
              {['roulette.discount.5', 'roulette.discount.10', 'roulette.discount.15', 'roulette.discount.shipping', 'roulette.discount.try'].map((key) => (
                <span key={key} className="rounded bg-[var(--background)] px-2 py-1">
                  {t(key as 'roulette.discount.5')}
                </span>
              ))}
            </div>

            {resultIndex !== null && (
              <p className="mt-4 text-center text-lg font-bold text-[var(--accent)]">
                {t('roulette.won')} {t(SEGMENTS[resultIndex].key)}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              {!hasSpun && (
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={spinning}
                  className="btn-primary flex-1 rounded-xl bg-[var(--accent)] py-3 font-semibold text-white hover:bg-[var(--accent-hover)] disabled:opacity-70"
                >
                  {spinning ? '...' : t('roulette.spin')}
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="btn-primary rounded-xl border border-[var(--border)] px-6 py-3 font-semibold text-[var(--foreground)] hover:bg-[var(--background)]"
              >
                {t('roulette.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
