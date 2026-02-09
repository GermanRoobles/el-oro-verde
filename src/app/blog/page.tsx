'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { useState, useEffect } from 'react';
import type { Locale } from '@/types';

interface BlogPost {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  date: string;
  image: string;
  content: Record<Locale, string>;
}

export default function BlogPage() {
  const { t, locale } = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)]">{t('blog.title')}</li>
        </ol>
      </nav>
      <h1 className="section-title mb-2 text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{t('blog.title')}</h1>
      <p className="mb-8 text-sm text-[var(--muted)] sm:text-base">{t('blog.excerpt')}</p>

      <div className="space-y-6 sm:space-y-8">
        {loading && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card flex flex-col overflow-hidden sm:flex-row animate-pulse">
                <div className="relative h-48 w-full shrink-0 bg-[var(--background)] sm:h-40 sm:w-56" />
                <div className="flex flex-1 flex-col justify-center gap-3 p-4 sm:p-5">
                  <div className="h-3 w-24 rounded bg-[var(--background)]" />
                  <div className="h-5 w-3/4 rounded bg-[var(--background)]" />
                  <div className="h-4 w-full rounded bg-[var(--background)]" />
                </div>
              </div>
            ))}
          </>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-[var(--muted)]">No hay artículos disponibles</p>
        )}

        {!loading && posts.map((post, i) => {
          const title = post.title[locale] || post.title.es;
          const excerpt = post.excerpt[locale] || post.excerpt.es;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group flex flex-col overflow-hidden sm:flex-row animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
            >
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[var(--background)] sm:aspect-auto sm:h-40 sm:w-56">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 224px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                <time className="text-xs font-medium text-[var(--muted)]">
                  {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ca' ? 'ca-ES' : 'en-GB')}
                </time>
                <h2 className="mt-1.5 text-base font-bold leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] sm:text-lg">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">{excerpt}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
