import 'styles/global.css'
import type { AppProps } from 'next/app'
import { MarkdocNextJsPageProps } from '@markdoc/next.js'
import Head from 'next/head'
import { Layout } from 'Layout'
import { RenderableTreeNodes, Tag } from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import { TOC } from 'common/types'

const collectHeadings = (content: RenderableTreeNodes | undefined) => {
  const slugify = slugifyWithCounter()

  const isContentATag =
    content && Array.isArray(content) && typeof content !== 'string'

  if (isContentATag) {
    // @NOTE searching for h2 and h3 nodes
    const headings = content.filter(
      (node) =>
        typeof node !== 'string' &&
        node?.name &&
        (node.name === 'h2' || node.name === 'h3')
    ) as Array<Tag>

    return headings.reduce((accumulator: TOC, node) => {
      const nodes = accumulator
      const containsString = node.children.every(
        (child) => typeof child === 'string'
      )

      if (
        node.name === 'h2' ||
        (!nodes.at(-1) && node.name === 'h3' && containsString)
      ) {
        const id = slugify(node.children.join(' '))
        node.attributes.id = id

        nodes.push({
          id,
          title: node.children.join(' '),
          children: [],
        })
      }

      if (node.name === 'h3' && nodes.at(-1) && containsString) {
        const id = slugify(node.children.join(' '))
        node.attributes.id = id

        nodes.at(-1)?.children?.push({
          id,
          title: node.children.join(' '),
        })
      }

      return nodes
    }, [])
  }

  return []
}

export default function MyApp({
  Component,
  pageProps,
}: Exclude<AppProps, 'pageProps'> & { pageProps: MarkdocNextJsPageProps }) {
  const title = pageProps.markdoc?.frontmatter.title
  const pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  const description = pageProps.markdoc?.frontmatter.description
  const tableOfContents = collectHeadings(pageProps.markdoc?.content)

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Layout title={title} tableOfContents={tableOfContents}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
