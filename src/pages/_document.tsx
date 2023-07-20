import Script from 'next/script'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{process.env.NEXT_PUBLIC_COOKIEPRO_DOMAIN_SCRIPT && (
					<Script
						src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
						type="text/javascript"
						data-domain-script={process.env.NEXT_PUBLIC_COOKIEPRO_DOMAIN_SCRIPT}
						async
					/>
				)}
			</Head>

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

			<body className="bg-white antialiased dark:bg-zinc-900">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
