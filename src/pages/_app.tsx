import "@/styles/tailwind.css";
import "@docsearch/css";
import { Layout } from "@/components/common/Layout";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import slugify from "@sindresorhus/slugify";

function MyApp({ Component, pageProps }: AppProps) {
  const components = {
    h2: (props: { children?: ReactNode }) => (
      <h2 className="text-32 font-bold" id={slugify(props.children as string)}>
        {props.children}
      </h2>
    ),

    h3: (props: { children?: ReactNode }) => (
      <h3 id={slugify(props.children as string)}>{props.children}</h3>
    ),

    a: (props: { children?: ReactNode }) => (
      <a className="cursor-pointer hover:opacity-70 transition text-4940e0 dark:text-8c8cf2">
        {props.children}
      </a>
    ),

    table: (props: { children?: ReactNode }) => (
      <table className="bg-green-400">{props.children}</table>
    ),

    p: (props: { children?: ReactNode }) => (
      <p className="font-medium">{props.children}</p>
    ),

    li: (props: { children?: ReactNode }) => (
      <li className="font-medium">{props.children}</li>
    ),

    pre: (props: { children?: ReactNode }) => (
      <pre className="max-w-[800px] overflow-x-auto">{props.children}</pre>
    ),
    code: (props: { children?: ReactNode }) => (
      <code className="max-w-[800px] overflow-x-auto">{props.children}</code>
    ),
  };

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon.ico"
        />
      </Head>

      <MDXProvider components={components}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
