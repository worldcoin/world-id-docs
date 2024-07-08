import clsx from 'clsx'
import { Tag } from '@/components/Tag'
import { useRouter } from 'next/router'
import { remToPx } from '@/lib/remToPx'
import { Link } from '@/components/Link'
import { Button } from '@/components/Button'
import { FC, PropsWithChildren, useRef } from 'react'
import { useSectionStore } from '@/components/SectionProvider'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'

const useInitialValue = <T,>(value: T, condition = true): T => {
	let initialValue = useRef<T>(value).current
	return condition ? initialValue : value
}

const NavLink: FC<
	PropsWithChildren<{
		href: string
		tag?: 'get' | 'post' | 'put' | 'delete'
		active?: boolean
		isAnchorLink?: boolean
	}>
> = ({ href, tag, active, isAnchorLink = false, children }) => {
	return (
		<Link
			href={href}
			aria-current={active ? 'page' : undefined}
			className={clsx(
				'flex justify-between gap-2 py-1 pr-3 text-sm transition',
				isAnchorLink ? 'pl-7' : 'pl-4',
				active
					? 'text-zinc-900 dark:text-white font-medium'
					: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
			)}
		>
			<span className="truncate">{children}</span>
			{tag && (
				<Tag variant="medium" color="zinc">
					{tag}
				</Tag>
			)}
		</Link>
	)
}

const VisibleSectionHighlight: FC<{
	group: { title: string; links: { href: string }[] }
	pathname: string
}> = ({ group, pathname }) => {
	let [sections, visibleSections] = useInitialValue(
		[useSectionStore(s => s.sections), useSectionStore(s => s.visibleSections)],
		useIsInsideMobileNavigation()
	)

	let isPresent = useIsPresent()
	let firstVisibleSectionIndex = Math.max(
		0,
		[{ id: '_top' }, ...sections].findIndex(section => section.id === visibleSections[0])
	)
	let itemHeight = remToPx(2)
	let height = isPresent ? Math.max(1, visibleSections.length) * itemHeight : itemHeight
	let top = group.links.findIndex(link => link.href === pathname) * itemHeight + firstVisibleSectionIndex * itemHeight

	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			className="bg-zinc-800/2.5 dark:bg-white/2.5 absolute inset-x-0 top-0 will-change-transform"
			style={{ borderRadius: 8, height, top }}
		/>
	)
}

const ActivePageMarker: FC<{
	pathname: string
	group: { title: string; links: { href: string }[] }
}> = ({ group, pathname }) => {
	let itemHeight = remToPx(2)
	let offset = remToPx(0.25)
	let activePageIndex = group.links.findIndex(link => link.href === pathname)
	let top = offset + activePageIndex * itemHeight

	return (
		<motion.div
			layout
			className="absolute left-2 h-6 w-px bg-primary"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	)
}

const NavigationGroup: FC<{
	group: { title: string; links: { href: string; title: string }[] }
	className?: string
}> = ({ group, className }) => {
	// If this is the mobile navigation then we always render the initial
	// state, so that the state does not change during the close animation.
	// The state will still update when we re-open (re-render) the navigation.
	let isInsideMobileNavigation = useIsInsideMobileNavigation()
	let [router, sections] = useInitialValue([useRouter(), useSectionStore(s => s.sections)], isInsideMobileNavigation)
	const pathname = router.pathname.replace('/api-docs', '/api')

	let isActiveGroup = group.links.findIndex(link => link.href === pathname) !== -1

	return (
		<li className={clsx('relative mt-6', className)}>
			<motion.h2 layout="position" className="text-zinc-900 dark:text-white text-xs font-semibold">
				{group.title}
			</motion.h2>
			<div className="relative mt-3 pl-2">
				<AnimatePresence initial={!isInsideMobileNavigation}>
					{isActiveGroup && <VisibleSectionHighlight group={group} pathname={pathname} />}
				</AnimatePresence>
				<motion.div layout className="bg-zinc-900/10 dark:bg-white/5 absolute inset-y-0 left-2 w-px" />
				<AnimatePresence initial={false}>
					{isActiveGroup && <ActivePageMarker group={group} pathname={pathname} />}
				</AnimatePresence>
				<ul role="list" className="border-transparent border-l">
					{group.links.map(link => (
						<motion.li key={link.href} layout="position" className="relative">
							<NavLink href={link.href} active={link.href === pathname}>
								{link.title}
							</NavLink>
							<AnimatePresence mode="popLayout" initial={false}>
								{link.href === pathname && sections.length > 0 && (
									<motion.ul
										role="list"
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { delay: 0.1 },
										}}
										exit={{
											opacity: 0,
											transition: { duration: 0.15 },
										}}
									>
										{sections.map(section => (
											<li key={section.id}>
												<NavLink
													href={`${link.href}#${section.id}`}
													tag={section.tag}
													isAnchorLink
												>
													{section.title}
												</NavLink>
											</li>
										))}
									</motion.ul>
								)}
							</AnimatePresence>
						</motion.li>
					))}
				</ul>
			</div>
		</li>
	)
}

