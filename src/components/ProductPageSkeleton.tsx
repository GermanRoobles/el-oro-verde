'use client';

export default function ProductPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 h-4 w-48 rounded bg-[var(--border)]/60 animate-pulse" />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-xl bg-[var(--border)]/60 animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 rounded bg-[var(--border)]/60 animate-pulse" />
          <div className="h-4 w-24 rounded bg-[var(--border)]/60 animate-pulse" />
          <div className="h-8 w-28 rounded bg-[var(--border)]/60 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-[var(--border)]/60 animate-pulse" />
            <div className="h-4 w-full rounded bg-[var(--border)]/60 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-[var(--border)]/60 animate-pulse" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-24 rounded-xl bg-[var(--border)]/60 animate-pulse" />
            <div className="h-12 w-40 rounded-xl bg-[var(--border)]/60 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
