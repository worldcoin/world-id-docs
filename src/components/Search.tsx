import clsx from 'clsx'
import { search } from 'clippy-widget'
import { useRouter } from 'next/router'
import SearchIcon from './icons/SearchIcon'
import useDebounce from '@/lib/use-debounce'
import LoadingIcon from './icons/LoadingIcon'
import NoResultsIcon from './icons/NoResultsIcon'
import { References } from 'clippy-widget/build/types'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import {
	FC,
	forwardRef,
	Fragment,
	KeyboardEvent as ReactKeyboardEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

const SearchResult: FC<{ result: References[0]; resultIndex: number }> = ({ result, resultIndex }) => (
	<Combobox.Option
		value={result.path}
		className={({ active }) =>
			clsx(
				'group block cursor-default px-4 py-3',
				active && 'bg-zinc-50 dark:bg-zinc-800/50',
				resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800'
			)
		}
	>
		<div
			aria-hidden="true"
			className="text-sm font-medium text-zinc-900 group-aria-selected:text-emerald-500 dark:text-white"
		>
			{result.title || result.page_title}
		</div>
		{result.title && (
			<div aria-hidden="true" className="mt-1 truncate whitespace-nowrap text-2xs text-zinc-500">
				{result.page_title}
			</div>
		)}
	</Combobox.Option>
)

const SearchResults: FC<{ hasSearched: boolean; isLoading: boolean; query: string; results: References }> = ({
	hasSearched,
	isLoading,
	query,
	results,
}) => {
	if (hasSearched && !isLoading && results.length === 0) {
		return (
			<div className="p-6 text-center">
				<NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
				<p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
					Nothing found for{' '}
					<strong className="break-words font-semibold text-zinc-900 dark:text-white">
						&lsquo;{query}&rsquo;
					</strong>
					. Please try again.
				</p>
			</div>
		)
	}

	return (
		<>
			<Combobox.Options as="ul">
				{results.map((result, i) => (
					<SearchResult key={i} result={result} resultIndex={i} />
				))}
			</Combobox.Options>
			{results.length > 0 && (
				<p className="flex items-center justify-end gap-1 border-t border-zinc-100 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
					Powered by{' '}
					<a
						target="_blank"
						rel="noreferrer"
						className="text-zinc-700 font-semibold"
						href="https://clippy.help/?ref=worldcoin"
					>
						Clippy
					</a>
				</p>
			)}
		</>
	)
}

const SearchInput = forwardRef<
	HTMLInputElement,
	{ isLoading: boolean; query: string; onChange: (value: string) => void }
>(({ isLoading, query, onChange }, inputRef) => {
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
					if (event.key === 'Escape') onChange('')
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
	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, 300)
	const [isLoading, setLoading] = useState(false)
	const [hasSearched, setHasSearched] = useState(false)
	const [results, setResults] = useState<References>([])

	useEffect(() => {
		if (!debouncedQuery || debouncedQuery.length < 3) {
			setResults([])
			return
		}

		setLoading(true)
		search(debouncedQuery).then(results => {
			setLoading(false)
			setResults(results)
			setHasSearched(true)
		})
	}, [debouncedQuery])

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
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [open, setOpen])

	const reset = useCallback(() => {
		setQuery('')
		setResults([])
		setHasSearched(false)
	}, [])

	return (
		<Transition.Root show={open} as={Fragment} afterLeave={reset} appear>
			<Dialog as="div" className="relative z-50" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
							<Combobox onChange={(path: string) => void router.push(path)}>
								<SearchInput query={query} onChange={setQuery} isLoading={isLoading} />

								<SearchResults
									query={query}
									results={results}
									isLoading={isLoading}
									hasSearched={hasSearched}
								/>
							</Combobox>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
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

export const Search = () => {
	const { buttonProps, dialogProps } = useSearchProps()
	const [modifierKey, setModifierKey] = useState<string>('')

	useEffect(() => {
		setModifierKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ')
	}, [])

	return (
		<div className="hidden lg:block lg:max-w-md lg:flex-auto">
			<button
				type="button"
				{...buttonProps}
				className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none"
			>
				<SearchIcon className="h-5 w-5 stroke-current" />
				Find something...
				<kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
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
