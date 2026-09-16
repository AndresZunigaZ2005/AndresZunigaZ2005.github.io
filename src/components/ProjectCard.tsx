'use client'

import Image from 'next/image'
import { ButtonLink } from './ui/ButtonLink'
import { Panel } from './ui/Panel'
import { Eyebrow } from './ui/Section'
import { PixelGlyph, projectBadges } from './ui/Pixel'
import { GitHubIcon, GitLabIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { accentText } from '@/lib/accents'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  /** Position in the catalogue, 1-based. Shown in the title bar. */
  entry: number
}

/**
 * One catalogue entry per project: a name, what type of thing it is, what it
 * does, what it looks like, and where to read the source.
 *
 * Every project uses the same frame. The only thing that varies is the accent —
 * which is the same colour as that project's badge on the trainer card, so the
 * badge you clicked and the panel you land on are visibly the same thing.
 */
export function ProjectCard({ project, entry }: ProjectCardProps) {
  const { dictionary, language } = useLanguage()
  const copy = dictionary.projects
  const titleId = `project-${project.id}-title`

  const PlatformIcon = project.platform === 'gitlab' ? GitLabIcon : GitHubIcon
  const platformName = project.platform === 'gitlab' ? 'GitLab' : 'GitHub'

  return (
    <Panel
      as="article"
      id={`project-${project.id}`}
      aria-labelledby={titleId}
      accent={project.accent}
      titleAs="h3"
      titleId={titleId}
      title={project.name}
      meta={`${copy.entry} ${String(entry).padStart(3, '0')}`}
      className="scroll-mt-24"
    >
      <div className="flex items-start gap-4">
        <PixelGlyph
          name={projectBadges[project.id] ?? 'crate'}
          size={32}
          className={`mt-1 shrink-0 ${accentText[project.accent]}`}
        />
        <p className="text-[24px] leading-8 text-ink">{project.tagline[language]}</p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.featured && (
          <li className="chip t-meta border-edge bg-gold text-edge">{copy.featuredBadge}</li>
        )}
        <li className="chip t-meta">{copy.roles[project.role]}</li>
        {project.status && <li className="chip t-meta">{project.status[language]}</li>}
      </ul>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
        <div>
          <p className="max-w-[42rem] text-ink">{project.description[language]}</p>
          <p className="t-small mt-4 max-w-[42rem] text-muted">{copy.roleNote[project.role]}</p>

          <div className="mt-8">
            <Eyebrow>{copy.labels.type}</Eyebrow>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li key={technology} className="chip t-meta">
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.highlights.length > 0 && (
          <div>
            <Eyebrow>{copy.labels.highlights}</Eyebrow>
            <ul className="mt-3">
              {project.highlights.map((highlight) => (
                <li key={highlight.en} className="flex gap-2 py-2">
                  <PixelGlyph
                    name="cursor"
                    size={16}
                    className={`mt-1 shrink-0 ${accentText[project.accent]}`}
                  />
                  <span className="t-small text-ink">{highlight[language]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {project.screenshots.length > 0 && (
        <div className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Eyebrow>{copy.labels.screenshots}</Eyebrow>
            <p className="t-small text-muted">{copy.screenshotsHint}</p>
          </div>

          <ul className="scroll-x mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {project.screenshots.map((screenshot, index) => (
              <li key={screenshot.src} className="shrink-0 snap-start">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt[language]}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(max-width: 640px) 45vw, 192px"
                  loading={index === 0 ? undefined : 'lazy'}
                  className="h-auto w-40 border-4 border-edge bg-bg sm:w-48"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {project.repository ? (
          <ButtonLink
            href={project.repository}
            external
            variant={project.featured ? 'primary' : 'secondary'}
            icon={<PlatformIcon width={16} height={16} />}
            aria-label={`${copy.viewOn} ${platformName} — ${project.name} (${dictionary.common.opensInNewTab})`}
          >
            {`${copy.viewOn} ${platformName}`}
          </ButtonLink>
        ) : (
          <span className="btn-empty t-meta">{copy.repositoryPrivate}</span>
        )}

        {project.repositoryLabel && (
          <span className="t-small text-muted">{project.repositoryLabel}</span>
        )}
      </div>
    </Panel>
  )
}
