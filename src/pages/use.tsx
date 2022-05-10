import React, { useEffect } from "react";
import Head from "@docusaurus/Head";
import styles from "./use.module.scss";
import Logo from "@site/static/img/logo.svg";
import WorldID from "@worldcoin/id";

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
        </div>
      </div>
    </>
  );
}
