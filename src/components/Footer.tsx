'use client'

import { Container } from './ui/Section'
import { profileIcons } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { person, profileLinks } from '@/data/site'

/**
 * The bottom rule. Deliberately the quietest thing on the page: no panel, no
 * accent, just the name, the role and the same links one more time.
 */
export function Footer() {
  const { dictionary } = useLanguage()
  const { footer, common } = dictionary

  const socialLinks = profileLinks.filter((profile) => profile.id !== 'email')

  return (
    <footer className="mt-8 border-t-4 border-edge bg-panel">
      <Container>
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="t-key text-gold">{person.shortName}</p>
            <p className="t-small mt-3 text-ink">{person.name}</p>
            <p className="t-small text-muted">{footer.role}</p>
          </div>

          <nav aria-label={footer.linksLabel}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((profile) => {
                const Icon = profileIcons[profile.id]

                return (
                  <li key={profile.id}>
                    {profile.url ? (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${profile.label} (${common.opensInNewTab})`}
                        className="t-small inline-flex items-center gap-2 text-muted hover:text-gold"
                      >
                        {Icon && <Icon width={15} height={15} />}
                        {profile.label}
                      </a>
                    ) : (
                      <span
                        title={common.pendingHint}
                        className="t-small inline-flex items-center gap-2 text-muted"
                      >
                        {Icon && <Icon width={15} height={15} />}
                        {profile.label}
                        <span className="t-meta">{common.pending}</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="border-t-4 border-edge py-8">
          <p className="t-small text-muted">{footer.rights}</p>
        </div>
      </Container>
    </footer>
  )
}
