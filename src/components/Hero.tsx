'use client'

import type { CSSProperties } from 'react'
import { ButtonLink } from './ui/ButtonLink'
import { Panel } from './ui/Panel'
import { Container, Eyebrow } from './ui/Section'
import { PixelGlyph, projectBadges } from './ui/Pixel'
import { GitHubIcon, GitLabIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links, person } from '@/data/site'
import { projects } from '@/data/projects'
import { accentText } from '@/lib/accents'

/**
 * The opening screen is a trainer card, not a headline.
 *
 * A card of that kind is already exactly what the top of a portfolio has to do:
 * it states who someone is, what they are, and what they have finished, in a
 * frame you can read in one glance. Every field in it is a fact that appears
 * somewhere else on the page — nothing here is invented to fill the layout —
 * and the badges are the three published projects, each one a link straight to
 * its entry further down.
 *
 * Underneath it, a dialog box types out the greeting once on load. That is the
 * only motion on the page that nobody asked for, so it gets the whole budget:
 * one line, roughly a second, and gone.
 */
export function Hero() {
  const { dictionary } = useLanguage()
  const { hero, common } = dictionary
  const card = hero.card

  const fields = [
    { label: card.classLabel, value: hero.roleTwo },
    { label: card.degreeLabel, value: hero.roleOne },
    { label: card.schoolLabel, value: card.school },
  ]

  return (
    <section
      id="top"
      className="scroll-mt-24 py-12 sm:py-20"
      // Drives both the per-character step count of the typed line and the
      // moment everything after it appears.
      style={{ '--chars': hero.greeting.length } as CSSProperties}
    >
      <Container>
        <Panel title={card.title} accent="gold">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <h1>
                <span className="t-hero block text-gold">{person.shortName}</span>
                <span className="mt-3 block text-[24px] leading-8 text-ink">
                  {person.familyNames}
                </span>
              </h1>

              <dl className="mt-8 space-y-3">
                {fields.map((field) => (
                  <div key={field.label} className="sm:flex sm:gap-6">
                    <dt className="t-meta text-muted sm:w-40 sm:shrink-0">{field.label}</dt>
                    <dd className="text-ink">{field.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Eyebrow>{card.typeLabel}</Eyebrow>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {hero.facets.map((facet) => (
                    <li key={facet} className="chip t-meta">
                      {facet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The badge case. Three projects, three glyphs, three anchors. */}
            <div className="border-t-4 border-edge pt-8 md:w-64 md:border-t-0 md:border-l-4 md:pt-0 md:pl-8">
              <Eyebrow>{card.badgesLabel}</Eyebrow>

              <ul className="mt-3">
                {projects.map((project) => (
                  <li key={project.id}>
                    <a href={`#project-${project.id}`} className="menu-row">
                      <span className="menu-cursor">
                        <PixelGlyph name="cursor" size={16} />
                      </span>
                      <PixelGlyph
                        name={projectBadges[project.id] ?? 'crate'}
                        size={24}
                        className={accentText[project.accent]}
                      />
                      <span className="t-small text-ink">{project.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="t-small mt-4 text-muted">{card.badgesHint}</p>
            </div>
          </div>
        </Panel>

        <Panel className="mt-12">
          <p className="t-h2 text-gold">
            <span className="typeline">{hero.greeting}</span>
          </p>

          <div className="after-typing">
            <p className="mt-6 max-w-[42rem] text-ink">{hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="#projects" variant="primary">
                {hero.ctaProjects}
              </ButtonLink>
              <ButtonLink
                href={links.github}
                external
                icon={<GitHubIcon width={16} height={16} />}
                aria-label={`GitHub (${common.opensInNewTab})`}
              >
                {hero.ctaGithub}
              </ButtonLink>
              <ButtonLink
                href={links.gitlab}
                external
                icon={<GitLabIcon width={16} height={16} />}
                aria-label={`GitLab (${common.opensInNewTab})`}
              >
                {hero.ctaGitlab}
              </ButtonLink>
            </div>

            {/* The "keep going" marker at the bottom of a text box. */}
            <div className="mt-6 flex justify-end">
              <PixelGlyph name="more" size={24} className="blink text-gold" />
            </div>
          </div>
        </Panel>
      </Container>
    </section>
  )
}
