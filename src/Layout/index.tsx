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
import { Header } from './Header'
import cn from 'classnames'
import { TableOfContent } from './TableOfContent'
import { styles } from 'common/helpers/styles'
import Head from 'next/head'
import { TOC } from 'common/types'

export const Layout = memo(function Layout(props: {
  children: ReactElement<any, string | JSXElementConstructor<any>>
  title: string
  description?: string
  tableOfContents: TOC
}) {
  const router = useRouter()
  const allLinks = navItems.flatMap((section) => section.items)
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
        <title>{`${props.title} | World ID`}</title>
        {props.description && (
          <meta name="description" content={props.description} />
        )}
      </Head>

      <div className="relative z-10">
        <Header navItems={navItems} />

        {isHomePage && <Hero className="mb-24" />}

        <div
          className={cn(
            styles.screenPadding,
            'grid items-start lg:grid-cols-auto/fr/auto',
            {
              'py-12 lg:py-36': !isHomePage,
              'pb-16 lg:pb-72': isHomePage,
            }
          )}
        >
          <aside className="sticky hidden pr-16 border-r top-20 border-858494/20 lg:block">
            <Navbar items={navItems} />
          </aside>

          <main ref={mainRef} className="lg:px-16">
            <article className="max-w-full overflow-hidden">
              {(props.title || section) && (
                <header className="mb-3">
                  {section && (
                    <p
                      className={cn(
                        'bg-9eafc0 font-sora text-16 font-medium',
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

            <dl className="grid pt-8 mt-8 border-t gap-y-8 border-slate-200 dark:border-slate-800 lg:mt-16 lg:grid-cols-2 lg:pt-16">
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
                    <Link href={previousPage.href}>
                      <a
                        className={cn(
                          'bg-211c29 font-sora text-20 font-semibold',
                          styles.darkTextGradient
                        )}
                      >
                        <span aria-hidden="true">&larr;</span>{' '}
                        {previousPage.title}
                      </a>
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
                    <Link href={nextPage.href}>
                      <a
                        className={cn(
                          'bg-211c29 font-sora text-20 font-semibold',
                          styles.darkTextGradient
                        )}
                      >
                        {nextPage.title} <span aria-hidden="true">&rarr;</span>
                      </a>
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </main>

          <aside className="sticky hidden pl-16 top-20 gap-y-9 lg:grid">
            <TableOfContent items={props.tableOfContents} />
          </aside>
        </div>
      </div>

      <div className="absolute inset-0 z-0 h-full overflow-hidden">
        <span
          className={cn(
            'absolute inset-0 opacity-[.02] mix-blend-overlay',
            'bg-[url(/images/noise.png)]'
          )}
        />

        <span className="absolute right-[-150px] top-[10px] h-[1500px] w-[1500px] bg-[url(/images/hexagon.svg)] bg-no-repeat" />

        <span className="absolute left-[-135px] top-[-170px] h-[615px] w-[615px] rounded-full bg-ff4880 opacity-5 blur-[70px] dark:opacity-[15%]" />
        <span className="absolute left-[200px] top-[150px] h-[390px] w-[390px] rounded-full bg-6047ec opacity-5 blur-[50px] dark:opacity-20" />

        <span className="absolute right-[60px] top-[90px] h-[285px] w-[285px] rounded-full bg-ff4880 opacity-5 blur-[70px] dark:opacity-[15%]" />
        <span className="absolute right-[300px] top-[350px] h-[210px] w-[210px] rounded-full bg-6047ec opacity-5 blur-[100px] dark:opacity-20" />

        <span className="absolute left-[-205px] top-[895px] h-[410px] w-[410px] rounded-full bg-ff4880 opacity-5 blur-[70px] dark:opacity-10" />
        <span className="absolute left-[-90px] top-[790px] h-[180px] w-[180px] rounded-full bg-6047ec opacity-5 blur-[100px] dark:opacity-10" />

        <span className="absolute right-[-40px] top-[930px] h-[180px] w-[180px] rounded-full bg-ff4880 opacity-5 blur-[100px] dark:opacity-10" />
        <span className="absolute right-[-70px] top-[1090px] h-[412px] w-[412px] rounded-full bg-6047ec opacity-5 blur-[70px] dark:opacity-[15%]" />
      </div>
    </Fragment>
  )
})
