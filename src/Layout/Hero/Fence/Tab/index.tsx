import cn from 'classnames'
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
        'relative pb-3 font-roboto-mono text-16 leading-5 cursor-pointer transition-opacity hover:opacity-75',
        'text-191c20 dark:text-ffffff',
        'before:absolute before:left-0 before:right-0 before:bottom-0 before:bg-191c20 before:dark:bg-ffffff before:h-[2px] before:rounded-[1px]',
        { 'text-9ba3ae dark:text-9ba3ae before:hidden': !props.isActive }
      )}
    >
      {props.children}
    </span>
  )
})
