import type { RepositorySummary } from '@/types'

/**
 * GitHub REST helpers.
 *
 * Prepared, but not yet used by any section: the portfolio renders entirely
 * from `src/data/projects.ts`, so a rate limit or an outage on GitHub's side
 * can never blank out the page. When live repository data is wired in, call
 * these from a Server Component or a Route Handler and treat `null` as
 * "show the static content" rather than as an error.
 *
 * Authentication: unauthenticated requests are enough for public repositories.
 * If a token ever becomes necessary, read it from a server-only env var
 * (`GITHUB_TOKEN`, never `NEXT_PUBLIC_*`) inside a server context. A token must
 * not reach the browser.
 */

const API = 'https://api.github.com'

interface GitHubRepo {
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
}

/** Cache window, in seconds, for repository data. */
const REVALIDATE_SECONDS = 60 * 60

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function toSummary(repo: GitHubRepo): RepositorySummary {
  return {
    platform: 'github',
    name: repo.name,
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
  }
}

/**
 * Most recently updated public repositories for a user.
 * Returns `null` on any failure — callers fall back to static content.
 */
export async function fetchGitHubRepositories(
  username: string,
  limit = 6,
): Promise<RepositorySummary[] | null> {
  try {
    const response = await fetch(
      `${API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers: authHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
    )
    if (!response.ok) return null

    const repos = (await response.json()) as GitHubRepo[]
    return repos
      .filter((repo) => !repo.fork)
      .slice(0, limit)
      .map(toSummary)
  } catch {
    return null
  }
}

/** A single public repository, addressed as `owner/name`. */
export async function fetchGitHubRepository(slug: string): Promise<RepositorySummary | null> {
  try {
    const response = await fetch(`${API}/repos/${slug}`, {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!response.ok) return null

    return toSummary((await response.json()) as GitHubRepo)
  } catch {
    return null
  }
}
