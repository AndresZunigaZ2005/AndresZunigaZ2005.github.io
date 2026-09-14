import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'

interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Adds `target="_blank"` plus the rel hardening that must come with it. */
  external?: boolean
  icon?: ReactNode
  /** Places the icon after the label instead of before it. */
  iconAfter?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-canvas border-ink hover:bg-[#000] hover:border-[#000]',
  secondary: 'bg-surface text-ink border-line-strong hover:border-ink',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-4 text-[13px]',
}

/**
 * The single link-shaped control used across the page, so every call to action
 * has the same height, focus ring and hover behaviour.
 */
export function ButtonLink({
  href,
  children,
  variant = 'secondary',
  size = 'md',
  external = false,
  icon,
  iconAfter = false,
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
      className={`inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`.trim()}
    >
      {icon && !iconAfter && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconAfter && <span className="shrink-0">{icon}</span>}
    </a>
  )
}
