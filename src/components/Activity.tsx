'use client'

import { Panel } from './ui/Panel'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { ContributionGrid } from './ui/ContributionGrid'
import { useLanguage } from '@/i18n/LanguageProvider'
import type { ContributionCalendar, Platform } from '@/types'

interface ActivityProps {
  /** One entry per platform. A `null` means that platform could not be read. */
  calendars: (ContributionCalendar | null)[]
  /** The build date, in UTC. Fixed by the server so both renders agree. */
  today: string
}

const platformName: Record<Platform, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
}

/** GitHub keeps the blue it has elsewhere on the page; GitLab takes the warm one. */
const platformAccent = {
  github: { accent: 'sky', cssVar: 'var(--color-sky)' },
  gitlab: { accent: 'ember', cssVar: 'var(--color-ember)' },
} as const

/**
 * The contribution calendars, as they come from the platforms.
 *
 * A platform that could not be reached at build time is left out rather than
 * drawn as an empty year — an outage is not the same claim as "did nothing",
 * and the grid has no way to say which one it is showing. If neither can be
 * read, the section does not render at all.
 */
export function Activity({ calendars, today }: ActivityProps) {
  const { dictionary } = useLanguage()
  const copy = dictionary.activity

  const available = calendars.filter((calendar): calendar is ContributionCalendar =>
    Boolean(calendar),
  )
  if (available.length === 0) return null

  const formatDate = (iso: string) => {
    const [year, month, day] = iso.split('-')
    return `${Number(day)} ${copy.months[Number(month) - 1]} ${year}`
  }

  const totalText = (count: number) =>
    count === 1 ? copy.totalOne : copy.total.replace('{n}', String(count))

  const dayTitle = (count: number, iso: string) => {
    const template = count === 0 ? copy.dayNone : count === 1 ? copy.dayOne : copy.day
    return template.replace('{n}', String(count)).replace('{date}', formatDate(iso))
  }

  return (
    <Section
      id="activity"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lede={copy.lede}
      accent="sky"
    >
      <div className="space-y-8">
        {available.map((calendar, index) => {
          const { accent, cssVar } = platformAccent[calendar.platform]
          const name = platformName[calendar.platform]

          return (
            <Reveal key={calendar.platform} delay={index * 90}>
              <Panel
                accent={accent}
                titleAs="h3"
                title={name}
                meta={totalText(calendar.total)}
              >
                <ContributionGrid
                  calendar={calendar}
                  today={today}
                  accentVar={cssVar}
                  months={copy.months}
                  weekdays={copy.weekdays}
                  formatDayTitle={dayTitle}
                  summary={copy.summary
                    .replace('{total}', totalText(calendar.total))
                    .replace('{platform}', name)
                    .replace('{from}', formatDate(calendar.from))
                    .replace('{to}', formatDate(calendar.to))}
                  legendLess={copy.legendLess}
                  legendMore={copy.legendMore}
                />

                <p className="t-small mt-6 max-w-[42rem] text-muted">
                  {copy.sources[calendar.platform]}
                </p>
              </Panel>
            </Reveal>
          )
        })}

        <p className="t-small text-muted">
          {copy.updated.replace('{date}', formatDate(today))}
        </p>
      </div>
    </Section>
  )
}
