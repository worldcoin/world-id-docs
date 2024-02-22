import cn from 'clsx'
import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react'

interface TabItemProps {
	label: string
}

const Tabs = (props: { children: ReactNode }) => {
	const tabsRef = useRef<HTMLDivElement>(null)
	const [currentTab, setCurrentTab] = useState(0)

	const tabs = useMemo(() => {
		return React.Children.map(props.children as ReactElement<PropsWithChildren<TabItemProps>>, child =>
			child.props?.label ? child : null
		).filter(child => child !== null)
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
					'after:absolute after:bottom-0 after:left-[var(--indicator-left)] after:h-px after:w-[var(--indicator-width)] after:bg-gray-700 after:transition-all'
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
}

export const Tab = (props: { isActive: boolean; label: string; onSelect: () => void }) => (
	<span
		onClick={props.onSelect}
		className={cn(
			'text-md mr-3 cursor-pointer select-none whitespace-nowrap pb-4 font-medium leading-5 transition-colors',
			{ 'text-191c20': props.isActive },
			{ 'text-neutral-400': !props.isActive }
		)}
	>
		{props.label}
	</span>
)

export const TabItem = (props: { value: string; isActive: boolean; children: ReactNode }) => {
	return props.isActive ? <div className="">{props.children}</div> : <></>
}

export default Tabs
