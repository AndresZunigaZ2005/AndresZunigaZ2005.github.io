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
    menuTitle: 'Menu',
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
    card: {
      title: 'Trainer card',
      classLabel: 'Class',
      degreeLabel: 'Degree',
      schoolLabel: 'School',
      school: 'Universidad del Quindío',
      typeLabel: 'Type',
      badgesLabel: 'Badges',
      badgesHint: 'One per published project. Each one jumps to its entry.',
    },
  },

  about: {
    eyebrow: 'About me',
    title: 'Software, and what runs underneath it.',
    factsTitle: 'Details',
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
    toolCount: '{n} tools',
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
    entry: 'Entry',
    labels: {
      type: 'Type',
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
      cta: 'Open profile',
    },
    gitlab: {
      name: 'GitLab',
      description: 'Development projects, infrastructure and CI/CD workflows.',
      cta: 'Open profile',
    },
  },

  activity: {
    eyebrow: 'Activity',
    title: 'A year of work, day by day.',
    lede: 'The calendars GitHub and GitLab publish, untouched. They are fetched when the site is built, so the date below is the date of the last deploy.',
    updated: 'Updated {date}',
    total: '{n} contributions',
    totalOne: '1 contribution',
    summary: '{total} on {platform}, between {from} and {to}.',
    day: '{n} contributions on {date}',
    dayOne: '1 contribution on {date}',
    dayNone: 'No contributions on {date}',
    legendLess: 'less',
    legendMore: 'more',
    sources: {
      github: 'Commits, pull requests, issues and reviews, as recorded by the GitHub calendar.',
      gitlab: 'Contribution events as recorded by GitLab: pushes, merge requests, issues and comments.',
    },
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Mon', 'Wed', 'Fri'],
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
    countLabel: '{n} of {total} areas',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Have a project, an idea, or just want to talk about technology?',
    highlight: "Let's connect.",
    lede: 'Email is the most direct way, but you can also find me in these places.',
    emailLabel: 'Email me',
    directoryTitle: 'Contacts',
  },

  footer: {
    linksLabel: 'Profiles and links',
    role: 'Systems and Computer Engineer',
    rights: '© 2026 Andrés Felipe Zúñiga Zuluaga',
    builtWith: 'Built with Next.js, TypeScript and Tailwind CSS.',
  },
}
