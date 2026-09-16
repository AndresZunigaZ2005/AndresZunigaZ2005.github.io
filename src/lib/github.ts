import type { ContributionCalendar, RepositorySummary } from '@/types'

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

/* ---------------------------------------------------------------------------
   Contribution calendar
--------------------------------------------------------------------------- */

const GRAPHQL = 'https://api.github.com/graphql'

/**
 * The contribution calendar is the one thing GitHub does not expose on its REST
 * API: it exists only in GraphQL, and GraphQL rejects unauthenticated requests
 * outright. So this call — unlike every other helper here — needs `GITHUB_TOKEN`
 * to be set, and returns `null` without it rather than pretending.
 *
 * A token also buys accuracy. The public events feed, which is the only
 * token-free alternative, stops at roughly ninety days, caps out at 300 events
 * and omits private work entirely; drawing it as a year of activity would
 * quietly understate the record. This returns what the profile page shows.
 */
const CONTRIBUTIONS_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

interface ContributionsResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[]
        }
      }
    } | null
  }
  errors?: unknown
}

export async function fetchGitHubContributions(
  username: string,
): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    const response = await fetch(GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login: username } }),
    })
    if (!response.ok) return null

    const payload = (await response.json()) as ContributionsResponse
    // GraphQL answers 200 with an `errors` array on a bad query or scope.
    if (payload.errors || !payload.data?.user) return null

    const calendar = payload.data.user.contributionsCollection.contributionCalendar
    const days = calendar.weeks
      .flatMap((week) => week.contributionDays)
      .map((day) => ({ date: day.date, count: day.contributionCount }))

    if (days.length === 0) return null

    return {
      platform: 'github',
      days: days.filter((day) => day.count > 0),
      total: calendar.totalContributions,
      from: days[0].date,
      to: days[days.length - 1].date,
    }
  } catch {
    return null
  }
}
