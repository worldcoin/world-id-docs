import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Icon, IconType } from '../Icon'

export function QuickLinks(props: { children: ReactNode }) {
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {props.children}
    </div>
  )
}

export function QuickLink(props: {
  title: string
  description: string
  href: string
  icon: IconType
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className={styles.fenceBorder} />

      <div className={cn('h-full bg-ffffff', styles.fenceBorderInner)}>
        <div className="relative grid h-full content-between justify-items-start bg-9eafc0/10 p-4 lg:p-8">
          <span className="grid rounded-full bg-8e87ff p-2">
            <Icon
              name={props.icon}
              className={cn('h-8 w-8', styles.gradient)}
            />
          </span>

          <h2
            className={cn(
              'mt-4 bg-8e87ff font-medium lg:mt-8',
              styles.darkTextGradient
            )}
          >
            <Link href={props.href}>{props.title}</Link>
          </h2>

          <p className="mt-1 text-14 text-9eafc0 lg:mt-2">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  )
}
