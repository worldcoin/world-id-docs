import clsx from 'clsx'
import { create } from 'zustand'
import { Tag } from '@/components/Tag'
import { Tab } from '@headlessui/react'
import ClipboardIcon from './icons/ClipboardIcon'
import { FC, PropsWithChildren, ReactElement, useMemo } from 'react'
import { Children, createContext, useContext, useEffect, useRef, useState } from 'react'

const languageNames = {
	js: 'JavaScript',
	ts: 'TypeScript',
	javascript: 'JavaScript',
	typescript: 'TypeScript',
	php: 'PHP',
	python: 'Python',
	ruby: 'Ruby',
	go: 'Go',
} as const

const getPanelTitle = ({ title, language }: { title?: string; language: keyof typeof languageNames }): string => {
	return title ?? languageNames[language] ?? 'Code'
}

const CopyButton: FC<{ code: string }> = ({ code }) => {
	let [copyCount, setCopyCount] = useState(0)
	let copied = copyCount > 0

	useEffect(() => {
		if (copyCount > 0) {
			let timeout = setTimeout(() => setCopyCount(0), 1000)
			return () => {
				clearTimeout(timeout)
			}
		}
	}, [copyCount])

	return (
		<button
			type="button"
			className={clsx(
				'group/button absolute top-3.5 right-4 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
				copied
					? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
					: 'bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5'
			)}
			onClick={() => {
				window.navigator.clipboard.writeText(code).then(() => {
					setCopyCount(count => count + 1)
				})
			}}
		>
			<span
				aria-hidden={copied}
				className={clsx(
					'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300',
					copied && '-translate-y-1.5 opacity-0'
				)}
			>
				<ClipboardIcon className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
				Copy
			</span>
			<span
				aria-hidden={!copied}
				className={clsx(
					'pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
					!copied && 'translate-y-1.5 opacity-0'
				)}
			>
				Copied!
			</span>
		</button>
	)
}

const CodePanelHeader: FC<{
	tag?: 'get' | 'post' | 'put' | 'delete'
	label?: string
}> = ({ tag, label }) => {
	if (!tag && !label) {
		return null
	}

	return (
		<div className="flex h-9 items-center gap-2 border-y border-t-transparent border-b-white/7.5 bg-zinc-900 bg-white/2.5 px-4 dark:border-b-white/5 dark:bg-white/1">
			{tag && (
				<div className="dark flex">
					<Tag variant="medium">{tag}</Tag>
				</div>
			)}
			{tag && label && <span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />}
			{label && <span className="font-mono text-xs text-zinc-400 ">{label}</span>}
		</div>
	)
}

const CodePanel: FC<
	PropsWithChildren<{
		tag?: string
		label?: string
		code?: string
		meta?: string
	}>
> = ({ tag, label, code, meta, children }) => {
	const preRef = useRef<HTMLPreElement>(null)
	let child = Children.only(children)
	const focus = useMemo<number[]>(() => {
		if (!meta || !meta.includes('focus=')) return []
		const focus = meta.split('focus=')[1].split(',')

		return focus.reduce((acc, part) => {
			const range = part.split(':')
			if (range.length === 1) {
				acc.push(parseInt(range[0]) - 1)
			} else {
				const start = parseInt(range[0]) - 1
				const end = parseInt(range[1])
				for (let i = start; i < end; i++) {
					acc.push(i)
				}
			}
			return acc
		}, [] as number[])
	}, [meta])

	useEffect(() => {
		if (focus.length === 0 || !preRef.current) return
		;[...preRef.current.children[0].children]
			.filter((_, i) => !focus.includes(i))
			.map(node => node.classList.add('opacity-40'))
	}, [focus])

	return (
		<div className="group dark:bg-white/2.5">
			<CodePanelHeader
				tag={(child as ReactElement).props.tag ?? tag}
				label={(child as ReactElement).props.label ?? label}
			/>
			<div className="relative">
				<pre className="overflow-x-auto p-4 text-xs text-white" ref={preRef}>
					{children}
				</pre>
				<CopyButton code={(child as ReactElement).props.code ?? code} />
			</div>
		</div>
	)
}

