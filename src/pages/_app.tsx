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
				{router.pathname === '/' ? <title>World ID</title> : <title>{`${pageProps.title} - World ID`}</title>}
				<meta name="description" content={pageProps.description} />
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
