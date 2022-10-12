import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Sora:wght@400;500;600&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="bg-white dark:bg-191c20">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
