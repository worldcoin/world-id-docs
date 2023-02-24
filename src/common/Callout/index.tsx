import cn from 'classnames'
import { Icon, IconType } from 'common/Icon'
import { memo, ReactNode, useMemo } from 'react'

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
    danger: 'lightning',
  }[type] as IconType

  return (
    <div
      className={cn('grid grid-cols-auto/fr gap-6 p-6 rounded-xl my-6', {
        'bg-neutral-50 dark:bg-neutral-100/20': type === 'note',
        'bg-f5fdf6/50 dark:bg-accents-success-700/20': type === 'tip',
        'bg-edecfc dark:bg-primary-700/20': type === 'info',
        'bg-fff9e5 dark:bg-ffb11b/20': type === 'caution',
        'bg-fff0ed dark:bg-ff6848/20': type === 'danger',
      })}
    >
      <Icon
        name={icon}
        className={cn('h-5 w-5 mt-0.5', {
          'text-neutral-300': type === 'note',
          'text-accents-success-700': type === 'tip',
          'text-accents-info-700': type === 'info',
          'text-accents-warning-700': type === 'caution',
          'text-accents-error-700': type === 'danger',
        })}
      />

      <div
        className={cn('text-16 text-neutral-900 dark:text-neutral-0 leading-6 [&>*]:mb-0 [&_*]:inline')}
      >
        {props.children}
      </div>
    </div>
  )
})
