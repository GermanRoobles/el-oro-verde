export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Política de privacidad</h1>
      <div className="mt-6 space-y-4 text-[var(--foreground)]/90">
        <p>
          El Oro Verde (eloroverde.com) respeta la privacidad de los usuarios y cumple con la
          normativa aplicable en materia de protección de datos (RGPD y LOPDGDD).
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos es El Oro Verde. Contacto: info@eloroverde.com,
          teléfono +34 672 551 313.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Datos que se recaban</h2>
        <p>
          Se pueden recabar datos de identificación (nombre, email, dirección, teléfono) cuando
          el usuario se registra, realiza un pedido o utiliza el formulario de contacto. También
          se utilizan cookies y datos técnicos para el funcionamiento del sitio, según se indica
          en la política de cookies.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Finalidad y legitimación</h2>
        <p>
          Los datos se tratan para la gestión de pedidos, la atención al cliente, el envío de
          comunicaciones comerciales (con consentimiento) y el cumplimiento de obligaciones
          legales. La base legal es la ejecución del contrato, el consentimiento y el interés
          legítimo cuando corresponda.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Derechos del usuario</h2>
        <p>
          El usuario puede ejercer los derechos de acceso, rectificación, supresión, limitación,
          portabilidad y oposición dirigiéndose a info@eloroverde.com. Asimismo, puede presentar
          una reclamación ante la autoridad de control competente.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Esta es una versión de demostración. La política definitiva debe ser revisada por la
          empresa y su asesor legal.
        </p>
      </div>
    </div>
  );
}
