'use client'

import { useEffect, useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Container } from './ui/Section'
import { Panel } from './ui/Panel'
import { PixelGlyph } from './ui/Pixel'
import { useLanguage } from '@/i18n/LanguageProvider'
import { person } from '@/data/site'

/** Section ids, in page order. Labels come from the active dictionary. */
const NAV_ITEMS = ['about', 'technologies', 'projects', 'work', 'contact'] as const

/**
 * The menu bar.
 *
 * The cursor is not decoration: it sits on the section you are currently
 * reading, which is the one piece of information a menu in a game like this
 * always carries. That is also why the header is solid at every scroll position
 * — a bar that fades in and out of translucency would be a second, competing
 * signal about where you are, and this palette has no alpha to spend on it.
 */
export function Navbar() {
  const { dictionary } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  // One cheap passive listener: the active section is the last one whose top has
  // risen past the upper third of the viewport. Measuring against the header
  // instead would only ever match in the few pixels where a section heading sits
  // directly under it, and the cursor would be absent almost all of the time.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current: string | null = null

      for (const id of NAV_ITEMS) {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= line) current = id
      }

      setActive(current)
    }

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
    <header className="sticky top-0 z-50 border-b-4 border-edge bg-panel">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#top" aria-label={dictionary.nav.brandLabel} className="t-key text-gold">
            {person.shortName}
          </a>

          <nav aria-label={dictionary.nav.primary} className="hidden lg:block">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    data-active={active === item}
                    aria-current={active === item ? 'true' : undefined}
                    className="menu-row"
                  >
                    <span className="menu-cursor">
                      <PixelGlyph name="cursor" size={16} />
                    </span>
                    <span className="t-small text-ink">{dictionary.nav.items[item]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              className="flex h-10 w-10 items-center justify-center border-4 border-edge bg-bg text-ink lg:hidden"
            >
              <PixelGlyph name={menuOpen ? 'close' : 'menu'} size={16} />
            </button>
          </div>
        </div>
      </Container>

      {/* Kept out of the DOM when closed so nothing is focusable behind the
          trigger. */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t-4 border-edge bg-bg lg:hidden">
          <Container>
            <nav aria-label={dictionary.nav.primary} className="py-6">
              <Panel title={dictionary.nav.menuTitle} titleAs="h2" accent="gold">
                <ul>
                  {NAV_ITEMS.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item}`}
                        onClick={() => setMenuOpen(false)}
                        data-active={active === item}
                        className="menu-row"
                      >
                        <span className="menu-cursor">
                          <PixelGlyph name="cursor" size={16} />
                        </span>
                        <span className="text-ink">{dictionary.nav.items[item]}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Panel>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
