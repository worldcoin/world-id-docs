import { Link } from './Link'
import Image from 'next/image'
import cn, { clsx } from 'clsx'
import LogoIcon from '@/components/icons/LogoIcon'
import { Button } from '@/components/Button'
import SignInLogoIcon from './icons/SignInLogoIcon'
import GitHubIcon from '@/components/icons/GitHubIcon'
import { AllHTMLAttributes, FC, PropsWithChildren, useCallback, useState } from 'react'
import appList from '../pages/apps/appList.json'
import ArrowIcon from './icons/ArrowIcon'

type Props = PropsWithChildren<{ className?: string } & AllHTMLAttributes<HTMLElement>>

const sortedApps = appList.apps.sort((a, b) => a.title.localeCompare(b.title))

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

	const bookmarkedApps: Array<AppConfig> = sortedApps.filter(app => app.bookmark)
	console.log(bookmarkedApps)
	console.log(sortedApps)

	return (
		<div className={clsx('relative', props.className)}>
			<Image
				className="absolute top-[-220px] right-[-180px] m-0"
				src="/images/docs/apps/illustration.svg"
				alt=""
				width={468}
				height={474}
			/>

			{/* TODO: update with actual link */}
			<Link href='https://typeform.com'>
				<Button className="px-6 py-4.5 !font-bold leading-3 uppercase rounded-xl">
					Add your app
				</Button>
			</Link>
			<div className="pt-4" />

			{(bookmarkedApps.length > 0) && <div>
				<h1 className="text-xl font-bold text-zinc-900 dark:text-white mt-5"> Highlights </h1>

				<div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
					{bookmarkedApps.map((app, id) => {
						return (
							<Card
								key={id}
								app={app as AppConfig}
							/>
						)
					})}
				</div>
			</div>}

			<hr className="my-10" />
			<h1 className="text-xl font-bold text-zinc-900 dark:text-white mt-5"> All Integrations </h1>

			<div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 mt-5 mb-10">
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
				{sortedApps.map((example, id) => {
					if ((filter.length === 0 || example.tags.some(tag => isTagSelected(tag)))) {
						return (
							<Item
								key={id}
								slug={example.slug}
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
export const Card: FC<{ app: AppConfig }> = ({ app }) => {
	return (
		<div className="rounded-lg shadow-card hover:cursor-pointer hover:scale-105 transition-all" onClick={() => location.href = `/apps/${app.slug}`}>
			<div className="flex relative aspect-card">
				<Image className="absolute inset-0 m-0" src={app.image.lg!} alt={app.title} fill />
			</div>

			<div className="flex items-center gap-x-6 px-6 py-7">
				<div className="flex flex-col grow">
					<div className="font-bold text-base leading-4 text-gray-700">{app.title}</div>
					<div className="mt-1 text-base text-gray-500 leading-4">{app.subtitle}</div>
				</div>

				<div className="flex gap-x-2">
					{/* {app.githubUrl && (
						<Link
							href={app.githubUrl}
							className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200/70 transition-colors rounded-full"
						>
							<GitHubIcon className="w-5 h-5" />
						</Link>
					)} */}
					<div
						// href={`/apps/${app.slug}`}
						className="flex items-center justify-center w-9 h-9 bg-gray-900 hover:bg-gray-900/80 transition-colors rounded-full"
					>
						<ArrowIcon className="text-gray-100 h-" />
					</div>
				</div>
			</div>
		</div>
	)
}

// ANCHOR: Tag component for the tags inside app card
export const Tag = (props: { selected: boolean; onClick: () => void; children: string }) => {
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
export const Item = (props: {
	slug: string
	image: {
		sm: string
		lg?: string
	}
	title: string
	subtitle: string
	description: string
	tags: string[]
	url: string
	githubUrl?: string
	bookmark?: boolean
	worldcoin?: boolean
	onToggleFilter: (tag: string) => void
}) => {

	return (
		<div className="relative px-6 pt-6 pb-4 border border-gray-200 rounded-lg hover:cursor-pointer hover:scale-105 transition-all" onClick={() => location.href = `/apps/${props.slug}`}>
			{/* {props.bookmark && (
				<div className="absolute top-0left-[15px]">
					<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 0H12V14.0557C12 14.9591 11.0592 15.5546 10.2426 15.1681L6.70526 13.4936C6.25883 13.2823 5.74117 13.2823 5.29474 13.4936L1.75736 15.1681C0.940837 15.5546 0 14.9591 0 14.0557V0Z"
							fill="#4940E0"
						/>
					</svg>
				</div>
			)} */}
			<div className="flex flex-row gap-x-4">
				<div className="relative shrink-0 !h-[80px] !w-[80px]">
					<Image className="m-0" src={props.image.sm} alt={props.title} fill objectFit='cover' />
				</div>
				<div className="flex flex-col items-start w-full">
					<div className="relative align-top items-start justify-between w-full flex flex-row">
						<div className="font-bold text-base text-gray-700 shrink">{props.title}</div>
						{props.worldcoin && (
							<div className="hover:visible shrink" title="Official Integration">
								<LogoIcon className="text-primary" />
							</div>
						)}
					</div>
					<div className="text-sm text-gray-500 leading-4 line-clamp-3 max-w-sm">{props.description}</div>
				</div>
			</div>
			{/* <div className="mt-4 text-14 text-gray-500 leading-5 line-clamp-2">{props.description}</div> */}
			<div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-14 text-primary leading-5 cursor-pointer">
				{props.tags.map((tag, i) => (
					<div key={i}>
						{/* <div key={i} onClick={() => props.onToggleFilter(tag)}> */}
						{tag}
					</div>
				))}
			</div>
		</div>
	)
}

// ANCHOR: tags handling
const tags = sortedApps.reduce((accumulator: Array<string>, example) => {
	if (accumulator.length === 0) {
		return example.tags.sort()
	}

	const tagsToAdd = example.tags.filter(tag => !accumulator.some(existingTag => existingTag === tag))

	return accumulator.concat(tagsToAdd).sort()
}, [])

export type AppConfig = {
	slug: string
	url: string
	githubUrl?: string
	image: {
		sm: string
		lg?: string
	}
	title: string
	subtitle: string
	description: string
	tags: string[]
	body?: string
	bookmark?: boolean
	worldcoin?: boolean
}
