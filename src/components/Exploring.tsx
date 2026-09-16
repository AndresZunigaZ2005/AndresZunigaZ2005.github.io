'use client'

import { Panel } from './ui/Panel'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { StatBar } from './ui/StatBar'
import { useLanguage } from '@/i18n/LanguageProvider'
import { exploring } from '@/data/technologies'
import type { Accent, ExplorationStage } from '@/types'

const STAGE_ORDER: ExplorationStage[] = ['new', 'deepening']

/** New ground reads as the thing being worked on; established ground as settled. */
const stageAccent: Record<ExplorationStage, Accent> = {
  new: 'gold',
  deepening: 'leaf',
}

/**
 * Deliberately separate from `Technologies`: this section is about what is
 * being learned, and each stage says plainly whether the area is already part
 * of day-to-day work or genuinely new.
 *
 * Both meters are drawn against the same total, so the two bars together show
 * how the learning is split rather than how far along either one is. There is
 * no percentage here to show, and inventing one would be the easiest lie on
 * the page.
 */
export function Exploring() {
  const { dictionary } = useLanguage()
  const { exploring: copy } = dictionary

  const total = exploring.length

  return (
    <Section
      id="exploring"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lede={copy.lede}
      accent="lavender"
    >
      <ul className="grid gap-8 sm:grid-cols-2">
        {STAGE_ORDER.map((stage, index) => {
          const items = exploring.filter((item) => item.stage === stage)
          if (items.length === 0) return null

          const countLabel = copy.countLabel
            .replace('{n}', String(items.length))
            .replace('{total}', String(total))

          return (
            <li key={stage}>
              <Reveal delay={index * 90} className="h-full">
                <Panel
                  className="h-full"
                  accent={stageAccent[stage]}
                  titleAs="h3"
                  title={copy.stages[stage]}
                  meta={countLabel}
                >
                  <p className="t-small text-muted">{copy.stageHints[stage]}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li key={item.id} className="chip t-meta">
                        {item.label}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <StatBar
                      value={items.length}
                      max={total}
                      tone={stageAccent[stage]}
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
