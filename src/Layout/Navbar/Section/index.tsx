import { memo, useCallback } from 'react'
import { Icon } from 'common/Icon'
import Link from 'next/link'
import slugify from '@sindresorhus/slugify'
import { Item as NavItem } from 'common/types/navigation'
import { useRouter } from 'next/router'
import cn from 'classnames'

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
        className="ml-4 uppercase tracking-wide text-14 font-medium leading-4"
      >
        {props.href ? (
          <Link href={props.href} className="truncate">
            {props.title}
          </Link>
        ) : (
          <p className="truncate">{props.title}</p>
        )}
      </div>

      {props.items?.length && (
        <div className="mt-4 grid text-16 leading-5">
          {props.items.map((item, id) => (
            <Link
              key={`${slugify(item.title)}-${id}`}
              href={item.href || '#!'}
              className={cn(
                'relative min-w-[260px] cursor-pointer select-none py-2 px-4 rounded-lg transition-colors duration-300',
                //'before:absolute before:top-1/2 before:left-0 before:w-1 before:h-1 before:rounded-full before:bg-current before:-translate-y-1/2',
                {
                  'text-neutral-400 dark:text-neutral-500 hover:text-neutral-500 hover:dark:text-neutral-400 hover:bg-neutral-100 hover:dark:bg-neutral-700/40': !isCurrent(item.href),
                  'text-neutral-0 dark:text-000000 bg-neutral-900 dark:bg-neutral-0': isCurrent(item.href),
                }
              )}
            >
              <span className="flex items-center gap-x-2">
                <span
                  className={cn('block truncate')}
                >
                  {item.title}
                </span>
                {item.external && (
                  <Icon
                    name="maximize"
                    className="w-3 h-3"
                  />
                )}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
})
