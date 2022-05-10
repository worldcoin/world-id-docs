/**
 * Contains a hosted version of the World ID JS integration/widget, ready to be used in staging & production
 */
import React, { useEffect, useMemo, useState } from "react";
import Head from "@docusaurus/Head";
import styles from "./use.module.scss";
import Logo from "@site/static/img/logo.svg";
import worldID, { AppProps, VerificationResponse } from "@worldcoin/id";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

const PAGE_DESCRIPTION =
  "Prove you're a unique human without revealing any personal data";

enum State {
  Initial,
  Ready,
  MissingParams,
  Completed,
}

export default function HostedWorldID(): JSX.Element {
  const [state, setState] = useState(State.Initial);
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  useEffect(() => {
    if (queryParams.get("signal") && queryParams.get("actionId")) {
      setState(State.Ready);
    } else {
      setState(State.MissingParams);
    }
  }, [queryParams]);

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
          {state === State.Ready && (
            <WorldIDComponent
              actionId={queryParams.get("actionId")}
              signal={queryParams.get("signal")}
              appName={queryParams.get("appName")}
              signalDescription={queryParams.get("signalDescription")}
            />
          )}
          {state === State.MissingParams && (
            <>
              <p className={styles.errorText}>
                It looks like some parameters are missing from this request.
                Please check your link and try again.
              </p>
              <p className={styles.devCaption}>
                If you're a developer, check{" "}
                <Link to="/docs/js#hosted-version">the docs</Link> for this
                hosted version of the World ID widget.
              </p>
            </>
          )}
        </div>
        <div className={styles.learnMore}>
          Learn more about <Link to="/docs">World ID</Link> and about{" "}
          <Link to="https://worldcoin.org">Worldcoin</Link>.
        </div>
      </div>
    </>
  );
}

function WorldIDComponent(props: AppProps): JSX.Element {
  const [proof, setProof] = useState(null as null | VerificationResponse);
  const enableWorldID = async (): Promise<void> => {
    try {
      const result = await worldID.enable();
      setProof(result);
      console.info("World ID verified successfully!");
    } catch (error) {
      console.error(error);
      enableWorldID().catch(console.error.bind(console));
    }
  };

  useEffect(() => {
    if (!worldID.isInitialized()) {
      worldID.init("world-id-container", {
        ...props,
        enableTelemetry: true,
        disableRemoteFonts: true,
      });
      enableWorldID();
    }
  }, []);
  return (
    <>
      <div id="world-id-container" />
      <div className={styles.btnContainer}>
        <button className={styles.btnContinue} disabled>
          Continue
        </button>
      </div>
    </>
  );
}
