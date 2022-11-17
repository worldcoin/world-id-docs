import { GradientBorderContainer } from 'common/GradientBorderContainer'
import { Icon } from 'common/Icon'
import { Fragment, memo, ReactNode } from 'react'

export const Steps = memo(function Steps(props: {
  steps: Array<ReactNode>
  key: string
  stepBackground?: boolean
}) {
  return (
    <div className="grid items-center gap-3 lg:grid-flow-col">
      {props.steps.map((step, index) => (
        <Fragment key={`${props.key}-step-${index}`}>
          {index !== 0 && (
            <Icon
              name="arrow-right"
              className="h-6 w-6 rotate-90 justify-self-center text-4940e0 dark:text-fd684a lg:rotate-0"
            />
          )}
          {props.stepBackground && (
            <GradientBorderContainer
              defaultBackground
              className="w-full p-4 text-center"
            >
              {step}
            </GradientBorderContainer>
          )}

          {!props.stepBackground && (
            <div className="flex justify-center">{step}</div>
          )}
        </Fragment>
      ))}
    </div>
  )
})
