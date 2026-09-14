import type { RepositorySummary } from '@/types'

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
