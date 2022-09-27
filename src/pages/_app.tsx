import 'styles/global.css'
import { MDXProvider } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'
import { ReactNode } from 'react'
import { AppProps } from 'next/app'

export default function MyApp(pageProps: AppProps) {
  // FIXME: styles
  const components = {
    h2: (props: { children?: ReactNode }) => (
      <h2 className="" id={slugify(props.children as string)}>
        {props.children}
      </h2>
    ),

    h3: (props: { children?: ReactNode }) => (
      <h3 id={slugify(props.children as string)}>{props.children}</h3>
    ),

    a: (props: { children?: ReactNode }) => (
      <a className="">{props.children}</a>
    ),

    table: (props: { children?: ReactNode }) => (
      <table className="">{props.children}</table>
    ),

    tr: (props: { children?: ReactNode }) => (
      <tr className="align-middle">{props.children}</tr>
    ),

    p: (props: { children?: ReactNode }) => (
      <p className="">{props.children}</p>
    ),

    li: (props: { children?: ReactNode }) => (
      <li className="">{props.children}</li>
    ),

    pre: (props: { children?: ReactNode }) => (
      <pre className="">{props.children}</pre>
    ),
    code: (props: { children?: ReactNode }) => (
      <code className="">{props.children}</code>
    ),
  }

  return (
    <>
      <MDXProvider components={components}>
        <pageProps.Component {...pageProps} />
      </MDXProvider>
    </>
  )
}
