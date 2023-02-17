import { IconType } from 'common/Icon'

export type Item = {
  icon?: IconType
  title: string
} & (
  | {
      href?: never
      external?: never
      items: Array<Item>
    }
  | {
      href: string
      external?: boolean
      items?: never
    }
)
