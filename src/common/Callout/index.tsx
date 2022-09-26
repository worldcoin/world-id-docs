import cn from 'classnames'
import { Icon } from 'common/Icon'
import { memo, ReactNode, useMemo } from 'react'
import { styles } from 'common/helpers/styles'

export const Callout = memo(function Callout(props: {
  type?: 'note' | 'warning'
  title: string
  children: ReactNode
}) {
  const type = useMemo(() => props.type ?? 'note', [props.type])

  const titleStyle = useMemo(
    () =>
      cn({
        'bg-8e87ff dark:bg-gradient-to-r from-fff0ed to-edecfc':
          type === 'note',
        'bg-ff6848': type === 'warning',
      }),
    [type]
  )

  return (
    <div className="relative my-6">
      <div className={styles.fenceBorder} />

      <div
        className={cn(
          'grid gap-6 rounded-2xl bg-ebedef p-6 dark:bg-161b22',
          styles.fenceBorderInner
        )}
      >
        <div className="flex items-center gap-x-2.5">
          <Icon
            name="question-circle"
            className={cn('h-5 w-5', titleStyle)}
            noMask
          />

          <p
            className={cn(
              'm-0 bg-clip-text text-20 font-semibold !text-transparent',
              titleStyle
            )}
          >
            {props.title}
          </p>
        </div>

        <div className="prose mt-2.5">{props.children}</div>
      </div>
    </div>
  )
})
