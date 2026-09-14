'use client'

import { ButtonLink } from './ui/ButtonLink'
import { Container, Eyebrow } from './ui/Section'
import { ArrowRightIcon, GitHubIcon, GitLabIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links } from '@/data/site'

export function Hero() {
  const { dictionary } = useLanguage()
  const { hero, common } = dictionary

  return (
    <section id="top" className="relative overflow-hidden">
      <HeroBackdrop />

      <Container className="relative">
        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-24 sm:py-28">
          <Eyebrow className="reveal is-visible">{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 text-balance text-4xl font-medium tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
            {hero.greeting}
          </h1>

          <p className="mt-8 flex flex-col gap-1 text-lg text-ink sm:text-xl">
            <span>{hero.roleOne}</span>
            <span className="text-muted">{hero.roleTwo}</span>
          </p>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink
              href="#projects"
              variant="primary"
              icon={<ArrowRightIcon width={16} height={16} />}
              iconAfter
            >
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

          <ul
            aria-hidden
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint"
          >
            {hero.facets.map((facet, index) => (
              <li key={facet} className="flex items-center gap-6">
                {index > 0 && <span className="h-px w-6 bg-line-strong" />}
                {facet}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

/**
 * Abstract backdrop: a faint dot grid with three soft pastel fields.
 * Pure CSS and one inline SVG pattern — no images, no animation, no JavaScript.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" role="presentation">
        <defs>
          <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(29,29,31,0.07)" />
          </pattern>
          <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="70%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="hero-mask">
            <rect width="100%" height="100%" fill="url(#hero-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" mask="url(#hero-mask)" />
      </svg>

      <div className="absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-pastel-lavender/50 blur-3xl" />
      <div className="absolute -left-40 top-40 h-[22rem] w-[22rem] rounded-full bg-pastel-blue/40 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-[18rem] w-[18rem] rounded-full bg-pastel-peach/35 blur-3xl" />
    </div>
  )
}
