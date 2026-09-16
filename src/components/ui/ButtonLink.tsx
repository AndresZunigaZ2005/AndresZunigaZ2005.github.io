import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children: ReactNode
  variant?: Variant
  /** Adds `target="_blank"` plus the rel hardening that must come with it. */
  external?: boolean
  icon?: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
}

/**
 * The single link-shaped control on the page.
 *
 * Labels are set in the display face, so they have to stay short — two or three
 * words. That is a constraint worth keeping: a button says what happens when
 * you press it, and anything that needs a sentence is not a button.
 *
 * Pressing it moves the control down by exactly the height of its own shadow,
 * so it lands flush against the page. That is the whole interaction: no
 * transition, no easing, one frame.
 */
export function ButtonLink({
  href,
  children,
  variant = 'secondary',
  external = false,
  icon,
  className = '',
  ...rest
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : undefined

  return (
    <a
      href={href}
      {...externalProps}
      {...rest}
      className={`btn t-key ${variants[variant]} ${className}`.trim()}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </a>
  )
}
