/**
 * Contains a hosted version of the World ID JS integration/widget, ready to be used in staging & production
 */
import React, { useEffect } from "react";
import Head from "@docusaurus/Head";
import styles from "./use.module.scss";
import Logo from "@site/static/img/logo.svg";
import WorldID from "@worldcoin/id";
import Link from "@docusaurus/Link";

const PAGE_DESCRIPTION =
  "Prove you're a unique human without revealing any personal data";

export default function HostedWorldID(): JSX.Element {
  useEffect(() => {
    if (!WorldID.isInitialized()) {
      WorldID.init("world-id-container", { actionId: "123" });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Verify with World ID</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="og:description" content={PAGE_DESCRIPTION} />
      </Head>
      <div className={styles.hostedWID}>
        <div>
          <Logo className={styles.logo} />
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome to World ID</h1>
          <p className={styles.caption}>
            Verify you are a unique human with World ID
          </p>
          <div id="world-id-container" />
          <div className={styles.btnContainer}>
            <button className={styles.btnContinue} disabled>
              Continue
            </button>
          </div>
        </div>
        <div className={styles.learnMore}>
          Learn more about <Link to="/docs">World ID</Link> and about{" "}
          <Link to="https://worldcoin.org">Worldcoin</Link>.
        </div>
      </div>
    </>
  );
}
