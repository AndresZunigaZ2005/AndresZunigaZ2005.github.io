import type { ContributionCalendar, RepositorySummary } from '@/types'

/**
 * GitLab REST helpers.
 *
 * Same contract as the GitHub helpers: optional, cached, and failure-tolerant.
 * Nothing the page needs to render depends on them.
 *
 * Authentication: a personal access token, if one is ever needed for private
 * projects, belongs in the server-only `GITLAB_TOKEN` env var and must be read
 * inside a server context. It must not reach the browser.
 */

const API = 'https://gitlab.com/api/v4'

interface GitLabProject {
  name: string
  path_with_namespace: string
  web_url: string
  description: string | null
  star_count: number
  forks_count: number
  last_activity_at: string
}

const REVALIDATE_SECONDS = 60 * 60

function authHeaders(): HeadersInit {
  const token = process.env.GITLAB_TOKEN
  return token ? { 'PRIVATE-TOKEN': token } : {}
}

function toSummary(project: GitLabProject, language: string | null): RepositorySummary {
  return {
    platform: 'gitlab',
    name: project.name,
    fullName: project.path_with_namespace,
    url: project.web_url,
    description: project.description,
    language,
    stars: project.star_count,
    forks: project.forks_count,
    updatedAt: project.last_activity_at,
  }
}

/**
 * Most recently active projects for a user.
 * Returns `null` on any failure — callers fall back to static content.
 */
export async function fetchGitLabProjects(
  username: string,
  limit = 6,
): Promise<RepositorySummary[] | null> {
  try {
    const response = await fetch(
      `${API}/users/${encodeURIComponent(username)}/projects?order_by=last_activity_at&per_page=${limit}`,
      { headers: authHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
    )
    if (!response.ok) return null

    const projects = (await response.json()) as GitLabProject[]
    return projects.map((project) => toSummary(project, null))
  } catch {
    return null
  }
}

/**
 * A single project, addressed as `namespace/name`.
 * The dominant language costs a second request, so it is fetched separately and
 * degrades to `null` if that call fails.
 */
export async function fetchGitLabProject(slug: string): Promise<RepositorySummary | null> {
  const id = encodeURIComponent(slug)

  try {
    const response = await fetch(`${API}/projects/${id}`, {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) return null

    const project = (await response.json()) as GitLabProject
    return toSummary(project, await fetchDominantLanguage(id))
  } catch {
    return null
  }
}

async function fetchDominantLanguage(encodedId: string): Promise<string | null> {
  try {
    const response = await fetch(`${API}/projects/${encodedId}/languages`, {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) return null

    const languages = (await response.json()) as Record<string, number>
    const ranked = Object.entries(languages).sort(([, a], [, b]) => b - a)
    return ranked[0]?.[0] ?? null
  } catch {
    return null
  }
}

/* ---------------------------------------------------------------------------
   Contribution calendar
--------------------------------------------------------------------------- */

/**
 * GitLab publishes the calendar behind the profile page as plain JSON — a map
 * of `YYYY-MM-DD` to a count, covering roughly the last twelve months, with no
 * authentication required. It is the same figure the profile shows, so unlike
 * GitHub this needs no token.
 *
 * Note it counts contribution *events* — pushes, merge requests, issues,
 * comments — not commits alone. The copy in the UI says so.
 */
export async function fetchGitLabContributions(
  username: string,
): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch(
      `https://gitlab.com/users/${encodeURIComponent(username)}/calendar.json`,
      { headers: authHeaders() },
    )
    if (!response.ok) return null

    const calendar = (await response.json()) as Record<string, number>

    const days = Object.entries(calendar)
      .filter(([, count]) => count > 0)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    if (days.length === 0) return null

    return {
      platform: 'gitlab',
      days,
      total: days.reduce((sum, day) => sum + day.count, 0),
      from: days[0].date,
      to: days[days.length - 1].date,
    }
  } catch {
    return null
  }
}
