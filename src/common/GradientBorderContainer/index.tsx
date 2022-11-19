import { styles } from 'common/helpers/styles'
import { memo, ReactNode } from 'react'
import cn from 'classnames'

export const GradientBorderContainer = memo(
  function GradientBorderContainer(props: {
    className?: string
    children: ReactNode
    defaultBackground?: boolean
  }) {
    return (
      <div className="relative flex h-full">
        <div className={styles.fenceBorder} />

        <div
          className={cn(
            styles.fenceBorderInner,
            props.defaultBackground && styles.background,
            props.className
          )}
        >
          {props.children}
        </div>
      </div>
    )
  }
)
