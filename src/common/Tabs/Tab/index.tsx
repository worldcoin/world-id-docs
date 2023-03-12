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
        'text-md m-2 rounded-lg border-2 border-gray-100 py-2 px-6 font-semibold hover:cursor-pointer hover:border-black',
        { 'bg-black text-white': props.isActive },
        { 'bg-white text-black': !props.isActive }
      )}
    >
      {props.label}
    </span>
  )
})
