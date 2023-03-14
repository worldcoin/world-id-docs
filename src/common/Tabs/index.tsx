import cn from 'classnames'
import React, {
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Tab } from './Tab'

interface TabItemProps {
  label: string
}

export const Tabs = memo(function Tabs(props: { children: ReactNode }) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [currentTab, setCurrentTab] = useState(0)

  const tabs = useMemo(() => {
    return React.Children.map(
      props.children as ReactElement<PropsWithChildren<TabItemProps>>,
      (child) => (child.props?.label ? child : null)
    ).filter((child) => child !== null)
  }, [props.children])

  // NOTE: indicator set position
  useEffect(() => {
    const Tabs = tabsRef.current

    if (!Tabs) {
      return
    }

    const CurrentTab = Tabs.childNodes[currentTab] as HTMLDivElement

    if (!CurrentTab) {
      return
    }

    Tabs.style.setProperty('--indicator-left', `${CurrentTab.offsetLeft}px`)
    Tabs.style.setProperty('--indicator-width', `${CurrentTab.clientWidth}px`)
  }, [currentTab])

  return (
    <div className="p-2">
      <div
        ref={tabsRef}
        className={cn(
          'relative flex flex-col gap-10 border-b border-f3f4f5 md:flex-row',
          'after:absolute after:bottom-0 after:left-[var(--indicator-left)] after:h-px after:w-[var(--indicator-width)] after:bg-191c20 after:transition-all'
        )}
      >
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
