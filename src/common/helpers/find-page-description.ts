import { HTMLElement } from 'node-html-parser'

export const findPageDescription = (html: HTMLElement): string | undefined => {
  return html.querySelectorAll('p')[0]?.textContent?.slice(0, 200) || undefined
}
