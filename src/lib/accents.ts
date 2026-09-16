import type { Accent } from '@/types'

/**
 * Tailwind cannot see class names built at runtime, so every accent class is
 * written out here in full.
 *
 * An accent only ever appears in three roles — a filled title bar, a badge, a
 * cursor — and each role has its own record. Keeping them apart is what stops
 * an accent leaking into body text, where none of these colours would hold up.
 */

/** Filled panel title bars. Paired with `text-edge` for the label. */
export const accentFill: Record<Accent, string> = {
  gold: 'bg-gold',
  sky: 'bg-sky',
  leaf: 'bg-leaf',
  ember: 'bg-ember',
  lavender: 'bg-muted',
}

/** Badges, bullets and cursors sitting directly on a panel. */
export const accentText: Record<Accent, string> = {
  gold: 'text-gold',
  sky: 'text-sky',
  leaf: 'text-leaf',
  ember: 'text-ember',
  lavender: 'text-muted',
}
