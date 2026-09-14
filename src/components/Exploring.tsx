'use client'

import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { useLanguage } from '@/i18n/LanguageProvider'
import { exploring } from '@/data/technologies'
import type { ExplorationStage } from '@/types'

const STAGE_ORDER: ExplorationStage[] = ['new', 'deepening']

const stageDot: Record<ExplorationStage, string> = {
  new: 'bg-pastel-yellow',
  deepening: 'bg-pastel-green',
}

/**
 * Deliberately separate from `Technologies`: this section is about what is
 * being learned, and each stage says plainly whether the area is already part
 * of day-to-day work or genuinely new.
 */
export function Exploring() {
  const { dictionary } = useLanguage()
  const { exploring: copy } = dictionary

  return (
    <Section
      id="exploring"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lede={copy.lede}
      className="border-t border-line"
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
        {STAGE_ORDER.map((stage, index) => {
          const items = exploring.filter((item) => item.stage === stage)
          if (items.length === 0) return null

          return (
            <Reveal key={stage} delay={index * 90}>
              <div>
                <h3 className="flex items-center gap-3">
                  <span aria-hidden className={`h-2 w-2 rounded-full ${stageDot[stage]}`} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    {copy.stages[stage]}
                  </span>
                </h3>

                <p className="mt-3 text-sm text-muted">{copy.stageHints[stage]}</p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-base text-ink"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
