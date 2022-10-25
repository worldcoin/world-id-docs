import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { memo, ReactNode } from 'react'

export const Tab = memo(function Tab(props: {
  isActive: boolean
  children: ReactNode
  onSelect: () => void
}) {
  return (
    <span
      onClick={props.onSelect}
      className={cn(
        styles.heroFenceTabBorder,
        'cursor-pointer rounded-full transition-opacity hover:opacity-75',
        { 'contents before:hidden': !props.isActive }
      )}
    >
      <span
        className={cn(
          'relative block px-3 py-2 ',
          {
            'rounded-full bg-181b1f text-d8e1bd dark:bg-363a45': props.isActive,
          },
          { 'text-70868f': !props.isActive }
        )}
      >
        {props.children}
      </span>
    </span>
  )
})
