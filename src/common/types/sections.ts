import { IconType } from 'common/Icon'

export type Article = {
  name: string
  href: `/${string}`
}

export type SectionType = {
  icon: IconType
  title: string
  articles: Array<Article>
}
