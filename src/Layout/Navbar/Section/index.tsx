import { memo, useCallback } from 'react'
import { Icon } from 'common/Icon'
import Link from 'next/link'
import slugify from '@sindresorhus/slugify'
import { Item as NavItem } from 'common/types/navigation'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'

export const Section = memo(function Section(
  props: NavItem & { className?: string }
) {
  const router = useRouter()

  const isCurrent = useCallback(
    (href?: string) => router.asPath.replace(/(#|\?).*$/, '') === href,
    [router.asPath]
  )

  return (
    <div className={props.className}>
      <div
        className={cn(
          'grid grid-cols-auto/fr items-center gap-x-4 bg-8e87ff py-4 pl-0.5',
          styles.darkTextGradient
        )}
      >
        {props.icon && (
          <Icon
            name={props.icon}
            className="h-6 w-6 bg-[color:inherit] bg-[image:inherit]"
          />
        )}

        {props.href ? (
          <Link href={props.href}>
            <a className="font-semibold text-20">{props.title}</a>
          </Link>
        ) : (
          <p className="font-semibold text-20">{props.title}</p>
        )}
      </div>

      {props.items?.length && (
        <div className="grid pl-3">
          {props.items.map((item, id) => (
            <Link
              key={`${slugify(item.title)}-${id}`}
              href={item.href || '#!'}
              className="pl-3 cursor-pointer"
            >
              <a
                className={cn(
                  'min-w-[100px] select-none border-l-2 py-4 transition-colors duration-300 hover:text-ffffff/70',
                  {
                    'border-9eafc0/50 dark:border-858494/50': !isCurrent(
                      item.href
                    ),
                    'border-8e87ff dark:border-ffffff': isCurrent(item.href),
                  }
                )}
              >
                <span
                  className={cn('block truncate pl-6 pr-10', {
                    'text-9eafc0 dark:text-70868f': !isCurrent(item.href),
                    [`${cn('bg-8e87ff', styles.darkTextGradient)}`]: isCurrent(
                      item.href
                    ),
                  })}
                >
                  {item.title}
                </span>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
})