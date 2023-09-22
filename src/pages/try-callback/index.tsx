import clsx from 'clsx'
import Image from 'next/image'
import BookIcon from './icons/BookIcon'
import LockIcon from './icons/LockIcon'
import { Link } from '@/components/Link'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import ErrorIcon from './icons/ErrorIcon'
import logo from 'public/worldcoin-logo.svg'
import SuccessIcon from './icons/SuccessIcon'
import { CodeGroup, Pre } from '@/components/Code'
import ChevronRightIcon from './icons/ChevronRightIcon'
import jwt_decode from 'jwt-decode'
import LoadingIcon from '@/components/icons/LoadingIcon'

enum State {
	Error = 'error',
	Success = 'success',
}

type Props = {
	userData?: {
		sub: string
		name?: string | null
		email?: string | null
		"https://id.worldcoin.org/beta": {
			credential_type: string
			likely_human: string
		}
		given_name?: string | null
		family_name?: string | null
		iss: string
		aud: string
		iat: number
		exp: number
	}
	details?: {
		output?: Record<string, any> | null
		error?: string | null
	}
	result: State
}

const CallbackContent: FC<Props> = ({ userData, details, result }) => {

	function toDateTimeString(timestamp: number): string {
		const date = new Date(timestamp)
		return date.toLocaleString()
	}
	
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
		<div className="lg:min-w-[720px] max-w-[1024px]">
			<div className="pt-10 md:pt-16 md:pb-4 pb-8 px-6 grid gap-y-8 justify-items-center bg-white rounded-xl">
				{content[result].icon}

				<div className="grid gap-y-2 justify-items-center leading-none">
					<h1 className="text-xl font-sora font-semibold text-center">{content[result].heading}</h1>
					<p className="text-gray-500 text-center">{content[result].description}</p>
				</div>

				{result === State.Success && userData && (
					<div className="grid md:grid-cols-2 gap-y-2 md:gap-y-6 gap-x-6 justify-items-start w-full">
						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData.sub,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">User ID (nullifier): </span>{' '}<br/>
							<span className="break-all leading-5">{userData.sub ?? 'Not available'}</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-400 italic': !userData.email,
								'text-gray-700': userData.email,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Email: </span>{' '}<br/>
							<span className="break-all leading-5">{userData.email ?? 'Not requested'}</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData["https://id.worldcoin.org/beta"].credential_type,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Credential Type: </span>{' '}<br/>
							<span className="break-all leading-5">
								{userData["https://id.worldcoin.org/beta"].credential_type ?? 'Not available'}
							</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData["https://id.worldcoin.org/beta"].likely_human,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Likely human: </span>{' '}<br/>
							<span className="break-all leading-5">
								{userData["https://id.worldcoin.org/beta"].likely_human ?? 'Not available'}
							</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData.iss,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Issuer: </span>{' '}<br/>
							<span className="break-all leading-5">{userData.iss ?? 'Not available'}</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData.aud,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Audience: </span>{' '}<br/>
							<span className="break-all leading-5">{userData.aud ?? 'Not available'}</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData.iat,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Issued at: </span>{' '}<br/>
							<span className="break-all leading-5">{toDateTimeString(userData.iat * 1000)} <br/>(Unix Timestamp: {userData.iat})</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-700': userData.exp,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Expires at: </span>{' '}<br/>
							<span className="break-all leading-5">{toDateTimeString(userData.exp * 1000)} <br/>(Unix Timestamp: {userData.exp})</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-400 italic': !userData.name,
								'text-gray-700': userData.name,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Name: </span>{' '}<br/>
							<span className="break-all leading-5">{userData.name ?? 'Not requested'}</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-400 italic': !userData.given_name,
								'text-gray-700': userData.given_name,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Given name: </span>{' '}<br/>
							<span className="break-all leading-5">{userData.given_name ?? 'Not requested'}</span>
						</p>

						<p
							className={clsx('text-sm leading-none', {
								'text-gray-400 italic': !userData.family_name,
								'text-gray-700': userData.family_name,
							})}
						>
							<span className="not-italic text-gray-900 font-semibold">Family name: </span>{' '}<br/>
							<span className="break-all leading-5">{userData.family_name ?? 'Not requested'}</span>
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
	)
}

const TryCallback: FC = () => {

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [code, setCode] = useState<string | undefined>()
	const [idToken, setIdToken] = useState<string | undefined>()
	const [userData, setUserData] = useState<Props["userData"] | undefined>()

	const [details, setDetails] = useState<{ output?: { code: string, idToken: string, userData: any }, error?: string } | undefined>()
	const [result, setResult] = useState<State>(State.Error)

	useEffect(() => {
		async function getIdToken() {

			const reqBody = new URLSearchParams()
			reqBody.append('grant_type', 'authorization_code')

			try {
				const code = new URLSearchParams(window.location.search).get('code')
				if (code) { 
					setCode(code)
					reqBody.append('code', code)
				} else { throw new Error }
			} catch {
				setResult(State.Error)
				setDetails({ error: 'Authorization Code not found.' })
				setIsLoading(false)
				return
			}

			try {
				const codeVerifier = sessionStorage.getItem('codeVerifier')
				if (codeVerifier) {
					sessionStorage.removeItem('codeVerifier')
					reqBody.append('code_verifier', codeVerifier ?? '')
				} else { throw new Error }
			} catch {
				setResult(State.Error)
				setDetails({ error: 'Code verifier not found.' })
				setIsLoading(false)
				return
			}

			try {
				const response = await fetch('https://id.worldcoin.org/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: reqBody,
				})
				const data = await response.json()
				setIdToken(data.id_token)
			} catch {
				setResult(State.Error)
				setDetails({ error: 'Failed to exchange Authorization Code for ID Token.' })
				setIsLoading(false)
				return
			}
		}
		getIdToken()
	}, [])

	useEffect(() => {
		if (idToken && code) {
			try {
				const userInfo: Props["userData"] = jwt_decode(idToken)
				setUserData(userInfo)
				setDetails({ output: { code, idToken, userData: userInfo } })
				setResult(State.Success)
				setIsLoading(false)
			} catch {
				setResult(State.Error)
				setDetails({ error: 'Error while parsing ID Token.' })
				setIsLoading(false)
				return
			}
		}
	}, [idToken, code])

	return (
		<div className="min-h-screen w-full bg-[#F7F7F7] grid grid-rows-auto/1fr justify-items-center items-center gap-y-12 p-5">
			<Image src={logo} className="h-6" alt="" />
			{!isLoading 
			? <CallbackContent userData={userData} details={details} result={result} />
			: <LoadingIcon className="h-20 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-emerald-400" />
			}
		</div>
	)
}

export default memo(TryCallback)

