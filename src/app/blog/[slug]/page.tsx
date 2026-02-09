'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
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

export default function BlogSlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, locale } = useLocale();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const found = Array.isArray(data) ? data.find((p: BlogPost) => p.slug === slug) : null;
        setPost(found || null);
      });
  }, [slug]);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-[var(--muted)]">{post === null ? 'Cargando...' : 'Entrada no encontrada.'}</p>
        <Link href="/blog" className="mt-4 inline-block text-[var(--accent)] hover:underline">
          Volver al blog
        </Link>
      </div>
    );
  }

  const title = post.title[locale] || post.title.es;
  const content = post.content[locale] || post.content.es;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-4 text-sm text-[var(--muted)]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">{t('nav.home')}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/blog" className="transition hover:text-[var(--accent)]">{t('blog.title')}</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-[var(--accent)] truncate max-w-[180px] sm:max-w-none">{title}</li>
        </ol>
      </nav>
      <header className="mb-6">
        <time className="text-sm text-[var(--muted)]">
          {new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ca' ? 'ca-ES' : 'en-GB')}
        </time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
      </header>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--background)] mb-8">
        <Image src={post.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" />
      </div>
      <div className="prose prose-invert max-w-none text-[var(--foreground)]">
        <p className="leading-relaxed whitespace-pre-line">{content}</p>
      </div>
      <p className="mt-8">
        <Link href="/blog" className="text-[var(--accent)] font-medium hover:underline">
          ← {t('blog.title')}
        </Link>
      </p>
    </article>
  );
}
