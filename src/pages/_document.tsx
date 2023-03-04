import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <body className="bg-neutral-0 font-default text-neutral-900 dark:bg-neutral-900 dark:text-neutral-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
