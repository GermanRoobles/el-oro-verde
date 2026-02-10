'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';

export default function HeroBento() {
    const { t } = useLocale();

    return (
        <section className="mobile-container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6 lg:h-[600px]">

                {/* Cell 1: Main Value Prop (Large) */}
                <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] md:col-span-8 md:row-span-2 md:p-10">

                    <div className="relative z-10 max-w-2xl">
                        <span className="font-mono-tech inline-block rounded border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-green-600 backdrop-blur-sm dark:text-green-400">
                            GROWSHOP ONLINE
                        </span>
                        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">

                            {t('home.hero')}
                        </h1>
                        <p className="mt-4 max-w-lg text-lg text-[var(--muted)]">

                            {t('home.sub')}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/tienda"
                                className="btn-primary relative inline-flex items-center gap-2 overflow-hidden bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                            >
                                <span className="relative z-10">{t('shop.all')}</span>
                                <svg className="relative z-10 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Abstract Tech Background/Image */}
                    <div className="absolute right-0 top-0 h-full w-2/3 opacity-10 bg-[url('/hero-cultivation.jpg')] bg-cover bg-center grayscale dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-green-500/20 blur-3xl filter" />
                </div>

                {/* Cell 2: Featured/Technical Access */}
                <div className="group relative col-span-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all hover:border-[var(--accent)] md:col-span-4 md:row-span-1">

                    <Image
                        src="/banners/cultivo.jpg"
                        alt="Iluminación Profesional"
                        fill
                        className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col justify-end">
                        <span className="font-mono-tech text-xs text-green-400">DESTACADO</span>
                        <h3 className="mt-1 text-xl font-bold text-white">Iluminación Pro</h3>
                        <Link href="/tienda?category=iluminacion" className="mt-3 flex items-center text-sm font-bold text-white hover:text-green-400">
                            <span className="underline decoration-green-500 underline-offset-4">EXPLORAR</span>
                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>
                </div>

                {/* Cell 3: Quick Category Access */}
                <div className="group relative col-span-1 flex flex-col justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/50 md:col-span-4 md:row-span-1">

                    <span className="font-mono-tech mb-4 text-[10px] font-bold uppercase text-[var(--muted)]">
                        ACCESO RÁPIDO
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                        <Link href="/tienda?category=cultivo" className="group/item flex items-center justify-between rounded border border-[var(--border)] bg-[var(--background)] p-3 transition hover:border-[var(--accent)] hover:bg-[var(--accent-light)]">
                            <span className="text-sm font-semibold text-[var(--foreground)]">Cultivo</span>

                            <span className="text-xs text-green-600 opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
                        </Link>
                        <Link href="/tienda?category=cbd" className="group/item flex items-center justify-between rounded border border-[var(--border)] bg-[var(--background)] p-3 transition hover:border-[var(--accent)] hover:bg-[var(--accent-light)]">
                            <span className="text-sm font-semibold text-[var(--foreground)]">CBD</span>

                            <span className="text-xs text-green-600 opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
                        </Link>
                        <Link href="/tienda?category=parafernalia" className="group/item flex items-center justify-between rounded border border-[var(--border)] bg-[var(--background)] p-3 transition hover:border-[var(--accent)] hover:bg-[var(--accent-light)]">
                            <span className="text-sm font-semibold text-[var(--foreground)]">Parafernalia</span>

                            <span className="text-xs text-green-600 opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
                        </Link>
                        <Link href="/tienda?category=ofertas" className="group/item flex items-center justify-between rounded border border-[var(--border)] bg-[var(--background)] p-3 transition hover:border-[var(--accent)] hover:bg-[var(--accent-light)]">
                            <span className="text-sm font-semibold text-[var(--foreground)]">Ofertas</span>

                            <span className="text-xs text-green-600 opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
