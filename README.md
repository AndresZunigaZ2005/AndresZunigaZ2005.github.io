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
renderiza lo que exporte el archivo, en orden, y el número de ficha sale de esa
posición: es un identificador, no un ranking. `ProjectCard` es el mismo marcado
para todos los proyectos; lo único que cambia es el acento, que es el mismo color
que la medalla del proyecto en la tarjeta de entrenador. El proyecto destacado se
marca con una etiqueta dentro de su ficha, sin sacarlo de la secuencia.

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

`src/lib/github.ts` y `src/lib/gitlab.ts` exponen dos cosas distintas:

- **Resúmenes de repositorios** — preparados pero sin usar. La página se
  renderiza entera desde `src/data`, así que una caída o un rate limit de esas
  APIs no puede dejarla en blanco. Cuando se conecten, deben llamarse desde un
  Server Component y `null` debe tratarse como «usar el contenido estático».
- **Calendarios de contribuciones** — en uso, en la sección «Actividad».

Si alguna vez hiciera falta un token para lo primero, va en `GITHUB_TOKEN` /
`GITLAB_TOKEN` (nunca `NEXT_PUBLIC_*`) y se lee solo en el servidor.

### Sección «Actividad»

Los dos mapas de calor salen de los calendarios que publican las propias
plataformas. Nada se calcula ni se estima aquí.

El sitio es un export estático, así que **el único momento en que hay red es
`next build`**. `src/app/page.tsx` —el único Server Component con datos— pide
ambos calendarios, y el resultado se hornea en el HTML. El visitante no espera a
nadie, no gasta su rate limit y no ve la página rota si una API está caída. El
workflow corre también con un `schedule` diario para que no se quede rancio.

| Plataforma | Endpoint | Token |
| --- | --- | --- |
| GitHub | GraphQL `contributionsCollection` | **Sí** |
| GitLab | `gitlab.com/users/<user>/calendar.json` | No |

GitHub no expone el calendario por REST y su GraphQL rechaza las peticiones
anónimas, así que ahí no hay alternativa sin token. La única vía sin token es el
feed de eventos públicos, que se queda en ~90 días, tope de 300 eventos y sin
repos privados: dibujarlo como «un año de actividad» subestimaría el registro, y
por eso no se usa.

**Puesta en marcha del token** (una sola vez):

1. Crear un Personal Access Token (classic) con el scope `read:user`.
2. Añadirlo al repositorio en *Settings → Secrets and variables → Actions* con
   el nombre **`GH_CONTRIBUTIONS_TOKEN`**. No puede llamarse `GITHUB_TOKEN`:
   GitHub rechaza los secretos que empiezan por `GITHUB_`. El workflow lo mapea
   a esa variable de entorno, que es la que lee `src/lib/github.ts`.

El token vive solo en el runner; al navegador únicamente llegan los recuentos.
Sin el secreto el build **no falla**: el panel de GitHub simplemente no se
dibuja. Lo mismo si una plataforma no responde — un panel vacío diría «no hizo
nada», que no es lo mismo que «no se pudo preguntar».

Para construir en local con el calendario, exporta `GITHUB_TOKEN` en tu shell.

Detalles de implementación:

- `src/lib/contributions.ts` arma la rejilla de 53x7. Todas las fechas se tratan
  como cadenas `YYYY-MM-DD` en UTC: la zona horaria de la máquina de build no es
  la misma con la que GitHub y GitLab agrupan sus días, y dejar que un `Date`
  local interprete esas cadenas correría un tercio del año una casilla.
- La intensidad se escala a los **cuartiles del propio usuario**, no a un número
  absoluto de commits, que dejaría un año tranquilo uniformemente vacío.
- Los nombres de mes salen del diccionario, no de `Intl`: la máquina de build y
  el navegador podrían no coincidir y romper la hidratación.
- La rejilla es un solo `role="img"` con un resumen escrito. Los datos que
  importan —total y periodo— están además como texto en la barra de título.

## Diseño

Interfaz de RPG portátil de 16 bits. Cada sección adopta la pantalla que le
corresponde en lugar de repetir la misma tarjeta: el hero es una **tarjeta de
entrenador** (identidad, campos y tres medallas, una por proyecto, que enlazan a
su ficha), los proyectos son **fichas numeradas** de un registro, las tecnologías
son paneles con un **medidor segmentado**, y el contacto es una **agenda**.

El vocabulario es RPG genérico a propósito. No aparece ninguna marca registrada
de Nintendo en la interfaz.

Tokens en `src/app/globals.css`, bajo `@theme`: nueve valores — dos fondos, un
contorno, dos niveles de texto y cuatro acentos. `src/lib/accents.ts` mapea cada
acento a clases fijas, porque Tailwind no ve nombres de clase construidos en
tiempo de ejecución.

- **Acentos.** Solo aparecen en cuatro sitios: barras de título de panel,
  cursor de menú, medallas y botones. El oro marca una sección en la que se
  actúa, el azul una que se lee, el lavanda una de apoyo. Nunca en texto
  corrido: sobre el panel, el rojo no llega a 4.5:1 y solo se usa como relleno
  con texto casi negro encima.
- **Tipografía.** Press Start 2P para títulos cortos, barras de título y
  botones; VT323 para todo lo que hay que leer de verdad. Ambas vía `next/font`
  con el subconjunto `latin-ext` — sin él, cada «ñ», «é» y «¿» del español caería
  a una fuente de respaldo y rompería la retícula. Press Start 2P es una fuente
  de mapa de bits de 8px: solo se usa en múltiplos de 8 (16 / 24 / 32) y nunca
  en mayúsculas acentuadas, porque no tiene «É» y la dibuja como «é» — por eso
  el nombre en la tarjeta va en caja mixta.
- **Retícula de 8px**, sin `border-radius`, sin desenfoques y sin degradados. El
  fondo es un tablero de ajedrez de 8px servido como tile SVG: un
  `repeating-conic-gradient` se rerasteriza en toda la superficie de scroll y
  bloquea el renderizador en una página tan larga.
- **Paneles.** Tres cajas anidadas (`ui/Panel.tsx`): contorno de 4px, bisel de
  4px y relleno sólido, para que el bisel siga visible alrededor de una barra de
  título a sangre. Hacerlo con `box-shadow: inset` la taparía.
- **Medidores.** Un bloque encendido es un elemento real (`ui/StatBar.tsx`). El
  número va también en texto al lado, y no hay rampa verde-amarillo-rojo: «cuatro
  herramientas» no es mejor que «dos», y colorearlo así lo afirmaría.
- **Animación.** Tres efectos y ninguno más: las ventanas se abren en cuatro
  fotogramas al entrar en viewport (`ui/Reveal.tsx`, que aplica una clase al nodo
  en vez de estado de React), el cursor parpadea, y el saludo del hero se
  escribe una vez al cargar. Todas usan `steps(n, jump-start)`: una función de
  pasos que salta al final se queda un paso corto y el relleno hacia delante la
  deja ahí, lo que dejaría cada panel recortado a una banda.
  El estado oculto vive dentro de `@media (scripting: enabled)`, así que sin
  JavaScript —y al imprimir— todo se ve desde el principio, sin que nada toque el
  DOM antes de la hidratación. `prefers-reduced-motion` lo anula por completo.
- **Cursor de menú.** No es decoración: marca la sección que se está leyendo
  (`Navbar.tsx`) y la opción de idioma activa.
