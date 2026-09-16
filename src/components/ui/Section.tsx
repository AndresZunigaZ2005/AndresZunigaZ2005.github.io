import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { accentFill } from '@/lib/accents'
import type { Accent } from '@/types'

interface SectionProps {
  id: string
  /** Short name for the header strip. This is the section's heading. */
  eyebrow?: string
  /** The claim the section makes, set under the strip. */
  title?: ReactNode
  lede?: string
  children: ReactNode
  className?: string
  /**
   * Gold marks a section you act on, sky one you read, lavender a supporting
   * one. The colour is the section's identity and repeats nowhere else.
   */
  accent?: Accent
}

/**
 * Shared page container.
 *
 * 1024px, narrower than the old layout, because the page is a stack of framed
 * windows rather than an editorial grid — past this width the frames stop
 * reading as screens and start reading as stretched boxes.
 */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[64rem] px-6 sm:px-8 ${className}`.trim()}>
      {children}
    </div>
  )
}

/** A short label in the body face. Used for metadata and field names. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`t-meta text-muted ${className}`.trim()}>{children}</span>
}

/**
 * A page section.
 *
 * The heading is a filled strip rather than a floating label above a headline:
 * a handheld menu names the screen you are on in a bar at the top, and doing
 * the same here means the section name is a real region label instead of
 * decoration. Sections are the only thing that sets vertical spacing.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = '',
  accent = 'gold',
}: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={eyebrow ? headingId : undefined}
      className={`scroll-mt-24 py-16 sm:py-24 ${className}`.trim()}
    >
      <Container>
        {(eyebrow || title || lede) && (
          <Reveal className="max-w-[42rem]">
            {eyebrow && (
              <h2
                id={headingId}
                className={`t-key inline-block border-4 border-edge px-4 py-2 text-edge shadow-[0_4px_0_0_var(--color-edge)] ${accentFill[accent]}`}
              >
                {eyebrow}
              </h2>
            )}
            {title && <p className="mt-8 text-[32px] leading-10 text-ink">{title}</p>}
            {lede && <p className="mt-4 text-muted">{lede}</p>}
          </Reveal>
        )}
        <div className={eyebrow || title || lede ? 'mt-12' : ''}>{children}</div>
      </Container>
    </section>
  )
}
