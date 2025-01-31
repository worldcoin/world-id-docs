import clsx from 'clsx'
import Image from 'next/image'
import { Button } from './Button'
import { useRouter } from 'next/router'
import { Link } from '@/components/Link'
import logo from 'public/world-logo.svg'
import GitHubIcon from './icons/GitHubIcon'
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
	const router = useRouter()
	const basePath = router.pathname.split('/')[1]

	return (
		<motion.div
			ref={ref as RefObject<HTMLDivElement>}
			className={clsx(
				className,
				'fixed inset-x-0 top-0 z-[9] bg-white dark:bg-zinc-900',
				!isInsideMobileNavigation && 'backdrop-blur-sm dark:backdrop-blur transition '
			)}
			style={
				{
					'--bg-opacity-light': bgOpacityLight,
					'--bg-opacity-dark': bgOpacityDark,
				} as MotionStyle
			}
		>
			<div className="flex h-14 items-center justify-between gap-12 border px-4 sm:px-6 ">
				<div
					className={clsx(
						'absolute inset-x-0 top-full h-px transition',
						(isInsideMobileNavigation || !mobileNavIsOpen) && 'bg-gray-A7 dark:bg-white/7.5'
					)}
				/>
				<div className="hidden lg:flex justify-self-start">
					<Link href="/" aria-label="Home">
						<Image src={logo} className="h-6" alt="World" />
					</Link>
				</div>
				<Search />
				<div className="flex items-center gap-5 lg:hidden">
					<MobileNavigation />
					<Link href="/" aria-label="Home">
						<Image src={logo} className="h-6" alt="World" />
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<nav className="hidden md:block">
						<ul role="list" className="flex items-center gap-4">
							<TopLevelNavItem
								className="bg-gray-A9 hover:bg-gray-100/50 py-[7px] px-4 border rounded-lg border-gray-A7"
								href="/apps"
							>
								Explore Apps
							</TopLevelNavItem>
							<Button href="https://developer.worldcoin.org" target="_blank" className="bg-gray-A1">
								Developer Portal
							</Button>
						</ul>
					</nav>
					<MobileSearch />
					<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
					<a href="https://github.com/worldcoin/idkit-js" target="_blank" rel="noreferrer">
						<GitHubIcon className="h-6 w-6 text-black" />
					</a>
				</div>
			</div>
			<div className="px-4 sm:px-6 flex items-center gap-6 h-12 bg-white">
				<SectionTab text="Home" isActive={basePath === ''} href="/" />
				<SectionTab text="Mini Apps" isActive={basePath === 'mini-apps'} href="/mini-apps" />
				<SectionTab text="World ID" isActive={basePath === 'world-id'} href="/world-id" />
				<SectionTab text="World Chain" isActive={basePath === 'world-chain'} href="/world-chain" />
			</div>
		</motion.div>
	)
})

const SectionTab = (props: { className?: string; text: string; isActive: boolean; href: string }) => {
	const { className, text, isActive, href } = props
	return (
		<div
			className={clsx('h-full flex items-center text-center justify-center', {
				'text-gray-900 border-black border-b': isActive,
			})}
		>
			<a href={href} className={clsx('text-AG2 text-sm', { 'text-gray-900': isActive }, className)}>
				{text}
			</a>
		</div>
	)
}

Header.displayName = 'Header'
