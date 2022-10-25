import cn from 'classnames'
import { Icon, IconType } from 'common/Icon'
import { memo, ReactNode, useMemo } from 'react'
import { styles } from 'common/helpers/styles'

export const Callout = memo(function Callout(props: {
  type?: 'note' | 'tip' | 'info' | 'caution' | 'danger'
  title?: string
  children: ReactNode
}) {
  const type = useMemo(() => props.type ?? 'note', [props.type])

  const title = useMemo(() => {
    if (props.title) {
      return props.title
    }

    return `${type?.slice(0, 1).toUpperCase()}${type?.slice(1)}`
  }, [props.title, type])

  return (
    <div
      className={cn('relative my-6', {
        '[--color:_#596673] dark:[--color:_#9eafc0] [--link-color:_#64b483]': type === 'note',
        '[--color:_#64b483]': type === 'tip',
        '[--color:_#8e87ff]': type === 'info',
        '[--color:_#ff6848]': type === 'caution',
        '[--color:_#ff5a76]': type === 'danger',
      })}
    >
      <div className={styles.fenceBorder} />

      <div
        className={cn(
          'grid gap-2 rounded-2xl p-6',
          {
            'bg-[#edeeee] dark:bg-181b1f': type === 'note',
            'bg-[#dfeae3] dark:bg-[#325142]': type === 'tip',
            'bg-[#e5e4f6] dark:bg-[#39385f]': type === 'info',
            'bg-[#f6dfda] dark:bg-[#5b2f28]': type === 'caution',
            'bg-[#f6dde1] dark:bg-[#5b2b36]': type === 'danger',
          },
          styles.fenceBorderInner
        )}
      >
        <div className="border-l-[3px] border-[color:var(--color)] pl-6">
          <div className="flex items-center gap-x-2.5">
            <Icon
              name={
                {
                  note: 'info',
                  tip: 'speaker',
                  info: 'question',
                  caution: 'attention',
                  danger: 'lightning',
                }[type] as IconType
              }
              className="h-5 w-5 !bg-[color:_var(--color)]"
              noMask
            />
            <p className={cn('m-0 text-20 font-semibold ![color:_var(--color)]')}>{title}</p>
          </div>

          <div className="[&>*]:mb-0 [&_*]:inline [&_a]:[color:_var(--link-color,_var(--color))]">{props.children}</div>
        </div>
      </div>
    </div>
  )
})
