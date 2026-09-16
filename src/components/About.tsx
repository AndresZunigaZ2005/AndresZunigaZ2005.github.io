'use client'

import { Panel } from './ui/Panel'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { useLanguage } from '@/i18n/LanguageProvider'

/**
 * Prose belongs in a text box and facts belong in a field list, so they get one
 * each rather than sharing a column. The paragraphs are not gated behind a
 * "press A to continue" — a portfolio is read, not played.
 */
export function About() {
  const { dictionary } = useLanguage()
  const { about } = dictionary

  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.title} accent="sky">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
        <Reveal>
          <Panel>
            <div className="max-w-[42rem] space-y-6">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={120}>
          <Panel title={about.factsTitle} titleAs="h3" accent="lavender">
            <dl className="divide-y-4 divide-edge">
              {about.facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={index === 0 ? 'pb-4' : 'py-4 last:pb-0'}
                >
                  <dt className="t-meta text-muted">{fact.label}</dt>
                  <dd className="t-small mt-1 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
