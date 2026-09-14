'use client'

import { useLanguage } from '@/i18n/LanguageProvider'
import { LANGUAGES, dictionaries } from '@/i18n'

/**
 * ES / EN segmented control.
 *
 * Rendered as a labelled group of toggle buttons rather than a `<select>`, so
 * both options stay visible and the current one is announced through
 * `aria-pressed`.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, dictionary, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label={dictionary.language.label}
      className={`inline-flex items-center rounded-full border border-line bg-surface/70 p-0.5 ${className}`.trim()}
    >
      {LANGUAGES.map((code) => {
        const isActive = code === language
        const target = dictionaries[code]

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            aria-label={`${dictionary.language.switchTo} ${target.meta.label}`}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
              isActive ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
            }`}
          >
            {target.meta.short}
          </button>
        )
      })}
    </div>
  )
}
