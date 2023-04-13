import cn from 'clsx'
import Image from 'next/image'
import { Button } from '@/components/Button'
import GitHubIcon from '@/components/icons/GitHubIcon'
import { AllHTMLAttributes, FC, PropsWithChildren, useCallback, useState } from 'react'

type Props = PropsWithChildren<{} & AllHTMLAttributes<HTMLElement>>

export const Apps: FC<Props> = props => {
	const [filter, setFilter] = useState<Array<string>>([])

	const isTagSelected = useCallback(
		(tag: string) => {
			if (filter.length === 0) {
				return false
			}

			if (filter.some(filterTag => filterTag === tag)) {
				return true
			}

			return false
		},
		[filter]
	)

	const toggleFilter = useCallback(
		(tag: string) => {
			if (filter.length === 0) {
				return setFilter([tag])
			}

			if (isTagSelected(tag)) {
				return setFilter(filter.filter(filterTag => filterTag !== tag))
			}

			setFilter([...filter, tag])
		},
		[filter, isTagSelected]
	)

	return (
		<div className="relative">
			<Image
				className="absolute top-[-220px] right-[-180px] m-0"
				src="/images/docs/apps/illustration.svg"
				alt=""
				width={468}
				height={474}
			/>

			{/* TODO: Will be added later */}
			{/* <Button className="px-6 py-4.5 !font-bold leading-3 uppercase rounded-xl">
        Add your app
      </Button> */}
			<div className="pt-4" />

			<div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card app={apps[0]} />
				<Card app={apps[1]} />
			</div>

			<div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 mt-10 mb-10">
				<Tag selected={filter.length === 0} onClick={() => setFilter([])}>
					All Apps
				</Tag>

				{tags.map((tag, id) => (
					<Tag key={id} selected={isTagSelected(tag)} onClick={() => toggleFilter(tag)}>
						{tag}
					</Tag>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{apps.map((example, id) => {
					if (filter.length === 0 || example.tags.some(tag => isTagSelected(tag))) {
						return (
							<Item
								key={id}
								image={example.image}
								title={example.title}
								subtitle={example.subtitle}
								url={example.url}
								githubUrl={example.githubUrl}
								description={example.description}
								tags={example.tags}
								bookmark={example.bookmark}
								worldcoin={example.worldcoin}
								onToggleFilter={toggleFilter}
							/>
						)
					}
					return null
				})}
			</div>
		</div>
	)
}

const Card = (props: { app: (typeof apps)[0] }) => {
	return (
		<div className="rounded-lg shadow-card">
			<div className="relative aspect-card">
				<Image className="absolute inset-0 m-0" src={props.app.image.lg} alt={props.app.title} layout="fill" />
			</div>
			<div className="flex items-center gap-x-6 px-6 py-7">
				<div className="grow">
					<div className="font-bold text-base leading-4">{props.app.title}</div>
					<div className="mt-1 text-base text-gray-500 leading-4">{props.app.subtitle}</div>
				</div>
				<div className="flex gap-x-2">
					<div className="flex items-center justify-center w-9 h-9 bg-gray-900 rounded-full">
						<GitHubIcon className="w-5 h-5 invert" />
					</div>
					<div className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full">
						<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_20199_55312)">
								<path
									d="M12.562 8.41602L10.5163 10.4616C10.1356 10.8422 9.51521 10.8422 9.13457 10.4616L7.08887 8.41769"
									stroke="#191C20"
									strokeWidth="1.30608"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M9.82471 12.6457V11.6078C9.82471 11.3178 9.94041 11.0394 10.145 10.8349L12.5445 8.43555"
									stroke="#191C20"
									strokeWidth="1.30608"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M9.80914 12.6415V11.6036C9.80914 11.3136 9.69344 11.0352 9.48887 10.8307L7.08936 8.42969"
									stroke="#191C20"
									strokeWidth="1.30608"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M9.82653 8.51811C10.4766 8.51811 11.0037 7.99114 11.0037 7.34109C11.0037 6.69104 10.4766 6.16406 9.82653 6.16406C9.17643 6.16406 8.64941 6.69104 8.64941 7.34109C8.64941 7.99114 9.17643 8.51811 9.82653 8.51811Z"
									fill="#191C20"
								/>
							</g>
							<path
								d="M6.98565 3.32617H5.56595C4.31143 3.32617 3.29443 4.3431 3.29443 5.59754V7.01714M12.6644 16.3865H14.0841C15.3387 16.3865 16.3557 15.3696 16.3557 14.1151V12.6955M16.3557 7.01714V5.59754C16.3557 4.3431 15.3387 3.32617 14.0841 3.32617L12.6644 3.32617M3.29443 12.6955L3.29443 14.1151C3.29443 15.3696 4.31143 16.3865 5.56595 16.3865H6.98565"
								stroke="#191C20"
								strokeWidth="1.30608"
								strokeLinecap="round"
							/>
							<defs>
								<clipPath id="clip0_20199_55312">
									<rect
										width="6.81455"
										height="7.14934"
										fill="white"
										transform="translate(6.41699 6.16406)"
									/>
								</clipPath>
							</defs>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

const Tag = (props: { selected: boolean; onClick: () => void; children: string }) => {
	return (
		<button
			className={cn('px-4 py-2 font-medium text-base leading-5 border rounded-lg', {
				'border-gray-100 hover:bg-gray-100/60': !props.selected,
				'text-white bg-gray-900 border-transparent hover:bg-zinc-700': props.selected,
			})}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}

const Item = (props: {
	image: {
		sm: string
		lg: string
	}
	title: string
	subtitle: string
	description: string
	tags: string[]
	url: string
	githubUrl: string
	bookmark?: boolean
	worldcoin?: boolean
	onToggleFilter: (tag: string) => void
}) => {
	return (
		<div className="relative p-6 border border-gray-100 rounded-lg">
			{props.bookmark && (
				<div className="absolute top-0 right-[50px]">
					<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 0H12V14.0557C12 14.9591 11.0592 15.5546 10.2426 15.1681L6.70526 13.4936C6.25883 13.2823 5.74117 13.2823 5.29474 13.4936L1.75736 15.1681C0.940837 15.5546 0 14.9591 0 14.0557V0Z"
							fill="#4940E0"
						/>
					</svg>
				</div>
			)}
			<div className="flex gap-x-4">
				<div className="relative h-[80px] w-[80px]">
					<Image className="m-0" src={props.image.sm} alt={props.title} layout="fill" objectFit="cover" />
				</div>
				<div className="relative grow flex flex-col">
					{props.worldcoin && (
						<div className="absolute top-0 right-0">
							<svg
								className="block"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M14.0589 9.46189C14.1185 9.53243 14.2016 9.5779 14.2923 9.58943C14.3829 9.60096 14.4746 9.57774 14.5493 9.52429C15.244 9.02507 16.4291 8.19305 17.7164 7.37142C18.6716 8.46561 19.2991 9.81539 19.5247 11.2611C20.5361 9.7843 23.3967 5.97778 20.9345 4.07452C18.83 2.48327 14.4165 7.23622 13.9772 9.12908C13.9629 9.18712 13.9629 9.24785 13.9771 9.3059C13.9914 9.36395 14.0195 9.41753 14.0589 9.46189Z"
									fill="#4940E0"
								/>
								<path
									d="M15.7753 11.9893C15.7091 12.0237 15.6543 12.0773 15.6179 12.1432C15.5814 12.2092 15.5649 12.2846 15.5703 12.3601C15.5758 12.4356 15.603 12.5078 15.6485 12.5676C15.694 12.6274 15.7559 12.6723 15.8263 12.6965C16.6437 12.9461 18.0229 13.3725 19.4531 13.8821C19.2092 15.3282 18.56 16.6718 17.5836 17.751C19.351 17.6262 24.0607 17.5326 23.9994 14.3917C23.9075 11.7292 17.512 11.1676 15.7753 11.9893Z"
									fill="#4940E0"
								/>
								<path
									d="M14.6923 15.2133C14.6397 15.1875 14.5821 15.1741 14.5237 15.1741C14.4654 15.1741 14.4078 15.1875 14.3552 15.2133C14.2738 15.2577 14.2113 15.3309 14.1793 15.419C14.1473 15.5072 14.1481 15.6042 14.1815 15.6917C14.5084 16.4926 15.0397 17.8654 15.5301 19.3214C13.3948 20.4967 11.4027 20.2367 11.4027 20.2367C12.5878 21.5679 15.5914 25.26 17.9718 23.2632C19.9537 21.5263 16.4087 16.0765 14.6923 15.2133Z"
									fill="#4940E0"
								/>
								<path
									d="M11.5457 16.347C11.5334 16.2892 11.5074 16.2353 11.4701 16.19C11.4327 16.1446 11.385 16.1093 11.3312 16.087C11.2466 16.0497 11.1514 16.0462 11.0644 16.077C10.9773 16.1078 10.9049 16.1708 10.8612 16.2534C10.4424 17.0022 9.72722 18.271 8.90991 19.5815C7.58179 19.0137 6.44301 18.0675 5.63047 16.8566C5.34442 18.6351 4.38408 23.3256 7.3979 23.9704C9.97241 24.48 11.9442 18.2606 11.5457 16.347Z"
									fill="#4940E0"
								/>
								<path
									d="M8.71578 14.558C8.75025 14.511 8.77369 14.4566 8.78431 14.3989C8.79494 14.3412 8.79246 14.2818 8.77707 14.2252C8.75511 14.1332 8.69968 14.053 8.62195 14.0009C8.54421 13.9488 8.44997 13.9286 8.3582 13.9444C7.52046 14.0796 6.10039 14.298 4.58838 14.4644C4.20148 13.0536 4.2192 11.5596 4.63946 10.1587C3.09679 11.0323 -1.11234 13.1852 0.277086 15.9933C1.48261 18.3542 7.50003 16.0661 8.71578 14.558Z"
									fill="#4940E0"
								/>
								<path
									d="M8.32754 11.178C8.38581 11.1793 8.4435 11.1658 8.49528 11.1385C8.54705 11.1113 8.59125 11.0712 8.62381 11.022C8.68107 10.9492 8.70875 10.8569 8.70115 10.764C8.69355 10.6712 8.65124 10.5848 8.58295 10.5227C7.94953 9.94031 6.89725 8.94188 5.83475 7.83945C6.67539 6.64993 7.83538 5.73267 9.1755 5.19777C7.54088 4.52175 3.26024 2.50408 1.96277 5.35377C0.900268 7.78745 6.41709 11.1468 8.32754 11.178Z"
									fill="#4940E0"
								/>
								<path
									d="M10.9838 8.91066C11.0772 8.9084 11.1665 8.87102 11.2344 8.80572C11.3023 8.74042 11.344 8.65184 11.3516 8.55705C11.4027 7.70422 11.515 6.23777 11.6989 4.70893C13.1348 4.63577 14.5608 4.98607 15.8059 5.71776C15.3155 3.9913 14.2019 -0.668045 11.2086 0.0807789C8.67491 0.7464 9.51265 7.22581 10.6875 8.77545C10.7217 8.82156 10.7668 8.85812 10.8186 8.88176C10.8704 8.90539 10.9272 8.91533 10.9838 8.91066Z"
									fill="#4940E0"
								/>
							</svg>
						</div>
					)}
					<div className="flex flex-col gap-y-1.5">
						<div className="font-bold text-base leading-4">{props.title}</div>
						<div className="text-14 text-gray-500 leading-3">{props.subtitle}</div>
					</div>
					<div className="grow flex items-end gap-x-2">
						<Button
							variant="primary"
							className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg"
							href={props.githubUrl}
						>
							<GitHubIcon className="w-4 h-4 invert" />
							<div className="font-medium text-14 leading-[1px]">GITHUB</div>
						</Button>
						<Button
							variant="neutral"
							className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg"
							href={props.url}
						>
							<div className="font-medium text-14 leading-[1px]">VISIT</div>
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M4.37068 2.57227L9.05067 2.57227C9.37376 2.57227 9.63567 2.83418 9.63567 3.15727L9.63568 7.83726C9.63568 8.16035 9.37377 8.42226 9.05068 8.42226C8.72759 8.42226 8.46568 8.16035 8.46568 7.83726L8.46568 4.56958L2.71295 10.1127C2.48449 10.3412 2.11409 10.3412 1.88564 10.1127C1.65718 9.88429 1.65718 9.51389 1.88564 9.28543L7.63836 3.74227L4.37068 3.74227C4.04759 3.74227 3.78568 3.48035 3.78568 3.15727C3.78568 2.83418 4.04759 2.57227 4.37068 2.57227Z"
									fill="#191C20"
								/>
							</svg>
						</Button>
					</div>
				</div>
			</div>
			<div className="mt-4 text-14 text-gray-500 leading-5 line-clamp-2">{props.description}</div>
			<div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-14 text-primary leading-5 cursor-pointer">
				{props.tags.map((tag, i) => (
					<div key={i} onClick={() => props.onToggleFilter(tag)}>
						{tag}
					</div>
				))}
			</div>
		</div>
	)
}

const apps = [
	{
		url: 'https://human.withlens.app',
		githubUrl: 'https://github.com/worldcoin/world-id-lens',
		image: {
			sm: '/images/apps/lens.svg',
			lg: '/images/apps/lens-lg.svg',
		},
		title: 'Lens x Worldcoin',
		subtitle: 'human.withlens.app',
		description:
			'The decentralized social network. Verify a Lens profile belongs to real person. No bots, reduce spam.',
		tags: ['On-chain', 'Integration', 'Social'],
		bookmark: false,
	},

	{
		url: 'https://discordbouncer.com',
		githubUrl: 'https://github.com/worldcoin/discord-bouncer',
		image: {
			sm: '/images/apps/discord.svg',
			lg: '/images/apps/discord-lg.svg',
		},
		title: 'Discord Bouncer',
		subtitle: 'discordbouncer.com',
		description: 'Prevent spam and increase the quality of the community by verifying humans.',
		tags: ['App', 'Integration', 'API'],
	},

	{
		url: 'https://poap.worldcoin.org',
		githubUrl: 'https://github.com/worldcoin/world-id-poap',
		image: {
			sm: '/images/apps/poap.svg',
			lg: '',
		},
		title: 'POAP x Worldcoin',
		subtitle: 'poap.worldcoin.org',
		description: 'The bookmarks of your life. Issue POAPs to humans only. One person, one POAP.',
		tags: ['On-Chain', 'Integration'],
	},

	{
		url: 'https://petorbz.com',
		githubUrl: 'https://github.com/worldcoin/world-id-petorbz',
		image: {
			sm: '/images/apps/petorbz.svg',
			lg: '',
		},
		title: 'Pet Orbz',
		subtitle: 'petorbz.com',
		description: 'Claim a single #petorbz NFT once. Only one NFT per person, verified on-chain.',
		tags: ['On-chain', 'App'],
	},

	{
		url: 'https://worldcoin.org',
		githubUrl: 'https://github.com/worldcoin/world-id-example-airdrop',
		image: {
			sm: '/images/apps/hyperdrop.svg',
			lg: '',
		},
		title: 'Worldcoin Airdrop',
		subtitle: 'worldcoin.org',
		description:
			'The first token to be globally and freely distributed to people, just for being a unique individual.',
		tags: ['On-chain', 'App'],
		worldcoin: false,
	},
]

const tags = apps.reduce((accumulator: Array<string>, example) => {
	if (accumulator.length === 0) {
		return example.tags.sort()
	}

	const tagsToAdd = example.tags.filter(tag => !accumulator.some(existingTag => existingTag === tag))

	return accumulator.concat(tagsToAdd).sort()
}, [])
