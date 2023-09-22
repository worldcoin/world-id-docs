import clsx from 'clsx'
import { Link } from '@/components/Link'
import SunIcon from '@/components/icons/SunIcon'
import MoonIcon from '@/components/icons/MoonIcon'
import LogoIcon from '@/components/icons/LogoIcon'
import ChartIcon from '@/components/icons/CharIcon'
import CheckIcon from '@/components/icons/CheckIcon'
import RocketIcon from '@/components/icons/RocketIcon'
import RedirectIcon from '@/components/icons/RedirectIcon'
import { memo, ReactNode, Suspense, useEffect, useMemo, useState } from 'react'
import { CredentialType, IDKitWidget, WidgetProps } from '@worldcoin/idkit'
import pkceChallenge from "pkce-challenge";

enum SignInScopes {
	OpenID = 'openid',
	Profile = 'profile',
	Email = 'email',
}

// ANCHOR: Staging/Production button
const EnvButton = ({
	isStaging,
	setIsStaging,
	icon,
	title,
	description,
	value,
}: {
	isStaging?: boolean
	setIsStaging: (value: boolean) => void
	icon: ReactNode
	title: string
	description: string
	value: string
}): JSX.Element => {
	let selected = false
	if (value === 'staging' && isStaging == true) {
		selected = true
	} else if (value === 'production' && isStaging == false) {
		selected = true
	}
	return (
		<label
			className={clsx(
				'grid grid-cols-auto/1fr/auto items-center gap-x-4 p-4 border border-[#F0EDF9] rounded-xl transition-colors cursor-pointer hover:bg-gray-100/50',
				{ 'bg-gray-100': selected }
			)}
			onClick={() => {
				if (value === 'staging') {
					setIsStaging(true)
				} else if (value === 'production') {
					setIsStaging(false)
				}
			}}
		>
			<div
				className={clsx(
					'p-3 rounded-full transition-colors',
					{ 'bg-gray-100': !selected },
					{ 'bg-white': selected }
				)}
			>
				{icon}
			</div>

			<div className="grid gap-y-1">
				<span className="text-gray-900 font-semibold self-end leading-none font-sora">{title}</span>
				<span className="self-start leading-none">{description}</span>
			</div>

			<CheckIcon
				className={clsx('text-accents-info-700 col-start-3 transition-opacity', { 'opacity-0': !selected })}
			/>
		</label>
	)
}

// ANCHOR: List of steps
const List = ({ steps }: { steps: string[] }): JSX.Element => {
	return (
		<ul className="grid gap-y-2 m-0 p-0">
			{steps.map((item, index) => (
				<li
					className="grid grid-cols-auto/1fr items-center gap-x-3 text-gray-500 m-0 p-0"
					key={`try-list-item-${index}`}
				>
					<span className="text-gray-900 flex items-center justify-center rounded-full text-2xs w-4.5 h-4.5 bg-gray-100">
						{index + 1}
					</span>

					<p className="m-0">{item}</p>
				</li>
			))}
		</ul>
	)
}

// ANCHOR: Common section component
const Section = ({
	heading,
	description,
	steps,
}: {
	heading: string
	description: string
	steps?: Array<string>
}): JSX.Element => {
	return (
		<div>
			<h2>{heading}</h2>
			<p className="max-w-[684px] text-gray-500 min-w-0">{description}</p>
			{steps && <List steps={steps} />}
		</div>
	)
}

