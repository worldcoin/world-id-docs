import cn from 'classnames'
import { ReactNode } from 'react'

export function Fence(props: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('relative border border-neutral-200 dark:border-neutral-500 rounded-lg', props.className)}>
      <pre
        className={cn(
          'max-w-[calc(100vw_-_32px)] m-0 overflow-auto',
          '',
        )}
      >
        {props.children}
      </pre>
    </div>
  )
}
