'use client'

import { useEffect, useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Container } from './ui/Section'
import { CloseIcon, GitHubIcon, GitLabIcon, MenuIcon } from './ui/Icons'
import { useLanguage } from '@/i18n/LanguageProvider'
import { links, person } from '@/data/site'

/** Section ids, in page order. Labels come from the active dictionary. */
const NAV_ITEMS = ['about', 'technologies', 'projects', 'work', 'contact'] as const

export function Navbar() {
  const { dictionary } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // A single, cheap scroll listener: the header only ever flips one boolean.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The panel is a disclosure, not a modal: it sits inside the header, does not
  // cover the viewport, and leaves the page behind it reachable. So there is no
  // scroll lock and no focus trap — just Escape to close.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-line bg-canvas/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            aria-label={dictionary.nav.brandLabel}
            className="font-mono text-[13px] font-medium tracking-[0.2em] text-ink"
          >
            {person.brand}
          </a>

          <nav aria-label={dictionary.nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {dictionary.nav.items[item]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <span aria-hidden className="mx-1 hidden h-4 w-px bg-line lg:block" />

            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub (${dictionary.common.opensInNewTab})`}
              className="hidden rounded-full p-2 text-muted transition-colors duration-200 hover:text-ink lg:block"
            >
              <GitHubIcon width={18} height={18} />
            </a>
            <a
              href={links.gitlab}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitLab (${dictionary.common.opensInNewTab})`}
              className="hidden rounded-full p-2 text-muted transition-colors duration-200 hover:text-ink lg:block"
            >
              <GitLabIcon width={18} height={18} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              className="rounded-full p-2 text-ink transition-colors duration-200 hover:bg-line/50 lg:hidden"
            >
              {menuOpen ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile panel. Kept out of the DOM when closed so nothing is focusable
          behind the trigger. */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-canvas lg:hidden">
          <Container>
            <nav aria-label={dictionary.nav.primary} className="py-6">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-line py-4 text-lg text-ink"
                    >
                      {dictionary.nav.items[item]}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <div className="-ml-2 flex items-center gap-1">
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub (${dictionary.common.opensInNewTab})`}
                    className="rounded-full p-2 text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <GitHubIcon width={20} height={20} />
                  </a>
                  <a
                    href={links.gitlab}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitLab (${dictionary.common.opensInNewTab})`}
                    className="rounded-full p-2 text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <GitLabIcon width={20} height={20} />
                  </a>
                </div>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
