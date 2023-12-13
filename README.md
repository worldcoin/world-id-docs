<a href="https://worldcoin.org/world-id">
  <img src="/public/images/shared-readme/readme-header.png" alt="" />
</a>

# Worldcoin Documentation

This repository contains the technical documentation for the Worldcoin SDK and the World ID Protocol.

## <img align="left" width="28" height="28" src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/readme-world-id.png" alt="" style="margin-right: 0; padding-right: 4px;" /> About World ID

World ID is the privacy-first identity protocol that brings global proof of personhood to the internet. More on World ID in the [announcement blog post](https://worldcoin.org/blog/announcements/introducing-world-id-and-sdk).

World ID lets you seamlessly integrate authentication into your app that verifies accounts belong to real persons through [Sign in with World ID](https://docs.worldcoin.org/id/sign-in). For additional flexibility and cases where you need extreme privacy, [Incognito Actions](https://docs.worldcoin.org/id/incognito-actions) lets you verify users in a way that cannot be tracked across verifications.

Follow the [Quick Start](https://docs.worldcoin.org/quick-start) guide for the easiest way to get started.

## 📄 Documentation

All the technical docs for the Wordcoin SDK, World ID Protocol, examples, guides can be found at https://docs.worldcoin.org/

<a href="https://docs.worldcoin.org">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/visit-documentation-dark.png" height="50px" />
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/visit-documentation-light.png" height="50px" />
      <img />
    </picture>
  </p>
</a>

## 🧑‍💻 Developing locally

To develop locally and contribute to these docs, you can follow these steps after cloning the repo.

-   Activate required Node version (18.x)

    ```
    nvm use 18 # only if you are using nvm
    ```

-   Install dependencies
    ```bash
    pnpm install
    ```
-   Run locally
    ```bash
    pnpm start
    ```
-   Open browser at `http://localhost:3000`
-   To build the production bundle you can simply run.
    ```bash
    pnpm build
    ```

## ✨ Contributors

Thanks to all [the contributors](CONTRIBUTING.md) who have made the Worldcoin SDK possible!

<p align="right"> Powered by
  <a href="https://worldcoin.org">
    <picture align="right">
      <source media="(prefers-color-scheme: light)" srcset="public/worldcoin-logo.svg" height="24" />
      <source media="(prefers-color-scheme: dark)" srcset="public/worldcoin-logo-white.svg" height="24" />
      <img />
    </picture>
  </a>
</p>
