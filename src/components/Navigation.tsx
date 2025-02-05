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
					: 'text-gray-A5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
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
			className="bg-gray-A10 dark:bg-white/2.5 absolute inset-x-0 top-0 will-change-transform"
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
			className="absolute left-2 h-6 w-px bg-gray-A1"
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
				<motion.div layout className="bg-gray-A7 dark:bg-white/5 absolute inset-y-0 left-2 w-px" />
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
			{ title: 'Libraries', href: '/world-id/id/libraries' },
			{ title: 'On-Chain Verification', href: '/world-id/id/on-chain' },
			{ title: 'Common Pitfalls', href: '/world-id/id/pitfalls' },
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
			{ title: 'Installing MiniKit', href: '/mini-apps/quick-start/installing' },
			{ title: 'Commands', href: '/mini-apps/quick-start/commands' },
			{ title: 'Responses', href: '/mini-apps/quick-start/responses' },
			{ title: 'Testing', href: '/mini-apps/quick-start/testing' },
			{ title: 'App Store', href: '/mini-apps/quick-start/app-store' },
		],
	},
	{
		title: 'Design Standards',
		links: [
			{ title: 'Guidelines', href: '/mini-apps/design/app-guidelines' },
			{ title: 'UI Kit', href: '/mini-apps/design/ui-kit' },
		],
	},
	{
		title: 'Commands',
		links: [
			{ title: 'Verify', href: '/mini-apps/commands/verify' },
			{ title: 'Pay', href: '/mini-apps/commands/pay' },
			{ title: 'Wallet Auth', href: '/mini-apps/commands/wallet-auth' },
			{ title: 'Connect Wallet', href: '/mini-apps/commands/connect-wallet' },
			{ title: 'Send Transaction', href: '/mini-apps/commands/send-transaction' },
			{ title: 'Sign Message', href: '/mini-apps/commands/sign-message' },
			{ title: 'Sign Typed Data', href: '/mini-apps/commands/sign-typed-data' },
			{ title: 'Share Contacts', href: '/mini-apps/commands/share-contacts' },
			{ title: 'Send Notifications', href: '/mini-apps/commands/send-notifications' },
		],
	},
	{
		title: 'Technical Reference',
		links: [
			{ title: 'API Reference', href: '/mini-apps/reference/api' },
			{ title: 'Errors', href: '/mini-apps/reference/errors' },
			{ title: 'Address Book', href: '/mini-apps/reference/address-book' },
			{ title: 'Usernames', href: '/mini-apps/reference/usernames' },
		],
	},
	{
		title: 'Quick Actions',
		links: [
			{ title: 'Quick Actions', href: '/mini-apps/sharing/quick-actions' },
			{ title: 'UNO Swap', href: '/mini-apps/sharing/uno-qa' },
			{ title: 'Eggs Vault Smash', href: '/mini-apps/sharing/eggs-vault-qa' },
		],
	},
	{
		title: 'Further Reading',
		links: [
			{ title: 'Security', href: '/mini-apps/more/security' },
			{ title: 'App Store Policy', href: '/mini-apps/more/policy' },
			{ title: 'Promotion', href: '/mini-apps/more/promotion' },
			{ title: 'Grants', href: '/mini-apps/more/grants' },
			{ title: 'Troubleshooting', href: '/mini-apps/more/troubleshooting' },
			{ title: 'Webview Specifications', href: '/mini-apps/more/webview-spec' },
		],
	},
]

