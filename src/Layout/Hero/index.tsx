import cn from 'classnames'
import Link from 'next/link'
import { Icon } from 'common/Icon'

export function Hero(props: { className?: string }) {
  return (
    <div className="mb-12 border-b border-b-neutral-100 pb-12">
      <h1
        className={cn(
          'text-5xl font-bold uppercase leading-none tracking-wide'
        )}
      >
        Sybil resistance, finally.
      </h1>
      <p className="mt-3 text-24 text-neutral-700 lg:max-w-[580px]">
        Anonymously verify your users are real humans, and ensure they can only
        perform action once.
      </p>
    </div>
  )
}
