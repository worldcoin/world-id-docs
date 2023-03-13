import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { TOC, TOCHeading } from 'common/types'
import Link from 'next/link'
import { Fragment, memo, useCallback } from 'react'

export const Items = memo(function Items(props: {
  items?: TOC
  activeItem?: string
  level?: number
}) {
  const isActive = useCallback(
    (heading: TOCHeading) => {
      return (
        heading.id === props.activeItem ||
        heading.children?.some((child) => child.id === props.activeItem)
      )
    },
    [props.activeItem]
  )

  if (!props.items) {
    return null
  }

  return (
    <Fragment>
      {props.items.map((item) => (
        <div
          className={cn('grid gap-y-6', {
            'text-black/40': !isActive(item),
            [`${cn('bg-8e87ff', styles.darkTextGradient)}`]: isActive(item),
          })}
          style={{ paddingLeft: `${(props.level || 0) * 24}px` }}
          key={item.id}
        >
          <Link className="truncate" href={`#${item.id}`}>
            {item.title}
          </Link>

          <Items
            items={item.children}
            activeItem={props.activeItem}
            level={(props.level || 0) + 1}
          />
        </div>
      ))}
    </Fragment>
  )
})
