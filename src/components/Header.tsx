import clsx from 'clsx'
import Link from 'next/link'
import { Button } from './Button'
import Logo from '@/components/Logo'
import GitHubIcon from './icons/GitHubIcon'
import { FC, forwardRef, PropsWithChildren } from 'react'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { motion, MotionStyle, useScroll, useTransform } from 'framer-motion'
import { MobileNavigation, useIsInsideMobileNavigation } from '@/components/MobileNavigation'

const TopLevelNavItem: FC<
	PropsWithChildren<{
		href: string
		target?: string
	}>
> = ({ href, children, target }) => (
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

export const Header: FC<{ className?: string }> = ({ className }) => {
	let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
	let isInsideMobileNavigation = useIsInsideMobileNavigation()

	let { scrollY } = useScroll()
	let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])
	let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])

	return (
		<motion.div
			className={clsx(
				className,
				'sticky inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6',
				!isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
				isInsideMobileNavigation
					? 'bg-white dark:bg-zinc-900'
					: 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
			)}
			style={
				{
					'--bg-opacity-light': bgOpacityLight,
					'--bg-opacity-dark': bgOpacityDark,
				} as MotionStyle
			}
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
}
