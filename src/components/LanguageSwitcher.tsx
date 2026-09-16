'use client'

import { PixelGlyph } from './ui/Pixel'
import { useLanguage } from '@/i18n/LanguageProvider'
import { LANGUAGES, dictionaries } from '@/i18n'

/**
 * ES / EN, as an options row.
 *
 * Both options stay visible and the cursor marks the one in use, which is how
 * a settings screen in a game of this era shows a choice. The cursor slot is
 * reserved on both buttons so nothing shifts when the choice changes, and
 * `aria-pressed` carries the same state for anyone who cannot see the arrow.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, dictionary, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label={dictionary.language.label}
      className={`flex items-center border-4 border-edge bg-bg ${className}`.trim()}
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
            className={`t-meta flex min-h-10 items-center gap-1 px-2 ${
              isActive ? 'bg-gold text-edge' : 'text-muted hover:text-ink'
            }`}
          >
            <PixelGlyph name="cursor" size={8} className={isActive ? '' : 'opacity-0'} />
            {target.meta.short}
          </button>
        )
      })}
    </div>
  )
}
