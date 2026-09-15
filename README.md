# Nuestro álbum

Revista digital interactiva, monocroma, con páginas que giran.
**Todo lo editable vive en `config.js`.** No necesitas tocar `index.html`,
`style.css` ni `app.js` para nada.

Es un sitio 100% estático (HTML + CSS + JS, sin build, sin Node, sin React),
así que corre gratis en Vercel, Cloudflare Pages, Netlify o GitHub Pages sin
ninguna configuración.

---

## Qué puedes cambiar en `config.js`

**Seccion `theme`** — colores, tipografias, filtro de las fotos, velocidad del
giro de pagina, y si se muestran los puntitos y el contador.

Para pasar las fotos a color en vez de blanco y negro:
```js
photoFilter: "none",
```

**Seccion `pages`** — el orden de este arreglo **es** el orden del album.
Mueve, borra o duplica bloques libremente.

Cada pagina acepta `invert: true` (fondo negro, texto blanco) o
`invert: false` (papel claro, texto negro). Alternar entre las dos es lo que
le da el ritmo de revista.

---

## Tipos de pagina

| Tipo | Para que sirve | Fotos que usa |
|---|---|---|
| `portada` | Portada tipo revista, foto a sangre completa | 1 |
| `mosaico` | Rejilla densa de fotos | segun `grid` |
| `editorial` | Texto a dos columnas con foto y cita destacada | 1 |
| `razones` | Lista numerada | 0 |
| `calendario` | Rejilla de fechas con un dia marcado | 0 |
| `playlist` | Boton a Spotify | 0 |
| `final` | La palabra grande animada | 0 |

### Rejillas de `mosaico`

El campo `grid` define la composicion, y **cada una espera un numero exacto
de fotos**:

- `"a"` → **5 fotos** (una vertical grande a la izquierda)
- `"b"` → **4 fotos** (2x2)
- `"c"` → **6 fotos** (composicion asimetrica)
- `"d"` → **3 fotos** (una grande arriba, dos abajo)

Si pones menos fotos de las que espera la rejilla, quedan huecos.
Si pones mas, las sobrantes no se muestran.

---

## Agregar fotos nuevas

1. Copia tus fotos a `src/img/`
2. Agrega un bloque nuevo al arreglo `pages`:

```js
{
  type: "mosaico",
  invert: true,
  grid: "d",
  photos: ["src/img/13.jpg", "src/img/14.jpg", "src/img/15.jpg"],
  eyebrow: "CAPITULO DOS",
  note: "Escribe aqui el pie de foto.",
},
```

3. Guarda y recarga. Listo.

**Tip:** las imagenes `01.jpg` a `12.jpg` que vienen incluidas son
marcadores de posicion. Si sobrescribes esos archivos con tus fotos reales
usando el mismo nombre, no tienes que cambiar nada en `config.js`.

**Tamano recomendado:** fotos verticales de ~1000x1250 px. Comprimelas antes
de subirlas (squoosh.app es gratis) para que el album cargue rapido en celular.

---

## Ver el album en tu computadora

Abre una terminal en esta carpeta y corre:

```bash
python3 -m http.server 8000
```

Luego entra a `http://localhost:8000`.

(Abrir `index.html` con doble clic tambien funciona, pero algunos navegadores
bloquean las imagenes locales por seguridad; con el servidor no pasa.)

---

## Publicarlo gratis con tu propio link

### Opcion 1 — Cloudflare Pages (recomendada)
1. Entra a `dash.cloudflare.com` → Workers & Pages → Create → Pages
2. Elige "Upload assets" y arrastra esta carpeta completa
3. Build command: **dejalo vacio**. Output directory: **`/`**
4. Te da un link tipo `https://tu-album.pages.dev`

### Opcion 2 — Vercel
1. Entra a `vercel.com` → Add New → Project
2. Arrastra la carpeta completa (o conectala a un repo de GitHub)
3. Framework Preset: **Other**. Build command: **vacio**
4. Te da un link tipo `https://tu-album.vercel.app`

### Opcion 3 — Netlify Drop
1. Entra a `app.netlify.com/drop`
2. Arrastra la carpeta. Link inmediato, sin cuenta.

En las tres, **el link no cambia aunque despues subas fotos nuevas** — asi que
el QR que imprimas hoy sigue funcionando para siempre.

---

## Notas tecnicas

- Las tipografias (Playfair Display y Archivo Narrow) se cargan desde Google
  Fonts via el `<link>` en `index.html`. Si quieres cambiarlas, actualiza ese
  `<link>` y los campos `displayFont` / `labelFont` en `config.js`.
- El album recuerda en que pagina te quedaste usando `localStorage`. Si quieres
  que siempre abra en la portada, borra ese bloque en `app.js`.
- Respeta `prefers-reduced-motion`: si el sistema de quien lo ve tiene las
  animaciones desactivadas, el album funciona igual pero sin movimiento.
