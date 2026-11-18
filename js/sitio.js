/* =====================================================================
   Darlene López Vázquez · Portafolio de TI
   Todo el contenido vive en contenido/*.json y se edita desde /entrar.
   Este archivo arma la página y le da movimiento.
   ===================================================================== */
(() => {
"use strict";

const ARCHIVOS = ["general", "perfil", "experiencia", "destacado", "proyectos", "habilidades", "sobre-mi", "aporto", "proceso", "contacto"];
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
/* *texto* → texto resaltado en rojo */
const em = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
const txt = (sel, v) => { const el = $(sel); if (el) el.textContent = v ?? ""; };
const htm = (sel, v) => { const el = $(sel); if (el) el.innerHTML = v ?? ""; };
const lista = v => Array.isArray(v) ? v.filter(x => x !== null && x !== undefined && x !== "") : [];
const externo = u => /^https?:\/\//.test(u || "");
const destino = u => externo(u) ? ` target="_blank" rel="noopener"` : "";
/* Las imágenes del panel se guardan como "/media/..." o "media/...": se usan relativas para que el sitio funcione en cualquier carpeta */
const ruta = u => String(u || "").replace(/^\/(?=media\/|cv\/)/, "");
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
const conMouse = matchMedia("(hover: hover) and (pointer: fine)").matches;

const ICO = {
  ubicacion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  escuela: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm0-21.6A11.8 11.8 0 0 0 1.8 17.9L.2 23.8l6-1.6A11.8 11.8 0 1 0 12 .2z"/></svg>`,
  correo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  descargar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>`,
  externo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`
};

/* Las invitaciones y recuperaciones de contraseña de Netlify llegan a la portada:
   se carga el widget solo en ese caso y se manda al panel. */
if (/(invite|recovery|confirmation|email_change)_token/.test(location.hash)) {
  const s = document.createElement("script");
  s.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  s.onload = () => {
    window.netlifyIdentity.on("init", u => { if (!u) window.netlifyIdentity.on("login", () => { location.href = "entrar/"; }); });
    window.netlifyIdentity.init();
  };
  document.head.appendChild(s);
}

async function cargar() {
  const resp = await Promise.all(ARCHIVOS.map(n =>
    fetch(`contenido/${n}.json`, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(n); return r.json(); })));
  return Object.fromEntries(ARCHIVOS.map((n, i) => [n.replace(/-/g, "_"), resp[i]]));
}

function pintar(D) {
  const G = D.general || {}, P = D.perfil || {}, E = D.experiencia || {}, X = D.destacado || {}, PR = D.proyectos || {},
        H = D.habilidades || {}, S = D.sobre_mi || {}, A = D.aporto || {}, PS = D.proceso || {}, C = D.contacto || {};
  const cv = ruta(P.cv);

  /* SEO y colores */
  if (G.seo?.titulo) document.title = G.seo.titulo;
  if (G.seo?.descripcion) $('meta[name="description"]').setAttribute("content", G.seo.descripcion);
  const raiz = document.documentElement.style, col = G.colores || {};
  if (col.tinta) { raiz.setProperty("--tinta", col.tinta); raiz.setProperty("--oscuro", col.tinta); }
  if (col.rojo) { raiz.setProperty("--rojo", col.rojo); raiz.setProperty("--rojo-claro", `color-mix(in srgb, ${col.rojo} 13%, #fff)`); }
  if (col.rosa) raiz.setProperty("--rosa", col.rosa);
  if (col.fondo) raiz.setProperty("--papel", col.fondo);

  /* Secciones visibles y menú */
  const vis = Object.assign({ vitrina: true, experiencia: true, destacado: true, proyectos: true, habilidades: true, sobre: true, aporto: true, proceso: true, contacto: true }, G.secciones || {});
  Object.entries(vis).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.hidden = !v; });
  const MENU = [["experiencia", "Experiencia"], ["destacado", "Strong Gym"], ["proyectos", "Proyectos"], ["habilidades", "Habilidades"], ["sobre", "Sobre mí"], ["contacto", "Contacto"]];
  htm("#menu", MENU.filter(([id]) => vis[id]).map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join(""));

  /* Barra y botones del CV */
  htm("#logo", `<b>${esc(P.iniciales || "DL")}</b><span>${esc(P.nombre)} ${esc((P.apellido || "").split(" ")[0])}</span>`);
  [["#btn-barra", G.boton_barra || "Descargar CV"], ["#h-btn2", P.boton_2 || "Descargar CV"]].forEach(([sel, t]) => {
    const b = $(sel); if (!b) return;
    if (cv) { b.href = cv; b.innerHTML = `${ICO.descargar}${esc(t)}`; } else b.hidden = true;
  });
  txt("#pie", G.pie);
  $(".intro-nombre").textContent = `${P.nombre || ""} ${(P.apellido || "").split(" ")[0]}`.trim();
  $(".intro-logo").textContent = P.iniciales || "DL";

  /* Inicio: saludo letra por letra, con el nombre en rojo */
  txt("#h-disponible", P.disponibilidad); $("#h-disponible").hidden = !P.disponibilidad;
  const saludo = P.saludo || `Hola, soy ${P.nombre}.`;
  const letras = (t, d0) => [...t].map((c, i) => c === " " ? " " : `<span class="letra" style="animation-delay:${(d0 + i * 0.035).toFixed(3)}s">${esc(c)}</span>`).join("");
  const k = P.nombre ? saludo.indexOf(P.nombre) : -1;
  htm("#h-saludo", k < 0 ? letras(saludo, .1) :
    `${letras(saludo.slice(0, k), .1)}<span class="nombre">${letras(saludo.slice(k, k + P.nombre.length), .1 + k * .035)}</span>${letras(saludo.slice(k + P.nombre.length), .1 + (k + P.nombre.length) * .035)}`);
  $("#h-saludo").setAttribute("aria-label", saludo);
  txt("#h-rol", P.rol); txt("#h-intro", P.intro);
  /* Idiomas visibles desde el inicio (primero los que no son nativos) */
  const idi = lista(H.idiomas).slice().sort((a, b) => (/nativo/i.test(a.nivel) ? 1 : 0) - (/nativo/i.test(b.nivel) ? 1 : 0));
  htm("#h-idiomas", idi.map(i => `<li class="${/nativo/i.test(i.nivel) ? "" : "destaca"}"><b>${esc(i.idioma)}</b><span>${esc(i.nivel)}</span></li>`).join(""));
  $("#h-idiomas").hidden = !idi.length;
  txt("#h-btn1", P.boton_1 || "Ver proyectos");
  htm("#h-datos", [
    P.ubicacion && `<li>${ICO.ubicacion}${esc(P.ubicacion)}</li>`,
    P.escuela && `<li>${ICO.escuela}${esc(P.escuela)}</li>`,
    P.github && `<li>${ICO.github}<a href="${esc(P.github)}" target="_blank" rel="noopener">GitHub</a></li>`,
    P.linkedin && `<li>${ICO.linkedin}<a href="${esc(P.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>`
  ].filter(Boolean).join(""));
  htm("#foto-principal", P.foto ? `<img src="${esc(ruta(P.foto))}" alt="${esc(P.nombre_completo || P.nombre)}" fetchpriority="high">` : "");
  txt("#palabra-fondo", P.palabra_fondo || (P.nombre || "").toUpperCase());
  txt("#sello-texto", P.sello); txt("#sello-iniciales", P.iniciales);
  /* Etiquetas que se pueden arrastrar alrededor de la foto */
  const POS = [[-6, 4], [72, 10], [-14, 44], [80, 46], [62, 78], [40, 94], [30, -6], [84, 88]];
  htm("#stickers", lista(P.stickers).slice(0, 8).map((s, i) => {
    const [x, y] = POS[i % POS.length], rot = ((i * 37) % 13) - 6;
    return `<span class="sticker" style="left:${x}%;top:${y}%;rotate:${rot}deg">${esc(s)}</span>`;
  }).join(""));

  /* Cintas en movimiento */
  const cinta = (sel, items) => { const h = lista(items).map(t => `<span>${esc(t)}</span>`).join(""); htm(sel, h + h + h + h); };
  cinta("#cinta1", P.cinta1); cinta("#cinta2", P.cinta2);
  $(".cintas").hidden = !lista(P.cinta1).length && !lista(P.cinta2).length;

  /* Vitrina con pestañas */
  txt("#v-titulo", P.vitrina_titulo || "Proyectos funcionando"); txt("#v-texto", P.vitrina_texto);
  const tabs = lista(P.ventana).filter(t => t.imagen);
  $("#vitrina").hidden = !tabs.length || !vis.vitrina;
  htm("#pestanas", tabs.map((t, i) => `<button class="pestana" type="button" role="tab" aria-controls="ventana-pantalla" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(t.pestana)}</button>`).join(""));
  htm("#ventana-pantalla", tabs.map((t, i) => `<img src="${esc(ruta(t.imagen))}" alt="Captura de ${esc(t.pestana)}" class="${i === 0 ? "activa" : ""}" loading="lazy">`).join(""));
  const elegirTab = i => {
    const t = tabs[i]; if (!t) return;
    $$("#pestanas .pestana").forEach((b, j) => { b.setAttribute("aria-selected", j === i); b.tabIndex = j === i ? 0 : -1; });
    $$("#ventana-pantalla img").forEach((im, j) => im.classList.toggle("activa", j === i));
    const real = /real|social|práctica/i.test(t.etiqueta || "");
    htm("#ventana-pie", `${t.etiqueta ? `<span class="insignia ${real ? "real" : ""}">${esc(t.etiqueta)}</span>` : ""}<p>${esc(t.texto)}</p>${t.destino ? `<a href="${esc(t.destino)}"${destino(t.destino)}>Ver más</a>` : ""}`);
  };
  $("#pestanas").addEventListener("click", e => { const b = e.target.closest(".pestana"); if (b) elegirTab($$("#pestanas .pestana").indexOf(b)); });
  $("#pestanas").addEventListener("keydown", e => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const bs = $$("#pestanas .pestana"), i = bs.indexOf(document.activeElement); if (i < 0) return;
    const j = (i + (e.key === "ArrowRight" ? 1 : -1) + bs.length) % bs.length; elegirTab(j); bs[j].focus();
  });
  elegirTab(0);

  /* Experiencia */
  txt("#e-titulo", E.titulo); txt("#e-sub", E.subtitulo);
  htm("#puestos", lista(E.puestos).map(p => {
    const actual = /curso|actual/i.test(p.periodo || "");
    return `<li class="puesto rev ${actual ? "actual" : ""}">
      <div>
        <div class="puesto-meta"><span class="insignia ${actual ? "real" : ""}">${esc(p.periodo)}</span>${p.lugar ? `<span>${esc(p.lugar)}</span>` : ""}</div>
        <h3>${esc(p.organizacion)}</h3>
        <p class="cargo">${esc(p.puesto)}</p>
        <p class="desc">${em(p.descripcion)}</p>
        <ul class="logros">${lista(p.logros).map(l => `<li>${em(l)}</li>`).join("")}</ul>
        <ul class="tecs">${lista(p.tecnologias).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        ${p.link ? `<a class="enlace" href="${esc(p.link)}"${destino(p.link)}>${esc(p.link_texto || "Ver proyecto")}${externo(p.link) ? ICO.externo : ""}</a>` : ""}
      </div>
      ${p.imagen ? `<figure class="captura"><div class="marco" data-tilt><img src="${esc(ruta(p.imagen))}" alt="${esc(p.pie_imagen || p.organizacion)}" loading="lazy"></div>${p.pie_imagen ? `<figcaption>${esc(p.pie_imagen)}</figcaption>` : ""}</figure>` : "<div></div>"}
    </li>`;
  }).join(""));

  /* Caso destacado */
  txt("#d-titulo", X.titulo); txt("#d-contexto", X.contexto); txt("#d-solucion", X.solucion);
  htm("#d-numeros", lista(X.numeros).map(n => `<div class="numero"><b data-numero="${esc(n.numero)}">${esc(n.numero)}</b><span>${esc(n.texto)}</span></div>`).join(""));
  $("#d-numeros").hidden = !lista(X.numeros).length;
  const caps = lista(X.capturas).filter(c => c.imagen);
  $("#galeria").hidden = !caps.length;
  htm("#galeria-miniaturas", caps.map((c, i) => `<button class="miniatura" type="button" role="tab" aria-selected="${i === 0}" aria-label="${esc(c.pie)}"><img src="${esc(ruta(c.imagen))}" alt="" loading="lazy"></button>`).join(""));
  const elegirCaptura = i => {
    const c = caps[i]; if (!c) return;
    htm("#galeria-principal", `<figure style="margin:0"><div class="marco"><img src="${esc(ruta(c.imagen))}" alt="${esc(c.pie)}"></div><figcaption>${esc(c.pie)}</figcaption></figure>`);
    $$("#galeria-miniaturas .miniatura").forEach((b, j) => b.setAttribute("aria-selected", j === i));
  };
  $("#galeria-miniaturas").addEventListener("click", e => { const b = e.target.closest(".miniatura"); if (b) elegirCaptura($$("#galeria-miniaturas .miniatura").indexOf(b)); });
  elegirCaptura(0);
  const AQ = X.arquitectura || {};
  txt("#d-local", AQ.local); txt("#d-flujo", AQ.flujo); txt("#d-nube", AQ.nube);
  $(".arquitectura").hidden = !AQ.local && !AQ.nube;
  htm("#d-funciones", lista(X.funciones).map(f => `<li class="rev"><h3>${esc(f.titulo)}</h3><p>${em(f.texto)}</p></li>`).join(""));
  htm("#d-ficha", lista(X.ficha).map(f => `<div><dt>${esc(f.dato)}</dt><dd>${esc(f.valor)}</dd></div>`).join(""));
  txt("#d-nota", X.nota);
  const dl = $("#d-link");
  if (X.link) { dl.href = X.link; dl.innerHTML = `${esc(X.link_texto || "Ver proyecto")} ${ICO.externo}`; } else dl.hidden = true;
  lista(X.links_extra).filter(l => l.url).forEach(l => dl.insertAdjacentHTML("afterend",
    `<a class="enlace" style="display:block;color:#fff;margin-top:1rem" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.texto)} ${ICO.externo}</a>`));

  /* Proyectos personales */
  txt("#p-titulo", PR.titulo); txt("#p-sub", PR.subtitulo);
  const proyectos = lista(PR.proyectos);
  const cats = [...new Set(proyectos.flatMap(p => lista(p.categorias)))];
  const cuenta = c => proyectos.filter(p => c === "Todos" || lista(p.categorias).includes(c)).length;
  htm("#filtros", ["Todos", ...cats].map((c, i) => `<button class="filtro" type="button" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}<span>${cuenta(c)}</span></button>`).join(""));
  $("#filtros").hidden = cats.length < 2;
  const codigo = s => esc(s)
    .replace(/^(GET|POST|PUT|DELETE|PATCH|CREATE TABLE|wrangler deploy)/gm, `<span class="verbo">$1</span>`)
    .replace(/^(✓.*)$/gm, `<span class="ok">$1</span>`);
  htm("#rejilla", proyectos.map(p => {
    const vista = p.imagen
      ? `<div class="vista"><div class="mini-barra"><i></i><i></i><i></i></div><img src="${esc(ruta(p.imagen))}" alt="Captura de ${esc(p.nombre)}" loading="lazy"></div>`
      : `<div class="vista codigo" aria-hidden="true"><div class="mini-barra"><i></i><i></i><i></i></div><pre>${codigo(p.codigo || p.nombre)}</pre></div>`;
    const links = [
      p.demo && `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Ver en vivo ${ICO.externo}</a>`,
      p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener">${ICO.github} Código</a>`
    ].filter(Boolean);
    return `<article class="proyecto" data-cats="${esc(lista(p.categorias).join("|"))}">
      ${vista}
      <h3>${esc(p.nombre)}</h3>
      <p class="resumen">${em(p.resumen)}</p>
      ${p.descripcion ? `<details><summary>Qué hace</summary><p>${em(p.descripcion)}</p></details>` : ""}
      <ul class="tecs">${lista(p.tecnologias).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="links">${links.length ? links.join("") : `<span class="local">Código disponible a solicitud</span>`}</div>
    </article>`;
  }).join(""));
  $("#filtros").addEventListener("click", e => {
    const b = e.target.closest(".filtro"); if (!b) return;
    $$("#filtros .filtro").forEach(o => o.setAttribute("aria-pressed", o === b));
    const c = b.dataset.cat;
    $$("#rejilla .proyecto").forEach(a => { a.hidden = c !== "Todos" && !a.dataset.cats.split("|").includes(c); });
  });

  /* Lo que aporto: cada palabra es un span para iluminarla al bajar */
  const partes = String(A.cita || "").split(/(\*[^*]+\*)/).filter(Boolean);
  htm("#cita", partes.map(p => {
    const res = /^\*.*\*$/.test(p), t = res ? p.slice(1, -1) : p;
    return t.split(/(\s+)/).map(w => /^\s+$/.test(w) || !w ? w : `<span class="palabra ${res ? "resalta" : ""}">${esc(w)}</span>`).join("");
  }).join(""));
  htm("#razones", lista(A.razones).map(r => `<div class="razon rev"><h3>${esc(r.titulo)}</h3><p>${em(r.texto)}</p></div>`).join(""));

  /* Habilidades y formación */
  txt("#h-titulo", H.titulo);
  htm("#grupos", lista(H.grupos).map(g => `<div class="grupo rev"><dt>${esc(g.nombre)}</dt><dd>${lista(g.items).map(i => `<span>${esc(i)}</span>`).join("")}</dd></div>`).join(""));
  const ed = H.educacion || {};
  htm("#educacion", `<h3>Formación</h3><b>${esc(ed.carrera)}</b><p class="escuela">${esc(ed.escuela)}</p><p class="periodo">${esc(ed.periodo)}</p>${ed.materias ? `<p class="materias"><b>Materias destacadas:</b> ${esc(ed.materias)}</p>` : ""}`);
  htm("#certs", lista(H.certificaciones).map(c => `<li><b>${esc(c.nombre)}</b>${c.fecha ? `<time>${esc(c.fecha)}</time>` : ""}<small>${esc(c.emisor)}</small></li>`).join(""));
  htm("#idiomas", lista(H.idiomas).map(i => `<li><b>${esc(i.idioma)}</b><span>${esc(i.nivel)}</span></li>`).join(""));

  /* Sobre mí */
  txt("#s-titulo", S.titulo);
  htm("#s-parrafos", lista(S.parrafos).map(p => `<p class="rev">${em(p)}</p>`).join(""));
  htm("#fotos", lista(S.fotos).filter(f => f.foto).slice(0, 2).map(f => `<figure class="foto"><img src="${esc(ruta(f.foto))}" alt="${esc(f.pie || P.nombre)}" loading="lazy"><figcaption>${esc(f.pie)}</figcaption></figure>`).join(""));
  txt("#s-int-titulo", S.intereses_titulo || "Me interesa");
  htm("#s-intereses", lista(S.intereses).map(i => `<li>${esc(i)}</li>`).join(""));
  txt("#s-apr-titulo", S.aprender_titulo || "Lo que quiero aprender");
  htm("#s-aprender", lista(S.aprender).map(i => `<li>${em(i)}</li>`).join(""));

  /* Cómo trabajo */
  txt("#pr-titulo", PS.titulo);
  htm("#pasos", lista(PS.pasos).map(p => `<li class="paso rev"><h3>${esc(p.titulo)}</h3><p>${em(p.texto)}</p></li>`).join(""));

  /* Contacto */
  txt("#c-titulo", C.titulo); txt("#c-sub", C.subtitulo);
  const mail = `mailto:${P.correo}?subject=${encodeURIComponent(C.asunto || "Contacto")}`;
  const ct = $("#correo-texto"); ct.textContent = P.correo; ct.href = mail;
  txt("#copiar", C.boton_copiar || "Copiar correo");
  htm("#enlaces", [
    `<a href="${esc(mail)}">${ICO.correo}${esc(C.boton_escribir || "Escribir correo")}</a>`,
    P.whatsapp && `<a href="https://wa.me/${esc(String(P.whatsapp).replace(/\D/g, ""))}" target="_blank" rel="noopener">${ICO.whatsapp}WhatsApp ${esc(P.telefono)}</a>`,
    P.linkedin && `<a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${ICO.linkedin}LinkedIn</a>`,
    P.github && `<a href="${esc(P.github)}" target="_blank" rel="noopener">${ICO.github}GitHub</a>`,
    cv && `<a href="${esc(cv)}" download>${ICO.descargar}Descargar CV</a>`
  ].filter(Boolean).join(""));
  $("#copiar").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(P.correo); aviso("Correo copiado"); }
    catch { const r = document.createRange(); r.selectNodeContents(ct); const s = getSelection(); s.removeAllRanges(); s.addRange(r); aviso("Selecciona y copia el correo"); }
  });
}