const CodeGroupHeader: FC<PropsWithChildren<{ title?: string; selectedIndex?: number }>> = ({
	title,
	children,
	selectedIndex,
}) => {
	let hasTabs = Children.count(children) > 1

	if (!title && !hasTabs) {
		return null
	}

	return (
		<div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
			{title && <h3 className="mr-auto pt-3 text-xs font-semibold text-white">{title}</h3>}
			{hasTabs && (
				<Tab.List className="-mb-px flex gap-4 text-xs font-medium overflow-x-auto">
					{Children.map(children, (child, childIndex) => (
						<Tab
							className={clsx(
								'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none whitespace-nowrap',
								childIndex === selectedIndex
									? 'border-white text-zinc-100'
									: 'border-transparent text-zinc-400 hover:text-zinc-300'
							)}
						>
							{getPanelTitle((child as ReactElement).props)}
						</Tab>
					))}
				</Tab.List>
			)}
		</div>
	)
}

const CodeGroupPanels: FC<PropsWithChildren<{}>> = ({ children, ...props }) => {
	let hasTabs = Children.count(children) > 1

	if (hasTabs) {
		return (
			<Tab.Panels>
				{Children.map(children, child => (
					<Tab.Panel>
						<CodePanel {...props}>{child}</CodePanel>
					</Tab.Panel>
				))}
			</Tab.Panels>
		)
	}

	return <CodePanel {...props}>{children}</CodePanel>
}

const usePreventLayoutShift = () => {
	let positionRef = useRef<HTMLDivElement>()
	let rafRef = useRef<number>()

	useEffect(() => {
		return () => window.cancelAnimationFrame(rafRef.current!)
	}, [])

	return {
		positionRef,
		preventLayoutShift(callback: () => void) {
			if (!positionRef.current) return

			let initialTop = positionRef.current.getBoundingClientRect().top

			callback()

			rafRef.current = window.requestAnimationFrame(() => {
				if (!positionRef.current) return

				let newTop = positionRef.current.getBoundingClientRect().top
				window.scrollBy(0, newTop - initialTop)
			})
		},
	}
}

type PreferredLanguageStore = {
	preferredLanguages: string[]
	addPreferredLanguage: (language: string) => void
}

const usePreferredLanguageStore = create<PreferredLanguageStore>()(set => ({
	preferredLanguages: [],
	addPreferredLanguage: language =>
		set(state => ({
			preferredLanguages: [
				...state.preferredLanguages.filter(preferredLanguage => preferredLanguage !== language),
				language,
			],
		})),
}))

const useTabGroupProps = (availableLanguages: string[]) => {
	let { preferredLanguages, addPreferredLanguage } = usePreferredLanguageStore()
	let [selectedIndex, setSelectedIndex] = useState(0)
	let activeLanguage = [...availableLanguages].sort(
		(a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a)
	)[0]
	let languageIndex = availableLanguages.indexOf(activeLanguage)
	let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
	if (newSelectedIndex !== selectedIndex) {
		setSelectedIndex(newSelectedIndex)
	}

	let { positionRef, preventLayoutShift } = usePreventLayoutShift()

	return {
		as: 'div',
		ref: positionRef,
		selectedIndex,
		onChange: (newSelectedIndex: number) => {
			preventLayoutShift(() => addPreferredLanguage(availableLanguages[newSelectedIndex]))
		},
	}
}

const CodeGroupContext = createContext(false)

export const CodeGroup: FC<PropsWithChildren<{ title?: string }>> = ({ children, title, ...props }) => {
	let languages = Children.map(children, child => getPanelTitle((child as ReactElement).props))
	let tabGroupProps = useTabGroupProps(languages as string[])
	let hasTabs = Children.count(children) > 1
	let Container = hasTabs ? Tab.Group : 'div'
	let containerProps = hasTabs ? tabGroupProps : {}
	let headerProps = hasTabs ? { selectedIndex: tabGroupProps.selectedIndex } : {}

	return (
		<CodeGroupContext.Provider value={true}>
			<Container
				{...containerProps}
				// @ts-ignore
				className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10"
			>
				<CodeGroupHeader title={title} {...headerProps}>
					{children}
				</CodeGroupHeader>
				<CodeGroupPanels {...props}>{children}</CodeGroupPanels>
			</Container>
		</CodeGroupContext.Provider>
	)
}

export const Code: FC<PropsWithChildren<{}>> = ({ children, ...props }) => {
	let isGrouped = useContext(CodeGroupContext)

	if (isGrouped) {
		return <code {...props} dangerouslySetInnerHTML={{ __html: children as string }} />
	}

	return <code {...props}>{children}</code>
}

export const Pre: FC<PropsWithChildren<{ title?: string }>> = ({ children, ...props }) => {
	let isGrouped = useContext(CodeGroupContext)

	if (isGrouped) return <>{children}</>
	return <CodeGroup {...props}>{children}</CodeGroup>
}
