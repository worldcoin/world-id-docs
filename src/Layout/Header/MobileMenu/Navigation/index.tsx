import cn from 'classnames'
import { NavItems } from 'Layout/helpers/navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'

export const Navigation = memo(function Navigation(props: { items?: NavItems; className?: string }) {
  let router = useRouter()

  if (!props.items?.length) {
    return null
  }

  return (
    <nav className={cn('text-base lg:text-sm', props.className)}>
      <ul role="list" className="space-y-9">
        {props.items.map((item) => (
          <li key={item.title}>
            <h2 className="font-semibold text-8e87ff">{item.title}</h2>
            <ul role="list" className="mt-2">
              {item.articles.map((link) => (
                <li key={link.href} className="relative">
                  <Link href={link.href}>
                    <a
                      className={cn(
                        'block w-full pl-3.5 border-l py-1',
                        {
                          'text-8e87ff dark:text-ffffff border-8e87ff':
                            router.pathname === link.href,
                          'text-9eafc0 border-9eafc0': router.pathname !== link.href,
                        }
                      )}
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
})
