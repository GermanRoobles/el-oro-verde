'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';

export default function RegistroPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      router.push('/login');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">{t('auth.register')}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{t('auth.name')}</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-pro mt-1 w-full rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{t('auth.email')}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-pro mt-1 w-full rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{t('auth.password')}</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-pro mt-1 w-full rounded-lg px-4 py-2"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-lg bg-[var(--accent)] py-3 font-semibold text-white hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {t('auth.submitRegister')}
        </button>
      </form>
      <p className="mt-4 text-center text-[var(--muted)]">
        {t('auth.hasAccount')}{' '}
        <Link href="/login" className="text-[var(--accent)] hover:underline">
          {t('auth.login')}
        </Link>
      </p>
    </div>
  );
}
