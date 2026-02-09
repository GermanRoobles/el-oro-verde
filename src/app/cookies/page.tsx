export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Política de cookies</h1>
      <div className="mt-6 space-y-4 text-[var(--foreground)]/90">
        <p>
          Este sitio utiliza cookies y tecnologías similares para el correcto funcionamiento de la
          web, la preferencia de idioma y la persistencia del carrito y de la verificación de
          edad.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del
          usuario al visitar una página web. Permiten recordar preferencias y mejorar la
          experiencia de uso.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Cookies utilizadas</h2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Cookies técnicas:</strong> necesarias para el funcionamiento del sitio
            (sesión, idioma, carrito, verificación de edad).
          </li>
          <li>
            <strong>Cookies de preferencias:</strong> guardan la elección de idioma (es/ca/en).
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Cómo gestionar las cookies</h2>
        <p>
          El usuario puede configurar su navegador para rechazar o eliminar cookies. En ese
          caso, algunas funciones del sitio pueden no estar disponibles (por ejemplo, el carrito
          o la preferencia de idioma).
        </p>
        <p className="text-sm text-[var(--muted)]">
          En esta demo no se utilizan cookies de terceros ni analíticas. Cualquier ampliación
          futura (analytics, publicidad) deberá informarse y, en su caso, recabar consentimiento.
        </p>
      </div>
    </div>
  );
}
