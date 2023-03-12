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
        'text-md mr-3 rounded-lg border-2 border-gray-100 py-2 px-6 font-semibold hover:cursor-pointer hover:bg-gray-100',
        { 'bg-black text-white hover:bg-black': props.isActive },
        { 'bg-white text-black': !props.isActive }
      )}
    >
      {props.label}
    </span>
  )
})
