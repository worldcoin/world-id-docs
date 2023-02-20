import {
  Fragment,
  JSXElementConstructor,
  memo,
  ReactElement,
  useMemo,
  useRef,
} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navItems } from './helpers/navigation'
import { Hero } from './Hero'
import { Navbar } from './Navbar'
import { Prose } from './Prose'
import { Header } from '../common/Header'
import cn from 'classnames'
import { TableOfContent } from './TableOfContent'
import { styles } from 'common/helpers/styles'
import Head from 'next/head'
import { TOC } from 'common/types'

export const Layout = memo(function Layout(props: {
  children: ReactElement<any, string | JSXElementConstructor<any>>
  title?: string
  description?: string
  tableOfContents: TOC
}) {
  const router = useRouter()

  const allLinks = navItems.flatMap((section) =>
    section.items ? section.items : section
  )

  const linkIndex = allLinks.findIndex((link) => link?.href === router.pathname)
  const previousPage = allLinks[linkIndex - 1]
  const nextPage = allLinks[linkIndex + 1]

  const section = navItems.find((section) =>
    section.items?.find((article) => article.href === router.pathname)
  )
  const mainRef = useRef<HTMLElement | null>(null)
  const isHomePage = useMemo(() => router.pathname === '/', [router.pathname])

  return (
    <Fragment>
      <Head>
        <title>{`${props.title || 'Documentation'} | World ID`}</title>
        {props.description && (
          <meta name="description" content={props.description} />
        )}
      </Head>

      <div className="relative z-10">
        <Header navItems={navItems} />

        <div
          className={cn(
            styles.screenPadding,
            'grid items-start lg:grid-cols-auto/fr/auto py-11',
          )}
        >
          <aside className="sticky top-20 hidden lg:block lg:pr-4 2xl:pr-16">
            <Navbar items={navItems} />
          </aside>

          <main
            ref={mainRef}
            className="max-w-full overflow-hidden lg:min-w-[650px] lg:px-8 2xl:px-16"
          >
            <article>
              {isHomePage && <Hero />}

              {(props.title || section) && (
                <header className="mb-3">
                  {section && (
                    <p
                      className={cn(
                        'bg-black/30 font-sora text-16 font-medium',
                        styles.darkTextGradient
                      )}
                    >
                      {section.title}
                    </p>
                  )}
                </header>
              )}

              <Prose>{props.children}</Prose>
            </article>

            <dl className="mt-8 grid gap-y-8 border-t border-slate-200 pt-8 dark:border-slate-800 lg:mt-16 lg:grid-cols-2 lg:pt-16">
              {previousPage?.href && (
                <div className="text-center lg:text-left">
                  <dt
                    className={cn(
                      'bg-8e87ff text-14 font-medium',
                      styles.darkTextGradient
                    )}
                  >
                    Previous
                  </dt>

                  <dd className="mt-1">
                    <Link
                      href={previousPage.href}
                      className={cn(
                        'bg-211c29 font-sora text-20 font-semibold',
                        styles.darkTextGradient
                      )}
                    >
                      <span aria-hidden="true">&larr;</span>{' '}
                      {previousPage.title}
                    </Link>
                  </dd>
                </div>
              )}

              {nextPage?.href && (
                <div className="col-start-2 text-center lg:ml-auto lg:text-right">
                  <dt
                    className={cn(
                      'bg-8e87ff text-14 font-medium',
                      styles.darkTextGradient
                    )}
                  >
                    Next
                  </dt>

                  <dd className="mt-1">
                    <Link
                      href={nextPage.href}
                      className={cn(
                        'bg-211c29 font-sora text-20 font-semibold',
                        styles.darkTextGradient
                      )}
                    >
                      {nextPage.title} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </main>

          <aside className="sticky top-20 hidden gap-y-6 lg:grid lg:pl-8 2xl:pl-16">
            <TableOfContent items={props.tableOfContents} />
          </aside>
        </div>
      </div>
    </Fragment>
  )
})
