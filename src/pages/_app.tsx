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
      <a className="underline cursor-pointer hover:opacity-70 transition">
        {props.children}
      </a>
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
