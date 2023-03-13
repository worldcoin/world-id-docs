import cn from 'classnames'
import { NavItems } from 'Layout/helpers/navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'

export const Navigation = memo(function Navigation(props: {
  items?: NavItems
  className?: string
}) {
  let router = useRouter()

  if (!props.items?.length) {
    return null
  }

  return (
    <nav className={cn('text-base lg:text-sm', props.className)}>
      <ul role="list" className="space-y-9">
        {props.items.map((item) => (
          <li key={item.title}>
            <h2 className="font-semibold text-neutral-700">{item.title}</h2>
            <ul role="list" className="mt-2">
              {item.items?.map((link) =>
                link?.href ? (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      className={cn('block w-full border-l py-1 pl-3.5', {
                        'border-8e87ff text-8e87ff':
                          router.pathname === link.href,
                        'border-9eafc0 text-9eafc0':
                          router.pathname !== link.href,
                      })}
                    >
                      {link.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
})
