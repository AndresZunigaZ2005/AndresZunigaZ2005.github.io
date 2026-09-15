# Portafolio — Andrés Felipe Zúñiga Zuluaga

**→ [andreszunigaz2005.github.io](https://andreszunigaz2005.github.io/)**

Portafolio personal bilingüe (ES / EN) construido con Next.js 16 (App Router), TypeScript y Tailwind CSS v4.

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint    # ESLint
```

## Estructura

```
src/
├── app/                  # App Router: layout, página, metadata, iconos, sitemap
│   ├── globals.css       # tokens de diseño (@theme) y estilos base
│   ├── icon.png/         # favicon generado con ImageResponse
│   ├── opengraph-image.png/
│   ├── layout.tsx
│   ├── page.tsx          # Server Component: solo composición
│   ├── robots.ts
│   └── sitemap.ts
├── components/           # una sección por archivo
│   └── ui/               # primitivas compartidas (Section, Reveal, ButtonLink, Icons)
├── data/                 # contenido tipado: proyectos, tecnologías, enlaces
├── i18n/                 # diccionarios + estado de idioma
├── lib/                  # helpers de GitHub/GitLab y mapas de acento
└── types/                # tipos de dominio compartidos

public/projects/          # capturas por proyecto
```

## Idiomas

El contenido vive en `src/i18n/es.ts` y `src/i18n/en.ts`; los componentes nunca
contienen texto. `es.ts` define la forma canónica y `Dictionary = typeof es`, así
que a `en.ts` le falta una clave, el build falla.

Añadir un idioma: crear el diccionario, añadirlo a `dictionaries` y a `LANGUAGES`
en `src/i18n/index.ts`. Ningún componente cambia.

El idioma activo se guarda en `localStorage` y se lee con `useSyncExternalStore`,
de modo que el HTML del servidor y el de hidratación siempre son español (el
idioma por defecto) y la preferencia se aplica justo después de hidratar.

### Server y Client Components

`page.tsx` y todo lo de `app/` son Server Components. Las secciones son Client
Components porque leen el idioma activo del contexto — el único estado de la
página. El coste es un bundle pequeño de texto; a cambio, cambiar de idioma es
instantáneo y no hay navegación ni recarga.

## Proyectos

Los proyectos están en `src/data/projects.ts` con una estructura tipada
(`src/types/index.ts`). Para añadir uno, se añade una entrada; `Projects.tsx`
renderiza lo que exporte el archivo, en orden. `ProjectCard` tiene una variante
`featured` que solo cambia escala y énfasis — el marcado es el mismo.

Toda la información de los proyectos proviene de sus repositorios públicos
(README, manifiesto, estadísticas de lenguajes) o fue aportada directamente.
El campo `source` lo deja registrado.

### Capturas

Van en `public/projects/<id>/` y se referencian desde la entrada del proyecto con
`width` y `height` reales, para que `next/image` reserve el espacio y no haya
salto de layout. `ProjectCard` las coloca en una tira horizontal de ancho fijo y
alto automático, así que **todas las capturas de un proyecto deben compartir
proporción**: una con otra forma deja la fila desigual.

Origen de cada juego:

- **Expenses Manager** — tomadas de `Docs/screenshots` de su propio repositorio.
- **EVA Tracker** — generadas desde la aplicación con `npm run qa:shots` en su
  repositorio (`test/manual/qa-screenshots.js`), que arranca la interfaz real
  contra un almacén falso y fotografía una pantalla por estado. La empleada, las
  horas y los proyectos que se ven son inventados: ningún turno real de nadie
  acaba en una página pública. Son 420x680 a 2x, el tamaño con el que abre la
  ventana. Para actualizarlas se regeneran allí y se copian aquí.
- **ViveTuZona Android** — pendientes.

## Configuración

Todos los valores pendientes se leen de variables de entorno públicas (ver
`.env.example`). Mientras estén vacías, la interfaz muestra el enlace como
«Por definir» en lugar de inventar una URL:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | origen canónico y `metadataBase` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | correo de contacto |
| `NEXT_PUBLIC_LINKEDIN_URL` | perfil de LinkedIn |
| `NEXT_PUBLIC_ORCID_URL` | ORCID iD |

## GitHub / GitLab

`src/lib/github.ts` y `src/lib/gitlab.ts` están preparados pero no se usan
todavía: la página se renderiza entera desde `src/data`, así que una caída o un
rate limit de esas APIs no puede dejarla en blanco. Cuando se conecten, deben
llamarse desde un Server Component o un Route Handler, y `null` debe tratarse
como «usar el contenido estático».

Si alguna vez hiciera falta un token, va en `GITHUB_TOKEN` / `GITLAB_TOKEN`
(nunca `NEXT_PUBLIC_*`) y se lee solo en el servidor.

## Diseño

Tokens en `src/app/globals.css`, bajo `@theme`: fondo neutro, dos niveles de
texto y cinco acentos pastel usados con moderación (`src/lib/accents.ts` mapea
cada acento a clases fijas, porque Tailwind no ve nombres de clase construidos en
tiempo de ejecución).

- Tipografía: Inter para texto, JetBrains Mono para etiquetas y metadata, ambas
  vía `next/font`.
- Animación: solo `fade-in` al entrar en viewport (`ui/Reveal.tsx`), que aplica
  una clase al nodo en vez de estado de React. El estado oculto vive dentro de
  `@media (scripting: enabled)`, así que sin JavaScript —y al imprimir— todo se
  ve desde el principio, sin que nada toque el DOM antes de la hidratación.
  `prefers-reduced-motion` lo anula por completo.
- Contraste: los tres tonos de texto sobre el fondo cumplen WCAG AA (≥ 4.5:1).
