// import posthog from "posthog-js";
import React, { useState, useEffect } from "react";
import styles from "./cookieBanner.module.scss";

function CookieListModal({ onClose }: { onClose: () => void }): JSX.Element {
  return (
    <div
      className={styles.listOverlay}
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div className={styles.listContainer}>
        <h3 className={styles.listHeader}>
          Cookie List
          <span className={styles.closeButton} onClick={onClose}>
            &#10007;
          </span>
        </h3>
        <ul className={styles.list}>
          <li>
            <code className={styles.code}>ph_phc_id</code>. Used for analytics.
          </li>
        </ul>
      </div>
    </div>
  );
}

export function CookieBanner(): JSX.Element | null {
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const [cookieListModalVisible, setCookieListModalVisible] = useState(true);

  useEffect(() => {
    if (!window.localStorage.getItem("cookieBanner")) {
      setIsCookieBannerVisible(true);
    }
  }, []);

  const handleClick = (accepted: boolean = false) => {
    if (!accepted) {
      // Clear all cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Clear all localStorage data (except for `token`; absolutely necessary for app to work)
      const token = window.localStorage.getItem("token");
      window.localStorage.clear();
      if (token) {
        window.localStorage.setItem("token", token);
      }
    }

    window.localStorage.setItem(
      "cookieBanner",
      accepted ? "accepted" : "rejected"
    );

    setIsCookieBannerVisible(false);
  };

  if (!isCookieBannerVisible) {
    return null;
  }

  return (
    <div className={styles.cookies}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            🍪 Obligatory cookie banner -
            <a
              className={styles.link}
              href="https://worldcoin.pactsafe.io/rjd5nsvyq.html#contract-sjfypzwki"
              target="_blank"
            >
              Legal stuff
            </a>
          </h3>
          <span>
            We use only two very non-optional cookies, and one optional cookie
            for product-improvement analytics. Sg?
            <a
              className={styles.link}
              onClick={() => setCookieListModalVisible(true)}
            >
              Cookie list
            </a>
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => handleClick(false)}
            className={`${styles.button} ${styles.buttonRed}`}
          >
            Reject all
          </button>
          <button
            onClick={() => handleClick(true)}
            className={`${styles.button} ${styles.buttonBlue}`}
          >
            Yeah, okay
          </button>
        </div>
      </div>

      {cookieListModalVisible && (
        <CookieListModal onClose={() => setCookieListModalVisible(false)} />
      )}
    </div>
  );
}
