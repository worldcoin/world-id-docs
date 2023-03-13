import cn from 'classnames'
import { Fence } from 'Layout/Hero/Fence'
import Link from 'next/link'
import { Icon } from 'common/Icon'

export function Hero(props: { className?: string }) {
  return (
    <div className="mb-12 border-b border-b-neutral-100 pb-12 dark:border-b-neutral-700">
      <h1
        className={cn(
          'text-5xl font-bold uppercase leading-none tracking-wide'
        )}
      >
        Sybil resistance, finally.
      </h1>
      <p className="mt-3 text-24 text-neutral-700 dark:text-neutral-100 lg:max-w-[580px]">
        Anonymously verify your users are real humans, and ensure they can only
        perform action once.
      </p>
      <div className="mt-8 flex">
        <Link
          href="https://github.com/worldcoin/world-id-js"
          target="_blank"
          className={cn(
            'flex h-11 items-center gap-2 rounded-lg border border-f3f4f5 bg-fbfbfc px-4 text-181b1f dark:border-3c424b dark:bg-191c20 dark:text-ffffff'
          )}
        >
          <Icon name="github" className="h-4 w-4" />
          <span className="text-14 font-medium uppercase leading-[1px] tracking-wide">
            View on GitHub
          </span>
        </Link>
      </div>
    </div>
  )
}
