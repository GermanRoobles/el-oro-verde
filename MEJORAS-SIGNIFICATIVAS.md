# Propuestas de mejoras significativas – El Oro Verde

Lista priorizada de mejoras que tendrían mayor impacto en la tienda: UX, conversión, rendimiento y operativa.

---

## 1. Experiencia de usuario y conversión

### Búsqueda con autocompletado y sugerencias
- **Qué:** Campo de búsqueda en el Header que, al escribir, muestre sugerencias en tiempo real (nombres de productos, categorías) y permita ir directo al producto o a la tienda filtrada.
- **Dónde:** `Header.tsx` + nuevo endpoint `/api/products/search` (por `q`, límite 5–10).
- **Impacto:** Menos clics para encontrar producto, menos abandono.

### Lista de deseos (wishlist)
- **Qué:** Botón “Guardar” / corazón en cada tarjeta de producto y en la página de producto; página `/cuenta/deseos` o panel en cuenta con los guardados.
- **Dónde:** Nuevo store Zustand persistido (como el carrito), componente `WishlistButton`, enlaces en `Header` y en `producto/[slug]/page.tsx`.
- **Impacto:** Engagement, retorno y datos para recomendaciones.

### Resumen del carrito en el Header (mini cart / drawer)
- **Qué:** Al hacer clic en el icono del carrito, abrir un panel lateral con las últimas líneas del carrito, total y botón “Ir al carrito” / “Checkout”.
- **Dónde:** `Header.tsx` + componente `CartDrawer` que consuma `useCartStore`.
- **Impacto:** Usuario ve el carrito sin cambiar de página; más conversiones.

### Guardar dirección y datos para el checkout
- **Qué:** Si el usuario está logueado, pre-rellenar dirección (y nombre, teléfono) en checkout desde su perfil; opción “Guardar esta dirección para próximos pedidos”.
- **Dónde:** `checkout/page.tsx`, API `/api/auth/me` ampliada con dirección por defecto, y endpoint para guardarla (o reutilizar `cuenta`).
- **Impacto:** Menos fricción y menos abandonos en checkout.

---

## 2. Visual y diseño

### Galería de producto con varias imágenes
- **Qué:** En la ficha de producto, carrusel o grid de miniaturas con 2–3 imágenes por producto (ya tenéis `product.images[]`); zoom al hacer clic o hover.
- **Dónde:** `producto/[slug]/page.tsx` – sustituir la única imagen por un componente `ProductGallery`.
- **Impacto:** Más confianza y menos devoluciones por “no era lo que esperaba”.

### Modo oscuro (dark mode)
- **Qué:** Toggle en Header (o en footer) que alterne entre tema claro y oscuro; persistir preferencia en `localStorage` y aplicar clases/ variables CSS.
- **Dónde:** `globals.css` (variables `--background`, `--foreground`, etc. para dark), `layout.tsx` o un `ThemeProvider`, y un botón en `Header`.
- **Impacto:** Mejor experiencia para muchos usuarios y aspecto más actual.

### Animaciones y estados de carga consistentes
- **Qué:** Skeletons en tienda y en ficha de producto mientras cargan datos; animación suave al añadir al carrito (ej. “+1” flotando hacia el icono del carrito).
- **Dónde:** Componentes `ProductCardSkeleton`, `ProductPageSkeleton`, y un pequeño toast o animación en `Header` al usar `addItem`.
- **Impacto:** Percepción de velocidad y sensación de app cuidada.

### Badges y etiquetas en tarjetas
- **Qué:** Etiquetas claras y consistentes: “Nuevo”, “Oferta”, “Últimas unidades” (si `stock` &lt; 5), “Agotado”.
- **Dónde:** En los `ProductCard` de `page.tsx` (home) y `tienda/page.tsx`; reutilizar mismo componente de badge.
- **Impacto:** Ofertas y urgencia más visibles.

---

## 3. Contenido y confianza

### Sección de reseñas o valoraciones en producto
- **Qué:** En la ficha de producto, bloque “Valoraciones” con puntuación media, número de reseñas y lista de comentarios (aunque sea estática o con 1–2 reseñas de ejemplo al principio).
- **Dónde:** `producto/[slug]/page.tsx`; opcionalmente modelo de datos `reviews` y API para listar/añadir (solo si quieres que sea dinámico).
- **Impacto:** Más confianza y mejor SEO (schema de valoraciones).

### FAQ por categoría o global
- **Qué:** Página `/faq` o acordeón en home/checkout con preguntas frecuentes (envíos, devoluciones, CBD legal, etc.).
- **Dónde:** Nueva ruta `faq/page.tsx` y/o componente `FAQSection` reutilizable; datos en JSON o en `translations`.
- **Impacto:** Menos dudas antes de comprar y menos consultas por contacto.

### Blog o guías (SEO y autoridad)
- **Qué:** Sección “Guías” o “Blog” con artículos estáticos (por ejemplo: “Primer cultivo interior”, “Uso del CBD”, “Cómo elegir sustrato”). Enlaces desde home y desde categorías.
- **Dónde:** Rutas como `blog/[slug]/page.tsx` y datos en markdown o JSON; opcionalmente MDX.
- **Impacto:** Tráfico orgánico y posicionamiento por palabras clave del sector.

---

## 4. Rendimiento y SEO

