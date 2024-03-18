import { genPageMetadata } from 'app/seo'
import GitHubCalendar, { ThemeInput } from 'react-github-calendar'
import Link from 'next/link'

export const metadata = genPageMetadata({ title: 'About' })

const minimalTheme: ThemeInput = {
  light: ['#313244', '#cba6f7'],
  dark: ['#313244', '#cba6f7'],
}

export default function Page() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-lavender sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="text-text prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
          <div>
            Hey! I'm Lucas - an ex-YC founder and bedroom hacker originally from the east coast.
            This is my subdomain where I'm building my ML chops top-down, project by project.{' '}
          </div>
          <div className="flex justify-center my-5">
            <div className="w-1/2 border-t border-gray-300 opacity-40" />
          </div>
          <div>
            <p>I've previously worked on:</p>
            <ul>
              <li>
                <a href="https://www.untetherlabs.com/">Untether Labs</a> - A YC backed startup
                working on increasing the capacity of the US Healthcare system through better
                scheduling tools.
              </li>
              <li>
                <a href="https://www.safegraph.com/">Safegraph</a>'s Data Marketplace team - Helping
                customers find the needle in the haystack of Safegraph's data.
              </li>
              <li>
                <a href="https://www.yelp.com">Yelp</a>'s 'Connect' product - A tool to help
                restaurant owners market to locals inside Yelp via photo & video.
              </li>
            </ul>
          </div>
          <div className="flex justify-center my-5">
            <div className="w-1/2 border-t border-gray-300 opacity-40" />
          </div>
          <p>
            Find me on <a href="https://github.com/lucasdellabella">GitHub</a>, {' '}
            <a href="https://www.twitter.com/FiveEels">Twitter</a>, {' '}
            <a href="https://www.youtube.com/channel/UCRWhLAnoDR7H-bK874mf_dA">YouTube (1)</a>,{' '}
            <a href="https://www.youtube.com/c/hganghiskhan">YouTube (2)</a>.
          </p>
        </div>
        <Link href="/about/this-site">
          <button className="rounded-md bg-green px-3 py-2 text-sm font-semibold text-base shadow-sm hover:bg-blue">
            {' '}
            Site Details
          </button>
        </Link>
      </div>
      <div className="pt-10">
        <GitHubCalendar
          username="lucasdellabella"
          hideColorLegend={true}
          hideMonthLabels={true}
          hideTotalCount={true}
          blockRadius={5}
          theme={minimalTheme}
        />
      </div>
    </>
  )
}
