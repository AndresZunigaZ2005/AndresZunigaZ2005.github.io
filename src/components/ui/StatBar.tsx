import { accentFill } from '@/lib/accents'
import type { Accent } from '@/types'

interface StatBarProps {
  /** Lit blocks. Always a real count of real things. */
  value: number
  /** Total blocks. Shared across every bar in a section so they compare. */
  max: number
  /** What the bar is counting, read out in place of the blocks. */
  label: string
  tone?: Accent
  className?: string
}

/**
 * A segmented meter.
 *
 * One lit block is one item, so the bar is a count and nothing else — it never
 * stands in for a score, a skill level or a percentage that does not exist.
 * The count is also written out next to it wherever the bar is used, so the
 * blocks are never the only way to read the number.
 */
export function StatBar({ value, max, label, tone = 'sky', className = '' }: StatBarProps) {
  return (
    <span role="img" aria-label={label} className={`bar ${className}`.trim()}>
      {Array.from({ length: max }, (_, index) => {
        const lit = index < value
        return (
          <span
            key={index}
            data-on={lit}
            className={`bar-seg ${lit ? accentFill[tone] : ''}`.trim()}
          />
        )
      })}
    </span>
  )
}