### Metadata y Open Graph por página
- **Qué:** `title`, `description` y Open Graph específicos por ruta (home, tienda, categoría, producto). En producto: nombre, precio, imagen.
- **Dónde:** `layout.tsx` por sección y `generateMetadata` en `producto/[slug]/page.tsx`, `tienda/page.tsx`, etc.
- **Impacto:** Mejor posicionamiento y mejor aspecto al compartir en redes.

### Imágenes optimizadas (formato y tamaños)
- **Qué:** Usar `next/image` en todas las imágenes de producto con `sizes` adecuados; preferir WebP/AVIF; placeholder blur cuando tenga sentido.
- **Dónde:** Revisar todas las páginas que muestran productos; asegurar que `images` en JSON apunten a rutas que Next pueda optimizar.
- **Impacto:** Mejor LCP y menos peso.

### Paginación o “cargar más” en la tienda
- **Qué:** En `/tienda`, no cargar todos los productos de golpe: por ejemplo 12–24 por página o “Cargar más” con offset/limit.
- **Dónde:** API `/api/products` con `limit` y `offset` (o `page`); estado en `tienda/page.tsx` y botón o infinite scroll.
- **Impacto:** Primera carga más rápida y mejor con muchos productos.

### Schema.org para productos
- **Qué:** JSON-LD de tipo `Product` en cada página de producto (nombre, descripción, precio, imagen, disponibilidad).
- **Dónde:** `producto/[slug]/page.tsx` – inyectar `<script type="application/ld+json">` con los datos del producto.
- **Impacto:** Rich results en Google (precio, disponibilidad).

---

## 5. Herramientas y estructura

### Panel de administración (admin)
- **Qué:** Zona `/admin` (protegida por login) para listar pedidos, ver detalle, marcar como “Enviado” y, si aplica, editar stock o destacados (aunque los datos sigan en JSON al principio).
- **Dónde:** Rutas `admin/page.tsx`, `admin/pedidos/[id]/page.tsx`; API de órdenes ya existe; roles en `users` o comprobación simple por usuario.
- **Impacto:** Operativa diaria sin tocar código ni JSON a mano.

### Notificaciones por email (pedido creado / enviado)
- **Qué:** Al crear un pedido, enviar un email al cliente con resumen y número de pedido; opcionalmente otro al marcar “Enviado” con enlace de seguimiento.
- **Dónde:** En `POST /api/orders` llamar a un servicio de email (Resend, SendGrid, etc.) con plantilla HTML simple.
- **Impacto:** Confianza y menos “¿me llegará?”.

### Pasarela de pago real
- **Qué:** Integrar Stripe o similar: botón “Pagar” en checkout que lleve a pago con tarjeta (o link de pago) y, al confirmar, crear el pedido y vaciar el carrito.
- **Dónde:** `checkout/page.tsx`, API route que cree PaymentIntent o Checkout Session; webhook para actualizar estado del pedido.
- **Impacto:** Cobro real y menos gestión manual.

### Analytics y eventos
- **Qué:** Google Analytics 4 (o similar) con eventos: “view_item”, “add_to_cart”, “begin_checkout”, “purchase” con ítems y valor.
- **Dónde:** Script en `layout.tsx` y llamadas `gtag` o `dataLayer` en tienda, producto, carrito y checkout.
- **Impacto:** Saber qué productos y pasos convierten y dónde se abandona.

### Monitoreo de errores
- **Qué:** Servicio tipo Sentry para capturar errores de JavaScript y fallos en API en producción.
- **Dónde:** Inicialización en `layout.tsx` o `_app`; opcionalmente wrapper en `fetch` para reportar fallos de red.
- **Impacto:** Detectar y corregir fallos que el usuario no reporta.

---

## 6. Resumen de prioridad sugerida

| Prioridad | Mejora                               | Esfuerzo | Impacto |
|----------|--------------------------------------|----------|---------|
| Alta     | Mini carrito en Header               | Bajo     | Alto    |
| Alta     | Metadata y SEO por página            | Bajo     | Alto    |
| Alta     | Galería de imágenes en producto      | Medio    | Alto    |
| Alta     | Guardar dirección en checkout        | Medio    | Alto    |
| Media    | Búsqueda con autocompletado          | Medio    | Alto    |
| Media    | Lista de deseos                      | Medio    | Medio   |
| Media    | Modo oscuro                          | Bajo     | Medio   |
| Media    | Reseñas en producto                  | Medio    | Alto    |
| Media    | Paginación en tienda                 | Bajo     | Medio   |
| Media    | Schema.org producto                  | Bajo     | Medio   |
| Media    | FAQ                                  | Bajo     | Medio   |
| Baja     | Blog/guías                           | Alto     | Alto (a largo plazo) |
| Baja     | Admin pedidos                        | Medio    | Alto (operativo) |
| Baja     | Emails de pedido                     | Medio    | Alto    |
| Baja     | Pasarela de pago                     | Alto     | Crítico para venta real |
| Baja     | Analytics + Sentry                   | Bajo     | Alto (datos) |

Puedes usar este documento como hoja de ruta e ir marcando las que vayas implementando. Si quieres, en el siguiente paso podemos bajar al detalle de una de ellas (por ejemplo mini carrito, SEO o galería de producto) y te propongo cambios concretos en el código.
