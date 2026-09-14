import type { Language, LocalizedText } from '@/types'
import { en } from './en'
import { es } from './es'

/**
 * The dictionary contract, derived from the Spanish dictionary so there is only
 * ever one place to add a key. `en.ts` imports this type, which is erased at
 * build time — the cycle is types-only and never reaches the runtime.
 */
export type Dictionary = typeof es

export const DEFAULT_LANGUAGE: Language = 'es'

/** Languages offered by the UI, in the order the switcher shows them. */
export const LANGUAGES: Language[] = ['es', 'en']

/**
 * Adding a language means adding a dictionary file and one entry here.
 * No component ever needs to change.
 */
export const dictionaries: Record<Language, Dictionary> = { es, en }

export function isLanguage(value: unknown): value is Language {
  return value === 'es' || value === 'en'
}

/** Picks the right side of a `LocalizedText`. */
export function t(text: LocalizedText, language: Language): string {
  return text[language]
}

export { en, es }
