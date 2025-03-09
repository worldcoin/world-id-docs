import clsx from 'clsx'
import { useRouter } from 'next/router'
import SearchIcon from './icons/SearchIcon'
import { Combobox } from '@headlessui/react'
import LoadingIcon from './icons/LoadingIcon'
import { DocSearchModal } from '@docsearch/react'
import NoResultsIcon from './icons/NoResultsIcon'
import { FC, forwardRef, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react'

const SearchInput = forwardRef<
	HTMLInputElement,
	{ isLoading: boolean; query: string; onChange: (value: string) => void; reset: () => void }
>(({ isLoading, query, onChange, reset }, inputRef) => {
	return (
		<div className="group relative flex h-12">
			<SearchIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
			<Combobox.Input
				ref={inputRef}
				className={clsx(
					'flex-auto appearance-none border-transparent focus:ring-transparent focus:border-transparent bg-transparent pl-10 text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none dark:text-white sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
					isLoading ? 'pr-4' : 'pr-11'
				)}
				value={query}
				onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => {
					if (event.key === 'Escape') reset()
				}}
				onChange={event => onChange(event.target.value)}
			/>
			{isLoading && (
				<div className="absolute inset-y-0 right-3 flex items-center">
					<LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-emerald-400" />
				</div>
			)}
		</div>
	)
})
SearchInput.displayName = 'SearchInput'

const SearchDialog: FC<{ open: boolean; setOpen: (open: boolean) => void; className?: string }> = ({
	open,
	setOpen,
}) => {
	let router = useRouter()

	useEffect(() => {
		if (!open) return

		const onRouteChange = () => setOpen(false)

		router.events.on('routeChangeStart', onRouteChange)
		router.events.on('hashChangeStart', onRouteChange)

		return () => {
			router.events.off('routeChangeStart', onRouteChange)
			router.events.off('hashChangeStart', onRouteChange)
		}
	}, [open, setOpen, router])

	useEffect(() => {
		if (open) return

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setOpen(true)
			}

			if (event.key === 'Escape' && open) {
				setOpen(false)
			}
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [open, setOpen])

	if (!open) return null

	return (
		<DocSearchModal
			insights={true}
			// cspell:disable-next-line
			appId="VGCVR5ETO7" // public Algolia ID for the Worldcoin docs
			initialScrollY={0}
			indexName="World Docs"
			onClose={() => setOpen(false)}
			apiKey="0700ef31277eed22f40c778e84dc9129" // public Algolia key for the Worldcoin docs
		/>
	)
}

const useSearchProps = () => {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [open, setOpen] = useState(false)

	return {
		buttonProps: {
			ref: buttonRef,
			onClick: () => setOpen(true),
		},
		dialogProps: {
			open,
			setOpen: (open: boolean) => {
				let { width, height } = buttonRef?.current?.getBoundingClientRect() ?? { width: 0, height: 0 }
				if (!open || (width !== 0 && height !== 0)) {
					setOpen(open)
				}
			},
		},
	}
}

export const Search: FC<{ className?: string; buttonClassName?: string; placeholder?: string }> = ({
	className,
	buttonClassName,
	placeholder,
}) => {
	const { buttonProps, dialogProps } = useSearchProps()
	const [modifierKey, setModifierKey] = useState<string>('')

	useEffect(() => {
		setModifierKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ')
	}, [])

	return (
		<div className={clsx('hidden lg:block lg:max-w-md lg:flex-auto', className)}>
			<button
				type="button"
				{...buttonProps}
				className={clsx(
					'hidden h-8 w-full items-center gap-2 rounded-lg bg-white pl-2 pr-3 text-sm text-gray-AG1 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none',
					buttonClassName
				)}
			>
				<SearchIcon className="h-5 w-5 stroke-current" />
				{placeholder ?? 'Find something...'}
				<kbd className="ml-auto text-2xs text-gray-AG2 dark:text-zinc-500">
					<kbd className="font-sans">{modifierKey}</kbd>
					<kbd className="font-sans">K</kbd>
				</kbd>
			</button>
			<SearchDialog className="hidden lg:block" {...dialogProps} />
		</div>
	)
}

export const MobileSearch = () => {
	let { buttonProps, dialogProps } = useSearchProps()

	return (
		<div className="contents lg:hidden">
			<button
				type="button"
				className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none"
				aria-label="Find something..."
				{...buttonProps}
			>
				<SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
			</button>
			<SearchDialog className="lg:hidden" {...dialogProps} />
		</div>
	)
}
