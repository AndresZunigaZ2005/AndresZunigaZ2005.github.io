'use client'

import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { useLanguage } from '@/i18n/LanguageProvider'

export function About() {
  const { dictionary } = useLanguage()
  const { about } = dictionary

  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.title}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="max-w-2xl space-y-6">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal
                key={paragraph}
                delay={index * 70}
                as="p"
                className="text-base leading-[1.75] text-muted sm:text-lg"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="lg:col-span-5 lg:pt-2">
          <dl className="divide-y divide-line border-y border-line">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:w-32 sm:shrink-0 sm:pt-0.5">
                  {fact.label}
                </dt>
                <dd className="text-sm text-ink sm:text-base">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
