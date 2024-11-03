import 'focus-visible'
import '@/styles/styles.css'
import posthog from 'posthog-js'
import Script from 'next/script'
import { NextSeo } from 'next-seo'
import { FC, useMemo } from 'react'
import { AppProps } from 'next/app'
import { Sora } from 'next/font/google'
import { MDXProvider } from '@mdx-js/react'
import { Layout } from '@/components/Layout'
import { usePostHog } from '@/lib/use-posthog'
import { Router, useRouter } from 'next/router'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { miniAppsNavigation, worldIdNavigation, worldChainNavigation } from '@/components/Navigation'

function onRouteChange() {
	useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

const sora = Sora({
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-sora',
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
		if (router.pathname === '/' || !pageProps.title) return 'World Docs'
		return `${pageProps.title} | World Docs`
	}, [pageProps.title, router.pathname])

	const section = useMemo(() => {
		if (router.pathname === '/') return null

		if (router.pathname.includes('world-id')) {
			return worldIdNavigation.find(nav => nav.links.some(link => link.href === router.pathname))?.title
		}

		if (router.pathname.includes('mini-app')) {
			return miniAppsNavigation.find(nav => nav.links.some(link => link.href === router.pathname))?.title
		}
		if (router.pathname.includes('world-chain')) {
			return worldChainNavigation.find(nav => nav.links.some(link => link.href === router.pathname))?.title
		}
	}, [router.pathname])

	const pagesWithoutLayout = useMemo(() => ['/try-callback'], [])

	const hasLayout = useMemo(() => {
		if (pagesWithoutLayout.includes(router.pathname)) {
			return false
		}

		return true
	}, [pagesWithoutLayout, router.pathname])

	return (
		<div className={sora.variable}>
			<NextSeo
				title={title}
				description={pageProps.description}
				openGraph={{
					title,
					type: 'website',
					site_name: 'World Docs',
					description: pageProps.description,
					images: [
						{
							url:
								router.pathname == '/'
									? `${process.env.NEXT_PUBLIC_APP_URL!}/images/og/og.png`
									: `${process.env.NEXT_PUBLIC_APP_URL!}/api/og?category=${section ?? ''}&title=${
											pageProps.title
									  }`,
							width: 1920,
							height: 1080,
							alt: 'World Docs',
						},
					],
				}}
				twitter={{ cardType: 'summary_large_image' }}
				additionalLinkTags={[
					{ rel: 'manifest', href: '/favicon/site.webmanifest' },
					{ rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#191919' },
					{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
					{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
					{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
				]}
			/>

			{/* @ts-ignore */}
			<MDXProvider components={mdxComponents}>
				{hasLayout && (
					<Layout {...pageProps}>
						<Component {...pageProps} />
					</Layout>
				)}

				{!hasLayout && <Component {...pageProps} />}
			</MDXProvider>

			{process.env.NEXT_PUBLIC_COOKIEPRO_DOMAIN_SCRIPT && (
				<Script
					src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
					type="text/javascript"
					data-domain-script={process.env.NEXT_PUBLIC_COOKIEPRO_DOMAIN_SCRIPT}
					async
				/>
			)}

			{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
				<>
					<Script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
					/>
					<Script id="google-analytics">
						{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
							`}
					</Script>
				</>
			)}
		</div>
	)
}

export default App
