import { Icon } from 'common/Icon'
import { Fragment, memo, ReactNode } from 'react'
import cn from 'classnames'

export const Steps = memo(function Steps(props: {
  steps: Array<ReactNode>
  borders?: boolean
}) {
  return (
    <div className="grid items-center gap-2 lg:grid-flow-col">
      {props.steps.map((step, index) => (
        <Fragment key={index}>
          {index !== 0 && (
            <Icon
              name="arrow-right"
              className="h-6 w-6 justify-self-center text-000000 dark:text-neutral-500 rotate-90 lg:rotate-0"
            />
          )}
          <div
            className={cn('flex justify-center', {
              'p-4 border border-neutral-100 dark:border-neutral-700 rounded-xl': props.borders,
            })}
          >
            {step}
          </div>
        </Fragment>
      ))}
    </div>
  )
})
