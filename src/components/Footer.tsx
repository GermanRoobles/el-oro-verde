'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export default function Footer() {
  const { t } = useLocale();

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com/eloroverdegrowshop', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { label: 'Facebook', href: 'https://facebook.com/eloroverdegrow', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'M44.8 26.4c0-1.2-.8-2-2-2h-2.4c-1.2 0-2 .8-2 2v11.2c0 1.2.8 2 2 2h2.4c1.2 0 2-.8 2-2V26.4z' },
    { name: 'Mastercard', icon: 'M32 24c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z' },
    { name: 'PayPal', icon: 'M38.7 30.3c-.3 1.9-1.8 3.2-3.7 3.2h-1.5l-1 6.3c-.1.4-.4.7-.8.7h-2.9c-.5 0-.9-.4-.8-.9l2.5-15.7c.1-.4.4-.7.8-.7h5.2c3.2 0 5.4 1.5 5.4 4.5 0 .9-.1 1.8-.2 2.6z' },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <p className="text-lg font-bold tracking-tight text-[var(--foreground)]">{t('site.name')}</p>
            <p className="mt-3 text-sm leading-relaxed">{t('site.tagline')}</p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--accent)] transition hover:border-[var(--accent)]/50 hover:bg-[var(--accent-light)]"
                  aria-label={label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>
            {/* Payment methods */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">{t('footer.payment')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'PayPal', 'Bizum'].map((method) => (
                  <span
                    key={method}
                    className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs font-medium text-[var(--foreground)]"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">{t('footer.contact')}</p>
            <p className="mt-4 text-sm leading-relaxed">
              <a href="mailto:info@eloroverde.com" className="transition hover:text-[var(--accent)]">info@eloroverde.com</a>
              <br />
              <a href="tel:+34672551313" className="transition hover:text-[var(--accent)]">+34 672 551 313</a>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              Barcelona: Carrer del Rec, 50, 08003
              <br />
              Roquetas de Mar: Calle Enix, 2 · Av. Pablo Picasso 75
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">{t('footer.hours')}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{t('footer.hours.text')}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">Información</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li><Link href="/tienda" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">Productos</Link></li>
              <li><Link href="/categorias" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">Categorías</Link></li>
              <li><Link href="/faq" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">{t('faq.title')}</Link></li>
              <li><Link href="/blog" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">{t('blog.title')}</Link></li>
              <li><Link href="/contacto" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">{t('footer.legal')}</p>
            <ul className="mt-4 space-y-1 text-sm">
              <li><Link href="/aviso-legal" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">{t('nav.legal')}</Link></li>
              <li><Link href="/privacidad" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">{t('nav.privacy')}</Link></li>
              <li><Link href="/cookies" className="flex min-h-[44px] items-center transition hover:text-[var(--accent)]">{t('nav.cookies')}</Link></li>
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">{t('footer.newsletter')}</p>
            <p className="mt-4 text-sm">Ofertas y novedades en tu email.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email"
                className="input-pro flex-1 rounded-lg px-3 py-2.5 text-sm"
              />
              <button type="submit" className="btn-primary shrink-0 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]">
                {t('footer.newsletter.cta')}
              </button>
            </form>
          </div>
        </div>
        <p className="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--muted)] sm:mt-12">
          © {new Date().getFullYear()} El Oro Verde. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
