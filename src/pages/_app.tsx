import 'focus-visible'
import { FC } from 'react'
import Head from 'next/head'
import '@/styles/styles.css'
import Clippy from 'clippy-widget'
import { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'
import { Layout } from '@/components/Layout'
import { Router, useRouter } from 'next/router'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

function onRouteChange() {
	useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

const App: FC<AppProps> = ({ Component, pageProps }) => {
	let router = useRouter()

	return (
		<>
			<Head>
				{router.pathname === '/' ? (
					<title>Worldcoin Docs</title>
				) : (
					<title>{`${pageProps.title} - Worldcoin Docs`}</title>
				)}
				<meta name="description" content={pageProps.description} />

				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#191919" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
			</Head>
			{process.env.NODE_ENV === 'production' && <Clippy theme="light" />}
			{/* @ts-ignore */}
			<MDXProvider components={mdxComponents}>
				<Layout {...pageProps}>
					<Component {...pageProps} />
				</Layout>
			</MDXProvider>
		</>
	)
}

export default App
