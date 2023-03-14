import { motion } from 'framer-motion'
import { Prose } from '@/components/Prose'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FC, PropsWithChildren } from 'react'
import { Navigation } from '@/components/Navigation'
import { Section, SectionProvider } from '@/components/SectionProvider'

export const Layout: FC<
	PropsWithChildren<{
		sections?: Section[]
	}>
> = ({ children, sections = [] }) => {
	return (
		<SectionProvider sections={sections}>
			<Header />
			<div className="lg:ml-72 xl:ml-80">
				<motion.header
					layoutScroll
					className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
				>
					<div className="contents pt-8 lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:px-6 lg:pb-8 xl:w-80">
						<Navigation className="hidden lg:mt-10 lg:block" />
					</div>
				</motion.header>
				<div className="relative px-4 pt-14 sm:px-6 lg:px-8">
					<main className="pb-16">
						<Prose as="article">{children}</Prose>
					</main>
					<Footer />
				</div>
			</div>
		</SectionProvider>
	)
}
