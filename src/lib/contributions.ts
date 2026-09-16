import type { ContributionCalendar, ContributionDay } from '@/types'

/**
 * Turns a platform's list of active days into the fixed grid the heat map
 * draws: fifty-three columns of seven, ending today.
 *
 * Every date here is handled as a plain `YYYY-MM-DD` string in UTC. The build
 * machine's timezone is not the same as the one GitHub and GitLab bucket their
 * days into, and letting a local `Date` interpret these strings would shift
 * roughly a third of the year by one square.
 */

/** A cell in the grid. `null` marks a slot past today, kept for alignment. */
export interface ContributionCell {
  date: string
  count: number
  /** 0 for a day with nothing recorded, then 1–4 by quartile. */
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionGridData {
  /** Columns, oldest first. Each holds seven slots, Sunday to Saturday. */
  weeks: (ContributionCell | null)[][]
  /** Index of the first column each month starts in, for the header labels. */
  monthStarts: { month: number; week: number }[]
  /** Total across the drawn window — not the platform's own reported total. */
  total: number
  firstDate: string
  lastDate: string
}

const DAY_MS = 86_400_000
const WEEKS = 53

function toUtcDate(iso: string): number {
  const [year, month, day] = iso.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

function toIso(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10)
}

/**
 * Quartile thresholds over the days that actually have activity.
 *
 * Scaling to the person rather than to a fixed number of commits is what makes
 * the map readable: a fixed scale would show a quiet year as uniformly empty
 * and a busy one as uniformly full. Days with nothing recorded are excluded, so
 * they never drag the scale down.
 */
function thresholds(days: ContributionDay[]): [number, number, number] {
  const counts = days.map((day) => day.count).sort((a, b) => a - b)
  const at = (fraction: number) => counts[Math.floor(fraction * (counts.length - 1))]
  return [at(0.25), at(0.5), at(0.75)]
}

function levelFor(count: number, [q1, q2, q3]: [number, number, number]): ContributionCell['level'] {
  if (count <= 0) return 0
  if (count <= q1) return 1
  if (count <= q2) return 2
  if (count <= q3) return 3
  return 4
}

/**
 * `today` is injectable so the grid is testable and so the whole page can be
 * built against one timestamp rather than drifting between components.
 */
export function buildContributionGrid(
  calendar: ContributionCalendar,
  today: string,
): ContributionGridData {
  const byDate = new Map(calendar.days.map((day) => [day.date, day.count]))
  const scale = thresholds(calendar.days)

  const end = toUtcDate(today)
  const weekday = new Date(end).getUTCDay()
  // Back up to this week's Sunday, then fifty-two more weeks.
  const start = end - weekday * DAY_MS - (WEEKS - 1) * 7 * DAY_MS

  const weeks: (ContributionCell | null)[][] = []
  const monthStarts: { month: number; week: number }[] = []
  let seenMonth = -1
  let total = 0

  for (let week = 0; week < WEEKS; week += 1) {
    const column: (ContributionCell | null)[] = []

    for (let day = 0; day < 7; day += 1) {
      const timestamp = start + (week * 7 + day) * DAY_MS

      if (timestamp > end) {
        column.push(null)
        continue
      }

      const date = toIso(timestamp)
      const count = byDate.get(date) ?? 0
      total += count
      column.push({ date, count, level: levelFor(count, scale) })

      // Label a column with a month the first time that month appears in it.
      const month = new Date(timestamp).getUTCMonth()
      if (month !== seenMonth) {
        seenMonth = month
        monthStarts.push({ month, week })
      }
    }

    weeks.push(column)
  }

  return {
    weeks,
    // The first column is usually a partial month; labelling it would collide
    // with the second one.
    monthStarts: monthStarts.filter((entry) => entry.week > 0),
    total,
    firstDate: toIso(start),
    lastDate: today,
  }
}

/** Today in UTC, as `YYYY-MM-DD`. Read once per build. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}
