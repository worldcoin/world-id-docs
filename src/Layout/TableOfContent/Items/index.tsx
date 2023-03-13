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
          className="grid transition-colors duration-300"
          key={item.id}
        >
          <Link
            className={cn("px-4 py-2 rounded-lg truncate leading-5 transition-colors duration-300", {
              "text-neutral-400 dark:text-neutral-500 hover:text-neutral-500 hover:dark:text-neutral-400 hover:bg-neutral-100 hover:dark:bg-neutral-700/40": !isActive(item),
            })}
            href={`#${item.id}`}
          >
            <span
              style={{ paddingLeft: `${(props.level || 0) * 24}px` }}
            >
              {item.title}
            </span>
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
