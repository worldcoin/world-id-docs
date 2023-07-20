import { memo } from 'react'
import { Link } from '@/components/Link'
import { Search } from '@/components/Search'
import ArrowIcon from '@/components/icons/ArrowIcon'

const NotFound = (): JSX.Element => {
	return (
		<div className="grid gap-y-8 content-start">
			<div className="grid gap-y-3">
				<h1 className="mb-0 text-[28px] text-gray-900">Sorry, this page can’t be found</h1>
				<p className="my-0 max-w-md text-base leading-tight text-gray-900">
					This page may have been moved or deleted. Be sure to check your spelling.
				</p>
			</div>

			<div className="grid justify-items-start gap-y-2">
				<span className="text-base text-gray-500">Try searching our site: </span>
				<Search className="min-w-[460px]" buttonClassName="rounded-lg !px-4 h-11" placeholder="Search docs" />
				<Link
					href="/"
					className="mt-2 grid grid-cols-1fr/auto items-center text-gray-900 gap-x-2 rounded-lg border border-gray-100 bg-gray-25 px-4 py-3.5"
				>
					<span className="text-14 font-medium leading-none uppercase">Home</span>
					<ArrowIcon className="h-4 w-4" />
				</Link>
			</div>
		</div>
	)
}

export default memo(NotFound)
