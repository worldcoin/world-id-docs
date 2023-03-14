import clsx from 'clsx'
import Link from 'next/link'
import { Button } from './Button'
import { forwardRef } from 'react'
import Logo from '@/components/Logo'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { MobileNavigation, useIsInsideMobileNavigation } from '@/components/MobileNavigation'

function TopLevelNavItem({ href, children, target }) {
	return (
		<li>
			<Link
				href={href}
				target={target}
				className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				{children}
			</Link>
		</li>
	)
}

function GitHubIcon(props) {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
			/>
		</svg>
	)
}

export const Header = forwardRef(function Header({ className }, ref) {
	let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
	let isInsideMobileNavigation = useIsInsideMobileNavigation()

	let { scrollY } = useScroll()
	let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
	let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

	return (
		<motion.div
			ref={ref}
			className={clsx(
				className,
				'sticky inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6',
				!isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
				isInsideMobileNavigation
					? 'bg-white dark:bg-zinc-900'
					: 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
			)}
			style={{
				'--bg-opacity-light': bgOpacityLight,
				'--bg-opacity-dark': bgOpacityDark,
			}}
		>
			<div
				className={clsx(
					'absolute inset-x-0 top-full h-px transition',
					(isInsideMobileNavigation || !mobileNavIsOpen) && 'bg-zinc-900/7.5 dark:bg-white/7.5'
				)}
			/>
			<div className="hidden lg:flex">
				<Link href="/" aria-label="Home">
					<Logo className="h-6" />
				</Link>
			</div>
			<div className="flex items-center gap-5 lg:hidden">
				<MobileNavigation />
				<Link href="/" aria-label="Home">
					<Logo className="h-6" />
				</Link>
			</div>
			<div className="flex items-center gap-5">
				<nav className="hidden md:block">
					<ul role="list" className="flex items-center gap-8">
						<TopLevelNavItem href="https://docs.worldcoin.org/waitlist" target="_blank">
							Join the Waitlist
						</TopLevelNavItem>
						<Button href="https://developer.worldcoin.org" target="_blank">
							Developer Portal
						</Button>
					</ul>
				</nav>
				<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
				<a href="https://github.com/worldcoin/idkit-js" target="_blank" rel="noreferrer">
					<GitHubIcon className="h-6 w-6 text-black" />
				</a>
			</div>
		</motion.div>
	)
})
