import { cloneElement, ReactElement } from 'react'

export const UseCasePagination = (props: {
  prev?: ReactElement
  next?: ReactElement
}) => {

  return (
    <div className="flex items-center mt-8 pt-8 border-t border-gray-100">
      {props.prev && cloneElement(props.prev, { variant:'prev' })}
      <div className="grow"/>
      {props.next && cloneElement(props.next, { variant:'next' })}
    </div>
  )
}
