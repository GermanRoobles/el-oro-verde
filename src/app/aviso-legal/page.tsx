export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Aviso legal</h1>
      <div className="mt-6 space-y-4 text-[var(--foreground)]/90">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los
          siguientes datos identificativos:
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Datos del titular</h2>
        <p>
          Denominación: El Oro Verde (growshop)
          <br />
          Correo electrónico: info@eloroverde.com
          <br />
          Teléfono: +34 672 551 313
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Ubicación</h2>
        <p>
          Barcelona: Carrer del Rec, 50, 08003 Barcelona.
          <br />
          Roquetas de Mar (Almería): Calle Enix, 2; Avenida Pablo Picasso 75; Carretera la
          Mojonera 431.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Objeto y condiciones de uso</h2>
        <p>
          El presente aviso legal regula el uso del sitio web eloroverde.com. La navegación por el
          sitio atribuye la condición de usuario e implica la aceptación de las condiciones de uso
          y la normativa vigente. El usuario se compromete a hacer un uso adecuado de los
          contenidos y servicios ofrecidos y a no emplearlos para actividades ilícitas o
          contrarias al ordenamiento legal.
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Mayoría de edad</h2>
        <p>
          El acceso y uso de esta web está restringido a personas mayores de 18 años según la
          legislación aplicable en su país de residencia. Es responsabilidad del usuario
          asegurarse de cumplir con la normativa vigente en su jurisdicción.
        </p>
        <p className="text-sm text-[var(--muted)]">
          Este es un sitio de demostración. Los datos pueden no coincidir exactamente con los
          publicados oficialmente por la empresa.
        </p>
      </div>
    </div>
  );
}
