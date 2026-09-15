/**
 * ============================================================
 *  ÁLBUM DIGITAL — CONFIGURACIÓN CENTRAL
 * ============================================================
 *  TODO lo editable vive aquí. No toques index.html, style.css
 *  ni app.js para nada: ni textos, ni colores, ni tipografías,
 *  ni el orden de las páginas.
 *
 *  Para agregar fotos:
 *    1. Copia la foto a src/img/
 *    2. Agrega o edita una página en el arreglo "pages"
 *    3. Guarda y recarga
 * ============================================================
 */

const ALBUM_CONFIG = {

  /* ---------------------------------------------------------
   * 1. GENERAL
   * ------------------------------------------------------- */
  meta: {
    tabTitle: "nuestro álbum",
    favicon: "🖤",
  },

  /* ---------------------------------------------------------
   * 2. TEMA — colores, tipografías y comportamiento visual
   * ------------------------------------------------------- */
  theme: {
    paper:    "#F2F0EC",   // fondo de las páginas claras
    ink:      "#0A0A0A",   // negro principal (texto y páginas oscuras)
    gray:     "#8C8A86",   // gris de apoyo para textos secundarios
    hairline: "#C9C6C0",   // líneas finas y bordes

    // Filtro aplicado a TODAS las fotos.
    // Déjalo así para el look blanco y negro de revista.
    // Si prefieres fotos a color, pon: "none"
    photoFilter: "grayscale(1) contrast(1.14) brightness(0.98)",

    // Tipografías (se cargan desde Google Fonts en index.html).
    // Si cambias de familia, actualiza también el <link> del HTML.
    displayFont: "'Playfair Display', Georgia, serif",
    labelFont:   "'Archivo Narrow', Helvetica, Arial, sans-serif",

    flipDuration: 700,   // velocidad del giro de página (ms)

    showDots: true,      // puntitos de navegación abajo
    showCounter: true,   // contador "3 de 9"
  },

  /* ---------------------------------------------------------
   * 3. PÁGINAS
   * ------------------------------------------------------- *
   *  El orden de este arreglo es el orden real del álbum.
   *  Puedes mover, borrar o duplicar cualquier bloque.
   *
   *  "invert: true"  -> página negra con texto blanco
   *  "invert: false" -> página de papel claro con texto negro
   *
   *  TIPOS DISPONIBLES:
   *    "portada"     Portada tipo revista (foto de fondo)
   *    "mosaico"     Rejilla densa de fotos. grid: "a" | "b" | "c" | "d"
   *                    a = 5 fotos   b = 4 fotos
   *                    c = 6 fotos   d = 3 fotos
   *    "editorial"   Texto a dos columnas con foto y cita destacada
   *    "razones"     Lista numerada
   *    "calendario"  Rejilla de fechas con un día marcado
   *    "playlist"    Botón a Spotify
   *    "final"       La palabra grande con animación
   * ------------------------------------------------------- */
  pages: [

    /* ---------- PORTADA ---------- */
    {
      type: "portada",
      invert: true,
      photo: "src/img/01.jpg",
      masthead: "NUESTRO",
      title: "Álbum",
      sub: "EDICIÓN ESPECIAL",
      name: "[SU NOMBRE]",
      issue: "N.º 01",
      date: "15 · SEPTIEMBRE · 2026",
    },

    /* ---------- MOSAICO ---------- */
    {
      type: "mosaico",
      invert: true,
      grid: "a",
      photos: [
        "src/img/02.jpg",
        "src/img/03.jpg",
        "src/img/04.jpg",
        "src/img/05.jpg",
        "src/img/06.jpg",
      ],
      eyebrow: "CAPÍTULO UNO",
      note: "Los primeros días, cuando todo era nuevo y ninguno de los dos sabía en qué se estaba metiendo.",
    },

    /* ---------- EDITORIAL ---------- */
    {
      type: "editorial",
      invert: false,
      eyebrow: "PERFIL",
      title: "¿Quién eres tú",
      titleItalic: "para mí?",
      photo: "src/img/07.jpg",
      columns: [
        "Escribe aquí lo que quieras: cómo la conociste, qué fue lo primero que pensaste, qué cambió desde entonces. Entre más específico, mejor queda.",
        "Esta es la segunda columna. Puede seguir la misma idea o contar otra cosa distinta.",
      ],
      quote: "Y si alguien me preguntara qué es la perfección para mí, siempre te señalaría a ti.",
    },

    /* ---------- MOSAICO 2 ---------- */
    {
      type: "mosaico",
      invert: false,
      grid: "c",
      photos: [
        "src/img/08.jpg",
        "src/img/09.jpg",
        "src/img/10.jpg",
        "src/img/11.jpg",
        "src/img/12.jpg",
        "src/img/02.jpg",
      ],
      eyebrow: "MOMENTOS FAVORITOS",
      note: "Los momentos favoritos casi nunca son los que estaban planeados.",
    },

    /* ---------- RAZONES ---------- */
    {
      type: "razones",
      invert: false,
      title: "Razones por",
      titleItalic: "las que te amo",
      items: [
        "Escribe aquí la primera razón. Que sea concreta, no bonita.",
        "La segunda razón va aquí.",
        "La tercera.",
        "La cuarta.",
      ],
    },

    /* ---------- CALENDARIO ---------- */
    {
      type: "calendario",
      invert: false,
      month: "SEPTIEMBRE",
      days: ["01", "02", "03", "04", "08", "09", "10", "15"],
      highlight: "15",
      note: "El día que te lo pedí.",
    },

    /* ---------- PLAYLIST ---------- */
    {
      type: "playlist",
      invert: true,
      eyebrow: "BANDA SONORA",
      title: "Nuestra",
      titleItalic: "playlist",
      sub: "Cada canción tiene un sobre.",
      // 👇 PEGA AQUÍ EL LINK REAL DE TU PLAYLIST DE SPOTIFY
      url: "https://open.spotify.com/playlist/REEMPLAZA_ESTE_ID",
      buttonLabel: "ESCUCHAR EN SPOTIFY",
    },

    /* ---------- FINAL ---------- */
    {
      type: "final",
      invert: true,
      word: "VOLTEA",
      caption: "",
    },

  ],
};
