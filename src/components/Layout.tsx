import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Prose } from '@/components/Prose'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FC, PropsWithChildren, useMemo } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { navigation, Navigation } from '@/components/Navigation'
import { Section, SectionProvider } from '@/components/SectionProvider'

export const Layout: FC<
	PropsWithChildren<{
		sections?: Section[]
	}>
> = ({ children, sections = [] }) => {
	const router = useRouter()
	const currentSection = useMemo(
		() =>
			navigation.find(section =>
				section.links.some(
					link => router.pathname != '/' && link.href == router.pathname.replace('/api-docs', '/api')
				)
			),
		[router.pathname]
	)

	return (
		<SectionProvider sections={sections}>
			<Header />
			<div className="lg:ml-72 xl:ml-80">
				<motion.header
					layoutScroll
					className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:top-14 lg:z-[8] lg:flex"
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
