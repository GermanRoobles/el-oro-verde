'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface Toast {
    id: string;
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const duration = toast.duration || 3000;
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onClose(toast.id), 300); // Wait for exit animation
        }, duration);

        return () => clearTimeout(timer);
    }, [toast, onClose]);

    const typeStyles = {
        success: 'bg-neutral-900 border-green-600',
        error: 'bg-neutral-900 border-red-500',
        info: 'bg-neutral-900 border-neutral-600',
        warning: 'bg-neutral-900 border-amber-500',
    };

    const typeIconColors = {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-neutral-400',
        warning: 'text-amber-500',
    };

    const typeIcons = {
        success: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
    };

    const type = toast.type || 'info';

    return (
        <div
            className={`
        flex items-center gap-3 rounded-lg border-l-4 px-4 py-3.5 text-white shadow-lg backdrop-blur-sm
        transition-all duration-300 ease-out
        ${typeStyles[type]}
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
            role="alert"
        >
            <div className={`shrink-0 ${typeIconColors[type]}`}>{typeIcons[type]}</div>
            <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>
            <button
                onClick={() => {
                    setIsExiting(true);
                    setTimeout(() => onClose(toast.id), 300);
                }}
                className="shrink-0 rounded-full p-1 text-neutral-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar"
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div className="pointer-events-none fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 sm:bottom-6 sm:right-6">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} onClose={onClose} />
                </div>
            ))}
        </div>,
        document.body
    );
}
