import cn from 'classnames'
import { styles } from 'common/helpers/styles'
import { ReactNode } from 'react'

export function Fence(props: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative', props.className)}>
      <div className={styles.fenceBorder} />
      <pre className={cn('max-w-[calc(100vw_-_32px)] overflow-auto', styles.fenceBorderInner, 'bg-ebedef dark:bg-161b22')}>
        {props.children}
      </pre>
    </div>
  )
}
