'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';

export default function LoginPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      router.push('/cuenta');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'input-pro mt-1 w-full rounded-lg px-4 py-2.5';

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:py-12">
      <div className="card animate-fade-in p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('auth.login')}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Accede a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">{t('auth.email')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">{t('auth.password')}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-red-600 dark:text-red-400">
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              t('auth.submitLogin')
            )}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <p className="text-center text-sm text-[var(--muted)]">
            {t('auth.noAccount')}{' '}
            <Link href="/registro" className="font-medium text-[var(--accent)] transition hover:underline">
              {t('auth.register')}
            </Link>
          </p>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-center text-xs font-medium uppercase tracking-wider text-[var(--muted)]">Demo</p>
            <p className="mt-2 text-center text-sm text-[var(--foreground)]">
              <strong>Email:</strong> demo@eloroverde.com<br />
              <strong>Password:</strong> demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
