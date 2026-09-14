'use client'

import { Container } from './ui/Section'
import { profileIcons } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { person, profileLinks } from '@/data/site'

export function Footer() {
  const { dictionary } = useLanguage()
  const { footer, common } = dictionary

  // The footer repeats the profile row minus email, which lives in Contact.
  const socialLinks = profileLinks.filter((profile) => profile.id !== 'email')

  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-10 py-14 sm:py-16 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-base font-medium text-ink">{person.name}</p>
            <p className="mt-1 text-sm text-muted">{footer.role}</p>
          </div>

          <nav aria-label={footer.linksLabel}>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
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
                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
                      >
                        {Icon && <Icon width={15} height={15} />}
                        {profile.label}
                      </a>
                    ) : (
                      <span
                        title={common.pendingHint}
                        className="inline-flex items-center gap-2 text-sm text-faint"
                      >
                        {Icon && <Icon width={15} height={15} />}
                        {profile.label}
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                          {common.pending}
                        </span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-wide text-faint">{footer.rights}</p>
          <p className="font-mono text-[11px] tracking-wide text-faint">{footer.builtWith}</p>
        </div>
      </Container>
    </footer>
  )
}
