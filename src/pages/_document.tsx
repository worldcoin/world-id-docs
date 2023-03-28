import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script
					src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
					type="text/javascript"
					data-domain-script={process.env.NEXT_PUBLIC_COOKIEPRO_DOMAIN_SCRIPT}
					async
				/>
			</Head>

			<body className="bg-white antialiased dark:bg-zinc-900">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
