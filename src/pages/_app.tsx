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


const components = {
  h2: (props: { children?: ReactNode }) => (
    <h2 className="" id={slugify(props.children as string)}>
      {props.children}
    </h2>
  ),

  h3: (props: { children?: ReactNode }) => (
    <h3 id={slugify(props.children as string)}>{props.children}</h3>
  ),

  a: (props: { children?: ReactNode }) => (
    <a className="">{props.children}</a>
  ),

  table: (props: { children?: ReactNode }) => (
    <table className="">{props.children}</table>
  ),

  tr: (props: { children?: ReactNode }) => (
    <tr className="align-middle">{props.children}</tr>
  ),

  p: (props: { children?: ReactNode }) => (
    <p className="">{props.children}</p>
  ),

  li: (props: { children?: ReactNode }) => (
    <li className="">{props.children}</li>
  ),

  pre: (props: { children?: ReactNode }) => (
    <pre className="">{props.children}</pre>
  ),
  code: (props: { children?: ReactNode }) => (
    <code className="">{props.children}</code>
  ),
}

export default function MyApp(pageProps: AppProps) {
  const pageContent = useMemo(
    () => <pageProps.Component {...pageProps} />,
    [pageProps]
  )
  const pageHtml = parse(renderToString(pageContent))

  const tableOfContents = collectHeadings(pageHtml)
  const pageTitle = findPageTitle(pageHtml)
  const pageDescription = findPageDescription(pageHtml)

  return (
    <>
      <MDXProvider components={components}>
        <Layout
          title={pageTitle}
          description={pageDescription}
          tableOfContents={tableOfContents}
        >
          {pageContent}
        </Layout>
      </MDXProvider>
    </>
  )
}
