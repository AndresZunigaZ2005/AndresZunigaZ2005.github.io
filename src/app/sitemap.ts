import type { MetadataRoute } from 'next'
import { siteUrl } from '@/data/site'

/** Written once at build time: the static export has no server to render it on. */
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL('/', siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
