import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow?: string
  title?: ReactNode
  lede?: string
  children: ReactNode
  /** Extra classes for the outer `<section>`, e.g. a top hairline. */
  className?: string
  /** Renders the heading block centred instead of left-aligned. */
  align?: 'start' | 'center'
}

/** Shared page container. One place to change the gutter and max width. */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 ${className}`.trim()}>
      {children}
    </div>
  )
}

/** A short, all-caps monospace label. Used for section eyebrows and metadata. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-faint ${className}`.trim()}
    >
      {children}
    </span>
  )
}

/**
 * A page section with consistent vertical rhythm and an optional heading block.
 * Sections are the only thing that sets vertical spacing, so the page keeps an
 * even measure from top to bottom.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = '',
  align = 'start',
}: SectionProps) {
  const headingId = `${id}-heading`
  const centred = align === 'center'

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`scroll-mt-24 py-20 sm:py-28 lg:py-36 ${className}`.trim()}
    >
      <Container>
        {(eyebrow || title || lede) && (
          <Reveal className={`max-w-3xl ${centred ? 'mx-auto text-center' : ''}`.trim()}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2
                id={headingId}
                className="mt-5 text-balance text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
              >
                {title}
              </h2>
            )}
            {lede && (
              <p
                className={`mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${
                  centred ? 'mx-auto' : ''
                }`.trim()}
              >
                {lede}
              </p>
            )}
          </Reveal>
        )}
        <div className={eyebrow || title || lede ? 'mt-14 sm:mt-16' : ''}>{children}</div>
      </Container>
    </section>
  )
}
