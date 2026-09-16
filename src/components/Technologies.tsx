'use client'

import { Panel } from './ui/Panel'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { StatBar } from './ui/StatBar'
import { useLanguage } from '@/i18n/LanguageProvider'
import { technologyGroups } from '@/data/technologies'

/**
 * Five areas, one panel each.
 *
 * The meter under each list counts the tools in that area against the widest
 * area, so the bars answer a question the list alone does not: where the work
 * actually goes. It is a count and nothing more — no green-to-red ramp, because
 * "four tools" is not better than "two", and colouring it that way would say so.
 */
export function Technologies() {
  const { dictionary } = useLanguage()
  const { technologies } = dictionary

  const widest = Math.max(...technologyGroups.map((group) => group.items.length))

  return (
    <Section
      id="technologies"
      eyebrow={technologies.eyebrow}
      title={technologies.title}
      lede={technologies.lede}
      accent="sky"
    >
      <ul className="grid gap-8 sm:grid-cols-2">
        {technologyGroups.map((group, index) => {
          const count = group.items.length
          const countLabel = technologies.toolCount.replace('{n}', String(count))

          return (
            <li key={group.id}>
              <Reveal delay={index * 60} className="h-full">
                <Panel
                  className="h-full"
                  accent={group.accent}
                  titleAs="h3"
                  title={technologies.groups[group.id as keyof typeof technologies.groups]}
                  meta={countLabel}
                >
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="chip t-meta">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <StatBar
                      value={count}
                      max={widest}
                      tone={group.accent}
                      label={countLabel}
                    />
                  </div>
                </Panel>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