export const worldChainNavigation = [
	{
		title: 'About World Chain',
		links: [
			{ title: 'What is World Chain?', href: '/world-chain' },
			{ title: 'Why World Chain?', href: '/world-chain/quick-start/why' },
			{ title: 'Unique features', href: '/world-chain/quick-start/features' },
			{ title: 'Data Dashboards', href: '/world-chain/quick-start/data' },
		],
	},
	{
		title: 'Using World Chain',
		links: [
			{ title: 'Quick Start', href: '/world-chain/quick-start' },
			{ title: 'Funding a Wallet', href: '/world-chain/quick-start/fund-wallet' },
			{ title: 'Network Information', href: '/world-chain/quick-start/info' },
		],
	},
	{
		title: 'Building on World Chain',
		links: [
			{ title: 'Deploy on World Chain', href: '/world-chain/developers/deploy' },
			{ title: 'Deploy World ID template app', href: '/world-chain/developers/template' },
			{ title: 'World Chain Contracts', href: '/world-chain/developers/world-chain-contracts' },
			{ title: 'Fees', href: '/world-chain/developers/fees' },
			{ title: 'EVM Equivalence', href: '/world-chain/developers/evm-equivalence' },
			{
				title: 'Scaling World Chain 🔗',
				href: 'https://world.org/blog/engineering/finding-scalable-home-for-worldcoin',
			},
			{ title: 'Human Collective Grants', href: '/world-chain/developers/grants' },
		],
	},
	{
		title: 'Infrastructure Providers',
		links: [
			{ title: 'Nodes', href: '/world-chain/providers/nodes' },
			{ title: 'Bridges', href: '/world-chain/providers/bridges' },
			{ title: 'Data', href: '/world-chain/providers/data' },
			{ title: 'Block Explorers', href: '/world-chain/providers/explorers' },
			{ title: 'Developer Tooling', href: '/world-chain/providers/developer-tooling' },
			{ title: 'Paymasters', href: '/world-chain/providers/paymasters' },
			{ title: 'Onramps', href: '/world-chain/providers/onramps' },
		],
	},
	{
		title: 'Technical Reference',
		links: [
			{ title: 'Address Book', href: '/world-chain/reference/address-book' },
			{ title: 'Set up a node', href: '/world-chain/reference/node-setup' },
		],
	},
	{
		title: 'Tokens',
		links: [
			{ title: 'Bridging an L1 token to World Chain', href: '/world-chain/tokens/bridging' },

			{ title: 'Superchain Token Bridging', href: '/world-chain/tokens/superchain-token' },
		],
	},
	{
		title: 'Status Page',
		links: [
			{ title: 'World Chain Mainnet 🔗', href: 'https://worldchain-mainnet-status.alchemy.com/' },
			{ title: 'World Chain Sepolia Testnet 🔗', href: 'https://worldchain-sepolia-status.alchemy.com/' },
		],
	},
	{
		title: 'Others',
		links: [
			{ title: 'Brand Kit 🔗', href: 'https://world.org/press' },
			{ title: 'World Whitepaper 🔗', href: 'https://whitepaper.world.org/' },
		],
	},
	{
		title: 'Legal',
		links: [
			{
				title: 'Terms of Service 🔗',
				href: 'https://vault.pactsafe.io/s/8a18d792-fd76-44db-9b92-b0bb7981c248/legal.html#contract-byutjvtyt',
			},
			{
				title: 'Privacy Policy 🔗',
				href: 'https://vault.pactsafe.io/s/8a18d792-fd76-44db-9b92-b0bb7981c248/legal.html#contract-s1ytru6kk',
			},
		],
	},
]

export const Navigation: FC<{
	className?: string
}> = props => {
	const router = useRouter()

	const getNavigationGroups = () => {
		if (router.pathname.includes('mini-apps')) {
			return miniAppsNavigation
		} else if (router.pathname.includes('world-id')) {
			return worldIdNavigation
		} else if (router.pathname.includes('world-chain')) {
			return worldChainNavigation
		}
		// Default case or error handling
		return []
	}

	const navigationGroups = getNavigationGroups()

	return (
		<nav {...props}>
			<ul role="list">
				{navigationGroups.map((group, groupIndex) => (
					<NavigationGroup key={group.title} group={group} className={clsx(groupIndex === 0 && 'md:mt-0')} />
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
