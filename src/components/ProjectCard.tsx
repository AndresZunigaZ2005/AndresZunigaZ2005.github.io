'use client'

import Image from 'next/image'
import { ButtonLink } from './ui/ButtonLink'
import { Eyebrow } from './ui/Section'
import { GitHubIcon, GitLabIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { accentSurface, accentWash } from '@/lib/accents'
import type { Project } from '@/types'

export type ProjectCardVariant = 'default' | 'featured'

interface ProjectCardProps {
  project: Project
  variant?: ProjectCardVariant
}

/**
 * One card for every project. The featured variant changes scale and emphasis
 * only — the markup, the data shape and the accessibility affordances are
 * shared, so a change here applies to every project at once.
 */
export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const { dictionary, language } = useLanguage()
  const copy = dictionary.projects
  const featured = variant === 'featured'
  const titleId = `project-${project.id}-title`

  const PlatformIcon = project.platform === 'gitlab' ? GitLabIcon : GitHubIcon
  const platformName = project.platform === 'gitlab' ? 'GitLab' : 'GitHub'
  const hasScreenshots = project.screenshots.length > 0

  return (
    <article
      aria-labelledby={titleId}
      className={`relative overflow-hidden rounded-3xl border border-line transition-colors duration-300 hover:border-line-strong ${
        featured ? `${accentWash[project.accent]} p-8 sm:p-12 lg:p-16` : 'bg-surface p-7 sm:p-10'
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {featured && (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink ${accentSurface[project.accent]}`}
          >
            {copy.featuredBadge}
          </span>
        )}
        <span
          className={`inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted ${
            featured ? 'bg-surface/70' : ''
          }`}
        >
          {copy.roles[project.role]}
        </span>
        {project.status && (
          <Eyebrow className="ml-auto">{project.status[language]}</Eyebrow>
        )}
      </div>

      <h3
        id={titleId}
        className={`mt-6 font-medium tracking-[-0.02em] text-ink ${
          featured ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'
        }`}
      >
        {project.name}
      </h3>

      <p
        className={`mt-2 text-muted ${featured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}
      >
        {project.tagline[language]}
      </p>

      <div className={`mt-8 grid gap-10 lg:grid-cols-12 ${featured ? 'lg:gap-16' : 'lg:gap-12'}`}>
        <div className="lg:col-span-7">
          <p className="max-w-2xl text-base leading-[1.75] text-ink/80">
            {project.description[language]}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-faint">
            {copy.roleNote[project.role]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.repository ? (
              <ButtonLink
                href={project.repository}
                external
                variant={featured ? 'primary' : 'secondary'}
                size={featured ? 'md' : 'sm'}
                icon={<PlatformIcon width={16} height={16} />}
                aria-label={`${copy.viewOn} ${platformName} — ${project.name} (${dictionary.common.opensInNewTab})`}
              >
                {`${copy.viewOn} ${platformName}`}
              </ButtonLink>
            ) : (
              <span className="inline-flex h-9 items-center rounded-full border border-dashed border-line-strong px-4 text-[13px] text-faint">
                {copy.repositoryPrivate}
              </span>
            )}

            {project.repositoryLabel && (
              <span className="font-mono text-[11px] text-faint">{project.repositoryLabel}</span>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          {project.highlights.length > 0 && (
            <>
              <Eyebrow>{copy.labels.highlights}</Eyebrow>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight.en} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span
                      aria-hidden
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accentSurface[project.accent]}`}
                    />
                    <span>{highlight[language]}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className={project.highlights.length > 0 ? 'mt-8' : ''}>
            <Eyebrow>{copy.labels.stack}</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-muted"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {hasScreenshots && (
        <div className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Eyebrow>{copy.labels.screenshots}</Eyebrow>
            <p className="text-xs text-faint">{copy.screenshotsHint}</p>
          </div>

          <ul className="scroll-x mt-5 -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4">
            {project.screenshots.map((screenshot, index) => (
              <li key={screenshot.src} className="shrink-0 snap-start">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt[language]}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(max-width: 640px) 45vw, 200px"
                  loading={index === 0 ? undefined : 'lazy'}
                  className="h-auto w-[9.5rem] rounded-2xl border border-line bg-surface sm:w-[11.5rem]"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
