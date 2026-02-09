'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  priority?: boolean;
}

export default function ProductGallery({ images, alt, priority }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const zoomRef = useRef<HTMLDivElement>(null);

  const imgs = images.length > 0 ? images : ['/placeholder-product.svg'];
  const currentSrc = imgs[selectedIndex];

  const handleZoomMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!zoomRef.current || !zoomOpen) return;
      const rect = zoomRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const img = zoomRef.current.querySelector('img');
      if (img) {
        img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      }
    },
    [zoomOpen]
  );

  return (
    <div className="space-y-3">
      <div
        className="card relative aspect-square overflow-hidden bg-[var(--background)] cursor-zoom-in"
        onMouseEnter={() => setZoomOpen(true)}
        onMouseLeave={() => setZoomOpen(false)}
        onMouseMove={handleZoomMove}
      >
        <div ref={zoomRef} className="relative h-full w-full">
          <Image
            src={currentSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-200"
            style={{ transform: zoomOpen ? 'scale(1.5)' : 'scale(1)' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        </div>
      </div>
      {imgs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imgs.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                selectedIndex === i
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                  : 'border-[var(--border)] hover:border-[var(--accent)]/50'
              }`}
            >
              <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
