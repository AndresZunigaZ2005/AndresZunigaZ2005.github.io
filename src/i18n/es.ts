/**
 * Spanish dictionary — the canonical shape.
 *
 * `Dictionary` is derived from this object (see `./index.ts`), so every other
 * language is checked against it at compile time: a missing or misspelled key
 * fails the build instead of rendering an empty string.
 */
export const es = {
  meta: {
    label: 'Español',
    short: 'ES',
    locale: 'es',
    localeTag: 'es-CO',
    title: 'Andrés Felipe Zúñiga — Ingeniero de Software',
    description:
      'Portafolio de Andrés Felipe Zúñiga Zuluaga, Ingeniero de Sistemas y Computación y Full Stack Developer. Desarrollo web con React y Next.js, aplicaciones de escritorio con Electron e interés por los sistemas tipo UNIX.',
    ogAlt: 'Andrés Felipe Zúñiga Zuluaga — Ingeniero de Sistemas y Computación',
  },

  common: {
    skipToContent: 'Saltar al contenido',
    pending: 'Por definir',
    pendingHint: 'Este enlace se añadirá cuando la URL esté disponible.',
    opensInNewTab: 'se abre en una pestaña nueva',
  },

  nav: {
    brandLabel: 'Andrés Felipe Zúñiga — inicio',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    primary: 'Navegación principal',
    menuTitle: 'Menú',
    items: {
      about: 'Sobre mí',
      technologies: 'Tecnologías',
      projects: 'Proyectos',
      work: 'Dónde construyo',
      contact: 'Contacto',
    },
  },

  language: {
    label: 'Idioma',
    switchTo: 'Cambiar idioma a',
  },

  hero: {
    eyebrow: 'Ingeniero de Sistemas y Computación · Universidad del Quindío',
    greeting: 'Hola, soy Andrés.',
    roleOne: 'Ingeniero de Sistemas y Computación',
    roleTwo: 'Full Stack Developer',
    description:
      'Construyo software, exploro sistemas y aprendo constantemente sobre las tecnologías que están transformando el mundo.',
    ctaProjects: 'Ver proyectos',
    ctaGithub: 'GitHub',
    ctaGitlab: 'GitLab',
    facets: ['web', 'escritorio', 'sistemas'],
    card: {
      title: 'Tarjeta de entrenador',
      classLabel: 'Clase',
      degreeLabel: 'Título',
      schoolLabel: 'Escuela',
      school: 'Universidad del Quindío',
      typeLabel: 'Tipo',
      badgesLabel: 'Medallas',
      badgesHint: 'Una por proyecto publicado. Llevan a su ficha.',
    },
  },

  about: {
    eyebrow: 'Sobre mí',
    title: 'Software, y lo que hay debajo.',
    factsTitle: 'Datos',
    paragraphs: [
      'Soy Ingeniero de Sistemas y Computación por la Universidad del Quindío y trabajo como Full Stack Developer.',
      'Mi trabajo se mueve entre la web, con React y Next.js, y las aplicaciones de escritorio para Windows construidas con Electron.',
      'Me interesan especialmente los sistemas tipo UNIX: entender qué ocurre por debajo de una aplicación me parece tan importante como la aplicación misma.',
      'También me interesa el desarrollo móvil nativo, con Swift para iOS y Kotlin para Android, y aprender sobre las nuevas tecnologías que están cambiando el mundo.',
    ],
    facts: [
      { label: 'Formación', value: 'Ingeniería de Sistemas y Computación' },
      { label: 'Universidad', value: 'Universidad del Quindío' },
      { label: 'Enfoque', value: 'Full Stack Development' },
      { label: 'Intereses', value: 'Sistemas tipo UNIX, desarrollo móvil' },
    ],
  },

  technologies: {
    eyebrow: 'Tecnologías',
    title: 'Con lo que trabajo.',
    lede: 'Una lista corta y honesta: herramientas que uso, no un catálogo de logos.',
    toolCount: '{n} herramientas',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Bases de datos',
      desktop: 'Escritorio',
      systems: 'Sistemas e infraestructura',
    },
  },

  projects: {
    eyebrow: 'Proyectos',
    title: 'Proyectos destacados',
    lede: 'Tres proyectos reales. La información proviene de sus repositorios públicos.',
    featuredBadge: 'Proyecto destacado',
    roles: {
      author: 'Autor',
      contributor: 'Contribuidor',
    },
    roleNote: {
      author: 'Proyecto propio.',
      contributor: 'Proyecto colaborativo: participo como contribuidor, no como único autor.',
    },
    entry: 'Ficha',
    labels: {
      type: 'Tipo',
      stack: 'Stack',
      highlights: 'Qué incluye',
      screenshots: 'Capturas',
    },
    viewOn: 'Ver en',
    repositoryPrivate: 'Repositorio no público',
    screenshotsHint: 'Capturas tomadas del repositorio del proyecto.',
  },

  profiles: {
    eyebrow: 'Repositorios',
    title: 'Dónde construyo',
    lede: 'Dos plataformas, dos tipos de trabajo.',
    github: {
      name: 'GitHub',
      description: 'Proyectos personales, experimentos y trabajo open source.',
      cta: 'Abrir perfil',
    },
    gitlab: {
      name: 'GitLab',
      description: 'Proyectos de desarrollo, infraestructura y flujos de CI/CD.',
      cta: 'Abrir perfil',
    },
  },

  activity: {
    eyebrow: 'Actividad',
    title: 'Un año de trabajo, día a día.',
    lede: 'Los calendarios que publican GitHub y GitLab, sin retocar. Se piden al construir el sitio, así que la fecha de abajo es la del último despliegue.',
    updated: 'Actualizado el {date}',
    total: '{n} contribuciones',
    totalOne: '1 contribución',
    summary: '{total} en {platform}, entre el {from} y el {to}.',
    day: '{n} contribuciones el {date}',
    dayOne: '1 contribución el {date}',
    dayNone: 'Sin contribuciones el {date}',
    legendLess: 'menos',
    legendMore: 'más',
    sources: {
      github: 'Commits, pull requests, issues y revisiones, según el calendario que registra GitHub.',
      gitlab: 'Eventos de contribución que registra GitLab: pushes, merge requests, issues y comentarios.',
    },
    months: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    weekdays: ['Lun', 'Mié', 'Vie'],
  },

  exploring: {
    eyebrow: 'Aprendizaje',
    title: 'Actualmente explorando',
    lede: 'Áreas en las que estoy trabajando ahora mismo, separadas de lo que ya uso a diario.',
    stages: {
      deepening: 'Profundizando',
      new: 'Terreno nuevo',
    },
    stageHints: {
      deepening: 'Ya forma parte de mi trabajo; sigo aprendiendo.',
      new: 'Área que estoy empezando a explorar.',
    },
    countLabel: '{n} de {total} áreas',
  },

  contact: {
    eyebrow: 'Contacto',
    title: '¿Tienes un proyecto, una idea o simplemente quieres hablar sobre tecnología?',
    highlight: 'Hablemos.',
    lede: 'La forma más directa es por correo, pero también estoy en estos sitios.',
    emailLabel: 'Escríbeme',
    directoryTitle: 'Agenda',
  },

  footer: {
    linksLabel: 'Perfiles y enlaces',
    role: 'Ingeniero de Sistemas y Computación',
    rights: '© 2026 Andrés Felipe Zúñiga Zuluaga',
    builtWith: 'Construido con Next.js, TypeScript y Tailwind CSS.',
  },
}
