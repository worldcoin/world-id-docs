import { memo, useCallback } from 'react'
import { Icon } from 'common/Icon'
import Link from 'next/link'
import slugify from '@sindresorhus/slugify'
import { SectionType } from 'common/types'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { styles } from 'common/helpers/styles'

export const Section = memo(function Section(
  props: SectionType & { className?: string }
) {
  const router = useRouter()

  const isCurrent = useCallback(
    (href: string) => router.pathname === href,
    [router.pathname]
  )

  return (
    <div className={props.className}>
      <div
        className={cn(
          'grid grid-cols-auto/fr items-center gap-x-4 bg-8e87ff py-4 pl-0.5',
          styles.darkTextGradient
        )}
      >
        <Icon
          name={props.icon}
          className="h-6 w-6 bg-[color:inherit] bg-[image:inherit]"
        />

        <p className="font-semibold text-20">{props.title}</p>
      </div>

      <div className="grid pl-3">
        {props.articles.map((article, id) => (
          <Link
            key={`${slugify(article.name)}-${id}`}
            href={article.href}
            className="pl-3 cursor-pointer"
          >
            <a
              className={cn(
                'min-w-[100px] select-none border-l-2 py-4 transition-colors duration-300 hover:text-ffffff/70',
                {
                  'border-9eafc0/50 dark:border-858494/50': !isCurrent(
                    article.href
                  ),
                  'border-8e87ff dark:border-ffffff': isCurrent(article.href),
                }
              )}
            >
              <span
                className={cn('block truncate pl-6 pr-10', {
                  'text-9eafc0 dark:text-70868f': !isCurrent(article.href),
                  [`${cn('bg-8e87ff', styles.darkTextGradient)}`]: isCurrent(
                    article.href
                  ),
                })}
              >
                {article.name}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
})
