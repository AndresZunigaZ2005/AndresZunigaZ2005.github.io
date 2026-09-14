'use client'

import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { useLanguage } from '@/i18n/LanguageProvider'
import { technologyGroups } from '@/data/technologies'
import { accentSurface } from '@/lib/accents'

export function Technologies() {
  const { dictionary } = useLanguage()
  const { technologies } = dictionary

  return (
    <Section
      id="technologies"
      eyebrow={technologies.eyebrow}
      title={technologies.title}
      lede={technologies.lede}
    >
      <div className="border-t border-line">
        {technologyGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 60}>
            <div className="grid gap-4 border-b border-line py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
              <h3 className="flex items-center gap-3 sm:col-span-4 lg:col-span-3">
                <span
                  aria-hidden
                  className={`h-2 w-2 shrink-0 rounded-full ${accentSurface[group.accent]}`}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  {technologies.groups[group.id as keyof typeof technologies.groups]}
                </span>
              </h3>

              <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3 sm:col-span-8 lg:col-span-9">
                {group.items.map((item) => (
                  <li key={item} className="text-lg text-ink sm:text-xl">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
