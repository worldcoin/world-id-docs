import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./home.module.scss";
import {
  HomepageFeatures,
  HomepageUseCases,
} from "@site/src/components/HomepageFeatures";
import { CookieBanner } from "../components/CookieBanner/CookieBanner";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/quick-start"
          >
            Get started now
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Docs"
      description="Prove a human is doing an action only once without revealing any personal data."
    >
      <CookieBanner />
      <Head>
        <meta property="og:image" content="/img/og-image.png" />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <section>
        <h2 className="text--center text--alt">Use cases</h2>
        <HomepageUseCases />
      </section>
    </Layout>
  );
}
