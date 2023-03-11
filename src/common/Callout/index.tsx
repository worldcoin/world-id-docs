import cn from 'classnames'
import { memo, ReactNode, useMemo } from 'react'
import Image from 'next/image'

export const Callout = memo(function Callout(props: {
  type?: 'note' | 'tip' | 'info' | 'caution' | 'danger'
  title?: string
  children: ReactNode
}) {
  const type = useMemo(() => props.type ?? 'note', [props.type])

  const icon = {
    note: 'info',
    tip: 'speaker',
    info: 'question',
    caution: 'attention',
    danger: 'danger',
  }[type]

  return (
    <div
      className={cn('my-6 grid grid-cols-auto/fr gap-6 rounded-xl p-6', {
        'bg-neutral-100 dark:bg-neutral-100/20': type === 'note',
        'bg-e5f9e7 dark:bg-accents-success-700/20': type === 'tip',
        'bg-edecfc dark:bg-primary-700/20': type === 'info',
        'bg-fff9e5 dark:bg-ffb11b/20': type === 'caution',
        'bg-fff0ed dark:bg-ff6848/20': type === 'danger',
      })}
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt=""
        width={20}
        height={20}
        className="!my-0 !rounded-none"
      />

      <div
        className={cn(
          'text-16 leading-6 text-neutral-900 dark:text-neutral-0 [&>*]:mb-0 [&_*]:inline'
        )}
      >
        {props.children}
      </div>
    </div>
  )
})
