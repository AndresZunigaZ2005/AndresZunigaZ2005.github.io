import { ImageResponse } from 'next/og'
import { person } from '@/data/site'

/**
 * Social preview card. Built from the same tokens as the page — dark ground,
 * one framed window, gold for the name — so a shared link looks like the site
 * it points at.
 *
 * The frame is drawn as nested boxes for the same reason it is on the page: a
 * hard outline, a light bevel and a solid fill, with a hard offset shadow and
 * no blur anywhere. Satori has no web fonts here, so the type is the fallback
 * face; everything else that carries the look is geometry and colour.
 *
 * This is a route handler rather than the `opengraph-image.tsx` metadata
 * convention so the URL ends in `.png`. GitHub Pages types a response from the
 * file extension alone, and the convention emits an extensionless file that
 * social crawlers reject as `application/octet-stream`. The alt text and
 * dimensions therefore live in the layout's metadata.
 */
export const dynamic = 'force-static'

const size = { width: 1200, height: 630 }

const BG = '#1a1a2e'
const PANEL = '#2d2d44'
const EDGE = '#0c0c0c'
const MUTED = '#a0a0c0'
const GOLD = '#ffcb05'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '56px 64px 72px',
          background: BG,
        }}
      >
        {/* Outer outline plus light bevel. */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: 8,
            background: MUTED,
            border: `8px solid ${EDGE}`,
            boxShadow: `0 16px 0 0 ${EDGE}`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: PANEL }}>
            {/* Title bar. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 32px',
                background: GOLD,
                borderBottom: `8px solid ${EDGE}`,
                color: EDGE,
                fontSize: 28,
                letterSpacing: '0.12em',
              }}
            >
              {person.brand}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                padding: '0 48px',
              }}
            >
              <div style={{ display: 'flex', fontSize: 64, color: GOLD, lineHeight: 1.1 }}>
                {person.name}
              </div>
              <div style={{ display: 'flex', marginTop: 24, fontSize: 34, color: '#ffffff' }}>
                Ingeniero de Sistemas y Computación
              </div>
              <div style={{ display: 'flex', marginTop: 8, fontSize: 34, color: MUTED }}>
                Full Stack Developer
              </div>

              {/* The type chips from the trainer card. */}
              <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
                {['React', 'Next.js', 'Electron', 'UNIX'].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      padding: '8px 16px',
                      background: BG,
                      border: `6px solid ${EDGE}`,
                      color: '#ffffff',
                      fontSize: 26,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
