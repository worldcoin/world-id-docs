import clsx from 'clsx'
import Image from 'next/image'
import BookIcon from './icons/BookIcon'
import LockIcon from './icons/LockIcon'
import { Link } from '@/components/Link'
import { GetServerSideProps } from 'next'
import { FC, memo, useMemo } from 'react'
import ErrorIcon from './icons/ErrorIcon'
import logo from 'public/worldcoin-logo.svg'
import SuccessIcon from './icons/SuccessIcon'
import { CodeGroup, Pre } from '@/components/Code'
import ChevronRightIcon from './icons/ChevronRightIcon'

enum State {
	Error = 'error',
	Success = 'success',
}

type Props = {
	userData?: {
		sub: string
		name: string | null
		email?: string | null
		givenName?: string | null
		familyName?: string | null
		credentialType: string
		likelyHuman: string
	}
	details?: {
		output?: Record<string, any> | null
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
				description: `Details for this request can be found below.`,
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

			<div className="lg:min-w-[720px] max-w-[1024px]">
				<div className="pt-10 md:pt-16 md:pb-4 pb-8 px-6 grid gap-y-8 justify-items-center bg-white rounded-xl">
					{content[result].icon}

					<div className="grid gap-y-2 justify-items-center leading-none">
						<h1 className="text-xl font-sora font-semibold text-center">{content[result].heading}</h1>
						<p className="text-gray-500 text-center">{content[result].description}</p>
					</div>

					{result === State.Success && userData && (
						<div className="grid md:grid-cols-2 gap-y-2 md:gap-y-8 gap-x-6 justify-items-start w-full">
							<p
								className={clsx('text-sm leading-none', {
									'text-gray-700': userData.sub,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">User ID (nullifier): </span>{' '}
								<span className="break-all leading-5">{userData.sub ?? 'Not available'}</span>
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-700': userData.credentialType,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Credential Type: </span>{' '}
								<span className="break-all leading-5">
									{userData.credentialType ? (
										<code className="bg-gray-100 px-2 py-1 rounded text-primary">
											{userData.credentialType}
										</code>
									) : (
										'Not available'
									)}
								</span>
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-700': userData.likelyHuman,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Likely human: </span>{' '}
								<span className="break-all leading-5">
									{userData.likelyHuman ? (
										<code className="bg-gray-100 px-2 py-1 rounded text-primary">
											{userData.likelyHuman}
										</code>
									) : (
										'Not available'
									)}
								</span>
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.name,
									'text-gray-700': userData.name,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Name: </span>{' '}
								<span className="break-all leading-5">{userData.name ?? 'Not requested'}</span>
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.email,
									'text-gray-700': userData.email,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Email: </span>{' '}
								<span className="break-all leading-5">{userData.email ?? 'Not requested'}</span>
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.givenName,
									'text-gray-700': userData.givenName,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Given name: </span>{' '}
								<span className="break-all leading-5">{userData.givenName ?? 'Not requested'}</span>
							</p>

							<p
								className={clsx('text-sm leading-none', {
									'text-gray-400 italic': !userData.familyName,
									'text-gray-700': userData.familyName,
								})}
							>
								<span className="not-italic text-gray-900 font-semibold">Family name: </span>{' '}
								<span className="break-all leading-5">{userData.familyName ?? 'Not requested'}</span>
							</p>
						</div>
					)}

					<div className="w-full overflow-hidden">
						{details && (
							<CodeGroup title="Response details">
								<Pre>
									{details.output && JSON.stringify(details.output, null, 2)}
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

// TODO: ? Show a nice loading state while the server is processing the request
export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
	const url = new URL(req.url!, process.env.NEXT_PUBLIC_APP_URL)
	const params = new URLSearchParams(url.search)
	const token = params.get('token')

	// TODO: Properly generate and store temporary nonces to exemplify proper usage

	if (!token) {
		return {
			props: {
				result: State.Error,
				details: { error: 'Authorization token was not provided.' },
			},
		}
	}

	/* NOTE: Obtain user info with JWT, this will also verify the JWT is valid. We opt for this instead of auth code so:
	 * 1. We do a single request to verify the token and obtain the information
	 * 2. If the user refreshes the page, the token remains valid (this is a page for debugging)
	 */
	const userResponse = await fetch(`${process.env.NEXT_PUBLIC_SIGN_IN_WITH_WORLDCOIN_ENDPOINT}/userinfo`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (!userResponse.ok) {
		return {
			props: {
				result: State.Error,
				details: {
					error: `Unable to obtain user info from JWT (${
						userResponse.status
					}): \n\n${await userResponse.text()}`,
				},
			},
		}
	}

	const userInfo = await userResponse.json()

	return {
		props: {
			userData: {
				sub: userInfo.sub,
				email: userInfo.email ?? null,
				name: userInfo.name ?? null,
				givenName: userInfo.given_name ?? null,
				familyName: userInfo.family_name ?? null,
				credentialType: userInfo['https://id.worldcoin.org/beta'].credential_type,
				likelyHuman: userInfo['https://id.worldcoin.org/beta'].likely_human,
			},
			details: {
				output: {
					token,
					userInfo,
				},
			},
			result: State.Success,
		},
	}
}
