import React, {
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useState,
} from 'react'
import { Tab } from './Tab'

interface TabItemProps {
  label: string
}

export const Tabs = memo(function Tabs(props: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row">
        {React.Children.map(
          props.children as ReactElement<PropsWithChildren<TabItemProps>>,
          (child, index) => {
            return (
              child && (
                <Tab
                  key={index}
                  label={child.props.label}
                  isActive={currentTab === index}
                  onSelect={() => setCurrentTab(index)}
                />
              )
            )
          }
        )}
      </div>
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, {
          isActive: currentTab === index,
        })
      })}
    </div>
  )
})
