'use client';

export default function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden p-0 animate-pulse">
      <div className="aspect-square bg-[var(--border)]/60" />
      <div className="p-4">
        <div className="h-3 w-16 rounded bg-[var(--border)]/60" />
        <div className="mt-2 h-4 w-full rounded bg-[var(--border)]/60" />
        <div className="mt-2 h-4 w-20 rounded bg-[var(--border)]/60" />
      </div>
    </div>
  );
}
