import { HTMLElement } from 'node-html-parser'

export const findPageTitle = (html: HTMLElement): string | undefined => {
  return (
    html
      .querySelectorAll('h1,h2,h3,h4,h5,h6')
      .sort((a, b) => parseInt(a.textContent) - parseInt(b.textContent))[0]
      ?.textContent || undefined
  )
}
