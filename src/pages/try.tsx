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
import { CredentialType, IDKitWidget, WidgetProps } from '@worldcoin/idkit'

type Environment = 'staging' | 'production'

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
				className={clsx('flex justify-center py-24 md:py-16 transition-colors', {
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
		signInEnvironment: Environment
		testingEnvironment: Environment
		action: string
		// maxVerifications: 0 | 1 | 2 | 3 FIXME: Enable when dynamic maxVerifications is supported
		credentialTypes: Array<CredentialType>
	}>({
		mode: 'all',
		defaultValues: {
			signInEnvironment: 'production',
			testingEnvironment: 'production',
			action: 'test-action',
			// maxVerifications: 1, FIXME: Enable when dynamic maxVerifications is supported
			credentialTypes: [CredentialType.Orb],
		},
	})

	const signInEnvironment = useWatch({
		control,
		name: 'signInEnvironment',
	})

	const testingEnvironment = useWatch({
		control,
		name: 'testingEnvironment',
	})

	const isTestingWidgetValid = useMemo(
		() => !errors.action && !errors.credentialTypes,
		[errors.action, errors.credentialTypes]
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
		baseUrl.searchParams.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/try-callback`)
		baseUrl.searchParams.append('response_type', 'code')

		baseUrl.searchParams.append(
			'client_id',
			signInEnvironment === 'production'
				? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP!
				: process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP!
		)

		return baseUrl.toString()
	}, [signInEnvironment])

	return (
		<div>
			<h1>Try It Out</h1>
			<p className="text-gray-900 font-medium text-base">Want to see World ID in action? Check it out below.</p>

			<hr className="text-gray-100" />

			<div>
				<Section
					heading="Sign in with Worldcoin"
					description="Try authentication with World ID using the OpenID Connect (OIDC) standard. You can use our integration on the Auth0 Marketplace, easily integrate with existing SSO systems (like Okta, OneLogin, Azure AD, and many others), or roll out your own authentication."
				/>

				<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12">
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

				<div className="flex justify-start items-start">
					<Link
						className="flex items-center gap-x-1 mt-3 leading-none text-gray-300 hover:text-primary transition-colors"
						href="https://simulator.worldcoin.org/"
					>
						<span>Open Simulator</span>
						<RedirectIcon />
					</Link>
				</div>
			</div>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-8 mb-4">
				Step 2 • this is what your users see
			</div>

			<ExamplesWrapper id="sign-in" valid={true}>
				{({ variants, styleOption }) => (
					<Link
						href={authLink ?? '#'}
						className={clsx('flex items-center gap-x-4 transition-all no-underline', variants[styleOption])}
					>
						<LogoIcon />
						<span className="text-base leading-normal font-sora font-semibold">Sign In with Worldcoin</span>
					</Link>
				)}
			</ExamplesWrapper>

			<hr className="text-gray-100" />

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

			<div className="flex justify-start items-start">
				<Link
					className="flex items-center gap-x-1 mt-3 leading-none text-gray-300 hover:text-primary transition-colors"
					href="https://simulator.worldcoin.org/"
				>
					<span>Open Simulator</span>
					<RedirectIcon />
				</Link>
			</div>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12">
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
						defaultValue="test-action"
					/>
				</div>

				{/* FIXME: Coming soon! */}
				{/* <div className="grid gap-y-2">
					<span className="font-medium">Max number of verifications per person</span>

					<div className="grid grid-cols-4 gap-x-3">
						<FormChoiceButton
							type="radio"
							item={{ value: 1, label: '1' }}
							selected={Number(watch('maxVerifications')) === 1}
							register={register('maxVerifications')}
						/>

						<FormChoiceButton
							type="radio"
							item={{ value: 2, label: '2' }}
							selected={Number(watch('maxVerifications')) === 2}
							register={register('maxVerifications')}
						/>

						<FormChoiceButton
							type="radio"
							item={{ value: 3, label: '3' }}
							selected={Number(watch('maxVerifications')) === 3}
							register={register('maxVerifications')}
						/>

						<FormChoiceButton
							type="radio"
							item={{ value: 0, label: `♾️` }}
							selected={Number(watch('maxVerifications')) === 0}
							register={register('maxVerifications')}
						/>
					</div>
				</div> */}

				<div className="grid gap-y-2">
					<span className="font-medium">Accepted credentials</span>

					<div className="grid grid-cols-2 gap-x-3">
						<FormChoiceButton
							type="checkbox"
							item={{ value: CredentialType.Orb, label: 'Orb' }}
							selected={watch('credentialTypes')?.includes(CredentialType.Orb)}
							register={register('credentialTypes', { required: true })}
						/>

						<FormChoiceButton
							type="checkbox"
							item={{ value: CredentialType.Phone, label: 'Phone' }}
							selected={watch('credentialTypes')?.includes(CredentialType.Phone)}
							register={register('credentialTypes', { required: true })}
						/>
					</div>
				</div>
			</div>

			<div className="leading-none text-2xs uppercase text-gray-400 tracking-[-0.01em] mt-12 mb-4">
				Step 3 • this is what your users see
			</div>

			<ExamplesWrapper id="testing" valid={isTestingWidgetValid}>
				{({ theme, styleOption, variants }) => (
					<Suspense>
						<IDKitWidget
							theme={theme}
							onSuccess={console.log}
							action={watch('action') ?? ''}
							credential_types={watch('credentialTypes') ?? []}
							app_id={
								testingEnvironment === 'production'
									? process.env.NEXT_PUBLIC_TRY_IT_OUT_APP!
									: process.env.NEXT_PUBLIC_TRY_IT_OUT_STAGING_APP!
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
		</div>
	)
}

export default memo(Try)
