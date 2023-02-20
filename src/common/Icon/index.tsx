import cn from 'classnames'
import { CSSProperties, memo } from 'react'
import styles from './icon.module.css'

const iconNames = [
  'arrow-right',
  'attention',
  'book',
  'close',
  'code',
  'coin',
  'cpu',
  'github',
  'hand',
  'info',
  'lightning',
  'logo-full',
  'logo',
  'maximize',
  'maximize-rounded',
  'menu',
  'question',
  'search',
  'speaker',
  'theme-dark',
  'theme-light',
  'theme-system',
] as const

export type IconType = typeof iconNames[number]

export const Icon = memo(function Icon(
  props: {
    className?: string
    noMask?: boolean
    testId?: string
  } & (
    | {
        name: IconType
        path?: never
      }
    | {
        name?: never
        path: string
      }
  )
) {
  return (
    <span
      className={cn(
        styles.icon,
        'pointer-events-none flex',

        {
          'bg-current': !props.noMask,
          'no-mask': props.noMask,
        },

        props.className
      )}
      {...(props.testId && { 'data-testid': props.testId })}
      role="icon"
      style={
        {
          '--image': `url("${props.path ?? `/icons/${props.name}.svg`}")`,
        } as CSSProperties
      }
    />
  )
})
