import { TOC, TOCHeading, TOCSubheading } from 'common/types'
import { HTMLElement } from 'node-html-parser'

export const collectHeadings = (html: HTMLElement): TOC => {

  const toc:TOC = []
  let lastHeading:TOCHeading | null = null

  html
    .querySelectorAll('h2,h3')
    .forEach((el) => {
      if (el.tagName === 'H2') {
        const item: TOCHeading = lastHeading = {
          id: el.id,
          title: el.textContent,
          children: [],
        }
        toc.push(item)
      }
      if (el.tagName === 'H3') {
        const item: TOCSubheading = {
          id: el.id,
          title: el.textContent,
        }
        if (lastHeading) {
          lastHeading.children!.push(item)
        }
      }
    })

    return toc
}
