# Imágenes de productos

**Sube aquí las fotos de los productos** (JPG, PNG o WebP).

- Cada archivo puede llamarse como el **slug** del producto, por ejemplo:
  - `semillas-amnesia.jpg`
  - `lampara-led-600w.jpg`
  - `aceite-cbd-10.jpg`
  - etc.

En `src/data/products.json` usa la ruta **empezando por /**:

```json
"images": ["/productos/semillas-amnesia.jpg"]
```

Si no hay imagen, se mostrará el placeholder: `/placeholder-product.svg`
