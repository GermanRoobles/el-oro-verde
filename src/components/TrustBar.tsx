export default function TrustBar() {
    const trustItems = [
        {
            text: 'SHIP_STATUS: 24H',
            subtext: 'PENINSULA_OK',
        },
        {
            text: 'PAY_GATEWAY',
            subtext: 'SECURE_100%',
        },
        {
            text: 'BONUS_ITEM',
            subtext: 'INCLUDED',
        },
        {
            text: 'CUST_RATING',
            subtext: '9.8/10',
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
