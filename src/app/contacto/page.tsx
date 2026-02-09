'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';

export default function ContactoPage() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  const inputClass = 'input-pro mt-1 w-full rounded-lg px-4 py-2.5';

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('nav.contact')}</li>
        </ol>
      </nav>

      <h1 className="section-title mb-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('contact.title')}</h1>
      <p className="mb-6 max-w-2xl text-sm text-[var(--muted)] sm:text-base">{t('contact.intro')}</p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <div className="card p-5 sm:p-6">
            <h2 className="font-semibold text-[var(--foreground)]">{t('contact.info')}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)] sm:text-base">
              <li>
                <a href="mailto:info@eloroverde.com" className="text-[var(--accent)] transition hover:underline">info@eloroverde.com</a>
              </li>
              <li>
                <a href="tel:+34672551313" className="text-[var(--accent)] transition hover:underline">+34 672 551 313</a>
              </li>
            </ul>
          </div>
          <div className="card p-5 sm:p-6">
            <h2 className="font-semibold text-[var(--foreground)]">{t('contact.hours')}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{t('contact.hours.text')}</p>
          </div>
          <div className="card p-5 sm:p-6">
            <h2 className="font-semibold text-[var(--foreground)]">{t('contact.findUs')}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">Barcelona:</strong><br />
                Carrer del Rec, 50, 08003 Barcelona
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Roquetas de Mar (Almería):</strong><br />
                Calle Enix, 2 · Avenida Pablo Picasso 75 · Carretera la Mojonera 431
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:pt-0">
          <div className="card p-5 sm:p-6">
            <h2 className="font-semibold text-[var(--foreground)]">{t('contact.send')}</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]">Nombre</label>
                <input type="text" required className={inputClass} disabled={loading || sent} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]">Email</label>
                <input type="email" required className={inputClass} disabled={loading || sent} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]">Mensaje</label>
                <textarea required rows={4} className={inputClass} disabled={loading || sent} />
              </div>
              {sent ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-600 dark:text-green-400">
                    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm font-medium">Mensaje enviado correctamente</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-sm text-[var(--accent)] underline-offset-4 hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary relative w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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
                    t('contact.send')
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