// ANCHOR: Wrapper with style examples
const ExamplesWrapper = ({
	id,
	valid,
	children,
}: {
	id: string
	valid: boolean
	children: (params: {
		theme: WidgetProps['theme']
		variants: Record<string, boolean | undefined>[] | string[]
		styleOption: number
	}) => ReactNode
}): JSX.Element => {
	const [selected, setSelected] = useState(0)
	const [theme, setTheme] = useState<WidgetProps['theme']>('light')

	const variants = useMemo(
		() => [
			{
				'bg-white border border-gray-200 text-gray-900 h-[50px] px-6 rounded-xl': theme === 'light',
				'bg-gray-900 border border-gray-900 h-[50px] px-6 rounded-xl text-white': theme === 'dark',
			},
			{
				'bg-white border border-gray-200 text-gray-900 h-[50px] px-6 rounded-[25px]': theme === 'light',
				'bg-gray-900 border border-white/30 text-white h-[50px] px-6 rounded-[25px]': theme === 'dark',
			},
			{
				'bg-white border border-gray-200 text-gray-900 h-[50px] px-6 rounded-[0px]': theme === 'light',
				'bg-gray-900 border border-white/30 text-white h-[50px] px-6 rounded-[0px]': theme === 'dark',
			},
		],
		[theme]
	)

	return (
		<div className="border border-gray-200 rounded-lg relative overflow-hidden">
			<div className="border-b border-gray-200 bg-gray-25 px-6 py-4 leading-none">
				<span className="font-mono m-0 p-0">Try it out</span>
			</div>

			<div
				className={clsx('flex justify-center pb-16 pt-12 transition-colors', {
					'opacity-50 pointer-events-none select-none cursor-not-allowed': !valid,
				})}
			>
				{children({ theme, styleOption: selected, variants })}
			</div>

			<div
				className={clsx('flex justify-start items-center gap-x-4 absolute bottom-3 left-3 leading-none', {
					'opacity-50 pointer-events-none select-none cursor-not-allowed': !valid,
				})}
			>
				<div className="grid grid-cols-2 gap-x-2.5 px-2.5 py-1.5 border border-gray-200 rounded-full">
					<button type="button" onClick={() => setTheme('light')}>
						<SunIcon
							className={clsx(
								'transition-color',
								{ 'text-gray-900 hover:text-gray-900/70': theme === 'light' },
								{ 'text-gray-300/40 hover:text-gray-300': theme === 'dark' }
							)}
						/>
					</button>

					<button type="button" onClick={() => setTheme('dark')}>
						<MoonIcon
							className={clsx(
								'transition-all ',
								{ 'text-gray-900 hover:text-gray-900/70': theme === 'dark' },
								{ 'text-gray-300/40 hover:text-gray-300': theme === 'light' }
							)}
						/>
					</button>
				</div>

				<div className="flex justify-start items-center gap-x-1">
					{variants.map((_, index) => (
						<button
							key={`widget-${id}-style-button-${index}`}
							className={clsx(
								'w-4.5 h-4.5 flex justify-center items-center text-2xs rounded-full transition-all hover:opacity-70',
								{
									'bg-gray-900 text-white': index === selected,
									'bg-gray-100': index !== selected,
								}
							)}
							onClick={() => setSelected(index)}
						>
							{index + 1}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

// ANCHOR: OpenID scopes component
const ScopeChoiceButton = ({
	item,
	scopes,
	setScopes,
}: {
	item: { value: SignInScopes; label: string }
	scopes: Array<SignInScopes>
	setScopes: (scopes: Array<SignInScopes>) => void
}): JSX.Element => {
	let selected = false
	if ((scopes as string[]).includes(item.value)) {
		selected = true
	}

	if (item.value === SignInScopes.OpenID) {
		return (
			<label
				title="The OpenID scope is required per the OIDC specification."
				className='flex justify-center relative border items-center w-full py-4 rounded-xl cursor-not-allowed transition-colors bg-gray-100 border-transparent hover:bg-gray-100/70'
			>
				<span className="saturate-0 select-none leading-none">{item.label}</span>
				<CheckIcon className="absolute right-3 top-[calc(50%-10px)] text-accents-info-700" />
			</label>
		)
	} else {
		return (
			<label
				className={clsx(
					'flex justify-center relative border items-center w-full py-4 rounded-xl cursor-pointer transition-colors',
					{
						'bg-gray-100 border-transparent hover:bg-gray-100/70': selected,
						'border-[#F0EDF9] hover:bg-gray-100/40': !selected,
					}
				)}
				onClick={() => {
					if (selected) {
						setScopes(scopes.filter((scope) => scope !== item.value))
					} else {
						setScopes([...scopes, item.value])
					}
				}}
			>
				<span className="saturate-0 select-none leading-none">{item.label}</span>
				{selected && <CheckIcon className="absolute right-3 top-[calc(50%-10px)] text-accents-info-700" />}
			</label>
		)
	}
}

//ANCHOR: Accepted credentials component
const CredentialChoiceButton = ({
	item,
	credentials,
	setCredentials,
}: {
	item: { value: CredentialType; label: string }
	credentials: Array<CredentialType>
	setCredentials: (scopes: Array<CredentialType>) => void
}): JSX.Element => {
	let selected = false
	if ((credentials).includes(item.value)) {
		selected = true
	}
	return (
		<label
			className={clsx(
				'flex justify-center relative border items-center w-full py-4 rounded-xl cursor-pointer transition-colors',
				{
					'bg-gray-100 border-transparent hover:bg-gray-100/70': selected,
					'border-[#F0EDF9] hover:bg-gray-100/40': !selected,
				}
			)}
			onClick={() => {
				if (selected) {
					setCredentials(credentials.filter((credential) => credential !== item.value))
				} else {
					setCredentials([...credentials, item.value])
				}
			}}
		>
			<span className="saturate-0 select-none leading-none">{item.label}</span>
			{selected && <CheckIcon className="absolute right-3 top-[calc(50%-10px)] text-accents-info-700" />}
		</label>
	)
}

//ANCHOR: Max Verifications component
// const MaxVerificationsChoiceButton = ({
// 	item,
// 	maxVerifications,
// 	setMaxVerifications,
// }: {
// 	item: { value: 0 | 1 | 2; label: string }
// 	maxVerifications: 0 | 1 | 2
// 	setMaxVerifications: (number: 0 | 1 | 2) => void
// }): JSX.Element => {
// 	let selected = false
// 	if (maxVerifications == item.value) {
// 		selected = true
// 	}
// 	return (
// 		<label
// 			className={clsx(
// 				'flex justify-center relative border items-center w-full py-4 rounded-xl cursor-pointer transition-colors',
// 				{
// 					'bg-gray-100 border-transparent hover:bg-gray-100/70': selected,
// 					'border-[#F0EDF9] hover:bg-gray-100/40': !selected,
// 				}
// 			)}
// 			onClick={() => {
// 				setMaxVerifications(item.value)
// 			}}
// 		>
// 			<span className="saturate-0 select-none leading-none">{item.label}</span>
// 			{selected && <CheckIcon className="absolute right-3 top-[calc(50%-10px)] text-accents-info-700" />}
// 		</label>
// 	)
// }

// ANCHOR: Anonymous Actions page component
const AnonymousActions = (): JSX.Element => {

	const [isStaging, setIsStaging] = useState(false)
	const [action, setAction] = useState<string>("test-action")
	const [credentials, setCredentials] = useState<Array<CredentialType>>([CredentialType.Orb])
	const [isTestingWidgetValid, setIsTestingWidgetValid] = useState(false)
	// const [maxVerifications, setMaxVerifications] = useState< 0 | 1 | 2 >(1)

	useEffect(() => {
		if (action && credentials.length > 0) {
			setIsTestingWidgetValid(true)
		} else {
			setIsTestingWidgetValid(false)
		}
	}, [action, credentials])

	return (
		<div>
			<Section
				heading="Anonymous Actions"
				description={
					'Here you can test out various Anonymous Actions configurations, including ones that will fail (such as a phone-verified user attemping an action requiring Orb verification).'
				}
				steps={[
					'Choose between Staging or Production.',
					'Input the name of the action.',
					// 'Select max number of verifications per person',
					'Choose what type of credentials you want to accept. You can have both Orb and Phone, or only one.',
					'Tap on "Continue with Worldcoin."',
					'Follow the steps in "Continue with Worldcoin" flow.',
				]}
			/>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12">
				Step 1 • Choose Staging or Production
			</div>

			<div className="grid md:grid-cols-2 gap-y-4 gap-x-6 mt-4">
				<EnvButton
					title="Staging"
					description="Use the simulator"
					value="staging"
					isStaging={isStaging}
					setIsStaging={setIsStaging}
					icon={<RocketIcon />}
				/>

				<EnvButton
					title="Production"
					description="Use the World App"
					value="production"
					isStaging={isStaging}
					setIsStaging={setIsStaging}
					icon={<ChartIcon />}
				/>
			</div>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12">
				Step 2 • configure action
			</div>

			<div className="grid lg:grid-cols-2 gap-8">
				<div className="grid gap-y-2">
					<span className="font-medium">Action</span>

					<input
						type="text"
						onChange={(e) => setAction(e.target.value)}
						className="border border-gray-200 rounded-xl p-3 placeholder:text-gray-400"
						placeholder="Change this to simulate different actions"
						defaultValue="test-action"
					/>
				</div>

				{/* <div className="grid gap-y-2">
					<span className="font-medium">Maximum number of verifications</span>

					<div className="grid grid-cols-3 gap-x-3">
						<MaxVerificationsChoiceButton
							item={{ value: 1, label: '1' }}
							maxVerifications={maxVerifications}
							setMaxVerifications={setMaxVerifications}
						/>

						<MaxVerificationsChoiceButton
							item={{ value: 2, label: '2' }}
							maxVerifications={maxVerifications}
							setMaxVerifications={setMaxVerifications}
						/>

						<MaxVerificationsChoiceButton
							item={{ value: 0, label: 'Unlimited' }}
							maxVerifications={maxVerifications}
							setMaxVerifications={setMaxVerifications}
						/>
					</div>
				</div> */}

				<div className="grid gap-y-2">
					<span className="font-medium">Accepted credentials</span>

					<div className="grid grid-cols-2 gap-x-3">
						<CredentialChoiceButton
							item={{ value: CredentialType.Orb, label: 'Orb' }}
							credentials={credentials}
							setCredentials={setCredentials}
						/>

						<CredentialChoiceButton
							item={{ value: CredentialType.Phone, label: 'Phone' }}
							credentials={credentials}
							setCredentials={setCredentials}
						/>
					</div>
				</div>
			</div>

			{!isTestingWidgetValid && (
				<div>
					<p className="text-red-500 text-xs text-center mt-4">
						The current configuration is invalid. You must provide an action and select at least one credential type.
					</p>
				</div>
			)}

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12 mb-4">
				Step 3 • this is what your users see
			</div>

			<ExamplesWrapper id="testing" valid={isTestingWidgetValid}>
				{({ theme, styleOption, variants }) => (
					<Suspense>
						<IDKitWidget
							theme={theme}
							onSuccess={console.log}
							action={action}
							credential_types={credentials}
							app_id={
								isStaging
									? process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP!
									: process.env.NEXT_PUBLIC_TRY_IT_OUT_APP!
							}
						>
							{({ open }) => (
								<div className="relative">
									<button
										onClick={open}
										className={clsx(
											'flex items-center gap-x-4 transition-all',
											variants[styleOption]
										)}
										// disabled={!isTestingWidgetValid}
									>
										<LogoIcon />
										<span className="text-base leading-normal font-sora font-semibold">
											Continue with Worldcoin
										</span>
									</button>

									{isStaging && (
										<Link
											className="flex justify-center items-center gap-x-1 mt-3.5 absolute -bottom-8 inset-x-0"
											href="https://simulator.worldcoin.org/"
										>
											<span>Scan with Simulator</span>
											<RedirectIcon />
										</Link>
									)}
								</div>
							)}
						</IDKitWidget>
					</Suspense>
				)}
			</ExamplesWrapper>
		</div>
	)
}

// ANCHOR: Sign In page component
const SignIn = (): JSX.Element => {

	const [isStaging, setIsStaging] = useState(false)
	const [scopes, setScopes] = useState<Array<SignInScopes>>([SignInScopes.OpenID])
	const [codeChallenge, setCodeChallenge] = useState<string>("")
	const [authLink, setAuthLink] = useState<string>("")

	useEffect(() => {
		const pkce = pkceChallenge()
		window.sessionStorage.setItem("codeVerifier", pkce.code_verifier)
		setCodeChallenge(pkce.code_challenge)
	}, [])

	useEffect(() => {
		const baseUrl = new URL(`${process.env.NEXT_PUBLIC_SIGN_IN_WITH_WORLDCOIN_ENDPOINT}/authorize`)
		baseUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/try-callback`)
		baseUrl.searchParams.append('response_type', 'code')
		baseUrl.searchParams.append('response_mode', 'query')
		baseUrl.searchParams.append('scope', scopes.join(' '))
		baseUrl.searchParams.append('code_challenge', codeChallenge)
		baseUrl.searchParams.append('code_challenge_method', 'S256')

		baseUrl.searchParams.append(
			'client_id',
			isStaging
				? process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP!
				: process.env.NEXT_PUBLIC_TRY_IT_OUT_APP!
		)

		setAuthLink(baseUrl.toString())
	}, [isStaging, scopes, codeChallenge])

	return (
		<div>
			<Section
				heading="Sign in with Worldcoin"
				description="Try authentication with World ID using the OpenID Connect (OIDC) standard. You can use our integration on the Auth0 Marketplace, easily integrate with existing SSO systems (like Okta, OneLogin, Azure AD, and many others), or roll out your own authentication."
			/>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12">
				Step 1 • environment configuration
			</div>

			<div className="grid md:grid-cols-2 gap-y-4 gap-x-6 mt-4">
				<EnvButton
					title="Staging"
					description="Use the simulator"
					value="staging"
					isStaging={isStaging}
					setIsStaging={setIsStaging}
					icon={<RocketIcon />}
				/>

				<EnvButton
					title="Production"
					description="Use the World App"
					value="production"
					isStaging={isStaging}
					setIsStaging={setIsStaging}
					icon={<ChartIcon />}
				/>
			</div>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12">
				Step 2 • OIDC scopes
			</div>

			<div className="grid grid-cols-3 gap-x-3 mt-4">
				<ScopeChoiceButton
					item={{ value: SignInScopes.OpenID, label: 'OpenID' }}
					scopes={scopes}
					setScopes={setScopes}
				/>

				<ScopeChoiceButton
					item={{ value: SignInScopes.Profile, label: 'Profile' }}
					scopes={scopes}
					setScopes={setScopes}
				/>

				<ScopeChoiceButton
					item={{ value: SignInScopes.Email, label: 'Email' }}
					scopes={scopes}
					setScopes={setScopes}
				/>
			</div>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8 mb-4">
				Step 3 • this is what your users see
			</div>

			<ExamplesWrapper id="sign-in" valid={true}>
				{({ variants, styleOption }) => (
					<Suspense>
						<div className='relative'>
							<a
								href={authLink ?? '#'}
								target="_self"
								className={clsx('flex items-center gap-x-4 transition-all no-underline', variants[styleOption])}
							>
								<LogoIcon />
								<span className="text-base leading-normal font-sora font-semibold">Sign In with Worldcoin</span>
							</a>
							{isStaging && (
								<Link
									className="flex justify-center items-center gap-x-1 mt-3.5 absolute -bottom-8 inset-x-0"
									href="https://simulator.worldcoin.org/"
								>
									<span>Scan with Simulator</span>
									<RedirectIcon />
								</Link>
							)}
						</div>
					</Suspense>
				)}
			</ExamplesWrapper>
		</div>
	)
}

const Try = (): JSX.Element => {
	return (
		<div>
			<h1>Try It Out</h1>
			<p className="text-gray-900 font-medium text-base">Want to see World ID in action? Check it out below.</p>

			<SignIn />

			<AnonymousActions />
		</div>
	)
}

export default memo(Try)