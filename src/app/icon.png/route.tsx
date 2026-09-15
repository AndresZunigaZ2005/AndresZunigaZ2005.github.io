import { ImageResponse } from 'next/og'

/**
 * Favicon, generated at build time so there is no binary asset to keep in sync.
 *
 * This is a route handler rather than the `icon.tsx` metadata convention so the
 * URL ends in `.png`. GitHub Pages types a response from the file extension
 * alone, and the convention emits an extensionless file that would be served as
 * `application/octet-stream`.
 */
export const dynamic = 'force-static'

const size = { width: 64, height: 64 }

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1d1d1f',
          color: '#fafaf8',
          fontSize: 38,
          fontWeight: 500,
          letterSpacing: '-0.03em',
          borderRadius: 14,
        }}
      >
        A
      </div>
    ),
    size,
  )
}
