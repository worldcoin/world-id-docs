import clsx from 'clsx'
import Image from 'next/image'
import BookIcon from './icons/BookIcon'
import LockIcon from './icons/LockIcon'
import { Link } from '@/components/Link'
import { GetServerSideProps } from 'next'
import { FC, memo, useMemo } from 'react'
import ErrorIcon from './icons/ErrorIcon'
import logo from '../../worldcoin-logo.svg'
import SuccessIcon from './icons/SuccessIcon'
import { CodeGroup, Pre } from '@/components/Code'
import ChevronRightIcon from './icons/ChevronRightIcon'

enum State {
	Error = 'error',
	Success = 'success',
}

//FIXME: Adjust type for real data
type Props = {
	searchParams: {
		token: string | null
		state: string | null
	}
	userData:
		| {
				userId?: string | null
				name?: string | null
				email?: string | null
				lastName?: string | null
		  }
		| undefined
	details?: {
		actionId?: string | null
		error?: string | null
	}
	result: State
}

const TryCallback: FC<Props> = ({ result, userData, details }) => {
	const content = useMemo(
		() => ({
			[State.Success]: {
				icon: <SuccessIcon />,
				heading: 'Your connection works!',
				description: 'Below is the user identity we will use to check againt your rules.',
			},
			[State.Error]: {
				icon: <ErrorIcon />,
				heading: 'Application Error',
				description: 'Something is wrong with this request',
			},
		}),
		[]
	)

	return (
		<div className="min-h-screen w-full bg-[#F7F7F7] grid grid-rows-auto/1fr justify-items-center items-center gap-y-12 p-5">
			<Image src={logo} className="h-6" alt="" />

			<div className="lg:min-w-[720px]">
				<div className="pt-10 md:pt-16 md:pb-4 pb-8 px-6 grid gap-y-8 justify-items-center bg-white rounded-xl">
					{content[result].icon}

					<div className="grid gap-y-2 justify-items-center leading-none">
						<h1 className="text-xl font-sora font-semibold text-center">{content[result].heading}</h1>
						<p className="text-gray-500 text-center">{content[result].description}</p>
					</div>

					{result === State.Success && userData && (
						<div className="grid md:grid-cols-2 gap-y-2 md:gap-y-6 justify-items-start w-full">
							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.userId,
									'text-gray-700': userData.userId,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">UserID: </span>{' '}
								{userData.userId ?? 'Not requested'}
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.name,
									'text-gray-700': userData.name,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Name: </span>{' '}
								{userData.name ?? 'Not requested'}
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.email,
									'text-gray-700': userData.email,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Email: </span>{' '}
								{userData.email ?? 'Not requested'}
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.lastName,
									'text-gray-700': userData.lastName,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Last name: </span>{' '}
								{userData.lastName ?? 'Not requested'}
							</p>
						</div>
					)}

					<div className="w-full">
						{details && (
							<CodeGroup title="Response details">
								<Pre>
									{details.actionId && `actionId="${details.actionId}"`}
									{details.error && `Error: ${details.error}`}
								</Pre>
							</CodeGroup>
						)}
					</div>
				</div>

				<Link href="/" className="bg-white rounded-lg mt-4 px-4 py-3 text-gray-400 flex items-center">
					<BookIcon className="text-xl mr-1" />
					<div className="flex-grow">Developer documentation</div>
					<ChevronRightIcon className="text-2xl" />
				</Link>

				<div className="w-full flex items-center mt-4 text-gray-400 text-sm">
					<div className="grid grid-flow-col gap-1 items-center">
						<LockIcon />
						<span>Secured by World ID</span>
					</div>
					<div className="flex-grow text-right">
						<Link href="https://worldcoin.org/privacy-statement">Privacy</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(TryCallback)

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
	const url = new URL(req.url!, process.env.NEXT_PUBLIC_APP_URL)
	const params = new URLSearchParams(url.search)
	const token = params.get('token')
	const state = params.get('state')

	// FIXME: pass real data
	return {
		props: {
			searchParams: { token, state },
			userData: { userId: '123', email: '123@worldcoin.org' },
			details: { actionId: '123' },
			result: State.Success,
		},
	}
}
