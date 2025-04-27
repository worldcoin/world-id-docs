import Script from 'next/script'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<meta name="algolia-site-verification" content="9ED47D91389C7847" />

			<body className="bg-white antialiased dark:bg-zinc-900 overflow-x-hidden">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
