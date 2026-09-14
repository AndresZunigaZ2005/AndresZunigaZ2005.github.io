'use client'

import { ButtonLink } from './ui/ButtonLink'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { GitHubIcon, GitLabIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links } from '@/data/site'

/**
 * "Where I build" — the two platforms, side by side.
 *
 * The cards are intentionally data-free for now. When the GitHub/GitLab helpers
 * in `src/lib` are wired up, recent repositories drop in below each description
 * without changing this layout.
 */
export function Profiles() {
  const { dictionary } = useLanguage()
  const { profiles, common } = dictionary

  const platforms = [
    {
      id: 'github' as const,
      copy: profiles.github,
      href: links.github,
      Icon: GitHubIcon,
      accent: 'bg-pastel-blue',
    },
    {
      id: 'gitlab' as const,
      copy: profiles.gitlab,
      href: links.gitlab,
      Icon: GitLabIcon,
      accent: 'bg-pastel-peach',
    },
  ]

  return (
    <Section id="work" eyebrow={profiles.eyebrow} title={profiles.title} lede={profiles.lede}>
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {platforms.map(({ id, copy, href, Icon, accent }, index) => (
          <Reveal key={id} delay={index * 90}>
            <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-colors duration-300 hover:border-line-strong sm:p-10">
              <span
                aria-hidden
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-ink ${accent}`}
              >
                <Icon width={22} height={22} />
              </span>

              <h3 className="mt-7 text-2xl font-medium tracking-[-0.01em] text-ink">{copy.name}</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
                {copy.description}
              </p>

              <p className="mt-6 font-mono text-[11px] text-faint">
                {href.replace('https://', '')}
              </p>

              <div className="mt-auto pt-8">
                <ButtonLink
                  href={href}
                  external
                  size="sm"
                  aria-label={`${copy.cta} (${common.opensInNewTab})`}
                >
                  {copy.cta}
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
