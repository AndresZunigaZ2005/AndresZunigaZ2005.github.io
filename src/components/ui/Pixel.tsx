import type { SVGProps } from 'react'

/**
 * Pixel art, drawn as data.
 *
 * Every glyph is an 8x8 bitmap written out as eight strings, which is both the
 * way the art was designed and the only way it stays legible in a diff. The
 * renderer walks each row and emits one `<rect>` per run of lit pixels, so a
 * glyph costs a handful of nodes rather than 64, and `shape-rendering` keeps
 * the edges hard at any size.
 *
 * Glyphs inherit `currentColor`, so a badge takes the colour of whatever it
 * sits in. They are decorative by default: the accessible name always comes
 * from the surrounding link, heading or label.
 */

const GLYPHS = {
  /** Menu cursor. The one that marks the row you are on. */
  cursor: [
    '..X.....',
    '..XX....',
    '..XXX...',
    '..XXXX..',
    '..XXXX..',
    '..XXX...',
    '..XX....',
    '..X.....',
  ],
  /** "There is more text" marker, at the bottom of a dialog box. */
  more: [
    '........',
    '........',
    'XXXXXXXX',
    '.XXXXXX.',
    '..XXXX..',
    '...XX...',
    '........',
    '........',
  ],
  menu: [
    'XXXXXXXX',
    'XXXXXXXX',
    '........',
    'XXXXXXXX',
    'XXXXXXXX',
    '........',
    'XXXXXXXX',
    'XXXXXXXX',
  ],
  close: [
    'XX....XX',
    'XXX..XXX',
    '.XXXXXX.',
    '..XXXX..',
    '..XXXX..',
    '.XXXXXX.',
    'XXX..XXX',
    'XX....XX',
  ],
  /** Badge: a clock, for the time-tracking project. */
  clock: [
    '..XXXX..',
    '.X....X.',
    'X......X',
    'X..X...X',
    'X..XXX.X',
    'X......X',
    '.X....X.',
    '..XXXX..',
  ],
  /** Badge: a coin, for the income and expense tracker. */
  coin: [
    '..XXXX..',
    '.XXXXXX.',
    'XXX..XXX',
    'XXX..XXX',
    'XXX..XXX',
    'XXX..XXX',
    '.XXXXXX.',
    '..XXXX..',
  ],
  /** Badge: a map pin, for the neighbourhood app. */
  pin: [
    '..XXXX..',
    '.XXXXXX.',
    'XXX..XXX',
    'XXX..XXX',
    '.XXXXXX.',
    '..XXXX..',
    '...XX...',
    '...XX...',
  ],
  /** A crate, for the two repository hosts. */
  crate: [
    'XXXXXXXX',
    'X......X',
    'X.XXXX.X',
    'X......X',
    'X......X',
    'X......X',
    'X......X',
    'XXXXXXXX',
  ],
} as const

export type GlyphName = keyof typeof GLYPHS

interface PixelGlyphProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: GlyphName
  /** Rendered edge length in CSS pixels. Multiples of 8 stay perfectly crisp. */
  size?: number
}

/** Collapses each row into runs of lit pixels: fewer rects, identical output. */
function runs(rows: readonly string[]): { x: number; y: number; w: number }[] {
  const out: { x: number; y: number; w: number }[] = []

  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      if (row[x] === '.') {
        x += 1
        continue
      }
      let w = 0
      while (row[x + w] === 'X') w += 1
      out.push({ x, y, w })
      x += w
    }
  })

  return out
}

export function PixelGlyph({ name, size = 16, ...rest }: PixelGlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {runs(GLYPHS[name]).map(({ x, y, w }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={1} />
      ))}
    </svg>
  )
}

/** Maps a project id to the badge earned for it. */
export const projectBadges: Record<string, GlyphName> = {
  'eva-tracker': 'clock',
  'expenses-manager': 'coin',
  'vivetuzona-android': 'pin',
}
