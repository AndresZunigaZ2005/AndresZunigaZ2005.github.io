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
  brand: 'ANDRÉS',
} as const

export const links = {
  github: 'https://github.com/AndresZunigaZ2005',
  gitlab: 'https://gitlab.com/AndresZunigaZ2005',
  instagram: 'https://instagram.com/andresf.zz',
  /** Pending — set NEXT_PUBLIC_LINKEDIN_URL once the profile URL is known. */
  linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  /** Pending — set NEXT_PUBLIC_ORCID_URL once the ORCID iD is known. */
  orcid: env(process.env.NEXT_PUBLIC_ORCID_URL),
  /** Pending — set NEXT_PUBLIC_CONTACT_EMAIL once the professional address is chosen. */
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
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
