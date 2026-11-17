# Portafolio de TI · Darlene López Vázquez

Sitio estático (HTML, CSS y JS) publicado en Netlify, con panel de administración en **`/entrar`**.
Lo uso para mi residencia profesional: experiencia, caso destacado, proyectos personales, habilidades y CV.

> La versión anterior (portafolio UGC) sigue guardada en la rama [`ugc`](../../tree/ugc).

## Cómo está organizado

| Carpeta | Qué hay |
|---|---|
| `index.html` | La página |
| `css/estilos.css` | Diseño (colores, letras, tamaños) |
| `js/sitio.js` | Arma la página a partir del contenido y le da interacción |
| `contenido/*.json` | **Todo el texto, capturas y links.** Se edita desde el panel |
| `media/` | Fotos y capturas de proyectos |
| `cv/` | CV en PDF que se descarga desde la página |
| `entrar/` | Panel de administración (Decap CMS) |

## Editar el sitio

1. Entra a `https://TU-SITIO.netlify.app/entrar/` e inicia sesión.
2. Elige qué editar: Perfil, Experiencia, Caso destacado, Proyectos, Habilidades, Sobre mí, Contacto o Diseño.
3. Cambia lo que quieras y dale **Publicar**. En 1–2 minutos se ve en tu página.

Tips:
- Cada **Publicar** es un despliegue en Netlify y gasta créditos del plan gratis (15 por despliegue, 300 al mes para toda la cuenta). Junta varios cambios antes de publicar.
- En **Proyectos**, usa siempre los mismos nombres de categoría (Web, Full stack, Nube e IA, Bases de datos) para que los filtros agrupen bien.
- Si un proyecto no tiene captura, escribe unas líneas en «Código de vista previa» (endpoints, SQL o comandos) y se muestra como terminal.
- Para cambiar el CV, sube el PDF nuevo en **Perfil → CV en PDF**.

## Publicar en otro lado (sin Netlify)

Todas las rutas son relativas, así que el sitio también funciona en **GitHub Pages**:
Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
Queda en `https://darleneelmv.github.io/portafolioUGC/`. El panel `/entrar` solo funciona en Netlify.
