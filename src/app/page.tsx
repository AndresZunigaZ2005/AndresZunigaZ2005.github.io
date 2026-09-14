import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Exploring } from '@/components/Exploring'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Profiles } from '@/components/Profiles'
import { Projects } from '@/components/Projects'
import { Technologies } from '@/components/Technologies'

/**
 * The page is a Server Component: it does the composition and ships no
 * JavaScript of its own. The sections below are Client Components because they
 * read the active language from context — the one piece of state on the page.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Profiles />
        <Exploring />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
