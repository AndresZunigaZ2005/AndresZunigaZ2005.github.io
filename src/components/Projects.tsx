'use client'

import { ProjectCard } from './ProjectCard'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { useLanguage } from '@/i18n/LanguageProvider'
import { projects } from '@/data/projects'

/**
 * The catalogue, rendered in the order `projects.ts` exports.
 *
 * Entry numbers come from that order, so they are stable identifiers rather
 * than a ranking: entry 002 is not worse than 001, it is simply the second one
 * written down. The featured project is marked in its own panel, not by being
 * pulled out of sequence.
 */
export function Projects() {
  const { dictionary } = useLanguage()
  const { projects: copy } = dictionary

  return (
    <Section
      id="projects"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lede={copy.lede}
      accent="gold"
    >
      <div className="space-y-12">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 80}>
            <ProjectCard project={project} entry={index + 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
