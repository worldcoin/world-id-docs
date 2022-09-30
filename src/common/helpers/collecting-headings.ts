import slugify from '@sindresorhus/slugify'
import { TOC } from 'common/types'
import { HTMLElement } from 'node-html-parser'

export const collectHeadings = (html: HTMLElement): TOC => {
  return html
    .querySelectorAll('h2,h3')
    .reduce<TOC>((result, node, nodeIndex) => {
      if (node.tagName === 'H2') {
        return [
          ...result,
          {
            id: slugify(node.textContent),
            title: node.textContent,
            children: [],
          },
        ]
      }

      if (node.tagName === 'H3') {
        return result.map((item, titleIndex) => ({
          ...item,
          children: [
            ...(item.children || []),
            ...(titleIndex === nodeIndex - 1
              ? []
              : [
                  {
                    id: slugify(node.textContent),
                    title: node.textContent,
                  },
                ]),
          ],
        }))
      }

      return result
    }, [])
}
