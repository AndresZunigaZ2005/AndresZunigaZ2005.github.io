'use client'

import { ButtonLink } from './ui/ButtonLink'
import { Panel } from './ui/Panel'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { PixelGlyph } from './ui/Pixel'
import { GitHubIcon, GitLabIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links } from '@/data/site'

/**
 * Two hosts, two crates.
 *
 * A repository is storage, so these are drawn as storage: a labelled box with
 * what is kept in it and a way in. The cards are deliberately data-free for
 * now — when the GitHub/GitLab helpers in `src/lib` are wired up, recent
 * repositories drop in under each description without changing this layout.
 */
export function Profiles() {
  const { dictionary } = useLanguage()
  const { profiles, common } = dictionary

  const hosts = [
    { id: 'github' as const, copy: profiles.github, href: links.github, Icon: GitHubIcon },
    { id: 'gitlab' as const, copy: profiles.gitlab, href: links.gitlab, Icon: GitLabIcon },
  ]

  return (
    <Section
      id="work"
      eyebrow={profiles.eyebrow}
      title={profiles.title}
      lede={profiles.lede}
      accent="lavender"
    >
      <ul className="grid gap-8 md:grid-cols-2">
        {hosts.map(({ id, copy, href, Icon }, index) => (
          <li key={id}>
            <Reveal delay={index * 90} className="h-full">
              <Panel
                className="h-full"
                accent="lavender"
                titleAs="h3"
                title={copy.name}
                bodyClassName="flex flex-col"
              >
                <div className="flex items-start gap-4">
                  <PixelGlyph name="crate" size={32} className="mt-1 shrink-0 text-muted" />
                  <p className="text-ink">{copy.description}</p>
                </div>

                <p className="t-small mt-6 text-muted">{href.replace('https://', '')}</p>

                <div className="mt-auto pt-8">
                  <ButtonLink
                    href={href}
                    external
                    icon={<Icon width={16} height={16} />}
                    aria-label={`${copy.cta} — ${copy.name} (${common.opensInNewTab})`}
                  >
                    {copy.cta}
                  </ButtonLink>
                </div>
              </Panel>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
