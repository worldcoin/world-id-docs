import { IconType } from 'common/Icon'

export type Item = {
  icon?: IconType
  title: string
} & (
  | {
      href?: never
      items: Array<Item>
    }
  | {
      href: string
      items?: never
    }
)