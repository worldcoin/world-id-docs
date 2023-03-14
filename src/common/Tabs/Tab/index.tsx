import cn from 'classnames'
import { memo } from 'react'

export const Tab = memo(function Tab(props: {
  isActive: boolean
  label: string
  onSelect: () => void
}) {
  return (
    <span
      onClick={props.onSelect}
      className={cn(
        'text-md mr-3 cursor-pointer select-none whitespace-nowrap pb-4 font-medium leading-5 transition-colors',
        { 'text-191c20': props.isActive },
        { 'text-neutral-400': !props.isActive }
      )}
    >
      {props.label}
    </span>
  )
})
