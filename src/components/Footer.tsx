import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Link } from '@/components/Link'
import GitHubIcon from './icons/GitHubIcon'
import { Button } from '@/components/Button'
import TwitterIcon from './icons/TwitterIcon'
import DiscordIcon from './icons/DiscordIcon'
import { FC, PropsWithChildren, SVGAttributes } from 'react'
import { miniAppsNavigation, worldChainNavigation, worldIdNavigation } from '@/components/Navigation'

export const PageLink: FC<{
	label: string
	page: { href: string; title: string; section: string }
	previous?: boolean
	current: { section: string }
}> = ({ label, page, previous = false, current }) => (
	<>
		<Button
			href={page.href}
			aria-label={`${label}: ${page.title}`}
			variant="text"
			arrow={previous ? 'left' : 'right'}
		>
			{current.section == page.section ? label : page.section}
		</Button>
		<Link
			href={page.href}
			tabIndex={-1}
			aria-hidden="true"
			className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
		>
			{page.title}
		</Link>
	</>
)

function PageNavigation() {
	let router = useRouter()

	const getNavigationGroups = () => {
		if (router.pathname.includes('world-id')) {
			return worldIdNavigation
		} else if (router.pathname.includes('mini-apps')) {
			return miniAppsNavigation
		} else if (router.pathname.includes('world-chain')) {
			return worldChainNavigation
		}
		// Default case or error handling
		return []
	}

	const navigation = getNavigationGroups()

	let allPages = navigation.flatMap(group => group.links.map(link => ({ ...link, section: group.title })))
	let currentPageIndex = allPages.findIndex(page => page.href === router.pathname.replace('/api-docs', '/api'))

	if (currentPageIndex === -1) return null

	let currentPage = allPages[currentPageIndex]
	let nextPage = allPages[currentPageIndex + 1]
	let previousPage = allPages[currentPageIndex - 1]

	if (!previousPage && !nextPage) return null

	return (
		<div className="flex">
			{previousPage && (
				<div className="flex flex-col items-start gap-3">
					<PageLink label="Previous" page={previousPage} current={currentPage} previous />
				</div>
			)}
			{nextPage && (
				<div className="ml-auto flex flex-col items-end gap-3">
					<PageLink label="Next" page={nextPage} current={currentPage} />
				</div>
			)}
		</div>
	)
}

const SocialLink: FC<
	PropsWithChildren<{
		href: string
		icon: FC<SVGAttributes<SVGElement>>
	}>
> = ({ href, icon: Icon, children }) => (
	<Link href={href} className="group">
		<span className="sr-only">{children}</span>
		<Icon className="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500" />
	</Link>
)

const SmallPrint = () => (
	<div className="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 dark:border-white/5 sm:flex-row">
		<p className="text-xs text-zinc-600 dark:text-zinc-400">&copy; {new Date().getFullYear()} World Foundation</p>
		<div className="flex gap-4">
			<SocialLink href="https://twitter.com/worldcoin" icon={TwitterIcon}>
				Follow us on Twitter
			</SocialLink>
			<SocialLink href="https://github.com/worldcoin" icon={GitHubIcon}>
				Follow us on GitHub
			</SocialLink>
			<SocialLink href="https://world.org/discord" icon={DiscordIcon}>
				Join our Discord server
			</SocialLink>
		</div>
	</div>
)

export function Footer() {
	const { pathname } = useRouter()
	const isHome = pathname === '/'

	// for home, rely on parent wrapper; for others, use container
	const innerClasses = isHome ? 'space-y-10' : 'container mx-auto px-4 sm:px-6 lg:px-8 space-y-10'

	return (
		<footer className="w-full pb-16">
			<div className={innerClasses}>
				<PageNavigation />
				<SmallPrint />
			</div>
		</footer>
	)
}
