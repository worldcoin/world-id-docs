import slugify from '@sindresorhus/slugify'
import { TOC } from 'common/types'
import { stripHtml } from 'string-strip-html'

export const collectHeadings = (source: string): TOC => {
  const regex = /(<h2>(.*?)<\/h2>|<h3>(.*?)<\/h3>)/gm
  const tags = source.match(regex)

  if (!tags) {
    return []
  }

  return tags.reduce((accumulator: TOC, tag) => {
    const nodes = accumulator
    let currentTag: string | null = null

    stripHtml(tag, {
      cb: (a) => (currentTag = a.tag.name),
    }).result

    const headingText = stripHtml(tag).result

    if (currentTag && currentTag === 'h2') {
      nodes.push({
        title: headingText,
        id: slugify(headingText),
        children: [],
      })
    }

    if (currentTag && currentTag === 'h3') {
      nodes[nodes.length - 1]?.children?.push({
        title: headingText,
        id: slugify(headingText),
      })
    }

    return nodes
  }, [])
}
