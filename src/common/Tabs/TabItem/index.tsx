import { memo, ReactNode } from 'react'

export const TabItem = memo(function TabItem(props: {
  value: string
  isActive: boolean
  children: ReactNode
}) {
  return <>{props.isActive && <div className="">{props.children}</div>}</>
})