function aviso(t) { const a = $("#aviso"); a.textContent = t; a.classList.add("ver"); clearTimeout(aviso.t); aviso.t = setTimeout(() => a.classList.remove("ver"), 2200); }

/* =====================================================================
   Intro (una vez por visita)
   ===================================================================== */
function intro(listo) {
  const el = $("#intro");
  let vista = false;
  try { vista = sessionStorage.getItem("dl-intro") === "1"; } catch { /* sin almacenamiento */ }
  if (reducido || vista) { listo(); return; }
  try { sessionStorage.setItem("dl-intro", "1"); } catch { /* sin almacenamiento */ }
  document.body.classList.add("con-intro");
  el.classList.add("jugando");
  let hecho = false;
  const fin = () => {
    if (hecho) return; hecho = true;
    el.classList.add("saliendo");
    setTimeout(() => { document.body.classList.remove("con-intro"); el.classList.add("fuera"); }, 650);
    listo();
  };
  setTimeout(fin, 1500);
  el.addEventListener("click", fin);
  addEventListener("keydown", fin, { once: true });
}

/* =====================================================================
   Movimiento e interacción
   ===================================================================== */
function mover() {
  /* Barra: transparente sobre la portada, sólida al bajar */
  const barra = $("#barra"), hero = $("#inicio");
  const alScroll = () => barra.classList.toggle("solida", scrollY > hero.offsetHeight - 80);
  addEventListener("scroll", alScroll, { passive: true }); alScroll();

  /* Menú en celular */
  const boton = $("#menu-boton"), menu = $("#menu");
  const cerrar = () => { menu.classList.remove("abierto"); boton.setAttribute("aria-expanded", "false"); };
  boton.addEventListener("click", e => { e.stopPropagation(); const a = menu.classList.toggle("abierto"); boton.setAttribute("aria-expanded", a); });
  menu.addEventListener("click", e => { if (e.target.closest("a")) cerrar(); });
  document.addEventListener("click", e => { if (!e.target.closest(".barra nav")) cerrar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });

  /* Aparecer al bajar */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("ver"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  $$(".rev").forEach(el => io.observe(el));

  /* Contadores */
  const ioNum = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; ioNum.unobserve(e.target);
    const el = e.target, fin = parseFloat(el.dataset.numero);
    if (!isFinite(fin) || reducido) return;
    const t0 = performance.now(), dur = 1400;
    const paso = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
  }), { threshold: .6 });
  $$("[data-numero]").forEach(el => ioNum.observe(el));

  /* Frase que se ilumina palabra por palabra al bajar */
  const palabras = $$("#cita .palabra"), cita = $("#cita");
  const iluminar = () => {
    if (!cita || !palabras.length) return;
    const r = cita.getBoundingClientRect(), vh = innerHeight;
    const p = reducido ? 1 : Math.min(Math.max((vh * .85 - r.top) / (r.height + vh * .35), 0), 1);
    const n = Math.round(p * palabras.length);
    palabras.forEach((w, i) => w.classList.toggle("on", i < n));
  };

  /* Parallax suave de la palabra gigante y la foto */
  const palabra = $("#palabra-fondo"), retrato = $(".retrato");
  let pendiente = false;
  const enScroll = () => {
    if (pendiente) return; pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false; iluminar();
      if (reducido) return;
      const y = scrollY;
      if (y < innerHeight * 1.2) {
        palabra.style.transform = `translate(calc(-50% - ${y * .25}px), -50%)`;
        retrato.style.translate = `0 ${y * -.08}px`;
      }
    });
  };
  addEventListener("scroll", enScroll, { passive: true }); enScroll();

  /* Etiquetas arrastrables */
  $$(".sticker").forEach(st => {
    let x0, y0, l0, t0, caja;
    st.addEventListener("pointerdown", e => {
      caja = st.parentElement.getBoundingClientRect();
      x0 = e.clientX; y0 = e.clientY; l0 = st.offsetLeft; t0 = st.offsetTop;
      st.setPointerCapture(e.pointerId); st.classList.add("arrastrando");
    });
    st.addEventListener("pointermove", e => {
      if (!st.classList.contains("arrastrando")) return;
      const l = Math.min(Math.max(l0 + e.clientX - x0, -caja.width * .3), caja.width * 1.05);
      const t = Math.min(Math.max(t0 + e.clientY - y0, -caja.height * .1), caja.height * 1.02);
      st.style.left = `${l}px`; st.style.top = `${t}px`;
    });
    const soltar = () => st.classList.remove("arrastrando");
    st.addEventListener("pointerup", soltar); st.addEventListener("pointercancel", soltar);
  });

  if (conMouse && !reducido) {
    /* Inclinación 3D en la foto y capturas */
    $$("[data-tilt], #retrato-marco").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    /* Botones magnéticos */
    $$(".magnetico").forEach(b => {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }
}

cargar()
  .then(D => {
    pintar(D);
    mover();
    intro(() => requestAnimationFrame(() => document.body.classList.remove("cargando")));
  })
  .catch(err => {
    console.error("No se pudo cargar el contenido:", err);
    document.body.classList.remove("cargando");
    document.body.insertAdjacentHTML("beforeend", `<div class="error-carga"><p>No se pudo cargar el contenido. Recarga la página.</p></div>`);
  });
})();
