'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import type { Language } from '@/types'
import { dictionaries, type Dictionary } from './index'
import {
  getServerSnapshot,
  getSnapshot,
  setStoredLanguage,
  subscribe,
} from './languageStore'

interface LanguageContextValue {
  language: Language
  dictionary: Dictionary
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * Holds the active language for the whole page.
 *
 * The server render and the hydration pass are always the default language, so
 * the HTML a crawler sees is complete and in Spanish; a stored preference is
 * picked up right after hydration.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Keep the document language in sync for screen readers and translation tools.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setStoredLanguage(next)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ language, dictionary: dictionaries[language], setLanguage }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>.')
  }
  return context
}
