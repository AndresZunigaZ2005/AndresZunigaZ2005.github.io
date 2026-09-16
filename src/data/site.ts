import type { ProfileLink } from '@/types'

/**
 * Single source of truth for identity and outbound links.
 *
 * Links that have not been provided yet resolve to `null` and are rendered as
 * clearly-marked pending items. They are read from public env vars so they can
 * be filled in without touching a component. No secrets belong in this file.
 */

const env = (value: string | undefined): string | null => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export const person = {
  name: 'Andrés Felipe Zúñiga Zuluaga',
  shortName: 'Andrés',
  /** Everything after the first name, so the trainer card can set them apart
      typographically while the heading still reads as one full name. */
  familyNames: 'Felipe Zúñiga Zuluaga',
  /**
   * All-caps wordmark. Only for type set in a face with proper uppercase
   * accents — Press Start 2P has none, and renders "É" as a lowercase "é", so
   * anything set in the display face uses `shortName` instead.
   */
  brand: 'ANDRÉS',
} as const

export const links = {
  github: 'https://github.com/AndresZunigaZ2005',
  gitlab: 'https://gitlab.com/AndresZunigaZ2005',
  instagram: 'https://instagram.com/andresf.zz',
  linkedin: 'https://www.linkedin.com/in/andresf-zunigaz',
  orcid: 'https://orcid.org/0009-0000-9881-2143',
  email: 'andres.felipezz@hotmail.com',
} as const

/**
 * Account handles, kept separate from the profile URLs above.
 *
 * The contribution calendars are addressed by handle, not by URL, and deriving
 * one from the other by string-slicing would break the first time a link gains
 * a trailing slash or a query string.
 */
export const usernames = {
  github: 'AndresZunigaZ2005',
  gitlab: 'AndresZunigaZ2005',
} as const

/**
 * Canonical origin. Kept as an env var so a custom domain can be added later
 * without inventing one now; falls back to a relative-safe placeholder.
 */
export const siteUrl = env(process.env.NEXT_PUBLIC_SITE_URL) ?? 'http://localhost:3000'

/** Order used by both the contact section and the footer. */
export const profileLinks: ProfileLink[] = [
  { id: 'email', label: 'Email', url: links.email ? `mailto:${links.email}` : null },
  { id: 'github', label: 'GitHub', url: links.github },
  { id: 'gitlab', label: 'GitLab', url: links.gitlab },
  { id: 'linkedin', label: 'LinkedIn', url: links.linkedin },
  { id: 'instagram', label: 'Instagram', url: links.instagram },
  { id: 'orcid', label: 'ORCID', url: links.orcid },
]
