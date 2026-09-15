/* ============================================================
   ÁLBUM DIGITAL — LÓGICA
   No necesitas editar este archivo. Todo se controla
   desde config.js
   ============================================================ */

(function () {
  const cfg = window.ALBUM_CONFIG || {};
  const theme = cfg.theme || {};
  const pages = cfg.pages || [];

  /* ---------- Aplicar tema ---------- */
  const root = document.documentElement;
  const setVar = (name, val) => { if (val) root.style.setProperty(name, val); };
  setVar("--paper", theme.paper);
  setVar("--ink", theme.ink);
  setVar("--gray", theme.gray);
  setVar("--hairline", theme.hairline);
  setVar("--photo-filter", theme.photoFilter);
  setVar("--display", theme.displayFont);
  setVar("--label", theme.labelFont);
  if (theme.flipDuration) root.style.setProperty("--flip", theme.flipDuration + "ms");

  if (cfg.meta && cfg.meta.tabTitle) document.title = cfg.meta.tabTitle;
  if (cfg.meta && cfg.meta.favicon) {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href =
        "data:image/svg+xml," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${cfg.meta.favicon}</text></svg>`
        );
    }
  }

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function photoEl(src, cls) {
    if (!src) return `<div class="photo ${cls || ""}"></div>`;
    return `<div class="photo ${cls || ""}"><img src="${esc(src)}" alt="" loading="lazy"></div>`;
  }

  /* ---------- Renderizadores por tipo ---------- */
  const renderers = {

    portada(p) {
      return `
        <div class="page-inner">
          <div class="cover-photo">${p.photo ? `<img src="${esc(p.photo)}" alt="">` : ""}</div>
          <div class="cover-scrim"></div>
          <div class="cover-content">
            <div class="cover-masthead">${esc(p.masthead)}</div>
            <div class="cover-title">${esc(p.title)}</div>
            <div class="cover-sub">${esc(p.sub)}</div>
            <div class="cover-foot">
              <div class="cover-name">${esc(p.name)}</div>
              <div class="cover-issue">${esc(p.issue)}</div>
              <div class="cover-date">${esc(p.date)}</div>
            </div>
          </div>
        </div>`;
    },

    mosaico(p) {
      const grid = p.grid || "a";
      const imgs = (p.photos || [])
        .slice(0, 6)
        .map((src, i) => photoEl(src, "m" + (i + 1)))
        .join("");
      return `
        <div class="page-inner mosaic-page-inner">
          ${p.eyebrow ? `<div class="eyebrow">${esc(p.eyebrow)}</div>` : ""}
          <div class="mosaic grid-${esc(grid)}">${imgs}</div>
          ${p.note ? `<div class="mosaic-note">${esc(p.note)}</div>` : ""}
        </div>`;
    },

    editorial(p) {
      const cols = (p.columns || [])
        .map((c) => `<div class="editorial-col">${esc(c)}</div>`)
        .join("");
      return `
        <div class="page-inner">
          ${p.eyebrow ? `<div class="eyebrow">${esc(p.eyebrow)}</div>` : ""}
          <div class="display editorial-title">
            ${esc(p.title)}<span class="it">${esc(p.titleItalic)}</span>
          </div>
          <div class="editorial-body">
            ${p.photo ? photoEl(p.photo, "editorial-photo") : ""}
            ${cols}
          </div>
          ${p.quote ? `<div class="editorial-quote">${esc(p.quote)}</div>` : ""}
        </div>`;
    },

    razones(p) {
      const items = (p.items || [])
        .map(
          (t, i) => `
          <div class="razon">
            <div class="razon-n">${String(i + 1).padStart(1, "0")}</div>
            <div class="razon-t">${esc(t)}</div>
          </div>`
        )
        .join("");
      return `
        <div class="page-inner">
          <div class="display razones-title">
            ${esc(p.title)}<span class="it">${esc(p.titleItalic)}</span>
          </div>
          <div class="razones-list">${items}</div>
        </div>`;
    },

    calendario(p) {
      const cells = (p.days || [])
        .map((d) => {
          const on = String(d) === String(p.highlight);
          return `<div class="cal-cell${on ? " on" : ""}"><span class="cal-num">${esc(d)}</span></div>`;
        })
        .join("");
      return `
        <div class="page-inner">
          <div class="cal-head">${esc(p.month)}</div>
          <div class="cal-grid">${cells}</div>
          ${p.note ? `<div class="cal-note">${esc(p.note)}</div>` : ""}
        </div>`;
    },

    playlist(p) {
      const isPh = !p.url || p.url.indexOf("REEMPLAZA_ESTE_ID") !== -1 || !p.url.trim();
      return `
        <div class="page-inner playlist-page-inner">
          ${p.eyebrow ? `<div class="eyebrow">${esc(p.eyebrow)}</div>` : ""}
          <div class="display pl-title">
            ${esc(p.title)}<span class="it">${esc(p.titleItalic)}</span>
          </div>
          ${p.sub ? `<div class="pl-sub">${esc(p.sub)}</div>` : ""}
          <button class="pl-btn" data-pl-btn data-ph="${isPh}" data-url="${esc(p.url)}">
            ${esc(p.buttonLabel || "Escuchar en Spotify")}
          </button>
          <div class="pl-hint" data-pl-hint></div>
        </div>`;
    },

    final(p) {
      const word = String(p.word || "VOLTEA");
      const letters = word
        .split("")
        .map(
          (ch, i) =>
            `<span class="settled" style="animation-delay:${(i * 85)}ms, ${1200 + i * 85}ms">${esc(ch === " " ? "\u00A0" : ch)}</span>`
        )
        .join("");
      return `
        <div class="page-inner final-page-inner">
          <div class="final-ring r1"></div>
          <div class="final-ring r2"></div>
          <div class="final-ring r3"></div>
          <div class="final-sweep"></div>
          <div class="final-word">${letters}</div>
          ${p.caption ? `<div class="final-caption">${esc(p.caption)}</div>` : ""}
        </div>`;
    },
  };

  /* ---------- Construir el DOM ---------- */
  const book = document.getElementById("book");
  const dotsEl = document.getElementById("dots");
  const counterEl = document.getElementById("counter");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (theme.showDots === false) dotsEl.style.display = "none";
  if (theme.showCounter === false) counterEl.style.display = "none";

  const pageEls = pages.map((p) => {
    const el = document.createElement("div");
    el.className = "page" + (p.invert ? " invert" : "") + " " + (p.type || "") + "-page";
    const fn = renderers[p.type];
    el.innerHTML = fn ? fn(p) : `<div class="page-inner"></div>`;
    return el;
  });
  pageEls.forEach((el) => book.appendChild(el));

  /* ---------- Estado ---------- */
  let current = 0;
  try {
    const saved = localStorage.getItem("album-page");
    if (saved !== null) {
      const n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 0 && n < pages.length) current = n;
    }
  } catch (e) { /* sin localStorage, arrancamos en la portada */ }

  function bindPlaylist() {
    const btn = document.querySelector("[data-pl-btn]");
    if (!btn) return;
    const hint = document.querySelector("[data-pl-hint]");
    btn.onclick = () => {
      if (btn.getAttribute("data-ph") === "true") {
        if (hint) hint.textContent = "Falta poner el link en config.js";
        return;
      }
      window.open(btn.getAttribute("data-url"), "_blank", "noopener");
    };
  }

  function layout() {
    pageEls.forEach((el, i) => {
      el.classList.remove("is-current", "is-leaving", "is-hidden");
      if (i === current) el.classList.add("is-current");
      else if (i < current) el.classList.add("is-leaving");
      else el.classList.add("is-hidden");

      // reiniciar la animación del final cada vez que se llega a esa página
      const fin = el.querySelector(".final-page-inner");
      if (fin) {
        if (i === current) {
          fin.classList.remove("play");
          void fin.offsetWidth;
          fin.classList.add("play");
        } else {
          fin.classList.remove("play");
        }
      }
    });

    if (theme.showDots !== false) {
      dotsEl.innerHTML = pages
        .map((_, i) => `<span class="dot${i === current ? " active" : ""}"></span>`)
        .join("");
    }
    if (theme.showCounter !== false) {
      counterEl.textContent = `${current + 1} / ${pages.length}`;
    }

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pages.length - 1;

    bindPlaylist();

    try { localStorage.setItem("album-page", String(current)); } catch (e) {}
  }

  function goTo(i) {
    if (i < 0 || i >= pages.length) return;
    current = i;
    layout();
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft") goTo(current - 1);
  });

  let startX = null;
  const stage = document.getElementById("stage");
  stage.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
    startX = null;
  }, { passive: true });

  layout();
})();
