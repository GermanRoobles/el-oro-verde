'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
            <div className="max-w-md text-center">
                <h2 className="text-3xl font-bold text-[var(--foreground)]">¡Vaya! Algo salió mal</h2>
                <p className="mt-4 text-[var(--muted)]">
                    Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="btn-primary rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--accent-hover)]"
                    >
                        Intentar de nuevo
                    </button>
                    <Link
                        href="/"
                        className="rounded-xl border border-[var(--border)] px-6 py-3 font-semibold text-[var(--foreground)] transition hover:bg-[var(--background)]"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
