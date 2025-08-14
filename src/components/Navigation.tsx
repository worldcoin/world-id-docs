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
			{ title: 'Quick Start', href: '/world-id' },
			{ title: 'Core Concepts', href: '/world-id/concepts' },
		],
	},
	{
		title: 'ID Kit',
		links: [
			{ title: 'Getting Started', href: '/world-id/id/getting-started' },
			{ title: 'Integrate on web (React)', href: '/world-id/id/web-react' },
			{ title: 'Integrate on web (Vanilla)', href: '/world-id/id/web-vanilla' },
			{ title: 'Integrate on mobile', href: '/world-id/id/mobile' },
			{ title: 'Cloud Verification', href: '/world-id/id/cloud' },
			{ title: 'On-Chain Verification', href: '/world-id/id/on-chain' },
			{ title: 'Libraries', href: '/world-id/id/libraries' },
			{ title: 'Testing', href: '/world-id/id/testing' },
			{ title: 'Design Guidelines', href: '/world-id/id/design-guidelines' },
		],
	},
	{
		title: 'Sign in with World ID',
		links: [
			{ title: 'Getting Started', href: '/world-id/sign-in/getting-started' },
			{ title: 'OIDC Explainer', href: '/world-id/sign-in/oidc' },
		],
	},
	{
		title: 'Technical Reference',
		links: [
			{ title: 'IDKit Reference', href: '/world-id/reference/idkit' },
			{ title: 'API Reference', href: '/world-id/reference/api' },
			{ title: 'Sign In Reference', href: '/world-id/reference/sign-in' },
			{ title: 'Smart Contracts', href: '/world-id/reference/contracts' },
			{ title: 'Contract Deployments', href: '/world-id/reference/contract-deployments' },
			{ title: 'Errors', href: '/world-id/reference/errors' },
		],
	},
	// Temporarily hiding until we update the content
	// {
	// 	title: 'Further Reading',
	// 	links: [
	// 		{ title: 'Protocol Internals', href: '/world-id/further-reading/protocol-internals' },
	// 		{ title: 'Zero-Knowledge Proofs', href: '/world-id/further-reading/zero-knowledge-proofs' },
	// 	],
	// },
]

export const miniAppsNavigation = [
	{
		title: 'Introduction',
		links: [{ title: 'What are Mini Apps?', href: '/mini-apps' }],
	},
	{
		title: 'Quick Start',
		links: [
			{ title: 'Getting Started', href: '/mini-apps/quick-start/installing' },
			{ title: 'Commands', href: '/mini-apps/quick-start/commands' },
			{ title: 'Responses', href: '/mini-apps/quick-start/responses' },
			{ title: 'Testing', href: '/mini-apps/quick-start/testing' },
			{ title: 'Mini App Store', href: '/mini-apps/quick-start/app-store' },
		],
	},
	{
		title: 'Commands',
		links: [
			{ title: 'Verify', href: '/mini-apps/commands/verify' },
			{ title: 'Pay', href: '/mini-apps/commands/pay' },
			{ title: 'Wallet Auth', href: '/mini-apps/commands/wallet-auth' },
			{ title: 'Send Transaction', href: '/mini-apps/commands/send-transaction' },
			{ title: 'Sign Message', href: '/mini-apps/commands/sign-message' },
			{ title: 'Sign Typed Data', href: '/mini-apps/commands/sign-typed-data' },
			{ title: 'Share Contacts', href: '/mini-apps/commands/share-contacts' },
			{ title: `Request Permission`, href: '/mini-apps/commands/request-permission' },
			{ title: `Get Permissions`, href: '/mini-apps/commands/get-permissions' },
			{ title: `Send Notifications`, href: '/mini-apps/commands/how-to-send-notifications' },
			{ title: 'Send Haptic Feedback', href: '/mini-apps/commands/send-haptic-feedback' },
			{ title: 'Share', href: '/mini-apps/commands/share' },
		],
	},
	{
		title: 'Guidelines',
		links: [
			{ title: 'App Guidelines', href: '/mini-apps/guidelines/app-guidelines' },
			{ title: 'Design Guidelines', href: '/mini-apps/guidelines/design-guidelines' },
			{ title: 'Notifications Guidelines', href: '/mini-apps/guidelines/features-and-guidelines' },
			{
				title: 'Smart Contract Development Guidelines',
				href: '/mini-apps/guidelines/smart-contract-development-guidelines',
			},
			{ title: 'App Review Guidelines', href: '/mini-apps/guidelines/policy' },
		],
	},
	{
		title: 'Growth Playbook',
		links: [
			{ title: 'Overview', href: '/mini-apps/growth' },
			{ title: 'Invites & Viral Loops', href: '/mini-apps/growth/invites-viral' },
			{ title: 'Gamification', href: '/mini-apps/growth/gamification' },
			{ title: 'Retention via Notifications', href: '/mini-apps/growth/notifications' },
			{ title: 'Data & Analytics', href: '/mini-apps/growth/analytics' },
		],
	},
	{
		title: 'Quick Actions',
		links: [
			{ title: 'Sharing', href: '/mini-apps/sharing/quick-actions' },
			{ title: 'Add Money', href: '/mini-apps/sharing/add-money-qa' },
			{ title: 'UNO Swap', href: '/mini-apps/sharing/uno-qa' },
			{ title: 'Earn WLD Pool', href: '/mini-apps/sharing/earn-wld-qa' },
			{ title: 'DNA Send & Swap', href: '/mini-apps/sharing/dna-qa' },
			{ title: 'Sage Support', href: '/mini-apps/sharing/sage-qa' },
			{ title: 'VUNI', href: '/mini-apps/sharing/vuni-qa' },
			{ title: 'World Companies Finder', href: '/mini-apps/sharing/world-companies-finder-qa' },
			{ title: 'OnePay', href: '/mini-apps/sharing/one-pay-qa' },
			{ title: 'PUF', href: '/mini-apps/sharing/puf-qa' },
			{ title: 'ORBITAL-X', href: '/mini-apps/sharing/orbital-x-qa' },
		],
	},
	{
		title: 'Further Reading',
		links: [
			{ title: 'Webview Specifications', href: '/mini-apps/more/webview-spec' },
			{ title: 'Releases', href: '/mini-apps/more/releases' },
			{ title: 'Community Tools & Perks', href: '/mini-apps/more/community-tools-perks' },
			{ title: 'FAQ', href: '/mini-apps/more/faq' },
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
			{ title: 'Oracles', href: '/world-chain/providers/oracles' },
			{ title: 'Paymasters', href: '/world-chain/providers/paymasters' },
			{ title: 'Onramps', href: '/world-chain/providers/onramps' },
		],
	},
	{
		title: 'Technical Reference',
		links: [
			{ title: 'Useful Contract Deployments', href: '/world-chain/reference/useful-contracts' },
			{ title: 'Set up a node', href: '/world-chain/reference/node-setup' },
		],
	},
	{
		title: 'Tokens',
		links: [
			{ title: 'Bridging an L1 token to World Chain', href: '/world-chain/tokens/bridging' },
			{ title: 'Superchain Token Bridging', href: '/world-chain/tokens/superchain-token' },
			{ title: 'USDC on World Chain Quick Start', href: '/world-chain/tokens/usdc' },
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