export const worldIdNavigation = [
	{
		title: 'Introduction',
		links: [
			{ title: 'What is World ID?', href: '/world-id' },
			{ title: 'Core Concepts', href: '/world-id/concepts' },
			{ title: 'Try it Out', href: '/world-id/try' },
		],
	},
	{
		title: 'Quick Start',
		links: [
			{ title: 'Template Repositories', href: '/world-id/quick-start/templates' },
			{ title: 'Installation', href: '/world-id/quick-start/installation' },
			{ title: 'Configuration', href: '/world-id/quick-start/configuration' },
			{ title: 'Testing', href: '/world-id/quick-start/testing' },
		],
	},
	{
		title: 'Incognito Actions',
		links: [
			{ title: 'Cloud Verification', href: '/world-id/id/cloud' },
			{ title: 'On-Chain Verification', href: '/world-id/id/on-chain' },
			{ title: 'Common Pitfalls', href: '/world-id/id/pitfalls' },
		],
	},
	{
		title: 'Sign In with World ID',
		links: [
			{ title: 'OpenID Connect (OIDC)', href: '/world-id/sign-in' },
			{ title: 'Common Pitfalls', href: '/world-id/sign-in/pitfalls' },
		],
	},
	{
		title: 'Technical Reference',
		links: [
			{ title: 'IDKit Reference', href: '/world-id/reference/idkit' },
			{ title: 'API Reference', href: '/world-id/reference/api' },
			{ title: 'Sign In Reference', href: '/world-id/reference/sign-in' },
			{ title: 'Smart Contracts', href: '/world-id/reference/contracts' },
			{ title: 'Address Book', href: '/world-id/reference/address-book' },
			{ title: 'Errors', href: '/world-id/reference/errors' },
			{ title: 'World ID 2.0 Migration Guide', href: '/world-id/reference/world-id-2-migration-guide' },
		],
	},
	{
		title: 'Further Reading',
		links: [
			{ title: 'OIDC Explainer', href: '/world-id/further-reading/oidc' },
			{ title: 'Protocol Internals', href: '/world-id/further-reading/protocol-internals' },
			{ title: 'Zero-Knowledge Proofs', href: '/world-id/further-reading/zero-knowledge-proofs' },
			{ title: 'World ID Reset', href: '/world-id/further-reading/world-id-reset' },
		],
	},
]

export const miniAppsNavigation = [
	{
		title: 'Introduction',
		links: [{ title: 'What are Mini Apps?', href: '/mini-apps' }],
	},
	{
		title: 'Quick Start',
		links: [
			{ title: 'Installing Minikit', href: '/mini-apps/quick-start/installing' },
			{ title: 'Commands', href: '/mini-apps/quick-start/commands' },
			{ title: 'Responses', href: '/mini-apps/quick-start/responses' },
			{ title: 'Testing', href: '/mini-apps/quick-start/testing' },
			{ title: 'Publishing', href: '/mini-apps/quick-start/publishing' },
		],
	},
	{
		title: 'Commands',
		links: [
			{ title: 'Verify', href: '/mini-apps/commands/verify' },
			{ title: 'Pay', href: '/mini-apps/commands/pay' },
			{ title: 'Wallet Auth', href: '/mini-apps/commands/wallet-auth' },
		],
	},
	{
		title: 'Sign In with World ID',
		links: [{ title: 'Sign In', href: '/mini-apps/sign-in/setup' }],
	},
	{
		title: 'Technical Reference',
		links: [
			{ title: 'API Reference', href: '/mini-apps/reference/api' },
			{ title: 'Sharing', href: '/mini-apps/reference/sharing' },
			{ title: 'Errors', href: '/mini-apps/reference/errors' },
		],
	},
	{
		title: 'Further Reading',
		links: [
			{ title: 'Security', href: '/mini-apps/more/security' },
			{ title: 'App Store Guidelines', href: '/mini-apps/more/guidelines' },
		],
	},
]

export const Navigation: FC<{
	className?: string
}> = props => {
	const router = useRouter()
	const isWorldID = router.pathname.includes('world-id')

	return (
		<nav {...props}>
			<ul role="list">
				{isWorldID
					? worldIdNavigation.map((group, groupIndex) => (
							<NavigationGroup
								key={group.title}
								group={group}
								className={clsx(groupIndex === 0 && 'md:mt-0')}
							/>
					  ))
					: miniAppsNavigation.map((group, groupIndex) => (
							// @ts-ignore
							<NavigationGroup
								key={group.title}
								group={group}
								className={clsx(groupIndex === 0 && 'md:mt-0')}
							/>
					  ))}

				<li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
					<Button href="https://developer.worldcoin.org" target="_blank" className="w-full">
						Developer Portal
					</Button>
				</li>
			</ul>
		</nav>
	)
}
