import Link from 'next/link'
import { NextPage } from 'next'
import ArrowIcon from '@/components/icons/ArrowIcon'

const Waitlist: NextPage = () => {
	return (
		<div className="grid gap-y-4 content-start">
			<div className="grid gap-y-3">
				<h1 className="mb-0 text-[28px] text-gray-900">The wait is now over</h1>
				<p className="my-0 max-w-md text-base leading-tight text-gray-900">You can sign up for the SDK now: </p>
			</div>

			<div className="grid justify-items-start gap-y-2">
				<Link
					href="https://developer.worldcoin.org"
					target="_blank"
					className="mt-2 grid grid-cols-1fr/auto items-center text-gray-900 gap-x-2 rounded-lg border border-gray-100 bg-gray-25 px-4 py-3.5"
				>
					<span className="text-14 font-medium leading-none uppercase">Developer Portal</span>
					<ArrowIcon className="h-4 w-4" />
				</Link>
			</div>
		</div>
	)
}

export default Waitlist

export async function getStaticProps() {
	return {
		props: {
			title: 'Waitlist',
		},
	}
}
