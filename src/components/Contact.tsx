'use client'

import { ButtonLink } from './ui/ButtonLink'
import { Panel } from './ui/Panel'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { PixelGlyph } from './ui/Pixel'
import { MailIcon, profileIcons } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links, profileLinks } from '@/data/site'

/**
 * Email is the one thing to do here, so it gets the only gold button on the
 * page below the hero. Everything else is a directory: one row per place, the
 * address in full, and a cursor marking the row you are on.
 *
 * A profile with no URL yet stays in the list as an empty slot rather than
 * disappearing or pointing somewhere invented.
 */
export function Contact() {
  const { dictionary } = useLanguage()
  const { contact, common } = dictionary

  const directory = profileLinks.filter((profile) => profile.id !== 'email')

  return (
    <Section id="contact" eyebrow={contact.eyebrow} title={contact.title} accent="gold">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
        <Reveal>
          <Panel>
            <p className="t-h2 text-gold">{contact.highlight}</p>
            <p className="mt-6 max-w-[42rem] text-ink">{contact.lede}</p>

            <div className="mt-8">
              {links.email ? (
                <>
                  <ButtonLink
                    href={`mailto:${links.email}`}
                    variant="primary"
                    icon={<MailIcon width={16} height={16} />}
                  >
                    {contact.emailLabel}
                  </ButtonLink>
                  <p className="t-small mt-4 text-muted">{links.email}</p>
                </>
              ) : (
                /* No address has been provided, so nothing is invented: the slot
                   is shown as explicitly empty instead. */
                <span className="btn-empty t-meta">
                  <MailIcon width={16} height={16} />
                  {`${contact.emailLabel} — ${common.pending}`}
                </span>
              )}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={120}>
          <Panel title={contact.directoryTitle} titleAs="h3" accent="lavender">
            <ul>
              {directory.map((profile) => {
                const Icon = profileIcons[profile.id]

                return (
                  <li key={profile.id}>
                    {profile.url ? (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${profile.label} (${common.opensInNewTab})`}
                        className="menu-row"
                      >
                        <span className="menu-cursor">
                          <PixelGlyph name="cursor" size={16} />
                        </span>
                        {Icon && <Icon width={16} height={16} className="shrink-0 text-muted" />}
                        <span className="t-small text-ink">{profile.label}</span>
                      </a>
                    ) : (
                      <span title={common.pendingHint} className="menu-row text-muted">
                        <span className="menu-cursor" />
                        {Icon && <Icon width={16} height={16} className="shrink-0" />}
                        <span className="t-small">{profile.label}</span>
                        <span className="t-meta ml-auto">{common.pending}</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}
