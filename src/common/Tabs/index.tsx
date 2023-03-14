import React, {
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from 'react'
import { Tab } from './Tab'

interface TabItemProps {
  label: string
}

export const Tabs = memo(function Tabs(props: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState(0)

  const tabs = useMemo(() => {
    return React.Children.map(
      props.children as ReactElement<PropsWithChildren<TabItemProps>>,
      (child) => (child.props?.label ? child : null)
    ).filter((child) => child !== null)
  }, [props.children])

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row">
        {tabs.map((tab, index) => {
          return (
            tab.props && (
              <Tab
                key={index}
                label={tab.props.label}
                isActive={currentTab === index}
                onSelect={() => setCurrentTab(index)}
              />
            )
          )
        })}
      </div>

      {tabs.map((child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          isActive: currentTab === index,
        })
      })}
    </div>
  )
})

export { TabItem } from './TabItem'
