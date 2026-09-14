/**
 * Shared domain types.
 *
 * Content is authored once and localized through `LocalizedText`, so adding a
 * language means adding a dictionary — never duplicating a component.
 */

export type Language = 'es' | 'en'

/** A string that exists in every supported language. */
export type LocalizedText = Record<Language, string>

export type Platform = 'github' | 'gitlab'

/**
 * How Andrés participated in a project. Kept explicit so the UI can never
 * imply sole authorship of a collaborative repository.
 */
export type ProjectRole = 'author' | 'contributor'

/** Pastel accents from the design system. Used sparingly, one per project. */
export type Accent = 'blue' | 'green' | 'lavender' | 'peach' | 'yellow'

/**
 * Where a piece of copy came from. `repository` means it was derived from the
 * public repository (README, manifest, language stats); `provided` means it was
 * supplied directly by Andrés. Nothing else is allowed.
 */
export type ContentSource = 'repository' | 'provided'

export interface Screenshot {
  /** Path under `public/`. */
  src: string
  width: number
  height: number
  alt: LocalizedText
}

export interface Project {
  id: string
  name: string
  platform: Platform
  /** Canonical repository URL, or `null` while a repository stays private. */
  repository: string | null
  /** `namespace/name`, shown as metadata next to the link. */
  repositoryLabel: string | null
  role: ProjectRole
  featured: boolean
  accent: Accent
  technologies: string[]
  tagline: LocalizedText
  description: LocalizedText
  highlights: LocalizedText[]
  status: LocalizedText | null
  screenshots: Screenshot[]
  source: ContentSource
}

export interface TechnologyGroup {
  id: string
  accent: Accent
  items: string[]
}

/**
 * Depth of an area under exploration.
 * `deepening` — already part of day-to-day work.
 * `new` — genuinely new ground.
 */
export type ExplorationStage = 'deepening' | 'new'

export interface ExploringItem {
  id: string
  label: string
  stage: ExplorationStage
}

export interface ProfileLink {
  id: string
  label: string
  /** `null` until the real URL is provided — never invented. */
  url: string | null
}

/** Normalized repository summary returned by the GitHub/GitLab helpers. */
export interface RepositorySummary {
  platform: Platform
  name: string
  fullName: string
  url: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  updatedAt: string
}
