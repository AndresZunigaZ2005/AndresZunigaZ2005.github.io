import { ImageResponse } from 'next/og'

/** Favicon, generated at build time so there is no binary asset to keep in sync. */
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
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
