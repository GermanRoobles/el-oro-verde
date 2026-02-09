export default function TrustBar() {
    const trustItems = [
        {
            text: 'Envío 24h',
            subtext: 'Península',
        },
        {
            text: 'Pago Seguro',
            subtext: '100% Protegido',
        },
        {
            text: 'Regalo',
            subtext: 'En cada pedido',
        },
        {
            text: '9/10 Valoración',
            subtext: '+5000 clientes',
        },
    ];

    return (
        <div className="border-b border-[var(--border)] bg-neutral-50">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {trustItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-2 text-center sm:justify-start"
                        >
                            {/* Checkmark icon instead of emoji */}
                            <svg
                                className="h-4 w-4 text-green-600 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-semibold text-neutral-900 sm:text-base">
                                    {item.text}
                                </span>
                                <span className="hidden text-xs text-neutral-600 sm:block">
                                    {item.subtext}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
