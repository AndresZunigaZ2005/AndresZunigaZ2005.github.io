import type { Dictionary } from './index'

/**
 * English dictionary. Typed as `Dictionary`, so it has to stay in sync with
 * `es.ts` — a missing key is a build error, not a blank space on the page.
 */
export const en: Dictionary = {
  meta: {
    label: 'English',
    short: 'EN',
    locale: 'en',
    localeTag: 'en-US',
    title: 'Andrés Felipe Zúñiga — Software Engineer',
    description:
      'Portfolio of Andrés Felipe Zúñiga Zuluaga, Systems and Computer Engineer and Full Stack Developer. Web development with React and Next.js, desktop applications with Electron, and a strong interest in UNIX-like systems.',
    ogAlt: 'Andrés Felipe Zúñiga Zuluaga — Systems and Computer Engineer',
  },

  common: {
    skipToContent: 'Skip to content',
    pending: 'To be added',
    pendingHint: 'This link will be added once the URL is available.',
    opensInNewTab: 'opens in a new tab',
  },

  nav: {
    brandLabel: 'Andrés Felipe Zúñiga — home',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    primary: 'Primary navigation',
    items: {
      about: 'About',
      technologies: 'Technologies',
      projects: 'Projects',
      work: 'Where I build',
      contact: 'Contact',
    },
  },

  language: {
    label: 'Language',
    switchTo: 'Switch language to',
  },

  hero: {
    eyebrow: 'Systems and Computer Engineer · Universidad del Quindío',
    greeting: "Hi, I'm Andrés.",
    roleOne: 'Systems and Computer Engineer',
    roleTwo: 'Full Stack Developer',
    description:
      'I build software, explore systems, and continuously learn about the technologies shaping the world.',
    ctaProjects: 'View work',
    ctaGithub: 'GitHub',
    ctaGitlab: 'GitLab',
    facets: ['web', 'desktop', 'systems'],
  },

  about: {
    eyebrow: 'About me',
    title: 'Software, and what runs underneath it.',
    paragraphs: [
      'I am a Systems and Computer Engineer from Universidad del Quindío, working as a Full Stack Developer.',
      'My work moves between the web — React and Next.js — and Windows desktop applications built with Electron.',
      'I am particularly interested in UNIX-like systems: understanding what happens beneath an application matters to me as much as the application itself.',
      'I am also interested in native mobile development, with Swift for iOS and Kotlin for Android, and in learning about the new technologies changing the world.',
    ],
    facts: [
      { label: 'Degree', value: 'Systems and Computer Engineering' },
      { label: 'University', value: 'Universidad del Quindío' },
      { label: 'Focus', value: 'Full Stack Development' },
      { label: 'Interests', value: 'UNIX-like systems, mobile development' },
    ],
  },

  technologies: {
    eyebrow: 'Technologies',
    title: 'What I work with.',
    lede: 'A short, honest list: tools I actually use, not a wall of logos.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Databases',
      desktop: 'Desktop',
      systems: 'Systems & Infrastructure',
    },
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Selected projects',
    lede: 'Three real projects. The details come from their public repositories.',
    featuredBadge: 'Featured project',
    roles: {
      author: 'Author',
      contributor: 'Contributor',
    },
    roleNote: {
      author: 'My own project.',
      contributor: 'A collaborative project: I take part as a contributor, not as the sole author.',
    },
    labels: {
      stack: 'Stack',
      highlights: 'What it does',
      screenshots: 'Screenshots',
    },
    viewOn: 'View on',
    repositoryPrivate: 'Repository not public',
    screenshotsHint: 'Screenshots taken from the project repository.',
  },

  profiles: {
    eyebrow: 'Repositories',
    title: 'Where I build',
    lede: 'Two platforms, two kinds of work.',
    github: {
      name: 'GitHub',
      description: 'Personal projects, experiments and open-source work.',
      cta: 'Visit GitHub profile',
    },
    gitlab: {
      name: 'GitLab',
      description: 'Development projects, infrastructure and CI/CD workflows.',
      cta: 'Visit GitLab profile',
    },
  },

  exploring: {
    eyebrow: 'Learning',
    title: 'Currently exploring',
    lede: 'Areas I am working on right now, kept separate from what I already use day to day.',
    stages: {
      deepening: 'Going deeper',
      new: 'New ground',
    },
    stageHints: {
      deepening: 'Already part of my work; still learning.',
      new: 'An area I am starting to explore.',
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Have a project, an idea, or just want to talk about technology?',
    highlight: "Let's connect.",
    lede: 'Email is the most direct way, but you can also find me in these places.',
    emailLabel: 'Email me',
  },

  footer: {
    linksLabel: 'Profiles and links',
    role: 'Systems and Computer Engineer',
    rights: '© 2026 Andrés Felipe Zúñiga Zuluaga',
    builtWith: 'Built with Next.js, TypeScript and Tailwind CSS.',
  },
}
