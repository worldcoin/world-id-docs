import clsx from 'clsx'
import Image from 'next/image'
import { Button } from './Button'
import { Link } from '@/components/Link'
import GitHubIcon from './icons/GitHubIcon'
import logo from '../../worldcoin-logo.svg'
import { MobileSearch, Search } from './Search'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { motion, MotionStyle, useScroll, useTransform } from 'framer-motion'
import { MobileNavigation, useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { FC, forwardRef, ForwardRefExoticComponent, PropsWithChildren, RefObject } from 'react'

const TopLevelNavItem: FC<
	PropsWithChildren<{
		href: string
		target?: string
		className?: string
	}>
> = ({ href, children, target, className }) => (
	<li>
		<Link
			href={href}
			target={target}
			className={clsx(
				'text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
				className
			)}
		>
			{children}
		</Link>
	</li>
)

export const Header: ForwardRefExoticComponent<{ className?: string }> = forwardRef(({ className }, ref) => {
	let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
	let isInsideMobileNavigation = useIsInsideMobileNavigation()

	let { scrollY } = useScroll()
	let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])
	let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])

	return (
		<motion.div
			ref={ref as RefObject<HTMLDivElement>}
			className={clsx(
				className,
				'sticky inset-x-0 top-0 z-[9] flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6',
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
					<Image src={logo} className="h-6" alt="Worldcoin" />
				</Link>
			</div>
			<Search />
			<div className="flex items-center gap-5 lg:hidden">
				<MobileNavigation />
				<Link href="/" aria-label="Home">
					<Image src={logo} className="h-6" alt="Worldcoin" />
				</Link>
			</div>
			<div className="flex items-center gap-5">
				<nav className="hidden md:block">
					<ul role="list" className="flex items-center gap-4">
						<TopLevelNavItem
							className="bg-gray-100 hover:bg-gray-100/50 py-[7px] px-4 border rounded-lg border-gray-200"
							href="/apps"
						>
							Apps & Integrations
						</TopLevelNavItem>
						<Button href="/waitlist" target="_blank">
							Join the Waitlist
						</Button>
					</ul>
				</nav>
				<MobileSearch />
				<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
				<a href="https://github.com/worldcoin/idkit-js" target="_blank" rel="noreferrer">
					<GitHubIcon className="h-6 w-6 text-black" />
				</a>
			</div>
		</motion.div>
	)
})
Header.displayName = 'Header'
