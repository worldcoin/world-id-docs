import cn from 'classnames'
import { ReactNode } from 'react'

export function Fence(props: { children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'pre relative rounded-lg border border-neutral-200',
        props.className
      )}
    >
      <pre className={cn('m-0 max-w-[calc(100vw_-_32px)] overflow-auto', '')}>
        {props.children}
      </pre>
    </div>
  )
}
