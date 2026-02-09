# Propuesta de eCommerce – El Oro Verde

Documento orientado a la empresa **El Oro Verde** para presentar la demo del sitio de venta online.

---

## Objetivo de la demo

Esta versión es una **prueba de concepto** para mostrar cómo podría funcionar un eCommerce actualizado para El Oro Verde: estructura de negocio (cultivo, CBD, parafernalia), experiencia de compra y requisitos legales básicos (verificación +18, aviso legal, privacidad, cookies).

No sustituye ni replica exactamente la web actual (eloroverde.com); sirve como base para valorar diseño, flujos y posibles mejoras.

---

## Qué incluye la demo

| Funcionalidad | Descripción |
|---------------|-------------|
| **Verificación de edad** | Pantalla de entrada +18; sin aceptar no se accede al catálogo. Cumplimiento habitual en growshops. |
| **Idiomas** | Español, catalán e inglés (selector en cabecera). |
| **Catálogo** | Categorías (Cultivo, CBD, Parafernalia, Accesorios), búsqueda, filtros por categoría, listado y ficha de producto. |
| **Carrito** | Añadir, modificar cantidades, eliminar. Se guarda en el navegador entre sesiones. |
| **Checkout** | Formulario de datos de envío y confirmación de pedido. **No se cobra**: es solo simulación. |
| **Confirmación de pedido** | Página de “Pedido recibido” con número de pedido. |
| **Cuenta de usuario** | Registro, inicio de sesión, “Mi cuenta” e historial de pedidos. |
| **Páginas legales** | Aviso legal, Política de privacidad y Cookies (textos plantilla con datos de contacto de El Oro Verde). |
| **Contacto** | Formulario y datos de contacto públicos (email, teléfono, direcciones Barcelona y Roquetas de Mar). |

---

## Qué no incluye (para una versión real)

- **Pago real**: no hay pasarela de pago (TPV, Stripe, etc.). Solo se registra el pedido y se muestra confirmación.
- **Stock real**: el stock es de prueba; no hay sincronización con almacén ni ERP.
- **Envíos reales**: no hay integración con mensajería ni cálculo de portes.
- **Emails**: no se envían correos de confirmación ni notificaciones.
- **Panel de administración**: no hay back-office para gestionar pedidos, productos o usuarios.
- **Imágenes reales**: los productos usan imágenes placeholder; en producción se sustituirían por las fotos reales.

---

## Posibles siguientes pasos

1. **Diseño e identidad**: adaptar colores, tipografías y maquetación a la imagen de marca definitiva.
2. **Contenido**: sustituir productos y textos de ejemplo por el catálogo y textos reales.
3. **Pagos**: integrar una pasarela de pago (por ejemplo Stripe o la que use la empresa).
4. **Stock y envíos**: conectar con gestión de almacén y con una API de mensajería para envíos.
5. **Emails**: enviar confirmación de pedido y, si se desea, comunicaciones comerciales (con consentimiento).
6. **Panel de administración**: desarrollo de un CMS o panel para gestionar pedidos, productos y clientes.
7. **Alojamiento y dominio**: desplegar en un servidor o plataforma (p. ej. Vercel) y configurar el dominio.

---

## Cómo probar la demo

1. Ejecutar el proyecto (ver README del repositorio).
2. Aceptar la verificación +18.
3. Navegar por inicio, tienda, categorías y fichas de producto.
4. Añadir productos al carrito y completar el checkout (con datos de prueba).
5. Registrarse o iniciar sesión con **demo@eloroverde.com** / **demo123** y revisar “Mi cuenta” e historial de pedidos.
6. Revisar páginas de Aviso legal, Privacidad, Cookies y Contacto.

---

*Documento de propuesta asociado al proyecto de demo. Los datos de contacto utilizados son los publicados por El Oro Verde (info@eloroverde.com, teléfono y direcciones).*
