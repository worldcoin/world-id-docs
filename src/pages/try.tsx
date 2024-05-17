import clsx from 'clsx'
import { Link } from '@/components/Link'
import SunIcon from '@/components/icons/SunIcon'
import MoonIcon from '@/components/icons/MoonIcon'
import LogoIcon from '@/components/icons/LogoIcon'
import ChartIcon from '@/components/icons/CharIcon'
import CheckIcon from '@/components/icons/CheckIcon'
import RocketIcon from '@/components/icons/RocketIcon'
import RedirectIcon from '@/components/icons/RedirectIcon'
import { memo, ReactNode, Suspense, useMemo, useState } from 'react'
import { useForm, UseFormRegisterReturn, useWatch } from 'react-hook-form'
import { VerificationLevel, IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import Tabs, { TabItem } from '@/components/Tabs'

type Environment = 'staging' | 'production'

enum SignInScopes {
	OpenID = 'openid',
	Profile = 'profile',
	Email = 'email',
}

// ANCHOR: Create action in dev portal
async function createAction(action: string, isStaging: boolean) {
    await fetch('/api/action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action,
            is_staging: isStaging,
        }),
    })
}

// ANCHOR: Staging/Promotion button
const EnvButton = ({
	selected,
	register,
	icon,
	title,
	description,
	value,
}: {
	selected?: boolean
	register: UseFormRegisterReturn
	icon: ReactNode
	title: string
	description: string
	value: string
}): JSX.Element => {
	return (
		<label
			className={clsx(
				'grid grid-cols-auto/1fr/auto items-center gap-x-4 p-4 border border-[#F0EDF9] rounded-xl transition-colors cursor-pointer hover:bg-gray-100/50',
				{ 'bg-gray-100': selected }
			)}
		>
			<input type="radio" value={value} {...register} className="hidden" />

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
				<span className="self-start text-sm leading-none">{description}</span>
			</div>

			<CheckIcon
				className={clsx('text-accents-info-700 col-start-3 transition-opacity', { 'opacity-0': !selected })}
			/>
		</label>
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
		variants: Record<string, boolean | undefined>[] | string[]
		styleOption: number
	}) => ReactNode
}): JSX.Element => {
	const [selected, setSelected] = useState(0)
	const [theme, setTheme] = useState<"dark" | "light">('light')

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
				className={clsx('flex justify-center py-24 md:py-16 transition-colors', {
					'opacity-50 pointer-events-none select-none cursor-not-allowed': !valid,
				})}
			>
				{children({ styleOption: selected, variants })}
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

// ANCHOR: MaxVerificationsButton component
const FormChoiceButton = ({
	item,
	selected,
	register,
	type,
}: {
	item: { value: number | string; label: string }
	selected: boolean
	register: UseFormRegisterReturn
	type: 'radio' | 'checkbox'
}): JSX.Element => (
	<label
		className={clsx(
			'flex justify-center relative border items-center w-full py-4 rounded-xl cursor-pointer transition-colors',
			{
				'bg-gray-100 border-transparent hover:bg-gray-100/70': selected,
				'border-[#F0EDF9] hover:bg-gray-100/40': !selected,
			}
		)}
	>
		<input type={type} value={item.value} className="hidden" {...register} />
		<span className="saturate-0 select-none leading-none">{item.label}</span>
		{selected && <CheckIcon className="absolute right-3 top-[calc(50%-10px)] text-accents-info-700" />}
	</label>
)

// ANCHOR: Try it out page component
const Try = (): JSX.Element => {
	const {
		register,
		watch,
		formState: { errors },
		control,
	} = useForm<{
		signInScopes: SignInScopes[]
		signInEnvironment: Environment
		testingEnvironment: Environment
		action: string
		verification_level: VerificationLevel
	}>({
		mode: 'all',
		defaultValues: {
			signInScopes: [],
			signInEnvironment: 'production',
			testingEnvironment: 'production',
			action: ("test-action-" + Math.random().toString(36).substring(2, 7)),
			verification_level: VerificationLevel.Orb,
		},
	})

	const signInEnvironment = useWatch({
		control,
		name: 'signInEnvironment',
	})

	const signInScopes = useWatch({
		control,
		name: 'signInScopes',
	})

	const testingEnvironment = useWatch({
		control,
		name: 'testingEnvironment',
	})

	const isTestingWidgetValid = useMemo(
		() => !errors.action && !errors.verification_level,
		[errors.action, errors.verification_level]
	)

	const authLink = useMemo(() => {
		if (
			!process.env.NEXT_PUBLIC_TRY_IT_OUT_APP ||
			!process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP ||
			!process.env.NEXT_PUBLIC_SIGN_IN_WITH_WORLDCOIN_ENDPOINT
		) {
			return null
		}

		const baseUrl = new URL(`${process.env.NEXT_PUBLIC_SIGN_IN_WITH_WORLDCOIN_ENDPOINT}/authorize`)
		baseUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`)
		baseUrl.searchParams.append('response_type', 'code')
		baseUrl.searchParams.append('scope', ['openid', ...signInScopes].join(' '))
		baseUrl.searchParams.append('state', signInEnvironment)
		baseUrl.searchParams.append('nonce', Math.random().toString(36).substring(2, 15))

		baseUrl.searchParams.append(
			'client_id',
			signInEnvironment === 'production'
				? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP!
				: process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP!
		)

		return baseUrl.toString()
	}, [signInEnvironment, signInScopes])

	async function handleVerify(result: ISuccessResult) {
		console.log("Result from IDKit: ", result)

		const res = await fetch('/api/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...result,
				action: watch("action"),
				env: watch("testingEnvironment"),
			}),
		})

		const data = await res.json()

		if (res.status == 200) {
			console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
		} else {
			throw new Error(`Error code ${res.status} (${data.code}): ${data.detail}` ?? "Unknown error."); // Throw an error if verification fails
		}
	}

	return (
		<div>
			<h1>Try It Out</h1>
			<p className="text-gray-900 font-medium text-base">Want to see World ID in action? Check it out below.</p>

			<Tabs>
				{/* @ts-ignore */}
				<TabItem label="Incognito Actions">
					<div className="mt-4 text-sm text-gray-600">Here you can test out various Incognito Actions configurations, including ones that will fail (such as a device-verified user attemping an action requiring Orb verification).</div>

					<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8">
						Step 1 • Choose Staging or Production
					</div>

					<div className="grid md:grid-cols-2 gap-y-4 gap-x-6 mt-4">
						<EnvButton
							title="Staging"
							description="Use the simulator"
							value="staging"
							selected={watch('testingEnvironment') === 'staging'}
							register={register('testingEnvironment')}
							icon={<RocketIcon />}
						/>

						<EnvButton
							title="Production"
							description="Use the World App"
							value="production"
							selected={watch('testingEnvironment') === 'production'}
							register={register('testingEnvironment')}
							icon={<ChartIcon />}
						/>
					</div>

					<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8">
						Step 2 • configure action
					</div>

					<div className="grid lg:grid-cols-2 gap-8">
						<div className="grid gap-y-2">
							<span className="font-medium">Action</span>

							<input
								type="text"
								{...register('action', { required: true })}
								className="border border-gray-200 rounded-xl p-3 placeholder:text-gray-400"
								placeholder="Change this to simulate different actions"
							/>
						</div>
						<div className="grid gap-y-2">
							<span className="font-medium">Minimum Verification Level</span>

							<div className="grid grid-cols-2 gap-x-3">
								<FormChoiceButton
									type="radio"
									item={{ value: VerificationLevel.Orb, label: 'Orb' }}
									selected={watch('verification_level')?.includes(VerificationLevel.Orb)}
									register={register('verification_level', { required: true })}
								/>

								<FormChoiceButton
									type="radio"
									item={{ value: VerificationLevel.Device, label: 'Device' }}
									selected={watch('verification_level')?.includes(VerificationLevel.Device)}
									register={register('verification_level', { required: true })}
								/>
							</div>
						</div>
					</div>

					<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8 mb-4">
						Step 3 • this is what your users see
					</div>

					<ExamplesWrapper id="testing" valid={isTestingWidgetValid}>
						{({ styleOption, variants }) => (
							<Suspense>
								<IDKitWidget
									onSuccess={console.log}
									handleVerify={handleVerify}
									action={watch('action') ?? 'test-action'}
									verification_level={watch('verification_level')}
									app_id={
										testingEnvironment === 'production'
											? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP! as `app_${string}`
											: process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP! as `app_${string}`
									}
									autoClose={false}
								>
									{({ open }) => (
										<div className="relative">
											<button
												onClick={() => {
                                                    // Create action in dev portal when opening IDKit, so precheck succeeds on mobile
                                                    createAction(watch('action'), watch('testingEnvironment') === 'staging')
                                                    open()
                                                }}
												className={clsx(
													'flex items-center gap-x-4 transition-all',
													variants[styleOption]
												)}
												disabled={!isTestingWidgetValid}
											>
												<LogoIcon />
												<span className="text-base leading-normal font-sora font-semibold">
													Continue with Worldcoin
												</span>
											</button>

											{watch('testingEnvironment') && watch('testingEnvironment') === 'staging' && (
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
				</TabItem>
				{/* @ts-ignore */}
				<TabItem label="Sign in with World ID">
					<div>
						<div className='mt-4 text-sm text-gray-600'>Try authentication with World ID using the OpenID Connect (OIDC) standard. You can use our integration on the Auth0 Marketplace, easily integrate with existing SSO systems (like Okta, OneLogin, Azure AD, and many others), or roll out your own authentication.</div>

						<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8">
							Step 1 • action configuration
						</div>

						<div className="grid md:grid-cols-2 gap-y-4 gap-x-6 mt-4">
							<EnvButton
								title="Staging"
								description="Use the simulator"
								value="staging"
								selected={watch('signInEnvironment') === 'staging'}
								register={register('signInEnvironment')}
								icon={<RocketIcon />}
							/>

							<EnvButton
								title="Production"
								description="Use the World App"
								value="production"
								selected={watch('signInEnvironment') === 'production'}
								register={register('signInEnvironment')}
								icon={<ChartIcon />}
							/>
						</div>

						<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8">
							Step 2 • optional scopes (compatibility)
						</div>

						<div className="grid grid-cols-2 gap-x-3 mt-4">
							<FormChoiceButton
								type="checkbox"
								item={{ value: SignInScopes.Profile, label: 'Profile' }}
								selected={watch('signInScopes')?.includes(SignInScopes.Profile)}
								register={register('signInScopes', { required: true })}
							/>

							<FormChoiceButton
								type="checkbox"
								item={{ value: SignInScopes.Email, label: 'Email' }}
								selected={watch('signInScopes')?.includes(SignInScopes.Email)}
								register={register('signInScopes', { required: true })}
							/>
						</div>
					</div>

					<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8 mb-4">
						Step 3 • this is what your users see
					</div>

					<ExamplesWrapper id="sign-in" valid={true}>
						{({ variants, styleOption }) => (
							<div className='relative'>
								<Link
									href={authLink ?? '#'}
									className={clsx('flex items-center gap-x-4 transition-all no-underline', variants[styleOption])}
								>
									<LogoIcon />
									<span className="text-base leading-normal font-sora font-semibold">Sign in with World ID</span>
								</Link>
								{watch('signInEnvironment') && watch('signInEnvironment') === 'staging' && (
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
					</ExamplesWrapper>
				</TabItem>
			</Tabs>


		</div>
	)
}

export default memo(Try)

export async function getStaticProps() {
	return {
		props: {
			title: 'Try Out World ID',
		},
	}
}

