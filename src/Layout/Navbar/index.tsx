import slugify from '@sindresorhus/slugify'
import { NavItems } from 'Layout/helpers/navigation'
import { memo } from 'react'
import { Section } from './Section'
import cn from 'classnames'

export const Navbar = memo(function Navbar(props: {
  className?: string
  items: NavItems
}) {
  return (
    <nav className={cn('grid gap-y-16', props.className)}>
      {props.items.map((item, id) => (
        <Section
          key={`${slugify(item.title)}-${id}`}
          {...item}
        />
      ))}
    </nav>
  )
})
