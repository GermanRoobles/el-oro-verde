'use client';

import { useAgeGateStore } from '@/store/ageGateStore';
import { useLocale } from '@/context/LocaleContext';

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const verified = useAgeGateStore((s) => s.verified);
  const setVerified = useAgeGateStore((s) => s.setVerified);
  const { t } = useLocale();

  if (verified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-900/98 px-4 text-white backdrop-blur-sm">
      <div className="animate-scale-in max-w-md rounded-2xl border border-white/10 bg-neutral-800 p-8 shadow-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-white">{t('age.title')}</h1>
        <p className="mt-4 text-neutral-200 leading-relaxed">{t('age.message')}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setVerified(true)}
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white shadow-lg transition duration-200 hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-neutral-800 active:scale-[0.98]"
          >
            {t('age.enter')}
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = 'https://www.google.com')}
            className="rounded-xl border border-white/30 px-6 py-3 font-medium text-neutral-200 transition duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            {t('age.leave')}
          </button>
        </div>
      </div>
    </div>
  );
}
