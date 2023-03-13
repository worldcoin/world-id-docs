import 'styles/global.css'
import { MDXProvider } from '@mdx-js/react'
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

const components: MDXComponents = {
  h2: (props: { children?: ReactNode }) => (
    <h2 className="" id={slugify(props.children as string)}>
      {props.children}
    </h2>
  ),

  h3: (props: { children?: ReactNode }) => (
    <h3 id={slugify(props.children as string)}>{props.children}</h3>
  ),
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
    () => !['/use', '/404'].includes(router.pathname),
    [router.pathname]
  )

  return (
    <MDXProvider components={components}>
      <Clippy theme="light" />
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
