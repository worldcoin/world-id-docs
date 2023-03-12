import React, { memo, ReactNode, useState } from 'react'
import { Tab } from './Tab'

export const Tabs = memo(function Tabs(props: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div className="p-2">
      {React.Children.map(props.children, (child, index) => {
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
      })}
      {React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, { isActive: currentTab === index })
      })}
    </div>
  )
})
