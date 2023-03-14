import 'styles/global.css'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'
import { ReactNode, useMemo } from 'react'
import { AppProps } from 'next/app'
import { Layout } from 'Layout'
import { collectHeadings } from 'common/helpers/collecting-headings'
import { renderToString } from 'react-dom/server'
import parse from 'node-html-parser'
import { findPageTitle } from 'common/helpers/find-page-title'
import { findPageDescription } from 'common/helpers/find-page-description'
import { Fence } from 'common/Fence'
import { Link } from 'common/Link'
import { ThemeProvider } from 'common/contexts/ThemeContext'
import { useRouter } from 'next/router'
import { MDXComponents } from 'mdx/types'
import Clippy from 'clippy-widget'
import Head from 'next/head'

const components: MDXComponents = {
  h2: (props: { children?: ReactNode }) => {
    return <h2 {...props}/>
  },
  h3: (props: { children?: ReactNode }) => {
    return <h3 {...props}/>
  },
  code: (props) => (
    <span className="rounded bg-white/40 p-0.5 px-1 outline outline-1 outline-black/10">
      <code {...props} />
    </span>
  ),
  a: Link,
}

export default function MyApp(pageProps: AppProps) {
  const router = useRouter()

  const pageContent = useMemo(
    () => <pageProps.Component {...pageProps} />,
    [pageProps]
  )

  const pageHtml = parse(renderToString(pageContent))
  const tableOfContents = collectHeadings(pageHtml)
  const pageTitle = findPageTitle(pageHtml)
  const pageDescription = findPageDescription(pageHtml)

  const isDefaultLayoutPage = useMemo(
    () => !([] as Array<string>).includes(router.pathname),
    [router.pathname]
  )

  return (
    <MDXProvider components={components}>
      <Clippy theme="light" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#191919"
        />
      </Head>

      {isDefaultLayoutPage && (
        <Layout
          title={pageTitle}
          description={pageDescription}
          tableOfContents={tableOfContents}
        >
          {pageContent}
        </Layout>
      )}

      {!isDefaultLayoutPage && pageContent}
    </MDXProvider>
  )
}
