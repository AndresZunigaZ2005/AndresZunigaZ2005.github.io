'use client'

import { useMemo } from 'react'
import { buildContributionGrid } from '@/lib/contributions'
import type { ContributionCalendar } from '@/types'

/** 12px cell plus a 4px gutter. Kept in step with `.heat` in `globals.css`. */
const PITCH = 16

/**
 * Height of the month-label strip above the grid. The weekday gutter is padded
 * by the same amount, which is the only thing keeping the two columns in step —
 * they are siblings, so nothing else would line them up.
 */
const MONTH_ROW = 28

/** Rows that get a weekday label: Monday, Wednesday, Friday. */
const LABELLED_ROWS = [1, 3, 5]

interface ContributionGridProps {
  calendar: ContributionCalendar
  /** Build date, passed in so the server and the browser draw the same grid. */
  today: string
  /** CSS colour for a full day. The four steps are mixed down from it. */
  accentVar: string
  months: readonly string[]
  weekdays: readonly string[]
  /** Hover title for one cell. Owns its own singular/plural wording. */
  formatDayTitle: (count: number, date: string) => string
  /** Read out in place of the grid. Carries the total and the period. */
  summary: string
  legendLess: string
  legendMore: string
}

/**
 * A year of contributions as a grid of hard 12px squares.
 *
 * The grid is one `role="img"` with a written summary rather than 371 announced
 * cells: the useful facts are the total and the period, and both are in that
 * label and in the panel's title bar as text. Per-day counts stay as hover
 * titles for anyone reading it as a picture.
 *
 * Intensity is scaled to this person's own quartiles, so the map says "a busy
 * week for him" rather than "busy by some absolute standard that is not stated
 * anywhere".
 */
export function ContributionGrid({
  calendar,
  today,
  accentVar,
  months,
  weekdays,
  formatDayTitle,
  summary,
  legendLess,
  legendMore,
}: ContributionGridProps) {
  const grid = useMemo(() => buildContributionGrid(calendar, today), [calendar, today])

  return (
    <div style={{ ['--heat' as string]: accentVar }}>
      <div className="scroll-x overflow-x-auto pb-4">
        <div className="flex gap-2">
          {/* Weekday gutter. Rows line up with the grid's 16px pitch. */}
          <ul
            aria-hidden
            className="grid shrink-0 gap-1"
            style={{ gridTemplateRows: 'repeat(7, 12px)', paddingTop: MONTH_ROW }}
          >
            {Array.from({ length: 7 }, (_, row) => (
              <li key={row} className="t-small flex items-center text-muted">
                {LABELLED_ROWS.includes(row) ? weekdays[LABELLED_ROWS.indexOf(row)] : ''}
              </li>
            ))}
          </ul>

          <div>
            <div
              aria-hidden
              className="relative"
              style={{ height: MONTH_ROW, width: grid.weeks.length * PITCH }}
            >
              {grid.monthStarts.map(({ month, week }) => (
                <span
                  key={`${month}-${week}`}
                  className="t-small absolute top-0 text-muted"
                  style={{ left: week * PITCH }}
                >
                  {months[month]}
                </span>
              ))}
            </div>

            <div className="heat" role="img" aria-label={summary}>
              {grid.weeks.map((column, week) =>
                column.map((cell, row) => (
                  <div
                    key={cell ? cell.date : `empty-${week}-${row}`}
                    className="heat-cell"
                    data-level={cell ? cell.level : 'none'}
                    title={cell ? formatDayTitle(cell.count, cell.date) : undefined}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="t-small text-muted">{legendLess}</span>
        <div aria-hidden className="flex gap-1">
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div key={level} className="heat-cell" data-level={level} />
          ))}
        </div>
        <span className="t-small text-muted">{legendMore}</span>
      </div>
    </div>
  )
}
