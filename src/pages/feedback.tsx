import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";
import styles from "./feedback.module.scss";

export default function Feedback(): JSX.Element {
  return (
    <Layout
      title="Docs"
      description="Prove a human is doing an action only once without revealing any personal data."
    >
      <div className={styles.feedbackPage}>
        <h1>✨ Feedback</h1>
        <p>
          We're continuously looking for ways to improve World ID, and in
          particular now that we're in an Alpha stage we highly welcome your
          input.
        </p>
        <table className={styles.feedbackTable}>
          <tbody>
            <tr>
              <td className="text--center">
                <Link href="https://discord.gg/worldcoin" target="_blank">
                  {" "}
                  <img
                    src="img/discord-logo.svg"
                    alt="Discord Logo"
                    height={80}
                  />
                </Link>
              </td>
              <td className="text--center">
                <Link
                  href="https://github.com/worldcoin/world-id-docs/issues/new"
                  target="_blank"
                >
                  <img src="img/icon-issue.svg" alt="" height={80} />
                </Link>
              </td>
              <td className="text--center">
                <Link
                  href="https://github.com/worldcoin"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="img/icon-pr.svg" alt="" height={80} />
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                Join us on{" "}
                <Link href="https://discord.gg/worldcoin" target="_blank">
                  Discord
                </Link>{" "}
                to ask questions, discuss ideas, or share any feedback. Look for
                the
                <Link
                  href="https://discord.com/channels/956750052771127337/968523914638688306"
                  target="_blank"
                >
                  #world-id
                </Link>{" "}
                channel.
              </td>
              <td>
                Submit an issue in our{" "}
                <Link
                  href="https://github.com/worldcoin/world-id-docs/issues/new"
                  target="_blank"
                >
                  worldcoin/world-id-docs
                </Link>{" "}
                repo.
              </td>
              <td>
                Contribute directly! All the codebase related to World ID is
                open source, open a PR directly on{" "}
                <Link
                  href="https://github.com/worldcoin"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Link>
                .
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
