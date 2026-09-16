import { About } from '@/components/About'
import { Activity } from '@/components/Activity'
import { Contact } from '@/components/Contact'
import { Exploring } from '@/components/Exploring'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Profiles } from '@/components/Profiles'
import { Projects } from '@/components/Projects'
import { Technologies } from '@/components/Technologies'
import { fetchGitHubContributions } from '@/lib/github'
import { fetchGitLabContributions } from '@/lib/gitlab'
import { todayIso } from '@/lib/contributions'
import { usernames } from '@/data/site'

/**
 * The page is a Server Component: it does the composition, and — because the
 * site is a static export — it is also the one place that talks to the network.
 * These two calls run during `next build` and their results are baked into the
 * HTML, so a visitor never waits on GitHub or GitLab, never spends their rate
 * limit, and never sees the page break when either is down. The deploy workflow
 * runs daily to keep them current.
 *
 * Both helpers resolve to `null` on any failure, and `Activity` drops a platform
 * it was handed nothing for. Nothing here can fail the build.
 *
 * The sections below are Client Components because they read the active
 * language from context — the one piece of state on the page.
 */
export default async function Home() {
  const today = todayIso()

  const calendars = await Promise.all([
    fetchGitHubContributions(usernames.github),
    fetchGitLabContributions(usernames.gitlab),
  ])

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Profiles />
        <Activity calendars={calendars} today={today} />
        <Exploring />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
