'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Fades content in the first time it reaches the viewport, then stops
 * observing.
 *
 * Visibility is a class on the node rather than React state: it is purely
 * presentational, so there is no reason to re-render the subtree for it, and it
 * keeps the server and client markup identical. Content is in the DOM from the
 * start — without JavaScript, or with `prefers-reduced-motion`, it is simply
 * visible (see `globals.css`).
 */
export function Reveal({ children, delay = 0, className = '', as }: RevealProps) {
  const Tag: ElementType = as ?? 'div'
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
