import { styles } from 'common/helpers/styles'
import { memo, ReactNode } from 'react'
import cn from 'classnames'

export const GradientBorderContainer = memo(
  function GradientBorderContainer(props: {
    className?: string
    children: ReactNode
  }) {
    return (
      <div className="relative flex h-full">
        <div className={styles.fenceBorder} />

        <div className={cn(styles.fenceBorderInner, props.className)}>
          {props.children}
        </div>
      </div>
    )
  }
)
