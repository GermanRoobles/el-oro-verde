# El Oro Verde – eCommerce demo

Demo de eCommerce para **El Oro Verde** (eloroverde.com), growshop de cultivo, CBD y parafernalia.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La primera vez verás la comprobación de edad (+18). Tras aceptar, accedes al catálogo.

## Build para producción

```bash
npm run build
npm start
```

## Contenido de la demo

- **Verificación +18**: pantalla de entrada; sin aceptar no se muestra el catálogo.
- **Idiomas**: ES / CA / EN (selector en el header).
- **Catálogo**: listado por categorías (Cultivo, CBD, Parafernalia, Accesorios), búsqueda y filtros.
- **Producto**: ficha con precio, ofertas, añadir al carrito.
- **Carrito**: persistente (localStorage), modificar cantidades y eliminar.
- **Checkout**: formulario de envío; **no hay pasarela de pago real**. Al confirmar se registra el pedido y se muestra la página de confirmación.
- **Usuario**: registro, login, “Mi cuenta” e historial de pedidos (solo si has iniciado sesión).
- **Legales**: Aviso legal, Privacidad, Cookies.
- **Contacto**: formulario y datos públicos de El Oro Verde.

## Credenciales de prueba

- **Email:** demo@eloroverde.com  
- **Contraseña:** demo123  

Con este usuario puedes ver “Mi cuenta” y el historial de pedidos de ejemplo.

## Estructura del proyecto

- `src/app/` – Páginas (App Router) y API routes.
- `src/components/` – Header, Footer, AgeGate.
- `src/context/` – LocaleContext (i18n).
- `src/store/` – Zustand (carrito, verificación edad).
- `src/data/` – JSON de categorías, productos, usuarios y pedidos.
- `src/i18n/` – Traducciones ES/CA/EN.
- `src/lib/` – Lectura/escritura de datos (data.ts).
- `src/types/` – Tipos TypeScript.

## Datos

Los datos se leen y escriben en `src/data/*.json`. Los pedidos nuevos se añaden a `orders.json`. Los usuarios registrados se añaden a `users.json`. No hay base de datos externa.

## Despliegue

Compatible con Vercel u otro host de Next.js. En entornos serverless, las escrituras en `src/data/*.json` pueden no persistir entre ejecuciones; para producción se recomienda sustituir por una base de datos o almacenamiento persistente.
