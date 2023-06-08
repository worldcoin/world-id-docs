import 'focus-visible'
import Head from 'next/head'
import '@/styles/styles.css'
import posthog from 'posthog-js'
import { NextSeo } from 'next-seo'
import Clippy from 'clippy-widget'
import { FC, useMemo } from 'react'
import { AppProps } from 'next/app'
import { Sora } from 'next/font/google'
import { MDXProvider } from '@mdx-js/react'
import { Layout } from '@/components/Layout'
import { usePostHog } from '@/lib/use-posthog'
import { Router, useRouter } from 'next/router'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

function onRouteChange() {
	useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

const sora = Sora({
	subsets: ['latin'],
	style: ['normal'],
	weight: ['400', '600', '700'],
})

if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: 'https://app.posthog.com',
		// Disable in development
		loaded: posthog => {
			if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
		},
	})
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
	usePostHog()
	let router = useRouter()

	const title = useMemo(() => {
		if (router.pathname === '/' || !pageProps.title) return 'Worldcoin Docs'
		return `${pageProps.title} | Worldcoin Docs`
	}, [pageProps.title, router.pathname])

	const pagesWithoutLayout = useMemo(() => ['/try-callback'], [])

	const hasLayout = useMemo(() => {
		if (pagesWithoutLayout.includes(router.pathname)) {
			return false
		}

		return true
	}, [pagesWithoutLayout, router.pathname])

	const ogImagesSizes = useMemo(
		() => [
			{ width: 109, height: 109 },
			{ width: 138, height: 72 },
			{ width: 180, height: 94 },
			{ width: 180, height: 110 },
			{ width: 250, height: 250 },
			{ width: 355, height: 225 },
			{ width: 360, height: 123 },
			{ width: 407, height: 213 },
			{ width: 502, height: 264 },
			{ width: 896, height: 512 },
			{ width: 1024, height: 512 },
			{ width: 1600, height: 900 },
			{ width: 1920, height: 1080 },
		],
		[]
	)

	const ogImages = useMemo(() => {
		const isHomePage = router.pathname === '/'

		if (isHomePage) {
			return ogImagesSizes.map(({ width, height }) => ({
				url: `/images/og/default/${width}x${height}.png`,
				width,
				height,
				alt: `Worldcoin Docs`,
			}))
		}

		return ogImagesSizes.map(({ width, height }) => {
			if (width === 1920 && height === 1080) {
				return {
					url: `/images/og${router.pathname}.png`,
					width: 1920,
					height: 1080,
					alt: 'Worldcoin Docs',
				}
			}

			return {
				url: `/images/og/default/${width}x${height}.png`,
				width,
				height,
				alt: `Worldcoin Docs`,
			}
		})
	}, [ogImagesSizes, router.pathname])

	return (
		<>
			<NextSeo
				title={title}
				description={pageProps.description}
				openGraph={{
					title,
					description: pageProps.description,
					type: 'website',
					site_name: 'Worldcoin Docs',
					images: ogImages,
				}}
				twitter={{
					cardType: 'summary_large_image',
				}}
				additionalLinkTags={[
					{
						rel: 'manifest',
						href: '/favicon/site.webmanifest',
					},
					{
						rel: 'mask-icon',
						href: '/favicon/safari-pinned-tab.svg',
						color: '#191919',
					},
					{
						rel: 'apple-touch-icon',
						sizes: '180x180',
						href: '/favicon/apple-touch-icon.png',
					},
					{
						rel: 'icon',
						type: 'image/png',
						sizes: '32x32',
						href: '/favicon/favicon-32x32.png',
					},
					{
						rel: 'icon',
						type: 'image/png',
						sizes: '16x16',
						href: '/favicon/favicon-16x16.png',
					},
				]}
			/>

			{process.env.NODE_ENV === 'production' && <Clippy theme="light" />}

			{/* @ts-ignore */}
			<MDXProvider components={mdxComponents}>
				{hasLayout && (
					<Layout {...pageProps}>
						<Component {...pageProps} />
					</Layout>
				)}

				{!hasLayout && <Component {...pageProps} />}
			</MDXProvider>

			<style jsx global>{`
				:root {
					--font-sora: ${sora.style.fontFamily};
				}
			`}</style>
		</>
	)
}

export default App
