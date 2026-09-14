import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SkipLink } from '@/components/SkipLink'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import { en, es } from '@/i18n'
import { links, person, siteUrl } from '@/data/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

/**
 * Metadata is authored in Spanish — the language the page renders in on a cold
 * load — with the English description carried alongside it, and both locales
 * declared to Open Graph. `metadataBase` comes from an env var so a custom
 * domain can be added later without inventing one now.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: es.meta.title,
    template: `%s — ${person.name}`,
  },
  description: es.meta.description,
  applicationName: person.name,
  authors: [{ name: person.name, url: links.github }],
  creator: person.name,
  keywords: [
    'Andrés Felipe Zúñiga Zuluaga',
    'Full Stack Developer',
    'Ingeniero de Sistemas y Computación',
    'Systems and Computer Engineer',
    'React',
    'Next.js',
    'Electron',
    'Universidad del Quindío',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: person.name,
    title: es.meta.title,
    description: es.meta.description,
    locale: es.meta.localeTag.replace('-', '_'),
    alternateLocale: [en.meta.localeTag.replace('-', '_')],
  },
  twitter: {
    card: 'summary_large_image',
    title: en.meta.title,
    description: en.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#fafaf8',
  colorScheme: 'light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      // Spanish is the default; `LanguageProvider` updates this attribute when
      // the visitor switches.
      lang={es.meta.locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before first paint: the reveal-on-scroll animation in
            globals.css only hides content when scripting is available. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <LanguageProvider>
          <SkipLink />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
