import type { ExploringItem, TechnologyGroup } from '@/types'

/**
 * Technologies actually in use. Group labels live in the dictionaries
 * (`src/i18n`); only the technology names — which are proper nouns and stay the
 * same in both languages — live here.
 */
export const technologyGroups: TechnologyGroup[] = [
  {
    id: 'frontend',
    accent: 'blue',
    items: ['JavaScript', 'React', 'Next.js'],
  },
  {
    id: 'backend',
    accent: 'green',
    items: ['Python', 'Java', 'Spring Boot', 'REST APIs'],
  },
  {
    id: 'databases',
    accent: 'lavender',
    items: ['PostgreSQL', 'MongoDB'],
  },
  {
    id: 'desktop',
    accent: 'peach',
    items: ['Electron', 'Windows'],
  },
  {
    id: 'systems',
    accent: 'yellow',
    items: ['UNIX-like systems', 'VPS', 'Cloud'],
  },
]

/**
 * Areas under exploration, separated from the list above on purpose.
 *
 * `deepening` marks ground that is already part of day-to-day work;
 * `new` marks ground that is genuinely new.
 */
export const exploring: ExploringItem[] = [
  { id: 'swift', label: 'Swift', stage: 'new' },
  { id: 'kotlin', label: 'Kotlin', stage: 'new' },
  { id: 'ios', label: 'iOS', stage: 'new' },
  { id: 'android', label: 'Android', stage: 'new' },
  { id: 'unix', label: 'UNIX', stage: 'deepening' },
  { id: 'cloud', label: 'Cloud', stage: 'deepening' },
]
