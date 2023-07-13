import 'focus-visible'
import Head from 'next/head'
import '@/styles/styles.css'
import posthog from 'posthog-js'
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

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageProps.description} />

				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#191919" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
			</Head>
			{/* {process.env.NODE_ENV === 'production' && <Clippy theme="light" />} */}
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
