'use client'

import { ProjectCard } from './ProjectCard'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { useLanguage } from '@/i18n/LanguageProvider'
import { featuredProject, otherProjects } from '@/data/projects'

export function Projects() {
  const { dictionary } = useLanguage()
  const { projects } = dictionary

  return (
    <Section id="projects" eyebrow={projects.eyebrow} title={projects.title} lede={projects.lede}>
      <div className="space-y-8 sm:space-y-10">
        {featuredProject && (
          <Reveal>
            <ProjectCard project={featuredProject} variant="featured" />
          </Reveal>
        )}

        {otherProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
