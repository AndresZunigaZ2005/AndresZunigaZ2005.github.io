import type { Language } from '@/types'
import { DEFAULT_LANGUAGE, isLanguage } from './index'

const STORAGE_KEY = 'portfolio.language'

/**
 * The visitor's language preference, modelled as an external store.
 *
 * `localStorage` genuinely is external state, so reading it through
 * `useSyncExternalStore` is the right shape: the server and the hydration pass
 * both see `DEFAULT_LANGUAGE`, and React re-reads the real value immediately
 * after hydration. No effect, no cascading render, no markup mismatch.
 */

let cached: Language | null = null
const listeners = new Set<() => void>()

function readStored(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
    return DEFAULT_LANGUAGE
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSnapshot(): Language {
  cached ??= readStored()
  return cached
}

/** Server and hydration snapshot — always the default language. */
export function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE
}

export function setStoredLanguage(next: Language): void {
  if (cached === next) return
  cached = next

  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Ignore — the choice simply will not persist across reloads.
  }

  for (const listener of listeners) listener()
}
