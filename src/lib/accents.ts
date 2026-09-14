import type { Accent } from '@/types'

/**
 * Tailwind cannot see class names built at runtime, so every accent class is
 * written out here in full. One record per role keeps the pastel palette
 * consistent and, just as importantly, rare.
 */
export const accentSurface: Record<Accent, string> = {
  blue: 'bg-pastel-blue',
  green: 'bg-pastel-green',
  lavender: 'bg-pastel-lavender',
  peach: 'bg-pastel-peach',
  yellow: 'bg-pastel-yellow',
}

/** A soft accent wash, used behind large cards where full pastel is too loud. */
export const accentWash: Record<Accent, string> = {
  blue: 'bg-pastel-blue/40',
  green: 'bg-pastel-green/40',
  lavender: 'bg-pastel-lavender/40',
  peach: 'bg-pastel-peach/40',
  yellow: 'bg-pastel-yellow/40',
}
