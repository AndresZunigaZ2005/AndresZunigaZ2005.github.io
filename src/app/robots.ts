import type { MetadataRoute } from 'next'
import { siteUrl } from '@/data/site'

/** Written once at build time: the static export has no server to render it on. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}
