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
      // `t-key` is a component class, not a utility, so it cannot take a
      // `focus:` variant — it is set unconditionally and only ever seen once
      // the link leaves `sr-only`.
      className="t-key sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:flex focus:min-h-12 focus:items-center focus:border-4 focus:border-edge focus:bg-gold focus:px-4 focus:text-edge focus:shadow-[0_4px_0_0_var(--color-edge)]"
    >
      {dictionary.common.skipToContent}
    </a>
  )
}
