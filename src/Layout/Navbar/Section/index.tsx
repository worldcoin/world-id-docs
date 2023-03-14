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
      <div className="ml-4 text-14 font-medium uppercase leading-4 tracking-wide">
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
                'relative min-w-[260px] cursor-pointer select-none rounded-lg py-2 px-4 transition-colors duration-300',
                {
                  'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-500':
                    !isCurrent(item.href),
                  'bg-neutral-900 font-medium text-neutral-0': isCurrent(
                    item.href
                  ),
                }
              )}
            >
              <span className="flex items-center gap-x-2">
                <span className={cn('block truncate')}>{item.title}</span>
                {item.external && <Icon name="maximize" className="h-3 w-3" />}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
})
