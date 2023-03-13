import cn from 'classnames'
import { memo, ReactNode, useMemo } from 'react'
import Image from 'next/image'

export const Callout = memo(function Callout(props: {
  type?: 'note' | 'tip' | 'caution' | 'danger'
  title?: string
  children: ReactNode
}) {
  const type = useMemo(() => props.type ?? 'note', [props.type])

  const icon = {
    note: 'info',
    tip: 'speaker',
    caution: 'attention',
    danger: 'danger',
  }[type]

  return (
    <div
      className={cn('my-6 grid grid-cols-auto/fr gap-6 rounded-xl p-6', {
        'bg-neutral-100': type === 'note',
        'bg-e5f9e7': type === 'tip',
        'bg-fff9e5': type === 'caution',
        'bg-fff0ed': type === 'danger',
      })}
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt=""
        width={20}
        height={20}
        className="!my-0 !rounded-none drop-shadow-hyper"
      />

      <div
        className={cn(
          'text-16 leading-6 text-neutral-900 [&>*]:mb-0 [&_*]:inline'
        )}
      >
        {props.children}
      </div>
    </div>
  )
})
