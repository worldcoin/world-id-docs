import { Link } from './Link'
import Image from 'next/image'
import cn, { clsx } from 'clsx'
import LogoIcon from './icons/LogoIcon'
import { Button } from '@/components/Button'
import SignInLogoIcon from './icons/SignInLogoIcon'
import GitHubIcon from '@/components/icons/GitHubIcon'
import { AllHTMLAttributes, FC, PropsWithChildren, useCallback, useState } from 'react'

type Props = PropsWithChildren<{ className?: string } & AllHTMLAttributes<HTMLElement>>

// ANCHOR: Apps component
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
		<div className={clsx('relative', props.className)}>
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

// ANCHOR: Card component for the cards on the top
const Card: FC<{ app: typeof apps[0] }> = ({ app }) => {
	return (
		<div className="rounded-lg shadow-card">
			<Link href={app.url ?? '#'} className="flex relative aspect-card">
				<Image className="absolute inset-0 m-0" src={app.image.lg} alt={app.title} fill />
			</Link>

			<div className="flex items-center gap-x-6 px-6 py-7">
				<div className="grow">
					<div className="font-bold text-base leading-4">{app.title}</div>
					<div className="mt-1 text-base text-gray-500 leading-4">{app.subtitle}</div>
				</div>

				<div className="flex gap-x-2">
					{app.githubUrl && (
						<Link
							href={app.githubUrl}
							className="flex items-center justify-center w-9 h-9 bg-gray-900 hover:bg-gray-900/80 transition-colors rounded-full"
						>
							<GitHubIcon className="w-5 h-5 invert" />
						</Link>
					)}

					<div className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200/70 transition-colors rounded-full">
						<SignInLogoIcon className="text-gray-900" />
					</div>
				</div>
			</div>
		</div>
	)
}

// ANCHOR: Tag component for the tags inside app card
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

// ANCHOR: Card component for the list of the apps
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
							<LogoIcon className="text-primary" />
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
							<div className="font-medium text-14 tracking-[-0.01em]">GITHUB</div>
						</Button>
						<Button
							variant="neutral"
							className="items-center h-8 px-4 gap-x-1 no-underline !rounded-lg"
							href={props.url}
						>
							<div className="font-medium text-14 tracking-[-0.01em]">VISIT</div>
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

// ANCHOR: List of the apps data
const apps = [
	{
		url: 'https://human.withlens.app',
		githubUrl: 'https://github.com/worldcoin/world-id-lens',
		image: {
			sm: '/images/apps/lens.svg',
			lg: '/images/apps/lens-lg.svg',
		},
		title: 'Lens',
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
		title: 'POAP',
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

// ANCHOR: tags handling
const tags = apps.reduce((accumulator: Array<string>, example) => {
	if (accumulator.length === 0) {
		return example.tags.sort()
	}

	const tagsToAdd = example.tags.filter(tag => !accumulator.some(existingTag => existingTag === tag))

	return accumulator.concat(tagsToAdd).sort()
}, [])
