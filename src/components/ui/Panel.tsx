import type { ElementType, ReactNode } from 'react'
import { accentFill } from '@/lib/accents'
import type { Accent } from '@/types'

interface PanelProps {
  children: ReactNode
  /** Short label for the title bar. Omit it and the panel has no bar at all. */
  title?: ReactNode
  /** Right-hand side of the title bar: a count, a state, a repository name. */
  meta?: ReactNode
  /** Promote the title bar label to a real heading when it names the content. */
  titleAs?: ElementType
  titleId?: string
  accent?: Accent
  /** Renders as `<div>` unless the content is really an article or a section. */
  as?: ElementType
  className?: string
  bodyClassName?: string
  id?: string
  'aria-labelledby'?: string
  'aria-label'?: string
}

/**
 * The window every block of content lives in.
 *
 * Three nested boxes, because the frame is the design: the outer element paints
 * the hard outline and the light bevel, the inner one paints the fill, and the
 * title bar is free to run full-bleed inside the bevel the way a 90s window
 * does. Doing the bevel with an inset shadow instead would put it on top of the
 * title bar.
 */
export function Panel({
  children,
  title,
  meta,
  titleAs,
  titleId,
  accent = 'lavender',
  as,
  className = '',
  bodyClassName = '',
  ...rest
}: PanelProps) {
  const Tag: ElementType = as ?? 'div'
  const TitleTag: ElementType = titleAs ?? 'span'

  return (
    <Tag className={`panel ${className}`.trim()} {...rest}>
      <div className="panel-inner">
        {title && (
          <div className={`panel-title ${accentFill[accent]}`}>
            <TitleTag className="t-key" id={titleId}>
              {title}
            </TitleTag>
            {/* The title is allowed to wrap; the metadata beside it is not —
                a count broken across two lines stops reading as a count. */}
            {meta && <span className="t-meta ml-auto shrink-0 whitespace-nowrap">{meta}</span>}
          </div>
        )}
        <div className={`panel-body ${bodyClassName}`.trim()}>{children}</div>
      </div>
    </Tag>
  )
}
