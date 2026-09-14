'use client'

import { ButtonLink } from './ui/ButtonLink'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { ArrowUpRightIcon, MailIcon, profileIcons } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links, profileLinks } from '@/data/site'

export function Contact() {
  const { dictionary } = useLanguage()
  const { contact, common } = dictionary

  return (
    <Section
      id="contact"
      align="center"
      eyebrow={contact.eyebrow}
      title={
        <>
          {contact.title} <span className="text-muted">{contact.highlight}</span>
        </>
      }
      lede={contact.lede}
      className="border-t border-line"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="flex justify-center">
            {links.email ? (
              <ButtonLink
                href={`mailto:${links.email}`}
                variant="primary"
                icon={<MailIcon width={16} height={16} />}
              >
                {links.email}
              </ButtonLink>
            ) : (
              /* No address has been provided yet, so nothing is invented: the
                 slot is shown as explicitly pending instead. */
              <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-line-strong px-5 text-sm text-faint">
                <MailIcon width={16} height={16} />
                {`${contact.emailLabel} — ${common.pending}`}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            {profileLinks
              .filter((profile) => profile.id !== 'email')
              .map((profile) => {
                const Icon = profileIcons[profile.id]

                if (!profile.url) {
                  return (
                    <li key={profile.id}>
                      <span
                        title={common.pendingHint}
                        className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-2 text-sm text-faint"
                      >
                        {Icon && <Icon width={16} height={16} />}
                        {profile.label}
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                          {common.pending}
                        </span>
                      </span>
                    </li>
                  )
                }

                return (
                  <li key={profile.id}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${profile.label} (${common.opensInNewTab})`}
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
                    >
                      {Icon && <Icon width={16} height={16} />}
                      {profile.label}
                      <ArrowUpRightIcon
                        width={13}
                        height={13}
                        className="text-faint transition-colors duration-200 group-hover:text-ink"
                      />
                    </a>
                  </li>
                )
              })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
