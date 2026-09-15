import { ImageResponse } from 'next/og'
import { es } from '@/i18n'
import { person } from '@/data/site'

/**
 * Social preview card. Built from the same tokens as the page — neutral canvas,
 * one pastel accent, generous negative space — so a shared link looks like the
 * site it points at.
 */
export const alt = es.meta.ogAlt
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
/** Rendered once at build time: the static export has no server to render it on. */
export const dynamic = 'force-static'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fafaf8',
          color: '#1d1d1f',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: '#e8e2f3',
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: '#dceaf7',
            opacity: 0.7,
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: '0.24em',
            color: '#6e6e73',
          }}
        >
          {person.brand}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 68, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {person.name}
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 32, color: '#6e6e73' }}>
            Ingeniero de Sistemas y Computación · Full Stack Developer
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 28,
            fontSize: 22,
            color: '#8e8e93',
            letterSpacing: '0.04em',
          }}
        >
          <span>React</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>Electron</span>
          <span>·</span>
          <span>UNIX</span>
        </div>
      </div>
    ),
    size,
  )
}
