'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { useState, useEffect } from 'react';
import type { Locale } from '@/types';

interface FaqItem {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export default function FaqPage() {
  const { t, locale } = useLocale();
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faq')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setFaq(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('faq.title')}</li>
        </ol>
      </nav>
      <h1 className="section-title mb-6 text-3xl font-bold text-[var(--foreground)]">{t('faq.title')}</h1>
      <div className="space-y-2">
        {faq.length === 0 && <p className="text-[var(--muted)]">Cargando...</p>}
        {faq.map((item) => {
          const isOpen = openId === item.id;
          const q = item.question[locale] || item.question.es;
          const a = item.answer[locale] || item.answer.es;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between px-4 py-4 text-left font-medium text-[var(--foreground)] hover:bg-[var(--background)]"
              >
                <span>{q}</span>
                <span className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)] leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
