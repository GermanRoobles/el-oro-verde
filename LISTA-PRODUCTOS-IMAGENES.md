# Lista de productos – búsqueda de imágenes

Usa el **nombre en español** o el **término en inglés** para buscar fotos (Unsplash, Pexels, etc.).

| # | ID  | Nombre (ES) | Categoría   | Término búsqueda sugerido (EN)        |
|---|-----|--------------------------------|-------------|----------------------------------------|
| 1 | p1  | Semillas Feminizadas Amnesia  | cultivo     | cannabis seeds packet                  |
| 2 | p2  | Lámpara LED 600W Full Spectrum | cultivo     | LED grow light panel                   |
| 3 | p3  | Fertilizante Crecimiento 1L   | cultivo     | plant growth fertilizer bottle         |
| 4 | p4  | Sustrato Universal 50L        | cultivo     | soil bag substrate                     |
| 5 | p5  | Extractor 125mm 400m³/h       | cultivo     | inline fan extractor                  |
| 6 | p6  | Armario de cultivo 80x80x180  | cultivo     | grow tent reflective                   |
| 7 | p7  | Aceite CBD 10% 10ml           | cbd         | CBD oil bottle dropper                 |
| 8 | p8  | Flores CBD 5g                 | cbd         | CBD hemp flowers                       |
| 9 | p9  | Crema CBD 100ml               | cbd         | CBD cream jar skincare                 |
|10 | p10 | Papel RAW Classic 1¼          | parafernalia| rolling papers box RAW                 |
|11 | p11 | Bandeja liar madera RAW      | parafernalia| wooden rolling tray                    |
|12 | p12 | Conos RAW 1¼ - 32u           | parafernalia| pre rolled cones packet                |
|13 | p13 | Papel OCB Premium            | parafernalia| OCB rolling papers                     |
|14 | p14 | Blunt Juicy 2u               | parafernalia| blunt wraps                            |
|15 | p15 | Boquillas RAW 300u           | accesorios  | rolling paper tips filters             |
|16 | p16 | Filtros Jano 125u            | accesorios  | carbon filter                          |
|17 | p17 | Fundas silicona RAW          | accesorios  | silicone case papers                   |
|18 | p18 | Mechero Clipper recargable   | accesorios  | Clipper lighter                        |
|19 | p19 | Pack El Oro Verde Iniciación | accesorios  | starter pack rolling                   |
|20 | p20 | Macetas geotextiles 5L x5    | cultivo     | fabric grow pots                       |
|21 | p21 | Fertilizante Floración 1L    | cultivo     | flowering fertilizer bottle            |
|22 | p22 | Controlador de olores carbón | cultivo     | carbon filter odor                     |
|23 | p23 | Gominolas CBD 20mg           | cbd         | CBD gummies                            |
|24 | p24 | Vaporizador portátil         | parafernalia| portable vaporizer                      |
|25 | p25 | Aceite CBD 5% 30ml           | cbd         | CBD oil bottle                         |
|26 | p26 | Kit iniciación cultivo interior | cultivo  | grow tent kit LED                      |
|27 | p27 | Grinder metálico 4 partes    | accesorios  | metal herb grinder                     |
|28 | p28 | Bong cristal 30cm            | parafernalia| glass bong                              |
|29 | p29 | Resina CBD 1g                | cbd         | CBD resin extract                      |
|30 | p30 | Temporizador digital 24h     | cultivo     | digital timer plug                      |

---

## Por categoría

### Cultivo (13)
- Semillas Feminizadas Amnesia  
- Lámpara LED 600W Full Spectrum  
- Fertilizante Crecimiento 1L  
- Sustrato Universal 50L  
- Extractor 125mm 400m³/h  
- Armario de cultivo 80x80x180  
- Macetas geotextiles 5L x5  
- Fertilizante Floración 1L  
- Controlador de olores carbón  
- Kit iniciación cultivo interior  
- Temporizador digital 24h  

### CBD (7)
- Aceite CBD 10% 10ml  
- Flores CBD 5g  
- Crema CBD 100ml  
- Gominolas CBD 20mg  
- Aceite CBD 5% 30ml  
- Resina CBD 1g  

### Parafernalia (7)
- Papel RAW Classic 1¼  
- Bandeja liar madera RAW  
- Conos RAW 1¼ - 32u  
- Papel OCB Premium  
- Blunt Juicy 2u  
- Vaporizador portátil  
- Bong cristal 30cm  

### Accesorios (6)
- Boquillas RAW 300u  
- Filtros Jano 125u  
- Fundas silicona RAW  
- Mechero Clipper recargable  
- Pack El Oro Verde Iniciación  
- Grinder metálico 4 partes  

---

## Cómo usar las URLs en products.json

Cuando tengas la URL de cada imagen, en `src/data/products.json` sustituye el array `"images":["/placeholder-product.svg"]` por la URL, por ejemplo:

```json
"images":["https://images.unsplash.com/photo-xxxxx?w=600&q=80"]
```

Si usas Unsplash, añade el dominio en `next.config.ts` (ya está si usas `images.unsplash.com`).
