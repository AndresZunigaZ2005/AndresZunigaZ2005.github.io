'use client'

import { useLanguage } from '@/i18n/LanguageProvider'

/**
 * Keyboard-only shortcut past the header. Visually hidden until focused, which
 * is the one time it is useful.
 */
export function SkipLink() {
  const { dictionary } = useLanguage()

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
    >
      {dictionary.common.skipToContent}
    </a>
  )
}
