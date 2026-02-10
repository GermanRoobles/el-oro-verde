export default function TrustBar() {

    const trustItems = [
        {
            text: 'Envío rápido',
            subtext: 'Recibe tu pedido en 24-48 h en la península',
        },
        {
            text: 'Compra segura',
            subtext: 'Pago seguro y datos protegidos',
        },
        {
            text: 'Atención al cliente',
            subtext: 'Asesoramiento por teléfono, email o en tienda',
        },
        {
            text: 'Devoluciones fáciles',
            subtext: '14 días para devolver sin preguntas',
        },
    ];


    return (
        <div className="border-b border-[var(--border)] bg-[var(--background)]">



            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {trustItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-2 text-center sm:justify-start"
                        >
                            {/* Checkmark icon instead of emoji */}
                            <svg
                                className="h-4 w-4 text-green-600 flex-shrink-0 dark:text-green-500"

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
                                <span className="text-sm font-semibold text-[var(--foreground)] sm:text-base">


                                    {item.text}
                                </span>
                                <span className="hidden text-xs text-[var(--muted)] sm:block">


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
