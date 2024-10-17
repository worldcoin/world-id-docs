import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Prose } from '@/components/Prose'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FC, PropsWithChildren, useMemo } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Section, SectionProvider } from '@/components/SectionProvider'
import { Navigation, miniAppsNavigation, worldIdNavigation } from './Navigation'

export const Layout: FC<
	PropsWithChildren<{
		sections?: Section[]
	}>
> = ({ children, sections = [] }) => {
	const router = useRouter()
	const currentSection = useMemo(() => {
		if (router.pathname.includes('world-id')) {
			return worldIdNavigation.find(section =>
				section.links.some(
					link => router.pathname != '/' && link.href == router.pathname.replace('/api-docs', '/api')
				)
			)
		}
		if (router.pathname.includes('mini-app')) {
			return miniAppsNavigation.find(section =>
				section.links.some(
					link => router.pathname != '/' && link.href == router.pathname.replace('/api-docs', '/api')
				)
			)
		}
	}, [router.pathname])
	const basePath = router.pathname.split('/')[1]
	return (
		<SectionProvider sections={sections}>
			<Header />
			<div
				className={clsx('lg:ml-72 xl:ml-80 mt-14 overflow-x-hidden', {
					'!ml-0 justify-center items-center sm:flex mt-24': basePath === '',
				})}
			>
				<motion.header
					layoutScroll
					className={clsx(
						'contents lg:pointer-events-none lg:fixed lg:inset-0 lg:top-14 lg:z-[8] lg:flex mt-14',
						{
							invisible: basePath === '',
						}
					)}
				>
					<ScrollArea.Root asChild>
						<div className="contents lg:pointer-events-auto lg:overflow-hidden lg:flex lg:flex-col lg:w-72 xl:w-80">
							<ScrollArea.Viewport className="contents pt-4 lg:block lg:px-6 lg:pb-8">
								<Navigation className="hidden lg:block" />
							</ScrollArea.Viewport>
							<ScrollArea.Scrollbar
								className="flex my-1 w-1 bg-gray-100 rounded-sm"
								orientation="vertical"
							>
								<ScrollArea.Thumb className="relative flex-1 bg-gray-500/25 rounded-sm" />
							</ScrollArea.Scrollbar>
						</div>
					</ScrollArea.Root>
				</motion.header>

				<div className="relative px-4 pt-14 sm:px-6 lg:px-8">
					<main className="pb-16">
						<Prose as="article">
							{currentSection && (
								<p className="uppercase tracking-wide text-neutral-400 mb-1">{currentSection.title}</p>
							)}
							{children}
						</Prose>
					</main>
					<Footer />
				</div>
			</div>
		</SectionProvider>
	)
}
